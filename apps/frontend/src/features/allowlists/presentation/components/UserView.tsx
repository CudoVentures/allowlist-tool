import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Divider, List, ListItem, Input, Button } from '@mui/material'
import { TailSpin as TailSpinLoader } from 'svg-loaders-react'

import { SvgComponent, LAYOUT_CONTENT_TEXT } from '../../../../core/presentation/components/Layout/helpers'
import { COLORS_DARK_THEME } from '../../../../core/theme/colors'
import { RootState } from '../../../../core/store'
import useManipulateAllowlist from '../../../../core/utilities/CustomHooks/useManipulateAllowlist'
import { FetchedAllowlist } from '../../../../core/store/allowlist'
import { SocialMediaBoxes } from './helpers'
import { updateModalState } from '../../../../core/store/modals'
import { isValidEmail } from '../../validation'
import { DISCORD_API_MSGS } from '../../../../../../common/interfaces'
import { IS_FOLLOWING_TWITTER_ACCOUNT, IS_JOINED_DISCORD_SERVER, IS_USER_JOINED_ALLOWLIST } from '../../../../core/api/calls'
import Dialog from '../../../../core/presentation/components/Dialog'
import { delay } from '../../../../core/utilities/ProjectUtils'

import { allowListStyles, generalStyles, allowlistPreviewStyles } from './styles'

const UserView = ({ props }: { props: FetchedAllowlist }) => {

    const dispatch = useDispatch()
    const { joinAllowlist } = useManipulateAllowlist()
    const { connectedAddress, connectedSocialMedia } = useSelector((state: RootState) => state.userState)
    const [userEmail, setUserEmail] = useState<string>('')
    const [checkBoxes, setCheckBoxes] = useState<Record<string, boolean>>({})
    const [loading, setLoading] = useState<boolean>(true)
    const [isUserJoined, setisUserJoined] = useState<boolean>(false)

    const isDiscordRequired = !!props.server_role && !!props.discord_invite_link && !!props.discord_server_name
    const isTwitterRequired = !!props.twitter_account_to_follow || !!props.tweet || !!props.tweet_to_like || !!props.tweet_to_retweet

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>, isOn: boolean) => {
        setCheckBoxes({
            ...checkBoxes,
            [e.target.value]: isOn
        })
    }

    const handleUserIsJoined = async (allowlistID: number) => {
        const result = await IS_USER_JOINED_ALLOWLIST(allowlistID)
        setisUserJoined(result && !!connectedAddress)
        await delay(500)
        setLoading(false)
    }

    const signUp = async () => {

        dispatch(updateModalState({ pageTransitionLoading: true }))
        let modalObject = {}

        try {
            //HANDLING DISCORD REQUIREMENTS
            if (isDiscordRequired) {
                if (!connectedSocialMedia.discord.id) {
                    modalObject = {
                        pageTransitionLoading: false,
                        failure: true,
                        message: 'Please connect Discord account'
                    }
                    return
                }

                //Server to join
                if (!!props.discord_invite_link) {
                    const isJoinedServer = await IS_JOINED_DISCORD_SERVER(props.discord_invite_link, connectedSocialMedia.discord.id)
                    if (!isJoinedServer) {
                        modalObject = {
                            pageTransitionLoading: false,
                            failure: true,
                            message: `Discord server ${props.discord_server_name} not joined`
                        }
                        return
                    }
                }

            }

            //HANDLING TWITTER REQUIREMENTS
            if (isTwitterRequired) {
                if (!connectedSocialMedia.twitter.id) {
                    modalObject = {
                        pageTransitionLoading: false,
                        failure: true,
                        message: 'Please connect Twitter account'
                    }
                    return
                }

                //If page to follow
                if (!!props.twitter_account_to_follow) {
                    const isFollowingAcc = await IS_FOLLOWING_TWITTER_ACCOUNT(props.twitter_account_to_follow, connectedSocialMedia.twitter.id)
                    if (!isFollowingAcc) {
                        modalObject = {
                            pageTransitionLoading: false,
                            failure: true,
                            message: `Twitter page ${props.twitter_account_to_follow} not followed`
                        }
                        return
                    }
                }
            }

            //IF EVERYTHING LOOK GOOD
            const { success, message } = await joinAllowlist(props.id, userEmail)
            if (!success) { throw new Error(message) }
            modalObject = {
                pageTransitionLoading: false,
                success: true
            }

        } catch (error) {
            modalObject = {
                pageTransitionLoading: false,
                failure: true,
                message: error.message
            }
        } finally {
            dispatch(updateModalState(modalObject))
        }
    }

    const isSignUpDisabled = (): boolean => {
        if (!connectedAddress) {
            return true
        }

        //IsTwitterLogInRequired
        if ((props.twitter_account_to_follow || props.tweet) && (!connectedSocialMedia.twitter.userName || !connectedSocialMedia.twitter.id)) {
            return true
        }

        //IsDiscordLogInRequired
        if (isDiscordRequired && (
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

    useEffect(() => {
        handleUserIsJoined(props.id)
    }, [props.id, connectedAddress])

    return loading ? <TailSpinLoader /> : (
        <Fragment>
            <Dialog />
            <Box sx={allowListStyles.title} style={{ flexDirection: isUserJoined ? 'column-reverse' : 'column' }}>
                <Typography variant='h6' fontWeight={700}>
                    {isUserJoined ? 'Registered' : `Register for ${props.name}`}
                </Typography>
                <Typography variant='subtitle1' color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}>
                    {isUserJoined ? 'Status:' : "Complete the following to register"}
                </Typography>
            </Box>
            <Divider sx={{ width: '100%' }} />
            <SocialMediaBoxes handleCheckbox={handleCheckbox} props={props} isUserJoinedAllowlist={isUserJoined} />
            {isUserJoined || !props.require_email ? null :
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
            {isUserJoined ? null :
                <Button
                    disabled={isSignUpDisabled()}
                    variant="contained"
                    sx={{ height: '56px', width: '100%' }}
                    onClick={signUp}
                >
                    SignUp
                </Button>}
        </Fragment>
    )
}

export default UserView
