import { Module } from '@nestjs/common';
import { TwitterController } from './twitter.controller';
import { TwitterService } from './twitter.service';

@Module({
    imports: [],
    providers: [TwitterService],
    controllers: [TwitterController],
    exports: [TwitterService],
})
export class TwitterModule { }
