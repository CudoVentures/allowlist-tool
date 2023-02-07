import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Divider, List, ListItem, Input, Button } from '@mui/material'

import { SvgComponent, LAYOUT_CONTENT_TEXT } from '../../../../core/presentation/components/Layout/helpers'
import { COLORS_DARK_THEME } from '../../../../core/theme/colors'
import { RootState } from '../../../../core/store'
import useManipulateAllowlist from '../../../../core/utilities/CustomHooks/useManipulateAllowlist'
import { FetchedAllowlist } from '../../../../core/store/allowlist'
import { SocialMediaBoxes } from './helpers'
import { updateModalState } from '../../../../core/store/modals'
import { isValidEmail } from '../../validation'
import { DISCORD_API_MSGS } from '../../../../../../common/interfaces'

import { allowListStyles, generalStyles, allowlistPreviewStyles } from './styles'

const UserView = ({ props }: { props: FetchedAllowlist }) => {

    const dispatch = useDispatch()
    const { joinAllowlist } = useManipulateAllowlist()
    const { connectedAddress, connectedSocialMedia } = useSelector((state: RootState) => state.userState)
    const [userEmail, setUserEmail] = useState<string>('')
    const [checkBoxes, setCheckBoxes] = useState<Record<string, boolean>>({})

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, isOn: boolean) => {
        setCheckBoxes({
            ...checkBoxes,
            [e.target.value]: isOn
        })
    }

    const signUp = async () => {
        const { success, message } = await joinAllowlist(props.id, userEmail)
        if (success) {
            dispatch(updateModalState({ success: true }))
        } else {
            dispatch(updateModalState({ failure: true, message }))
        }
    };

    const isSignUpDisabled = (): boolean => {
        if (!connectedAddress) {
            return true
        }

        //IsTwitterLogInRequired
        if ((props.twitter_account_to_follow || props.tweet) && (!connectedSocialMedia.twitter.userName || !connectedSocialMedia.twitter.id)) {
            return true
        }

        //IsDiscordLogInRequired
        if (props.discord_server_name && (
            props.discord_server_name === DISCORD_API_MSGS.ExpiredOrUnknownInvite ||
            !connectedSocialMedia.discord.userName && !connectedSocialMedia.discord.id)
        ) {
            return true
        }

        //IsEmailRequired
        if (props.require_email && (!userEmail || !isValidEmail(userEmail))) {
            return true
        }

        return false
    }

    return (
        <Fragment>
            <Box sx={allowListStyles.title}>
                <Typography variant='h6' fontWeight={700}>
                    Register for Allowlist Name
                </Typography>
                <Typography variant='subtitle1' color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}>
                    Complete the following to register.
                </Typography>
            </Box>
            <Divider sx={{ width: '100%' }} />
            <SocialMediaBoxes handleCheckbox={handleCheckbox} props={props} />
            {!props.require_email ? null :
                <Fragment>
                    <Box id='userEmailInput'>
                        <Box>
                            <Typography display={'flex'} alignItems='center' fontWeight={600}>
                                <SvgComponent
                                    type={LAYOUT_CONTENT_TEXT.EnvelopIcon}
                                    style={generalStyles.titleIcons}
                                />
                                Provide your email address
                            </Typography>
                            <List sx={{ ...allowlistPreviewStyles.list, color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20 }}>
                                <ListItem sx={allowlistPreviewStyles.listItem}>
                                    The collection creator will send you updates via email
                                </ListItem>
                                <ListItem sx={allowlistPreviewStyles.listItem}>
                                    {`${props.website} will send you a confirmation by email upon successful completion of ${props.name} allowlist criteria`}
                                </ListItem>
                            </List>
                        </Box>
                        <Input placeholder='johndoe@mail.com' disableUnderline type='text'
                            sx={generalStyles.input}
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </Box>
                </Fragment>}
            <Button
                disabled={isSignUpDisabled()}
                variant="contained"
                sx={{ height: '56px', width: '100%' }}
                onClick={signUp}
            >
                SignUp
            </Button>
        </Fragment>
    )
}

export default UserView
