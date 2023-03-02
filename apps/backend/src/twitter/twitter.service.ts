import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TwitterService {
    constructor() {
        const twitterCheckUrlMapper = {

        }
    }

    //PUBLIC
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
        const isIdFound = this.getTwitterAccountIDByAccountName(accountName)
        return !!isIdFound
    }

    // PRIVATE
    private getTweetIdIdFromUrl = (tweetUrl: string): string => {
        if (!this.isValidTweetUrl(tweetUrl)) {
            return ''
        }
        return tweetUrl.split('/').pop()
    }

    private isValidTweetUrl = (tweetUrl: string): boolean => {
        return /^https:\/\/twitter\.com\/@?[A-Za-z0-9_]{1,15}\/status\/[\d]{19}[?]?.*$/gm.test(tweetUrl)
    }

    private async getTwitterAccountIDByAccountName(accountName: string): Promise<string> {
        let name = accountName
        if (name.startsWith('@')) {
            name = name.substring(1)
        }
        const { data } = await axios.get(`https://api.twitter.com/2/users/by/username/${name}`, {
            headers: { Authorization: process.env.App_Twitter_Bearer_Token },
        });
        return data.data?.id
    }

    private async passCheck(url: string, target: string): Promise<boolean> {
        let arr = [];

        let res: any;
        let next_token: any;

        do {
            const params = { max_results: 100 };
            if (next_token) {
                params['pagination_token'] = next_token;
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
            next_token = res.data.meta.next_token;
        } while (next_token);

        return arr.includes(target);
    }
}
