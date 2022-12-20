import { Coin, SUPPORTED_WALLET } from 'cudosjs'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CHAIN_DETAILS } from '../utilities/Constants'

export interface userState {
    connectedNetwork?: string,
    connectedAddress?: string
    accountName?: string
    balances: readonly Coin[],
    nativeBalance: string,
    connectedWallet?: SUPPORTED_WALLET | undefined
}

export const initialState: userState = {
    connectedNetwork: CHAIN_DETAILS.DEFAULT_NETWORK,
    connectedAddress: '',
    accountName: '',
    nativeBalance: '',
    balances: [],
    connectedWallet: undefined,
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