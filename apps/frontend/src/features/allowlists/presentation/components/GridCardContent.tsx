import React, { useEffect, useState } from "react"
import { Oval as OvalLoader } from 'svg-loaders-react'
import { Box, Typography } from "@mui/material"

import { COLORS } from "../../../../core/theme/colors"
import { FetchedAllowlist } from "../../../../core/store/allowlist"
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../../../../core/presentation/components/Layout/helpers"
import useNavigateToRoute from "../../../../core/utilities/CustomHooks/useNavigateToRoute"
import { getTimeFromNumber, setBlobToB64Img } from "../../../../core/utilities/ProjectUtils"

import { generalStyles } from "../pages/styles"

const GridCardContent = ({ allowlist, visible, width }: { allowlist: FetchedAllowlist, visible: boolean, width: number }) => {

    const navigateToRoute = useNavigateToRoute()
    const [banner, setBanner] = useState<string>(undefined)
    const [avatar, setAvatar] = useState<string>(undefined)
    const [loadingImgs, setLoadingImgs] = useState({ banner: false, avatar: false })
    const [sourceLoaded, setSourceLoaded] = useState<boolean>(false)
    const [detailedTime, setDetailedTime] = useState<DetailedTime>(null)
    const [isExpired, setIsExpired] = useState<boolean>(false)

    const contentLoaded = () => {
        return sourceLoaded && loadingImgs.banner && loadingImgs.avatar && (detailedTime || isExpired)
    }

    useEffect(() => {
        if (allowlist.banner_image) {
            setBlobToB64Img(allowlist.banner_image, setBanner)
        } else {
            setBanner('')
        }

        if (allowlist.image) {
            setBlobToB64Img(allowlist.image, setAvatar)
        } else {
            setAvatar('')
        }

        if (allowlist.end_date) {
            const now = Date.now()
            const end = new Date(allowlist.end_date).valueOf()

            if (now < end) {
                const timeLeft = Math.abs(end - now)
                setDetailedTime(getTimeFromNumber(timeLeft))
                setIsExpired(false)
            } else {
                setIsExpired(true)
            }
        }

    }, [allowlist.end_date, allowlist.image, allowlist.banner_image])


    useEffect(() => {
        if (banner && avatar && visible) {
            setTimeout(() => {
                setSourceLoaded(true)
            }, 500)
        } else {
            setSourceLoaded(false)
        }
    }, [avatar, banner, visible])

    return (
        <Box onClick={() => navigateToRoute(`/allowlist/${allowlist.url}`)} sx={{ ...generalStyles.gridDataBox, width: width, minWidth: width }}>
            {contentLoaded() ? null : <OvalLoader style={{ stroke: COLORS.LIGHT_BLUE[90] }} />}
            <Box sx={{ display: contentLoaded() ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Box sx={generalStyles.imgHolder}>
                    <img
                        onLoad={() => setLoadingImgs(prevState => ({ ...prevState, banner: true }))}
                        style={generalStyles.banner}
                        src={banner}
                    />
                    <img
                        onLoad={() => setLoadingImgs(prevState => ({ ...prevState, avatar: true }))}
                        style={generalStyles.avatar}
                        src={avatar}
                    />
                </Box>
                <Typography variant='h6' fontWeight={700}>
                    {allowlist.name}
                </Typography>
                <Box display='flex'>
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.ClockIcon}
                        style={generalStyles.clocIcon}
                    />
                    <Typography color={COLORS.STEEL_GRAY[20]} >
                        {detailedTime && !isExpired ? `${detailedTime.days}d ${detailedTime.hours}h ${detailedTime.minutes}m` : 'Expired'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default GridCardContent
