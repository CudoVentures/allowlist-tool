import { SUPPORTED_WALLET } from 'cudosjs'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CONNECTED_SOCIAL_MEDIA, emptySocialMedia, SOCIAL_MEDIA } from '../../../../common/interfaces'

export interface userState {
    userId?: string,
    chosenChainId?: string,
    connectedAddress?: string
    accountName?: string
    connectedWallet?: SUPPORTED_WALLET | undefined,
    connectedSocialMedia?: CONNECTED_SOCIAL_MEDIA
}

export const initialState: userState = {
    userId: '',
    chosenChainId: '',
    connectedAddress: '',
    accountName: '',
    connectedWallet: undefined,
    connectedSocialMedia: {
        [SOCIAL_MEDIA.twitter]: emptySocialMedia,
        [SOCIAL_MEDIA.discord]: emptySocialMedia,
    },
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
