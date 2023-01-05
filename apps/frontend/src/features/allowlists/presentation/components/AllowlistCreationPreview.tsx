import React from 'react'
import { Box, Divider, Link, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import { getRegistrationCriteriaArray } from './helpers'
import { RootState } from '../../../../core/store'
import { COLORS_DARK_THEME } from '../../../../core/theme/colors'
import { getSeparateDateAndTime } from '../../../../core/utilities/ProjectUtils'

import { allowlistDetailsStyles, allowlistPreviewStyles } from './styles'

export const AllowlistCreationPereview = () => {

    const allowlistState = useSelector((state: RootState) => state.allowlistState)
    const { date, time } = getSeparateDateAndTime(allowlistState.end_period)

    const DETAIL_FIELDS = [
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
                color={COLORS_DARK_THEME.PRIMARY_BLUE}
            >
                {allowlistState.website}
            </Link>
        },
        {
            title: 'Twitter Account',
            isDisabled: !allowlistState.twitter_account,
            subtitle: <Link variant='inherit' target="_blank"
                href={allowlistState.twitter_account}
                rel="noreferrer"
                underline="none"
                color={COLORS_DARK_THEME.PRIMARY_BLUE}
            >
                Twitter Account
            </Link>
        },
        {
            title: 'Discord URL',
            isDisabled: !allowlistState.discord_url,
            subtitle: <Link variant='inherit' target="_blank"
                href={allowlistState.discord_url}
                rel="noreferrer"
                underline="none"
                color={COLORS_DARK_THEME.PRIMARY_BLUE}
            >
                Discord URL
            </Link>
        },
        {
            title: 'Profile Image',
            isDisabled: !allowlistState.image,
            subtitle: <img src={allowlistState.image} style={allowlistDetailsStyles.fileUploaderHolder} />
        },
        {
            title: 'Banner Image',
            isDisabled: !allowlistState.banner_image,
            subtitle: <img src={allowlistState.banner_image} style={allowlistDetailsStyles.bannerUploaderHolder} />
        },
        { title: 'Registration End Date', isDisabled: !date, subtitle: date },
        { title: 'Registration End Time', isDisabled: !time, subtitle: time }
    ]

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
                            <Typography sx={allowlistPreviewStyles.subTitle}>
                                {FIELD.subtitle}
                            </Typography>
                        </Box>
                    )
                })}
                <Divider sx={{ width: '100%' }} />
                <Typography variant='h6' fontWeight={700}>
                    Registration Criteria
                </Typography>
                {getRegistrationCriteriaArray(allowlistState).map((FIELD, idx) => {
                    return FIELD.isDisabled ? null : (
                        <Box key={idx}>
                            <Typography sx={allowlistPreviewStyles.title}>
                                {FIELD.icon}
                                {FIELD.title}
                            </Typography>
                            <Typography sx={allowlistPreviewStyles.subTitle}>
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
export default AllowlistCreationPereview
