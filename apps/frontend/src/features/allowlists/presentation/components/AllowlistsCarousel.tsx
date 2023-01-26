import React from 'react'
import { Box, Typography } from '@mui/material'

import SwiperList from './Swiper'
import { FetchedAllowlist } from '../../../../core/store/allowlist'
import { useIsScreenLessThan } from '../../../../core/utilities/CustomHooks/screenChecks'

const AllowListCarousel = ({
    data,
    text,
    withCreateBox,
}: {
    data: FetchedAllowlist[],
    text: string,
    withCreateBox: boolean
}) => {

    const isUnder850px = useIsScreenLessThan('850px', 'width')

    return (
        <Box gap={2} sx={{ display: 'flex', flexDirection: 'column', maxWidth: '3840px' }}>
            <Typography fontWeight={700} variant='h6'>{text}</Typography>
            <Box gap={isUnder850px ? 0 : 4} sx={{ alignItems: 'center', width: '100%', display: 'flex', flexDirection: isUnder850px ? 'column' : 'row' }}>
                <SwiperList data={data} withCreateBox={withCreateBox} />
            </Box>
        </Box>
    )
}

export default AllowListCarousel
