import { useCallback } from "react";
import { useSelector } from "react-redux";

import { signNonceMsg } from "../../../features/wallets/helpers";
import { RootState } from "../../store";
import { CollectedData } from "../../store/allowlist";
import {
    CREATE_ALLOWLIST,
    GET_USER_DETAILS,
    JOIN_ALLOWLIST,
    UPDATE_ALLOWLIST
} from "../../api/calls";

const useManipulateAllowlist = () => {

    const { connectedAddress, connectedWallet } = useSelector((state: RootState) => state.userState)

    const joinAllowlist = useCallback(async (allowlistId: number, userEmail: string) => {

        const userDetails = await GET_USER_DETAILS();
        const data = {};
        if (userDetails.data.twitter) {
            data['twitter_access_token'] = userDetails.data.twitter.accessToken;
        }
        if (userDetails.data.discord) {
            data['discord_access_token'] = userDetails.data.discord.accessToken;
        }

        const message = JSON.stringify(data);
        const {
            signature,
            chainId: chain_id,
            sequence,
            accountNumber: account_number,
        } = await signNonceMsg(connectedAddress, connectedWallet, message);

        try {
            await JOIN_ALLOWLIST(allowlistId, {
                signature,
                connectedAddress,
                message,
                sequence,
                account_number,
                chain_id,
                userEmail,
            });
            return true

        } catch (ex) {
            console.error(ex);
            return false
        }
    }, [connectedWallet, connectedAddress])


    const updateAllowlist = useCallback(async (collectedData: CollectedData) => {

        const ID = collectedData.url
        const data = {
            name: collectedData.name,
            url: collectedData.url,
            description: collectedData.description,
            cosmos_chain_id: collectedData.cosmos_chain_id,
            website: collectedData.website,
            twitter_account: collectedData.twitter_account,
            discord_url: collectedData.discord_url,
            end_date: collectedData.end_period,
            twitter_account_to_follow: collectedData.twitter_account_to_follow,
            tweet_to_like: collectedData.checkedFields['tweet_to_like'] ? collectedData.tweet : '',
            tweet_to_retweet: collectedData.checkedFields['tweet_to_retweet'] ? collectedData.tweet : '',
            discord_invite_link: collectedData.discord_invite_link,
            server_role: collectedData.server_role,
            require_email: collectedData.require_email,
            image: collectedData.image,
            banner_image: collectedData.banner_image
        };

        try {
            // const userDetails = await GET_USER_DETAILS();
            // const messageObj = {};
            // if (collectedData.twitter_account || collectedData.tweet) {
            //     messageObj['twitter_access_token'] =
            //         userDetails.data.twitter_access_token;
            // }
            // if (collectedData.discord_server) {
            //     messageObj['discord_access_token'] =
            //         userDetails.data.discord_access_token;
            // }
            // for now don't sign anything specific
            const message = JSON.stringify({});
            const {
                signature,
                chainId: chain_id,
                sequence,
                accountNumber: account_number,
            } = await signNonceMsg(connectedAddress, connectedWallet, message);

            const reqData = {
                ...data,
                signature,
                connectedAddress,
                message,
                sequence,
                account_number,
                chain_id,
            };

            await UPDATE_ALLOWLIST(ID, reqData)
            return true

        } catch (ex) {
            console.error(ex);
            return false
        }
    }, [connectedWallet, connectedAddress])

    const createAllowlist = useCallback(async (collectedData: CollectedData): Promise<boolean> => {

        const data = {
            name: collectedData.name,
            url: collectedData.url,
            description: collectedData.description,
            cosmos_chain_id: collectedData.cosmos_chain_id,
            website: collectedData.website,
            twitter_account: collectedData.twitter_account,
            discord_url: collectedData.discord_url,
            end_date: collectedData.end_period,
            twitter_account_to_follow: collectedData.twitter_account_to_follow,
            tweet_to_like: collectedData.checkedFields['tweet_to_like'] ? collectedData.tweet : '',
            tweet_to_retweet: collectedData.checkedFields['tweet_to_retweet'] ? collectedData.tweet : '',
            discord_invite_link: collectedData.discord_invite_link,
            server_role: collectedData.server_role,
            require_email: collectedData.require_email,
            image: collectedData.image,
            banner_image: collectedData.banner_image
        };

        try {
            const message = JSON.stringify(data);
            const {
                signature,
                chainId: chain_id,
                sequence,
                accountNumber: account_number,
            } = await signNonceMsg(connectedAddress, connectedWallet, message);

            const reqData = {
                ...data,
                signature,
                connectedAddress,
                message,
                sequence,
                account_number,
                chain_id,
            };

            await CREATE_ALLOWLIST(reqData)
            return true

        } catch (ex) {
            console.error(ex);
            return false
        }
    }, [connectedWallet, connectedAddress])

    return { createAllowlist, updateAllowlist, joinAllowlist }
};

export default useManipulateAllowlist
