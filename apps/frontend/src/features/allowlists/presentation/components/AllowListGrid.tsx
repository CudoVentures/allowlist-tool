import React from 'react'
import { Box, Typography } from '@mui/material'

import GridList from './GridList'
import { FetchedAllowlist } from '../../../../core/store/allowlist'
import { useIsScreenLessThan } from '../../../../core/utilities/CustomHooks/screenChecks'
import SearchBar from '../../../../core/presentation/components/SearchBar'

const AllowListGrid = ({
    data,
    text,
    withCreateBox,
    expanded,
    withSearchBar,
}: {
    data: FetchedAllowlist[],
    text: string,
    withCreateBox: boolean,
    expanded?: boolean
    withSearchBar?: boolean
}) => {

    const isUnder850px = useIsScreenLessThan('850px', 'width')

    return (
        <Box gap={3} sx={{ marginTop: isUnder850px ? 4 : 0, alignSelf: 'center', alignItems: 'flex-start', width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <Box gap={5} sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Typography fontWeight={700} variant='h6' alignSelf={'center'}>{text}</Typography>
                {withSearchBar ? <SearchBar /> : null}
            </Box>
            <GridList data={data} withCreateBox={withCreateBox} expanded={expanded} withSearchBar={withSearchBar} />
        </Box>
    )
}

export default AllowListGrid
