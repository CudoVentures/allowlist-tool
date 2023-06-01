import React, { Fragment, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Box, Button, Checkbox, ClickAwayListener, Collapse, Divider, FormControlLabel, FormGroup, InputAdornment, List, ListItem, Paper, Tooltip, Typography } from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { RootState } from "../../../../core/store";
import { CollectedData, FetchedAllowlist } from "../../../../core/store/allowlist";
import { CONNECTED_SOCIAL_MEDIA, DISCORD_SERVER_ROLES, SOCIAL_MEDIA } from "../../../../../../common/interfaces";
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../../../../core/presentation/components/Layout/helpers";
import { COLORS } from "../../../../core/theme/colors";
import useSocialMedia from "../../../../core/utilities/CustomHooks/useSocialMedia";
import { getTimeFromNumber } from "../../../../core/utilities/ProjectUtils";
import { LinkBox } from "../../../../core/theme/helpers";
import { updateModalState } from "../../../../core/store/modals";
import { Oval as OvalLoader } from 'svg-loaders-react'

import { headerStyles } from "../../../../core/presentation/components/Layout/styles";
import { allowlistPreviewStyles, allowListStyles, menuStyles } from "./styles";

export enum SocialMediaAction {
    joinDiscordServer = 'joinDiscordServer',
    followTwitterAccount = 'followTwitterAccount',
    likeTweet = 'likeTweet',
    retweetTweet = 'retweetTweet'
}

export type SocialMediaUserActions = {
    [key in SocialMediaAction]: boolean
}

export enum FormFieldErrors {
    connectWalletToSetChainId = 'Connect your Wallet to set a Chain ID',
    description = 'Have to be between 20 and 500 characters',
    minimumFiveChars = 'Have to be minimum 5 characters',
    invalidCustomUrl = 'Invalid format. Have to be 5 to 20 letters with no special characters and spaces',
    url = 'Invalid URL format',
    twitterAcc = 'Invalid Twitter Account',
    discordServer = 'Invalid Discord Server',
    tweet = 'Invalid tweet format. Should be: https://twitter.com/{$TwitterAcc}/status/{$PostId} ',
    endPeriod = 'End period cannot be in the past'
}

export enum BaseURL {
    discord_server = 'https://discord.gg/',
    twitter_acc = 'https://twitter.com/'
}

export enum FormField {
    cosmos_chain_id = 'cosmos_chain_id',
    end_period = 'end_period',
    tweet = 'tweet',
    name = 'name',
    url = 'url',
    website = 'website',
    twitter_account = 'twitter_account',
    discord_server = 'discord_server',
    server_role = 'server_role',
    twitter_account_to_follow = 'twitter_account_to_follow',
    discord_url = 'discord_url',
    description = 'description'
}

export const FieldTooltips = {
    [FormField.cosmos_chain_id]: FormFieldErrors.connectWalletToSetChainId,
    [FormField.name]: FormFieldErrors.minimumFiveChars,
    [FormField.url]: FormFieldErrors.invalidCustomUrl,
    [FormField.website]: FormFieldErrors.url,
    [FormField.twitter_account]: FormFieldErrors.twitterAcc,
    [FormField.twitter_account_to_follow]: FormFieldErrors.twitterAcc,
    [FormField.description]: FormFieldErrors.description,
    [FormField.discord_url]: FormFieldErrors.discordServer,
    [FormField.discord_server]: FormFieldErrors.discordServer,
    [FormField.tweet]: FormFieldErrors.tweet,
    [FormField.end_period]: FormFieldErrors.endPeriod,
}

export const getStartAdornment = (text: string): JSX.Element => {
    return (
        <InputAdornment position="start">
            <Typography
                sx={{ marginRight: '-6px' }}
                fontWeight={600}
                variant='subtitle2'
                color={COLORS.STEEL_GRAY[50]}>
                {text}
            </Typography>
        </InputAdornment>
    )
}

export const acceptedImgTypes = ['png', 'jpeg', 'jpg', 'svg']

export const isBlob = (data: any) => {
    return data instanceof Blob
}

export const b64toBlob = async (base64: string) =>
    fetch(base64).then(res => res.blob())

export const blobToBase64 = async (file: Blob) => {
    // TODO: following check is a fix to have things running with Base64 dummy data from DB and due to be removed once we permanently start storing Blob format only in DB
    if (!isBlob(file)) {
        return file
    }
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.readAsDataURL(file);
    });
};

export const onChange = (e: any, stateFunc: React.Dispatch<React.SetStateAction<string>>) => {
    stateFunc(e.target.value);
};

export const SocialMediaButtons = ({ hamburger }: { hamburger?: boolean }) => {

    const { connectSocialMedia, disconnectSocialMedia } = useSocialMedia()
    const { connectedSocialMedia, connectedAddress } = useSelector((state: RootState) => state.userState)

    const StyledTypography = ({ type, media }: { type: LAYOUT_CONTENT_TEXT, media: SOCIAL_MEDIA }) => {
        const [openMenu, setOpenMenu] = useState<boolean>(false)
        const isDisconnected = !connectedSocialMedia[media].id
        const displayName = media.charAt(0).toUpperCase() + media.slice(1)
        return hamburger ?
            (
                <Box gap={2} sx={{ display: 'flex', position: 'relative', height: '48px', marginTop: '-10px' }}>
                    <Typography
                        fontWeight={700}
                        sx={{ minWidth: 'max-content', minHeight: 'max-content', cursor: isDisconnected ? 'pointer' : 'auto', display: 'flex', alignItems: 'center' }}
                        onMouseOver={() => isDisconnected ? null : setOpenMenu(true)}
                        onClick={() => isDisconnected ? connectSocialMedia(connectedAddress, media) : null}
                    >
                        <SvgComponent
                            type={type}
                            style={menuStyles.logoItem}
                        />
                        {isDisconnected ? `Connect ${hamburger ? displayName : ''}` :
                            `${connectedSocialMedia[media].userName}`}
                    </Typography>
                    {isDisconnected ? null :
                        <Paper id="dropDownDisconnectBtnHolder" elevation={1} sx={headerStyles.dropDownDisconnectBtnHolder}>
                            <Box gap={2} sx={{ ...headerStyles.dropDownItemHolder, cursor: 'pointer', justifyContent: "center" }}>
                                <Typography onClick={() => disconnectSocialMedia(media)}>
                                    {`Disconnect`}
                                </Typography>
                            </Box>
                        </Paper>}
                </Box>
            )
            :
            (
                <ClickAwayListener
                    onClickAway={() => setOpenMenu(false)}
                    children={<Box sx={{ display: 'flex', position: 'relative' }}>
                        <Typography
                            fontWeight={700}
                            sx={{ minWidth: 'max-content', minHeight: 'max-content', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            onMouseOver={() => isDisconnected ? null : setOpenMenu(true)}
                            onClick={() => isDisconnected ? connectSocialMedia(connectedAddress, media) : null}
                        >
                            <SvgComponent
                                type={type}
                                style={menuStyles.logoItem}
                            />
                            {isDisconnected ? `Connect` :
                                `${connectedSocialMedia[media].userName}`}
                            {isDisconnected ? null :
                                <SvgComponent
                                    type={LAYOUT_CONTENT_TEXT.ArrowIcon}
                                    style={{ marginLeft: '5px', color: COLORS.LIGHT_BLUE[90], transform: openMenu ? 'rotate(180deg)' : 'rotate(360deg)' }}
                                />}
                        </Typography>
                        <Collapse
                            orientation={'vertical'}
                            onMouseLeave={() => setOpenMenu(false)}
                            sx={headerStyles.SMcollapse}
                            in={!isDisconnected && (hamburger || openMenu)}
                        >
                            <Paper id="dropDownDisconnectBtnHolder" elevation={1} sx={headerStyles.dropDownDisconnectBtnHolder}>
                                <Box gap={2} sx={headerStyles.dropDownItemHolder}>
                                    <Typography onClick={() => disconnectSocialMedia(media)}>
                                        {`Disconnect`}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Collapse>
                    </Box>
                    }
                />
            )
    }

    return (
        <Box gap={3} display='flex' flexDirection={hamburger ? 'column' : 'row'}>
            <StyledTypography
                type={LAYOUT_CONTENT_TEXT.TwitterIcon}
                media={SOCIAL_MEDIA.twitter}
            />
            <StyledTypography
                type={LAYOUT_CONTENT_TEXT.DiscordIcon}
                media={SOCIAL_MEDIA.discord}
            />
        </Box >
    )
}

export const SocialMediaBoxes = ({
    props,
    isUserJoinedAllowlist
}: {
    props: FetchedAllowlist
    isUserJoinedAllowlist?: boolean
}) => {

    const dispatch = useDispatch()
    const { connectSocialMedia } = useSocialMedia()
    const { connectedSocialMedia, connectedAddress, chosenChainId } = useSelector((state: RootState) => state.userState)
    const { ongoingEligibilityCheck } = useSelector((state: RootState) => state.modalState)
    const {
        followTwitterAccount,
        likeTweet,
        retweetTweet,
        joinDiscordServer
    } = useSelector((state: RootState) => state.socialMediaActionsState)

    const isDiscordRequired = !!props.server_role && !!props.discord_invite_link
    const isTwitterRequired = !!props.tweet || !!props.tweet_to_like || !!props.tweet_to_retweet || !!props.twitter_account_to_follow
    const twitterActions = [props.tweet_to_like ? 'Like ' : null, props.tweet_to_retweet ? 'Retweet ' : null].filter((action) => action !== null)

    const getCheckedIcon = useCallback((actions: SocialMediaAction[]) => {
        if (isUserJoinedAllowlist) {
            return <CheckCircleIcon />
        }
        let valid = false
        actions.forEach((action) => {
            if (actions.length > 1) {
                //Handling Like & Retweet
                valid = likeTweet && retweetTweet
            } else {
                if (
                    (action === SocialMediaAction.followTwitterAccount && followTwitterAccount) ||
                    (action === SocialMediaAction.likeTweet && likeTweet) ||
                    (action === SocialMediaAction.retweetTweet && retweetTweet) ||
                    (action === SocialMediaAction.joinDiscordServer && joinDiscordServer)
                ) {
                    valid = true
                } else {
                    valid = false
                }
            }
        })

        return valid ?
            <CheckCircleIcon style={{ color: COLORS.LIGHT_BLUE[90] }} /> :
            <HighlightOffIcon style={{ color: COLORS.RED[60] }} />

    }, [isUserJoinedAllowlist, followTwitterAccount, likeTweet, retweetTweet, joinDiscordServer])

    const getCheckBox = (action: SocialMediaAction[]) => {
        if (ongoingEligibilityCheck) {
            return <OvalLoader style={{ width: '24px', height: '24px', margin: '9px', stroke: COLORS.LIGHT_BLUE[90] }} />
        }
        return <Checkbox
            value={action}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={getCheckedIcon(action)}
        />
    }

    return (
        <Fragment>
            {connectedAddress && props.cosmos_chain_id === chosenChainId ? null :
                <Fragment>
                    <Box id='connectWalletBox' sx={allowListStyles.socialBox}>
                        <Box sx={allowListStyles.socialBoxHeader}>
                            <Typography
                                gap={1}
                                variant='subtitle1'
                                display='flex'
                                alignItems='center'
                            >
                                <SvgComponent type={LAYOUT_CONTENT_TEXT.WalletLogo} style='default' />
                                {!connectedAddress ? "Connect Wallet" : `Connect ${props.cosmos_chain_id} account`}
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ height: '40px', width: '104px' }}
                                onClick={() => dispatch(updateModalState({ selectWallet: true }))}
                            >
                                Connect
                            </Button>
                        </Box>
                    </Box>
                    <Divider sx={{ width: '100%' }} />
                </Fragment>}
            {!isTwitterRequired ? null :
                <Box id='allowlistTwitterBox' sx={allowListStyles.socialBox}>
                    <Box sx={allowListStyles.socialBoxHeader}>
                        <Typography
                            gap={1}
                            variant='subtitle1'
                            display='flex'
                            alignItems='center'
                        >
                            <SvgComponent type={LAYOUT_CONTENT_TEXT.TwitterIcon} style='default' />
                            Twitter
                        </Typography>
                        {isUserJoinedAllowlist ? null : connectedSocialMedia.twitter.userName ?
                            <Box gap={1} sx={{ display: 'fex' }}>
                                <Typography variant='subtitle2' color={COLORS.STEEL_GRAY[20]}>
                                    Connected:
                                </Typography>
                                <Typography variant='subtitle2'>
                                    {connectedSocialMedia.twitter.userName}
                                </Typography>
                            </Box>
                            :
                            <Button
                                disabled={!connectedAddress || props.cosmos_chain_id !== chosenChainId}
                                variant="contained"
                                sx={{ height: '40px', width: '104px' }}
                                onClick={() => connectSocialMedia(connectedAddress, SOCIAL_MEDIA.twitter)}
                            >
                                Connect
                            </Button>}
                    </Box>
                    <FormGroup>
                        {!!props.twitter_account_to_follow ?
                            <FormControlLabel
                                sx={{ pointerEvents: 'none' }}
                                disabled={!isUserJoinedAllowlist && !connectedSocialMedia.twitter.userName}
                                checked={isUserJoinedAllowlist || !!connectedSocialMedia.twitter.userName}
                                control={getCheckBox([SocialMediaAction.followTwitterAccount])}
                                label={<Typography
                                    lineHeight='normal'
                                    variant='subtitle2'
                                    color={COLORS.STEEL_GRAY[20]}
                                >
                                    {`Follow `}
                                    <LinkBox link={`${BaseURL.twitter_acc}${props.twitter_account_to_follow}`} text={props.twitter_account_to_follow} />
                                </Typography>}
                            /> : null}
                        {twitterActions.length ?
                            <FormControlLabel
                                sx={{ pointerEvents: 'none' }}
                                disabled={!isUserJoinedAllowlist && !connectedSocialMedia.twitter.userName}
                                checked={isUserJoinedAllowlist || !!connectedSocialMedia.twitter.userName}
                                control={getCheckBox(twitterActions.map((action) => {
                                    if (action.trim() === 'Like') {
                                        return SocialMediaAction.likeTweet
                                    }
                                    if (action.trim() === 'Retweet') {
                                        return SocialMediaAction.retweetTweet
                                    }
                                }))}
                                label={<Typography
                                    lineHeight='normal'
                                    variant='subtitle2'
                                    color={COLORS.STEEL_GRAY[20]}
                                >
                                    {`${twitterActions.join('& ')}`}
                                    <LinkBox link={`${props.tweet || props.tweet_to_like || props.tweet_to_retweet}`} text={'@Tweet'} />
                                </Typography>}
                            /> : null}
                    </FormGroup>
                    <Divider sx={{ marginTop: '20px', width: '100%' }} />
                </Box>}
            {!isDiscordRequired ? null :
                <Box id='allowlistDiscordBox' sx={allowListStyles.socialBox}>
                    <Box sx={allowListStyles.socialBoxHeader}>
                        <Typography
                            gap={1}
                            variant='subtitle1'
                            display='flex'
                            alignItems='center'
                        >
                            <SvgComponent type={LAYOUT_CONTENT_TEXT.DiscordIcon} style='default' />
                            Discord
                        </Typography>
                        {isUserJoinedAllowlist ? null : connectedSocialMedia.discord.userName ?
                            <Box gap={1} sx={{ display: 'fex' }}>
                                <Typography variant='subtitle2' color={COLORS.STEEL_GRAY[20]}>
                                    Connected:
                                </Typography>
                                <Typography variant='subtitle2'>
                                    {connectedSocialMedia.discord.userName}
                                </Typography>
                            </Box>
                            :
                            <Button
                                disabled={!connectedAddress || props.cosmos_chain_id !== chosenChainId}
                                variant="contained"
                                sx={{ height: '40px', width: '104px' }}
                                onClick={() => connectSocialMedia(connectedAddress, SOCIAL_MEDIA.discord)}
                            >
                                Connect
                            </Button>}
                    </Box>
                    <FormControlLabel
                        sx={{ pointerEvents: 'none' }}
                        disabled={!isUserJoinedAllowlist && !connectedSocialMedia.discord.userName}
                        checked={isUserJoinedAllowlist || !!connectedSocialMedia.discord.userName}
                        control={getCheckBox([SocialMediaAction.joinDiscordServer])}
                        label={<Box gap={1} display='flex'>
                            <Typography
                                component={"div"}
                                lineHeight='normal'
                                variant='subtitle2'
                                color={COLORS.STEEL_GRAY[20]}
                            >
                                {`Join `}
                                <LinkBox link={`${BaseURL.discord_server}${props.discord_invite_link}`} text={props.discord_server_name} />
                                {` server with `}
                                <Typography
                                    component={"span"}
                                    color='text.primary'
                                    lineHeight='normal'
                                    variant='subtitle2'
                                >
                                    {`${props.server_role} `}
                                </Typography>
                                {`role`}
                            </Typography>
                        </Box>}
                    />
                    {isUserJoinedAllowlist ? null : <Divider sx={{ marginTop: '20px', width: '100%' }} />}
                </Box>}
        </Fragment>
    )
}

export const RemainingTimer = ({ time }: { time: number }): JSX.Element => {
    if (time === null) return

    const detailedTime = getTimeFromNumber(time)

    return (
        <Fragment>
            <Tooltip title={!time ? '' : `D/H/M/S - ${detailedTime.days}:${detailedTime.hours}:${detailedTime.minutes}:${detailedTime.seconds}`}>
                <Typography sx={{ cursor: 'pointer', position: 'absolute', top: 5, right: 20 }} variant="subtitle2" color='#7d88aa38'>
                    {!time ? 'expired' : 'remaining time'}
                </Typography>
            </Tooltip>
        </Fragment >
    )
}

export const getRegistrationCriteriaArray = (props: CollectedData | FetchedAllowlist, connectedSocialMedia: CONNECTED_SOCIAL_MEDIA): {
    icon: JSX.Element,
    title: string;
    isDisabled: boolean;
    subtitle: any;
}[] => {

    enum Interactions {
        Like,
        Retweet
    }

    const instanceOfCollectedData = (data: any): data is CollectedData => {
        return 'checkedFields' in data;
    }

    const isCollectedData = instanceOfCollectedData(props)

    const tweetInteraction = (type: Interactions): boolean => {
        if (type === Interactions.Like) {
            if (isCollectedData) {
                return props.checkedFields['tweet_to_like'] ? true : false
            }
            return props.tweet_to_like !== '' ? true : false
        }

        if (isCollectedData) {
            return props.checkedFields['tweet_to_retweet'] ? true : false
        }
        return props.tweet_to_retweet !== '' ? true : false
    }

    return [
        {
            icon: <SvgComponent type={LAYOUT_CONTENT_TEXT.TwitterIcon} style='default' />,
            title: 'Twitter Page to Follow',
            isDisabled: !props.twitter_account_to_follow,
            subtitle:
                <LinkBox
                    link={`${BaseURL.twitter_acc}${props.twitter_account_to_follow}`}
                    text={
                        isCollectedData ?
                            props.twitter_account_to_follow?.startsWith('@') ?
                                props.twitter_account_to_follow :
                                `@${props.twitter_account_to_follow}` :
                            props.twitter_account_to_follow
                    }
                />
        },
        {
            icon: <SvgComponent type={LAYOUT_CONTENT_TEXT.TwitterIcon} style='default' />,
            title: 'Interact With Twitter Post',
            isDisabled: isCollectedData ? !props.tweet : !props.tweet_to_like && !props.tweet_to_retweet,
            subtitle: <Box>
                <LinkBox
                    link={props.tweet || props.tweet_to_like || props.tweet_to_retweet}
                    text={'@Tweet'}
                />
                <List sx={allowlistPreviewStyles.list}>
                    {tweetInteraction(Interactions.Like) ?
                        <ListItem sx={allowlistPreviewStyles.listItem}>
                            Like Post
                        </ListItem> : null}
                    {tweetInteraction(Interactions.Retweet) ?
                        <ListItem sx={allowlistPreviewStyles.listItem}>
                            Retweet Post
                        </ListItem> : null}
                </List>
            </Box>
        },
        {
            icon: <SvgComponent type={LAYOUT_CONTENT_TEXT.DiscordIcon} style='default' />,
            title: 'Discord Server to Join',
            isDisabled: isCollectedData ? !props.discord_server : !props.discord_invite_link,
            subtitle: <LinkBox
                link={`${BaseURL.discord_server}${isCollectedData ? props.discord_server : props.discord_invite_link}`}
                text={isCollectedData ?
                    connectedSocialMedia.discord.guild.guildName || props.discord_server :
                    props.discord_server_name || props.discord_invite_link}
            />
        },
        {
            icon: <SvgComponent type={LAYOUT_CONTENT_TEXT.DiscordIcon} style='default' />,
            title: 'Discord Server Role',
            isDisabled: isCollectedData ? !props.discord_server || !props.server_role : !props.discord_invite_link || !props.server_role,
            subtitle: isCollectedData ? connectedSocialMedia.discord.guild.guildRoles[props.server_role] || DISCORD_SERVER_ROLES.default : props.server_role || DISCORD_SERVER_ROLES.default
        },
        {
            icon: <SvgComponent type={LAYOUT_CONTENT_TEXT.EnvelopIcon} style='default' />,
            title: 'Users to Provide Email',
            isDisabled: !props.require_email,
            subtitle: null
        },
    ]
}

export const isExpired = (time: Date) => {
    const now = Date.now()
    return now > new Date(time).valueOf()
}
