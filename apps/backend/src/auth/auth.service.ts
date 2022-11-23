import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  static userAddress: string;

  constructor(private readonly usersService: UserService) {}

  async login(address: string) {
    if (!address) {
      throw new BadRequestException();
    }

    let user = await this.usersService.findByAddress(address);

    if (!user) {
      user = await this.usersService.create({ address });
    }

    AuthService.userAddress = address;

    return user;
  }

  async validateUser(args: any): Promise<any> {
    let user = await this.usersService.findByAddress(AuthService.userAddress);

    if (!user) {
      user = await this.usersService.create({
        address: AuthService.userAddress,
        ...args,
      });
    } else {
      user = await this.usersService.update(AuthService.userAddress, args);
    }

    return user;
  }
}
