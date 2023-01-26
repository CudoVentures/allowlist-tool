import React, { Fragment, useEffect, useState } from "react"
import { TailSpin as TailSpinLoader } from 'svg-loaders-react'
import { Box, Typography } from "@mui/material"

import { COLORS_DARK_THEME } from "../../../../core/theme/colors"
import { FetchedAllowlist } from "../../../../core/store/allowlist"
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../../../../core/presentation/components/Layout/helpers"
import useNavigateToRoute from "../../../../core/utilities/CustomHooks/useNavigateToRoute"
import { getTimeFromNumber, setBlobToB64Img } from "../../../../core/utilities/ProjectUtils"

import { generalStyles } from "../pages/styles"

const SwiperCardContent = ({ allowlist }: { allowlist: FetchedAllowlist }) => {

    const navigateToRoute = useNavigateToRoute()
    const [banner, setBanner] = useState<string>('')
    const [avatar, setAvatar] = useState<string>('')
    const [remainingTime, setRemainingTime] = useState<number>(0)
    const [loadingImgs, setLoadingImgs] = useState<boolean>(true)
    const [detailedTime, setDetailedTime] = useState<DetailedTime>(null)

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
        <Box onClick={() => navigateToRoute(`/${allowlist.url}`)} sx={generalStyles.swiperDataBox}>
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

export default SwiperCardContent
