import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SocialMediaAction } from '../../features/allowlists/presentation/components/helpers'

export interface socialMediaActionsState {
    [SocialMediaAction.followTwitterAccount]?: boolean,
    [SocialMediaAction.likeTweet]?: boolean,
    [SocialMediaAction.retweetTweet]?: boolean,
    [SocialMediaAction.joinDiscordServer]?: boolean
}

export const initialState: socialMediaActionsState = {
    [SocialMediaAction.followTwitterAccount]: false,
    [SocialMediaAction.likeTweet]: false,
    [SocialMediaAction.retweetTweet]: false,
    [SocialMediaAction.joinDiscordServer]: false
}

export const socialMediaActionsStateSlice = createSlice({
    name: 'socialMediaActionsState',
    initialState,
    reducers: {
        updateSocialMediaActionsState: (state, action: PayloadAction<socialMediaActionsState>) => {
            return { ...state, ...action.payload }
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateSocialMediaActionsState } = socialMediaActionsStateSlice.actions

export default socialMediaActionsStateSlice.reducer
