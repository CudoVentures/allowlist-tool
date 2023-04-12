import { StdSignature } from 'cudosjs'
import { createSlice } from '@reduxjs/toolkit'
import { DISCORD_SERVER_ROLES } from '../../../../common/interfaces'

export interface RequiredAllowlistData {
    name: string;
    url: string;
    cosmos_chain_id: string;
    end_date: any;
    end_time: any;
    end_period: Date;
    image: Blob;
    banner_image: Blob;
    require_email: boolean;
    description: string;
    checkedFields: Record<string, boolean>;
}

export interface OptionalAllowlistData {
    id: number,
    editMode?: boolean,
    tweet_to_like?: string | undefined
    tweet_to_retweet?: string | undefined
    twitter_account_to_follow?: string | undefined
    website?: string | undefined;
    discord_url?: string | undefined;
    twitter_account?: string | undefined;
    tweet?: string | undefined;
    discord_server?: string | undefined;
    server_role?: string | undefined;
}

export type CollectedData = RequiredAllowlistData & OptionalAllowlistData

export interface FetchedAllowlist extends Omit<CollectedData, 'checkedFields' | 'end_time' | 'end_date' | 'end_period' | 'discord_server'> {
    admin: string;
    users: string[];
    end_date: Date;
    discord_invite_link?: string;
    discord_server_name?: string;
    isExpired?: boolean;
}

export interface AllowlistCreationData extends CollectedData {
    signature: StdSignature;
    connectedAddress: string;
    message: string;
    sequence: number;
    account_number: number;
    chain_id: string;
}

export const initialState: CollectedData = {
    id: undefined,
    editMode: false,
    name: '',
    url: '',
    cosmos_chain_id: '',
    end_date: undefined,
    end_time: undefined,
    end_period: undefined,
    image: undefined,
    banner_image: undefined,
    require_email: false,
    tweet_to_like: undefined,
    tweet_to_retweet: undefined,
    twitter_account_to_follow: undefined,
    website: undefined,
    discord_url: undefined,
    description: undefined,
    twitter_account: undefined,
    tweet: undefined,
    discord_server: undefined,
    server_role: DISCORD_SERVER_ROLES.default,
    checkedFields: {
        tweet_to_like: false,
        tweet_to_retweet: false,
        twitter_account_to_follow: false,
        tweet: false,
        twitter_account: false,
        discord_server: false,
        server_role: false
    }
}

export const userAllowlistObjectStateSlice = createSlice({
    name: 'allowlistObjectState',
    initialState,
    reducers: {
        updateAllowlistObject: (state, action) => {
            return { ...state, ...action.payload }
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateAllowlistObject } = userAllowlistObjectStateSlice.actions

export default userAllowlistObjectStateSlice.reducer
