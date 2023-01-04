import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Pagination, Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, Typography } from '@mui/material'
import { TailSpin as TailSpinLoader } from 'svg-loaders-react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import { COLORS_DARK_THEME } from '../../../../core/theme/colors'
import { useIsScreenLessThan } from '../../../../core/utilities/CustomHooks/screenChecks'
import AppRoutes from '../../../app-routes/entities/AppRoutes'
import { getTimeFromNumber } from '../../../../core/utilities/ProjectUtils'
import { blobToBase64 } from '../components/helpers'
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

const SwiperCardContent = ({ allowlist }: { allowlist: FetchedAllowlist }) => {

    const navigate = useNavigate()
    const [banner, setBanner] = useState<string>('')
    const [avatar, setAvatar] = useState<string>('')
    const [remainingTime, setRemainingTime] = useState<number>(0)
    const [loadingImgs, setLoadingImgs] = useState<boolean>(true)
    const [detailedTime, setDetailedTime] = useState<DetailedTime>(null)

    const setBlobToB64Img = async (imgData: Blob, setter: React.Dispatch<React.SetStateAction<string>>) => {
        const b64ImgString = await blobToBase64(imgData)
        setter(b64ImgString as string)
    }

    useEffect(() => {
        const now = Date.now()
        const end = new Date(allowlist.end_date).valueOf()

        if (now < end) {
            const timeLeft = Math.abs(end - now)
            setDetailedTime(getTimeFromNumber(timeLeft))
            setRemainingTime(timeLeft)
        }
    }, [])

    useEffect(() => {
        if (allowlist.banner_image) {
            setBlobToB64Img(allowlist.banner_image, setBanner)
            return
        }
        setBanner('')
    }, [allowlist.banner_image])

    useEffect(() => {
        if (allowlist.image) {
            setBlobToB64Img(allowlist.image, setAvatar)
            return
        }
        setAvatar('')
    }, [allowlist.image])

    useEffect(() => {
        if (banner !== '' && avatar !== '') {
            setTimeout(() => {
                setLoadingImgs(false)
            }, 300)
        }
    }, [banner, avatar])

    return (
        <Box onClick={() => navigate(`/${allowlist.url}`)} sx={generalStyles.swiperDataBox}>
            {loadingImgs ? <TailSpinLoader /> :
                <Fragment>
                    <Box sx={generalStyles.imgHolder}>
                        <img style={generalStyles.banner} src={banner} />
                        <img style={generalStyles.avatar} src={avatar} />
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
                </Fragment>
            }
        </Box>
    )
}

const CreatedAllowlistsPreview = ({ data }: { data: FetchedAllowlist[] }) => {

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
                        return (
                            <SwiperSlide key={idx} style={{ display: 'flex', justifyContent: 'center' }}>
                                <SwiperCardContent allowlist={allowlist} />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </Box>
        </Box>
    )
}

export default CreatedAllowlistsPreview
