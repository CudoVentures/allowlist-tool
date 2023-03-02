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

    async isLikedTweet(
        tweetId: string,
        twitterId: string,
    ): Promise<boolean> {
        return this.passCheck(
            `https://api.twitter.com/2/users/${twitterId}/liked_tweets`,
            tweetId,
        );
    }

    async isTweetRetweeted(
        twitterUsername: string,
        tweetId: string,
    ): Promise<boolean> {
        return this.passCheck(
            `https://api.twitter.com/2/tweets/${tweetId}/retweeted_by`,
            twitterUsername,
        );
    }

    async isExistingTwitterAcc(accountName: string): Promise<boolean> {
        const isIdFound = this.getTwitterAccountIDByAccountName(accountName)
        return !!isIdFound
    }

    async getTwitterAccountIDByAccountName(accountName: string): Promise<string> {
        const { data } = await axios.get(`https://api.twitter.com/2/users/by/username/${accountName}`, {
            headers: { Authorization: process.env.App_Twitter_Bearer_Token },
        });
        return data.data?.id
    }

    // PRIVATE


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
