import { Coin, SUPPORTED_WALLET } from 'cudosjs'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CHAIN_DETAILS } from '../utilities/Constants'

export enum SOCIAL_MEDIA {
    twitter = 'twitter',
    discord = 'discord'
}

export type CONNECTED_SOCIAL_MEDIA = {
    [key in SOCIAL_MEDIA]: string
}

export interface userState {
    connectedNetwork?: string,
    connectedAddress?: string
    accountName?: string
    balances?: readonly Coin[],
    nativeBalance?: string,
    connectedWallet?: SUPPORTED_WALLET | undefined,
    connectedSocialMedia?: CONNECTED_SOCIAL_MEDIA
}

export const initialState: userState = {
    connectedNetwork: CHAIN_DETAILS.DEFAULT_NETWORK,
    connectedAddress: '',
    accountName: '',
    nativeBalance: '',
    balances: [],
    connectedWallet: undefined,
    connectedSocialMedia: {
        [SOCIAL_MEDIA.twitter]: '',
        [SOCIAL_MEDIA.discord]: '',
    }
}

export const userStateSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<userState>) => {
            return { ...state, ...action.payload }
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser } = userStateSlice.actions

export default userStateSlice.reducer
