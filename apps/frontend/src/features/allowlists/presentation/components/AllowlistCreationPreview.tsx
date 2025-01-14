import React, { useEffect, useState } from 'react'
import { Box, Divider, Link, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import { BaseURL, getRegistrationCriteriaArray } from './helpers'
import { RootState } from '../../../../core/store'
import { COLORS } from '../../../../core/theme/colors'
import { getSeparateDateAndTime, setBlobToB64Img } from '../../../../core/utilities/ProjectUtils'

import { allowlistDetailsStyles, allowlistPreviewStyles } from './styles'

export const AllowlistCreationPreview = () => {

    const [bannerPreview, setBannerPreview] = useState<string>('')
    const [avatarPreview, setAvatarPreview] = useState<string>('')
    const allowlistState = useSelector((state: RootState) => state.allowlistState)
    const { connectedSocialMedia } = useSelector((state: RootState) => state.userState)
    const { date, time } = getSeparateDateAndTime(allowlistState.end_period)

    const DETAIL_FIELDS = [
        { title: 'Cosmos Chain', isDisabled: !allowlistState.cosmos_chain_id, subtitle: allowlistState.cosmos_chain_id },
        { title: 'Name', isDisabled: !allowlistState.name, subtitle: allowlistState.name },
        { title: 'Custom URL', isDisabled: !allowlistState.url, subtitle: allowlistState.url },
        { title: 'Description', isDisabled: !allowlistState.description, subtitle: allowlistState.description },
        {
            title: 'Website URL',
            isDisabled: !allowlistState.website,
            subtitle: <Link variant='inherit' target="_blank"
                href={allowlistState.website}
                rel="noreferrer"
                underline="none"
                color={COLORS.LIGHT_BLUE[90]}
            >
                {allowlistState.website}
            </Link>
        },
        {
            title: 'Twitter Account',
            isDisabled: !allowlistState.twitter_account,
            subtitle: <Link variant='inherit' target="_blank"
                href={`${BaseURL.twitter_acc}${allowlistState.twitter_account}`}
                rel="noreferrer"
                underline="none"
                color={COLORS.LIGHT_BLUE[90]}
            >
                {allowlistState.twitter_account?.startsWith('@') ? allowlistState.twitter_account : `@${allowlistState.twitter_account}`}
            </Link>
        },
        {
            title: 'Discord Server',
            isDisabled: !allowlistState.discord_url,
            subtitle: <Link variant='inherit' target="_blank"
                href={`${BaseURL.discord_server}${allowlistState.discord_url}`}
                rel="noreferrer"
                underline="none"
                color={COLORS.LIGHT_BLUE[90]}
            >
                {allowlistState.discord_url}
            </Link>
        },
        {
            title: 'Profile Image',
            isDisabled: !allowlistState.image,
            subtitle: <img src={avatarPreview} style={allowlistDetailsStyles.fileUploaderHolder} />
        },
        {
            title: 'Banner Image',
            isDisabled: !allowlistState.banner_image,
            subtitle: <img src={bannerPreview} style={allowlistDetailsStyles.bannerUploaderHolder} />
        },
        { title: 'Registration End Date', isDisabled: !date, subtitle: date },
        { title: 'Registration End Time', isDisabled: !time, subtitle: time }
    ]

    useEffect(() => {
        if (allowlistState.banner_image) {
            setBlobToB64Img(allowlistState.banner_image, setBannerPreview)
            return
        }
        setBannerPreview('')
    }, [allowlistState.banner_image])

    useEffect(() => {
        if (allowlistState.image) {
            setBlobToB64Img(allowlistState.image, setAvatarPreview)
            return
        }
        setAvatarPreview('')
    }, [allowlistState.image])

    return (
        <Box id='creationPreviewPage' width='100%'>
            <Box
                id='creationPreview'
                gap={4}
                sx={allowlistPreviewStyles.holder}
            >
                <Typography variant='h6' fontWeight={700}>
                    Details
                </Typography>
                {DETAIL_FIELDS.map((FIELD, idx) => {
                    return FIELD.isDisabled ? null : (
                        <Box key={idx}>
                            <Typography sx={allowlistPreviewStyles.title}>
                                {FIELD.title}
                            </Typography>
                            <Typography sx={allowlistPreviewStyles.subTitle} style={{ whiteSpace: FIELD.title === 'Description' ? 'pre-wrap' : undefined }}>
                                {FIELD.subtitle}
                            </Typography>
                        </Box>
                    )
                })}
                <Divider sx={{ width: '100%' }} />
                <Typography variant='h6' fontWeight={700}>
                    Registration Criteria
                </Typography>
                {getRegistrationCriteriaArray(allowlistState, connectedSocialMedia).map((FIELD, idx) => {
                    return FIELD.isDisabled ? null : (
                        <Box key={idx}>
                            <Typography component={'div'} sx={allowlistPreviewStyles.title}>
                                {FIELD.icon}
                                {FIELD.title}
                            </Typography>
                            <Typography component={'div'} sx={allowlistPreviewStyles.subTitle}>
                                {FIELD.subtitle}
                            </Typography>
                        </Box>
                    )
                })}
                <Divider sx={{ width: '100%' }} />
            </Box>
        </Box>
    )
}
export default AllowlistCreationPreview
