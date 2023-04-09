import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum SearchFilter {
    remainingTime = 'Remaining time',
    popularity = 'Popularity',
    name = 'Name'
}

export interface searchState {
    chainFilter?: string,
    searchTerms?: string,
    activeSearch?: boolean,
    appliedFilter?: SearchFilter,
    ascendingOrder?: boolean
}

export const initialState: searchState = {
    chainFilter: '',
    searchTerms: '',
    activeSearch: false,
    appliedFilter: undefined,
    ascendingOrder: true
}

export const searchStateSlice = createSlice({
    name: 'searchState',
    initialState,
    reducers: {
        updateSearchState: (state, action: PayloadAction<searchState>) => {
            return { ...state, ...action.payload }
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateSearchState } = searchStateSlice.actions

export default searchStateSlice.reducer
