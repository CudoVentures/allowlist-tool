import { useCallback } from "react";
import { useSelector } from "react-redux";

import { signArbitrary } from "../../../features/wallets/helpers";
import { RootState } from "../../store";
import { CollectedData } from "../../store/allowlist";
import { SOCIAL_MEDIA } from "../../../../../common/interfaces";
import useSocialMedia from "./useSocialMedia";
import {
    CREATE_ALLOWLIST,
    GET_USER_DETAILS,
    JOIN_ALLOWLIST,
    UPDATE_ALLOWLIST
} from "../../api/calls";

const useManipulateAllowlist = () => {

    const { connectedAddress, connectedWallet, chosenChainId } = useSelector((state: RootState) => state.userState)
    const { disconnectSocialMedia } = useSocialMedia()

    const joinAllowlist = useCallback(async (allowlistId: number, userEmail: string, requiredSocialMedia: { [key in SOCIAL_MEDIA]: boolean }): Promise<{ success: boolean, message: string }> => {

        const userDetails = await GET_USER_DETAILS();
        const data = {};

        if (requiredSocialMedia[SOCIAL_MEDIA.twitter]) {
            if (!userDetails.data.twitter?.accessToken) {
                await disconnectSocialMedia(SOCIAL_MEDIA.twitter)
                throw new Error('Your Twitter session expired. Please connect')
            } else {
                data['twitter_access_token'] = userDetails.data.twitter.accessToken;
            }
        }

        if (requiredSocialMedia[SOCIAL_MEDIA.discord]) {
            if (!userDetails.data.discord?.accessToken) {
                await disconnectSocialMedia(SOCIAL_MEDIA.discord)
                throw new Error('Your Discord session expired. Please connect')
            } else {
                data['discord_access_token'] = userDetails.data.discord.accessToken;
            }
        }

        const message = JSON.stringify(data);
        const { signature } = await signArbitrary(chosenChainId, connectedWallet, connectedAddress, message)

        try {
            await JOIN_ALLOWLIST(allowlistId, {
                signature,
                connectedAddress,
                message,
                userEmail,
            });
            return { success: true, message: '' }

        } catch (ex) {
            console.error(ex);
            return { success: false, message: ex.response?.data.message || ex.message }
        }
    }, [connectedWallet, connectedAddress])


    const updateAllowlist = useCallback(async (collectedData: CollectedData): Promise<{ success: boolean, message: string }> => {

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
            discord_invite_link: collectedData.discord_server,
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
            const message = `Updating ${data.name} Allowlist`
            const { signature } = await signArbitrary(collectedData.cosmos_chain_id, connectedWallet, connectedAddress, message)

            const reqData = {
                ...data,
                signature,
                connectedAddress,
                message,
            };
            await UPDATE_ALLOWLIST(collectedData.id, reqData)
            return { success: true, message: '' }

        } catch (ex) {
            console.error(ex);
            return { success: false, message: ex.response?.data?.message || ex.message || "Something went wrong" }
        }
    }, [connectedWallet, connectedAddress])

    const createAllowlist = useCallback(async (collectedData: CollectedData): Promise<{ success: boolean, message: string }> => {

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
            discord_invite_link: collectedData.discord_server,
            server_role: collectedData.server_role,
            require_email: collectedData.require_email,
            image: collectedData.image,
            banner_image: collectedData.banner_image
        };

        try {
            const message = JSON.stringify(data);
            const { signature } = await signArbitrary(collectedData.cosmos_chain_id, connectedWallet, connectedAddress, message)

            const reqData = {
                ...data,
                signature,
                connectedAddress,
                message
            };

            await CREATE_ALLOWLIST(reqData)
            return { success: true, message: '' }

        } catch (ex) {
            console.error(ex);
            return { success: false, message: ex.response?.data?.message || ex.message || "Something went wrong" }
        }
    }, [connectedWallet, connectedAddress])

    return { createAllowlist, updateAllowlist, joinAllowlist }
};

export default useManipulateAllowlist
