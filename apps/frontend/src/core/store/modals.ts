import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface modalState {
  selectWallet?: boolean
  success?: boolean
}

export const initialState: modalState = {
    selectWallet: false,
    success: false
}

export const modalStateSlice = createSlice({
    name: 'modalState',
    initialState,
    reducers: {
        updateModalState: (state, action: PayloadAction<modalState>) => {
            return { ...state, ...action.payload }
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateModalState } = modalStateSlice.actions

export default modalStateSlice.reducer
