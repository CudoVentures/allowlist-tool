import { Test, TestingModule } from '@nestjs/testing';
import { DiscordController } from './discord.controller';
import { DiscordModule } from './discord.module';

describe('DiscordController', () => {
    let controller: DiscordController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DiscordController],
            imports: [DiscordModule],
        }).compile();

        controller = module.get<DiscordController>(DiscordController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
