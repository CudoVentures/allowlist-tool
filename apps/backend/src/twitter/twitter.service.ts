import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TwitterService {

    // PUBLIC
    async isFollowingTwitterAcc(
        userId: string,
        accountName: string,
    ): Promise<boolean> {
        const twitterAccountId = await this.getTwitterAccountIDByAccountName(accountName)
        return this.passCheck(
            `https://api.twitter.com/2/users/${userId}/following`,
            twitterAccountId,
        );
    }

    async isTweetLiked(
        tweetUrl: string,
        userId: string,
    ): Promise<boolean> {
        const tweetId = this.getTweetIdIdFromUrl(tweetUrl)
        return this.passCheck(
            `https://api.twitter.com/2/users/${userId}/liked_tweets`,
            tweetId,
        );
    }

    async isTweetRetweeted(
        tweetUrl: string,
        userId: string,
    ): Promise<boolean> {
        const tweetId = this.getTweetIdIdFromUrl(tweetUrl)
        return this.passCheck(
            `https://api.twitter.com/2/tweets/${tweetId}/retweeted_by`,
            userId,
        );
    }

    async isExistingTwitterAcc(accountName: string): Promise<boolean> {
        const isIdFound = await this.getTwitterAccountIDByAccountName(accountName)
        return !!isIdFound
    }

    // PRIVATE
    private getTweetIdIdFromUrl = (tweetUrl: string): string => {
        if (!this.isValidTweetUrl(tweetUrl)) {
            return ''
        }
        return tweetUrl.split('/').pop().split('?')[0] || ''
    }

    private isValidTweetUrl = (tweetUrl: string): boolean => {
        return /^https:\/\/twitter\.com\/@?[A-Za-z0-9_]{1,15}\/status\/[\d]{19}[?]?.*$/gm.test(tweetUrl)
    }

    private async getTwitterAccountIDByAccountName(accountName: string): Promise<string> {
        try {
            let name = accountName
            if (name.startsWith('@')) {
                name = name.substring(1)
            }
            const { data } = await axios.get(`https://api.twitter.com/2/users/by/username/${name}`, {
                headers: { Authorization: process.env.App_Twitter_Bearer_Token },
            });
            return data.data?.id
        } catch (error) {
            console.error(error.response?.statusText || error.message)
            if (error.response?.status === 401) {
                throw new UnauthorizedException(error.response?.statusText || error.message)
            } else {
                throw new Error(error.message)
            }
        }
    }

    private async passCheck(url: string, target: string): Promise<boolean> {
        let arr = [];

        let res: any;
        let nextToken: any;

        try {
            do {
                const params = { max_results: 100 };
                if (nextToken) {
                    params['pagination_token'] = nextToken;
                }

                res = await axios.get(url, {
                    headers: { Authorization: process.env.App_Twitter_Bearer_Token },
                    params,
                });

                if (res.data.meta.result_count === 0 || !res.data.data) {
                    break;
                }

                const data = res.data.data.map((tweet: any) => tweet.id);
                arr = arr.concat(data);
                nextToken = res.data.meta.next_token;
            } while (nextToken);

            return arr.includes(target);

        } catch (error) {
            if (error.response?.status === 429) {
                throw new HttpException(error.response?.statusText, error.response?.status)
            }
            console.error(error.response?.statusText || error.message)
            return false
        }
    }
}
