import React from 'react'
import { Box, Divider, Link, List, ListItem, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

import { RootState } from '../../../../core/store'
import { COLORS_DARK_THEME } from '../../../../core/theme/colors'

import { allowlistDetailsStyles, allowlistPreviewStyles } from './styles'


export const AllowlistCreationPereview = () => {

    const allowlistState = useSelector((state: RootState) => state.allowlistState)

    const chosenPeriod = allowlistState.end_period?.toString().split(' ') || []
    const period = {
        date: chosenPeriod.slice(0, 4).join(' '),
        time: chosenPeriod.slice(4).join(' '),
    }

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
        { title: 'Registration End Date', isDisabled: !period.date, subtitle: period.date },
        { title: 'Registration End Time', isDisabled: !period.time, subtitle: period.time }
    ]

    const REGISTRATION_CRITERIA = [
        {
            title: 'Twitter Page to Follow',
            isDisabled: !allowlistState.twitter_account_to_follow,
            subtitle: <Link variant='inherit' target="_blank"
                href={allowlistState.twitter_account_to_follow}
                rel="noreferrer"
                underline="none"
                color={COLORS_DARK_THEME.PRIMARY_BLUE}
            >
                @TwitterPage
            </Link>
        },
        {
            title: 'Interact With Twitter Post',
            isDisabled: !allowlistState.tweet,
            subtitle: <Box>
                <Link variant='inherit' target="_blank"
                    href={allowlistState.tweet}
                    rel="noreferrer"
                    underline="none"
                    color={COLORS_DARK_THEME.PRIMARY_BLUE}
                >
                    {allowlistState.tweet}
                </Link>
                <List sx={allowlistPreviewStyles.list}>
                    {allowlistState.checkedFields['tweet-to-like'] ?
                        <ListItem sx={allowlistPreviewStyles.listItem}>
                            Like Post
                        </ListItem> : null}
                    {allowlistState.checkedFields['tweet-to-retweet'] ?
                        <ListItem sx={allowlistPreviewStyles.listItem}>
                            Retweet Post
                        </ListItem> : null}
                </List>
            </Box>
        },
        {
            title: 'Discord Group to Join',
            isDisabled: !allowlistState.discord_server,
            subtitle: <Link variant='inherit' target="_blank"
                href={allowlistState.discord_server}
                rel="noreferrer"
                underline="none"
                color={COLORS_DARK_THEME.PRIMARY_BLUE}
            >
                Invite Link
            </Link>
        },
        { title: 'Discord Group Roles', isDisabled: !allowlistState.server_role, subtitle: allowlistState.server_role },
        { title: 'Users to Provide Email', isDisabled: false, subtitle: allowlistState.require_email ? 'YES' : 'NO' },
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
                {REGISTRATION_CRITERIA.map((FIELD, idx) => {
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
            </Box>
        </Box>
    )
}
export default AllowlistCreationPereview
