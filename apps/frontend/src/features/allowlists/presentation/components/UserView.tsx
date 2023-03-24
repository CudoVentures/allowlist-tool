import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Divider, Input, Button } from '@mui/material'
import { Oval as OvalLoader } from 'svg-loaders-react'

import { SvgComponent, LAYOUT_CONTENT_TEXT } from '../../../../core/presentation/components/Layout/helpers'
import { COLORS_DARK_THEME } from '../../../../core/theme/colors'
import { RootState } from '../../../../core/store'
import useManipulateAllowlist from '../../../../core/utilities/CustomHooks/useManipulateAllowlist'
import { FetchedAllowlist } from '../../../../core/store/allowlist'
import { SocialMediaBoxes } from './helpers'
import { updateModalState } from '../../../../core/store/modals'
import { isValidEmail } from '../../validation'
import { DISCORD_API_MSGS } from '../../../../../../common/interfaces'
import {
    IS_FOLLOWING_TWITTER_ACCOUNT,
    IS_JOINED_DISCORD_SERVER,
    IS_TWEET_LIKED,
    IS_TWEET_RETWEETED,
    IS_USER_JOINED_ALLOWLIST
} from '../../../../core/api/calls'
import Dialog from '../../../../core/presentation/components/Dialog'
import { delay } from '../../../../core/utilities/ProjectUtils'
import { updateSocialMediaActionsState } from '../../../../core/store/socialMediaActions'

import { allowListStyles, generalStyles } from './styles'

const UserView = ({ props }: { props: FetchedAllowlist }) => {

    const dispatch = useDispatch()
    const { joinAllowlist } = useManipulateAllowlist()
    const { connectedAddress, connectedSocialMedia } = useSelector((state: RootState) => state.userState)
    const { ongoingEligibilityCheck } = useSelector((state: RootState) => state.modalState)
    const [userEmail, setUserEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [isUserJoined, setisUserJoined] = useState<boolean>(false)
    const {
        followTwitterAccount,
        likeTweet,
        retweetTweet,
        joinDiscordServer
    } = useSelector((state: RootState) => state.socialMediaActionsState)

    const isDiscordRequired = !!props.server_role && !!props.discord_invite_link && !!props.discord_server_name
    const isTwitterRequired = !!props.twitter_account_to_follow || !!props.tweet || !!props.tweet_to_like || !!props.tweet_to_retweet

    const handleUserIsJoined = async (allowlistID: number) => {
        const result = await IS_USER_JOINED_ALLOWLIST(allowlistID)
        setisUserJoined(result && !!connectedAddress)
    }

    const checkEligibility = async (option: { withSignUp: boolean }) => {
        const withSignUp = option.withSignUp
        try {
            if (withSignUp) {
                dispatch(updateModalState({
                    pageTransitionLoading: true,
                    message: 'Signing You Up',
                    loadingSpinner: true
                }))
            } else {
                dispatch(updateModalState({
                    ongoingEligibilityCheck: true
                }))
            }

            //HANDLING DISCORD REQUIREMENTS
            if (isDiscordRequired && !!connectedSocialMedia.discord.id && !!props.discord_invite_link) {
                //If server to join
                const isJoinedServer = await IS_JOINED_DISCORD_SERVER(props.discord_invite_link, connectedSocialMedia.discord.id)
                dispatch(updateSocialMediaActionsState({ joinDiscordServer: isJoinedServer }))
                if (withSignUp && !isJoinedServer) {
                    throw new Error(`Discord server ${props.discord_server_name} not joined`)
                }
            }

            //HANDLING TWITTER REQUIREMENTS
            if (isTwitterRequired && !!connectedSocialMedia.twitter.id) {
                //If page to follow
                if (!!props.twitter_account_to_follow) {
                    const isFollowingAcc = await IS_FOLLOWING_TWITTER_ACCOUNT(connectedSocialMedia.twitter.id, props.twitter_account_to_follow)
                    dispatch(updateSocialMediaActionsState({ followTwitterAccount: isFollowingAcc }))
                    if (withSignUp && !isFollowingAcc) {
                        throw new Error(`Twitter page ${props.twitter_account_to_follow} not followed`)
                    }
                }
                //If tweet to like
                if (!!props.tweet_to_like) {
                    const isTweetLiked = await IS_TWEET_LIKED(connectedSocialMedia.twitter.id, props.tweet_to_like)
                    dispatch(updateSocialMediaActionsState({ likeTweet: isTweetLiked }))
                    if (withSignUp && !isTweetLiked) {
                        throw new Error(`Tweet not liked`)
                    }
                }
                //If tweet to retweet
                if (!!props.tweet_to_retweet) {
                    const isTweetRetweeted = await IS_TWEET_RETWEETED(connectedSocialMedia.twitter.id, props.tweet_to_retweet)
                    dispatch(updateSocialMediaActionsState({ retweetTweet: isTweetRetweeted }))
                    if (withSignUp && !isTweetRetweeted) {
                        throw new Error(`Tweet not retweeted`)
                    }
                }
            }
            //IF EVERYTHING LOOK GOOD
            if (withSignUp) {
                const { success, message } = await joinAllowlist(
                    props.id,
                    userEmail,
                    {
                        twitter: isTwitterRequired,
                        discord: isDiscordRequired
                    }
                )
                if (!success) {
                    throw new Error(message)
                }
                dispatch(updateModalState({
                    success: true,
                }))
            }

        } catch (error) {
            dispatch(updateModalState({
                failure: true,
                message: error.message
            }))

        } finally {
            dispatch(updateModalState({
                pageTransitionLoading: false,
                loadingSpinner: false,
                ongoingEligibilityCheck: false
            }))
        }
    }

    const isEligibilityBtnDisabled = (): boolean => {
        if (!connectedAddress) {
            return true
        }

        if (isTwitterRequired && (
            !connectedSocialMedia.twitter.userName ||
            !connectedSocialMedia.twitter.id)
        ) {
            return true
        }

        if (isDiscordRequired && (
            !connectedSocialMedia.discord.userName &&
            !connectedSocialMedia.discord.id)
        ) {
            return true
        }

        return false
    }

    const isCheckEligibilityDisabled = (): boolean => {
        //IsTwitterLogInRequired
        if (isTwitterRequired && (
            (!!props.twitter_account_to_follow && !followTwitterAccount) ||
            (!!props.tweet_to_like && !likeTweet) ||
            (!!props.tweet_to_retweet && !retweetTweet) ||
            !connectedSocialMedia.twitter.userName ||
            !connectedSocialMedia.twitter.id)
        ) {
            return true
        }
        //IsDiscordLogInRequired
        if (isDiscordRequired && (
            (!!props.discord_invite_link && !joinDiscordServer) ||
            props.discord_server_name === DISCORD_API_MSGS.ExpiredOrUnknownInvite ||
            (!connectedSocialMedia.discord.userName && !connectedSocialMedia.discord.id))
        ) {
            return true
        }

        return false
    }

    const isSignUpDisabled = (): boolean => {
        if (props.require_email && (!userEmail || !isValidEmail(userEmail))) {
            return true && !isCheckEligibilityDisabled()
        }
        return false
    }

    const handleComponentLoading = async () => {
        await handleUserIsJoined(props.id)
        await delay(500)
        if (!isUserJoined) {
            await checkEligibility({ withSignUp: false })
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!!props.id) {
            setLoading(true)
            handleComponentLoading()
        }
    }, [props.id, connectedAddress, connectedSocialMedia.discord.id, connectedSocialMedia.twitter.id])

    return loading ? <OvalLoader style={{ stroke: COLORS_DARK_THEME.PRIMARY_BLUE }} /> : (
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
            <SocialMediaBoxes
                props={props}
                isUserJoinedAllowlist={isUserJoined}
            />
            {isUserJoined || !props.require_email ? null :
                <Fragment>
                    <Box width={'100%'} id='userEmailInput'>
                        <Box>
                            <Typography display={'flex'} alignItems='center' fontWeight={600}>
                                <SvgComponent
                                    type={LAYOUT_CONTENT_TEXT.EnvelopIcon}
                                    style={generalStyles.titleIcons}
                                />
                                Provide your email address
                            </Typography>
                            {/* <List sx={{ ...allowlistPreviewStyles.list, color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20 }}>
                                <ListItem sx={allowlistPreviewStyles.listItem}>
                                    The collection creator will send you updates via email
                                </ListItem>
                            </List> */}
                        </Box>
                        <Input placeholder='johndoe@mail.com' disableUnderline type='text'
                            sx={generalStyles.input}
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                    </Box>
                </Fragment>}
            {isUserJoined ? null :
                isCheckEligibilityDisabled() ?
                    <Button
                        disabled={ongoingEligibilityCheck || isEligibilityBtnDisabled()}
                        variant="contained"
                        sx={{ height: '56px', width: '100%' }}
                        onClick={() => checkEligibility({ withSignUp: false })}
                    >
                        Check Eligibility
                    </Button>
                    :
                    <Button
                        disabled={ongoingEligibilityCheck || isSignUpDisabled()}
                        variant="contained"
                        sx={{ height: '56px', width: '100%' }}
                        onClick={() => checkEligibility({ withSignUp: true })}
                    >
                        Sign Up
                    </Button>}
        </Fragment>
    )
}

export default React.memo(UserView)
