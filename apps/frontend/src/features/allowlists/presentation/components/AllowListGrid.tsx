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
    text?: string,
    withCreateBox: boolean,
    expanded?: boolean
    withSearchBar?: boolean
}) => {

    const isUnder850px = useIsScreenLessThan('850px', 'width')

    return (
        <Box gap={3} sx={{ marginTop: isUnder850px ? 4 : 0, alignSelf: 'center', alignItems: 'center', width: '100%', maxWidth: '1920px', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            {text ? <Typography fontWeight={700} variant='h6' alignSelf={'flex-start'}>{text}</Typography> : null}
            {withSearchBar ? <SearchBar /> : null}
            <GridList data={data} withCreateBox={withCreateBox} expanded={expanded} withSearchBar={withSearchBar} />
        </Box>
    )
}

export default AllowListGrid
