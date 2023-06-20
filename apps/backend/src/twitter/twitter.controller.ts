import {
    Controller,
    Get,
    Param,
    BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TWITTER_API_MSGS } from '../../../common/interfaces';
import { TwitterService } from './twitter.service';

@ApiTags('Twitter')
@Controller('twitter')
export class TwitterController {
    constructor(private twitterService: TwitterService) { }

    @Get('user/:userId/retweeted/tweet/:tweetUrl')
    async isTweetRetweeted(
        @Param('userId') userId: string,
        @Param('tweetUrl') tweetUrl: string,
    ) {
        try {
            const decodedUrl = decodeURIComponent(tweetUrl)
            return this.twitterService.isTweetRetweeted(decodedUrl, userId)
        } catch {
            throw new BadRequestException(TWITTER_API_MSGS.NotRetweetedTweet)
        }
    }

    @Get('user/:userId/liked/tweet/:tweetUrl')
    async isTweetLiked(
        @Param('userId') userId: string,
        @Param('tweetUrl') tweetUrl: string,
    ) {
        try {
            const decodedUrl = decodeURIComponent(tweetUrl)
            return this.twitterService.isTweetLiked(decodedUrl, userId)
        } catch {
            throw new BadRequestException(TWITTER_API_MSGS.NotLikedTweet)
        }
    }

    @Get('user/:userId/following/:accountName')
    async isFollowingTwitterAcc(
        @Param('userId') userId: string,
        @Param('accountName') accountName: string,
    ) {
        try {
            return this.twitterService.isFollowingTwitterAcc(userId, accountName)
        } catch {
            throw new BadRequestException(TWITTER_API_MSGS.NotFollowingAcc)
        }
    }

    @Get('validate/account/:accountName')
    async isExistingTwitterAcc(
        @Param('accountName') accountName: string,
    ) {
        try {
            return this.twitterService.isExistingTwitterAcc(accountName)
        } catch {
            throw new BadRequestException(TWITTER_API_MSGS.InvalidAccount)
        }
    }
}
