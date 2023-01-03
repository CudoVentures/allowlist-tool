import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import React from 'react'
import { useNavigate } from "react-router-dom";
import { Pagination, Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, Typography } from '@mui/material'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import { COLORS_DARK_THEME } from '../../../../core/theme/colors'
import { useIsScreenLessThan } from '../../../../core/utilities/CustomHooks/screenChecks'
import AppRoutes from '../../../app-routes/entities/AppRoutes'
import { getTimeFromNumber } from '../../../../core/utilities/ProjectUtils'

import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../../core/presentation/components/Layout/helpers'

import { generalStyles } from './styles'

const CreateBox = () => {

    const navigate = useNavigate()

    return (
        <Box
            onClick={() => navigate(AppRoutes.CREATE_ALLOWLIST)}
            gap={1}
            sx={generalStyles.createBox}
        >
            <Box sx={generalStyles.plusIconBackground} >
                <SvgComponent
                    type={LAYOUT_CONTENT_TEXT.PlusIcon}
                    style={{ width: '100%' }}
                />
            </Box>
            <Typography variant={'subtitle1'} fontWeight={700} >
                Create new allowlist
            </Typography>
            <Typography variant={'subtitle2'} color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20} >
                Click here to begin the process of making your allowlist
            </Typography>
        </Box>
    )
}

const CreatedAllowlistsPreview = ({ data }: { data: FetchedAllowlist[] }) => {

    const navigate = useNavigate()
    const isUnder850px = useIsScreenLessThan('850px', 'width')

    return (
        <Box gap={2} sx={{ display: 'flex', flexDirection: 'column', maxWidth: '3840px' }}>
            <Typography fontWeight={700} variant='h6'>Allowlists Created</Typography>
            <Box gap={isUnder850px ? 0 : 4} sx={{ alignItems: 'center', width: '100%', display: 'flex', flexDirection: isUnder850px ? 'column' : 'row' }}>
                <CreateBox />
                <Swiper
                    breakpoints={generalStyles.swiperBreakpoints}
                    modules={[Pagination, Mousewheel]}
                    mousewheel
                    spaceBetween={20}
                    style={generalStyles.swiper}
                    pagination={{ clickable: true }}
                >
                    {data.map((allowlist, idx) => {

                        let detailedTime: DetailedTime = {
                            days: 0,
                            hours: 0,
                            minutes: 0,
                            seconds: 0
                        }
                        let remainingTime = 0
                        const now = Date.now()
                        const end = new Date(allowlist.end_date).valueOf()

                        if (now < end) {
                            remainingTime = Math.abs(end - now)
                            detailedTime = getTimeFromNumber(remainingTime)
                        }

                        return (
                            <SwiperSlide key={idx} style={{ display: 'flex', justifyContent: 'center' }}>
                                <Box onClick={() => navigate(`/${allowlist.url}`)} sx={generalStyles.swiperDataBox}>
                                    <Box sx={generalStyles.imgHolder}>
                                        <img style={generalStyles.banner} src={allowlist.banner_image} />
                                        <img style={generalStyles.avatar} src={allowlist.image} />
                                    </Box>
                                    <Typography variant='h6' fontWeight={700}>
                                        {allowlist.name}
                                    </Typography>
                                    <Box display='flex'>
                                        <SvgComponent
                                            type={LAYOUT_CONTENT_TEXT.ClockIcon}
                                            style={generalStyles.clocIcon}
                                        />
                                        <Typography color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20} >
                                            {remainingTime ? `${detailedTime.days}d ${detailedTime.hours}h ${detailedTime.minutes}m` : 'Expired'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Box>
        </Box>
    )
}

export default CreatedAllowlistsPreview
