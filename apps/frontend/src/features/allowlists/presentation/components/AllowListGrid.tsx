import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import GridList from './GridList'
import { FetchedAllowlist } from '../../../../core/store/allowlist'
import SearchBar from '../../../../core/presentation/components/SearchBar'
import { COLORS } from '../../../../core/theme/colors'
import { initialState, SearchFilter, updateSearchState } from '../../../../core/store/search'
import { RootState } from '../../../../core/store'

const AllowListGrid = ({
    data: defaultData,
    text,
    withCreateBox,
    withSearchBar,
    withCount
}: {
    data: FetchedAllowlist[],
    text: string,
    withCreateBox: boolean,
    withSearchBar?: boolean,
    withCount?: boolean
}) => {

    const dispatch = useDispatch()
    const [displayData, setDisplayData] = useState<FetchedAllowlist[]>([])
    const { searchTerms, appliedFilter, ascendingOrder, chainFilter } = useSelector((state: RootState) => state.searchState)

    const sanitizeString = (text: string): string => {
        return text.trim().toLowerCase()
    }

    const filterBySearchTerms = (allowlist: FetchedAllowlist): boolean => {
        const searchString = sanitizeString(searchTerms!)
        if (
            sanitizeString(allowlist.name!).includes(searchString) ||
            sanitizeString(allowlist.admin).includes(searchString)
        ) {
            return true
        }
        return false
    }

    const filterByChainFilter = (allowlist: FetchedAllowlist): boolean => {
        if (sanitizeString(allowlist.cosmos_chain_id!) === sanitizeString(chainFilter)) {
            return true
        }
        return false
    }

    useEffect(() => {
        let dataToDisplay = [...defaultData]
        if (withSearchBar) {
            try {
                if (!!chainFilter) {
                    dataToDisplay = [...dataToDisplay].filter(filterByChainFilter)
                }
                if (!!searchTerms) {
                    dataToDisplay = [...dataToDisplay].filter(filterBySearchTerms)
                }
                if (!!appliedFilter) {
                    if (appliedFilter === SearchFilter.name) {
                        dataToDisplay = [...dataToDisplay].sort((a, b) => {
                            if (ascendingOrder) {
                                return sanitizeString(a.name!).localeCompare(sanitizeString(b.name!))
                            } else {
                                return sanitizeString(b.name!).localeCompare(sanitizeString(a.name!))
                            }
                        })
                    } else
                        if (appliedFilter === SearchFilter.remainingTime) {
                            dataToDisplay = [...dataToDisplay].sort((a, b) => {
                                const date1 = new Date(a.end_date).valueOf()
                                const date2 = new Date(b.end_date).valueOf()
                                if (ascendingOrder) {
                                    return date2 - date1
                                } else {
                                    return date1 - date2
                                }
                            })
                        } else
                            if (appliedFilter === SearchFilter.popularity) {
                                dataToDisplay = [...dataToDisplay].sort((a, b) => {
                                    const followingUsers1 = a.users.length
                                    const followingUsers2 = b.users.length
                                    if (ascendingOrder) {
                                        return followingUsers2 - followingUsers1
                                    } else {
                                        return followingUsers1 - followingUsers2
                                    }
                                })
                            }
                }
            } catch (error) {
                console.error(error.message)
            }
        }

        setDisplayData(dataToDisplay)

    }, [withSearchBar, searchTerms, appliedFilter, ascendingOrder, chainFilter])

    useEffect(() => {
        if (!searchTerms) {
            dispatch(updateSearchState({ activeSearch: true }))
            setTimeout(() => {
                dispatch(updateSearchState({ activeSearch: false }))
            }, 300)
        }
    }, [searchTerms, appliedFilter, ascendingOrder])

    const cleanUp = () => {
        dispatch(updateSearchState(initialState))
    }

    useEffect(() => {
        cleanUp()
        return () => cleanUp()
        //eslint-disable-next-line
    }, [])

    return (
        <Box gap={3} sx={{ alignSelf: 'center', alignItems: 'flex-start', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Box gap={5} sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                <Box gap={1} display={'flex'} alignItems={"flex-end"} minWidth={'max-content'}>
                    <Typography fontWeight={700} variant='h5' alignSelf={'center'} color={COLORS.LIGHT_BLUE[10]}>{text}</Typography>
                    {withCount && (withCreateBox || !!displayData.length) ? <Typography
                        fontWeight={600}
                        variant='subtitle2'
                        paddingBottom={'3px'}
                        color={COLORS.STEEL_GRAY[50]}
                        minWidth={'max-content'}
                    >
                        {`${displayData.length} Allowlists`}
                    </Typography> : null}
                </Box>
                {withSearchBar ? <SearchBar displayDataLength={displayData.length} networks={defaultData.map((allowlist) => { return allowlist.cosmos_chain_id })} /> : null}
            </Box>
            <GridList
                data={displayData}
                withCreateBox={withCreateBox}
            />
        </Box>
    )
}

export default AllowListGrid
