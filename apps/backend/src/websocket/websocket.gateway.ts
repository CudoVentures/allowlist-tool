import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SubscribeMessage } from '@nestjs/websockets';
import { WS_MSGS, WS_ROOM } from '../../../common/interfaces';
import { UserService } from '../user/user.service';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    constructor(private userService: UserService) { }

    private connectedClients = new Set<string>();

    private async isValidFeClient(client: Socket): Promise<{ isValid: boolean, user: string }> {
        const incomingId = this.decodedId(client.handshake.query.customId)
        const userAddress = incomingId.split(process.env.APP_WS_ID).pop();
        const userFound = await this.userService.findByAddress(userAddress)
        return { isValid: !!userFound && incomingId.startsWith(process.env.APP_WS_ID), user: userFound.address }
    }

    private decodedId(encodedString: any) {
        return Buffer.from(encodedString, 'base64').toString('utf-8')
    }

    async handleConnection(client: Socket) {
        const { isValid, user } = await this.isValidFeClient(client)
        if (!isValid) {
            client.disconnect(true)
            throw new Error('Socket Connection refused. Invalid client');
        }

        if (!this.connectedClients.has(user)) {
            this.connectedClients.add(user);
            console.log(`Client connected - ${user}`);
        }
        
        setTimeout(() => {
            client.disconnect()
            console.log(`Client ${user} disconnected - time out`);
        }, 60000);
    }

    async handleDisconnect(client: Socket) {
        const { user } = await this.isValidFeClient(client)
        this.connectedClients.delete(user);
        console.log(`Client ${user} disconnected`);
    }

    async afterInit(_: Server) {
        console.log('WebSocket server initialized');
    }

    @SubscribeMessage(WS_MSGS.join)
    async join(client: Socket, payload: any): Promise<void> {
        const { isValid, user } = await this.isValidFeClient(client)
        const roomName = payload.roomName;
        if (isValid && roomName === WS_ROOM.socialMediaEvents) {
            client.join(roomName);
            console.log(`Client ${user} joined ${roomName}`);
            return
        }
        client.disconnect(true)
    }

    sendMessageToClient(room: WS_ROOM, message: WS_MSGS, type?: any) {
        this.server.to(room).emit(type ? type : message, message);
    }
}
