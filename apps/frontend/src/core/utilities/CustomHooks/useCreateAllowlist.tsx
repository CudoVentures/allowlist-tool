import { useCallback } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

import { signNonceMsg } from "../../../features/wallets/helpers";
import { RootState } from "../../store";
import { AllowlistCreationData, CollectedData, RequiredAllowlistData } from "../../store/allowlist";
import { Dataset } from "@mui/icons-material";

const useCreateAllowlist = () => {

    const { connectedAddress, connectedWallet } = useSelector((state: RootState) => state.userState)

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
            tweet_to_like: collectedData.checkedFields['tweet-to-like'] ? collectedData.tweet : '',
            tweet_to_retweet: collectedData.checkedFields['tweet-to-retweet'] ? collectedData.tweet : '',
            discord_invite_link: collectedData.discord_invite_link,
            server_role: collectedData.server_role,
            require_email: collectedData.require_email,
            image: collectedData.image,
            banner_image: collectedData.banner_image
        };

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

        try {
            await axios.post(`/api/v1/allowlist`, reqData);
            return true

        } catch (ex) {
            console.error(ex);
            return false
        }
    }, [connectedWallet, connectedAddress])

    return createAllowlist
};

export default useCreateAllowlist
