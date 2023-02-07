import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Box, Button, Checkbox, ClickAwayListener, Collapse, Divider, FormControlLabel, FormGroup, InputAdornment, List, ListItem, Paper, Tooltip, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import { RootState } from "../../../../core/store";
import { CollectedData, FetchedAllowlist } from "../../../../core/store/allowlist";
import { CONNECTED_SOCIAL_MEDIA, SOCIAL_MEDIA } from "../../../../../../common/interfaces";
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../../../../core/presentation/components/Layout/helpers";
import { COLORS_DARK_THEME } from "../../../../core/theme/colors";
import useSocialMedia from "../../../../core/utilities/CustomHooks/useSocialMedia";
import { getTimeFromNumber } from "../../../../core/utilities/ProjectUtils";
import { LinkBox } from "../../../../core/theme/helpers";
import { updateModalState } from "../../../../core/store/modals";

import { headerStyles } from "../../../../core/presentation/components/Layout/styles";
import { allowlistPreviewStyles, allowListStyles, menuStyles } from "./styles";

export enum FormFieldErrors {
    description = 'Have to be between 20 and 100 characters',
    minimumFiveChars = 'Have to be minimum 5 characters',
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
    [FormField.name]: FormFieldErrors.minimumFiveChars,
    [FormField.url]: FormFieldErrors.minimumFiveChars,
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
                color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_50}>
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

export const SocialMediaButtons = () => {

    const { connectSocialMedia, disconnectSocialMedia } = useSocialMedia()
    const { connectedSocialMedia } = useSelector((state: RootState) => state.userState)

    const StyledTypography = ({ type, media }: { type: LAYOUT_CONTENT_TEXT, media: SOCIAL_MEDIA }) => {
        const [openMenu, setOpenMenu] = useState<boolean>(false)
        const isDisconnected = !connectedSocialMedia[media].id
        const displayName = media.charAt(0).toUpperCase() + media.slice(1)
        return (
            <ClickAwayListener
                onClickAway={() => setOpenMenu(false)}
                children={<Box sx={{ flexDirection: 'column', display: 'flex', position: 'relative' }}>
                    <Typography
                        fontWeight={700}
                        sx={{ minWidth: 'max-content', minHeight: 'max-content', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        onMouseOver={() => isDisconnected ? null : setOpenMenu(true)}
                        onClick={() => isDisconnected ? connectSocialMedia(media) : null}
                    >
                        <SvgComponent
                            type={type}
                            style={menuStyles.logoItem}
                        />
                        {isDisconnected ? `Connect ${displayName}` :
                            `${connectedSocialMedia[media].userName}`}
                        {isDisconnected ? null :
                            <SvgComponent
                                type={LAYOUT_CONTENT_TEXT.ArrowIcon}
                                style={{ marginLeft: '5px', color: COLORS_DARK_THEME.PRIMARY_BLUE, transform: openMenu ? 'rotate(180deg)' : 'rotate(360deg)' }}
                            />}
                    </Typography>
                    <Collapse
                        onMouseLeave={() => setOpenMenu(false)}
                        sx={headerStyles.SMcollapse}
                        in={openMenu}
                    >
                        <Paper elevation={1} sx={headerStyles.dropDownContentHolder}>
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
        <Box gap={3} display='flex'>
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
    handleCheckbox, props
}: {
    handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>, isOn: boolean) => void,
    props: FetchedAllowlist
}) => {

    const dispatch = useDispatch()
    const { connectSocialMedia } = useSocialMedia()
    const { connectedSocialMedia, connectedAddress } = useSelector((state: RootState) => state.userState)

    const isDiscordRequired = !!props.server_role && !!props.discord_invite_link
    const isTwitterRequired = !!props.tweet || !!props.tweet_to_like || !!props.tweet_to_retweet || !!props.twitter_account_to_follow
    const twitterActions = [props.tweet_to_like ? 'Like ' : null, props.tweet_to_retweet ? 'Retweet ' : null].filter((action) => action !== null)

    return (
        <Fragment>
            {connectedAddress ? null :
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
                                Connect Wallet
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
                        {connectedSocialMedia.twitter.userName ?
                            <Box gap={1} sx={{ display: 'fex' }}>
                                <Typography variant='subtitle2' color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}>
                                    Connected:
                                </Typography>
                                <Typography variant='subtitle2'>
                                    {connectedSocialMedia.twitter.userName}
                                </Typography>
                            </Box>
                            :
                            <Button
                                disabled={!connectedAddress}
                                variant="contained"
                                sx={{ height: '40px', width: '104px' }}
                                onClick={() => connectSocialMedia(SOCIAL_MEDIA.twitter)}
                            >
                                Connect
                            </Button>}
                    </Box>
                    <FormGroup>
                        <FormControlLabel
                            sx={{ pointerEvents: 'none' }}
                            disabled={!connectedSocialMedia.twitter.userName}
                            checked={!!connectedSocialMedia.twitter.userName}
                            control={<Checkbox
                                onChange={handleCheckbox}
                                value={`Follow ${props.twitter_account_to_follow}`}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<CheckCircleIcon />}
                            />}
                            label={<Typography
                                lineHeight='normal'
                                variant='subtitle2'
                                color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}
                            >
                                {`Follow `}
                                <LinkBox link={`${BaseURL.twitter_acc}${props.twitter_account_to_follow}`} text={props.twitter_account_to_follow} />
                            </Typography>}
                        />
                        {twitterActions.length ?
                            <FormControlLabel
                                sx={{ pointerEvents: 'none' }}
                                disabled={!connectedSocialMedia.twitter.userName}
                                checked={!!connectedSocialMedia.twitter.userName}
                                control={<Checkbox
                                    onChange={handleCheckbox}
                                    value={`Like & retweet ${props.name}'s tweet`}
                                    icon={<RadioButtonUncheckedIcon />}
                                    checkedIcon={<CheckCircleIcon />}
                                />}
                                label={<Typography
                                    lineHeight='normal'
                                    variant='subtitle2'
                                    color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}
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
                        {connectedSocialMedia.discord.userName ?
                            <Box gap={1} sx={{ display: 'fex' }}>
                                <Typography variant='subtitle2' color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}>
                                    Connected:
                                </Typography>
                                <Typography variant='subtitle2'>
                                    {connectedSocialMedia.discord.userName}
                                </Typography>
                            </Box>
                            :
                            <Button
                                disabled={!connectedAddress}
                                variant="contained"
                                sx={{ height: '40px', width: '104px' }}
                                onClick={() => connectSocialMedia(SOCIAL_MEDIA.discord)}
                            >
                                Connect
                            </Button>}
                    </Box>
                    <FormControlLabel
                        sx={{ pointerEvents: 'none' }}
                        disabled={!connectedSocialMedia.discord.userName}
                        checked={!!connectedSocialMedia.discord.userName}
                        control={<Checkbox
                            onChange={handleCheckbox}
                            value={`Join ${props.discord_invite_link}`}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                        />}
                        label={<Box gap={1} display='flex'>
                            <Typography
                                component={"div"}
                                lineHeight='normal'
                                variant='subtitle2'
                                color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}
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
                    <Divider sx={{ marginTop: '20px', width: '100%' }} />
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
            subtitle: <LinkBox link={`${BaseURL.twitter_acc}${props.twitter_account_to_follow}`} text={props.twitter_account_to_follow} />
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
            isDisabled: !props.server_role,
            subtitle: props.server_role
        },
        {
            icon: <SvgComponent type={LAYOUT_CONTENT_TEXT.EnvelopIcon} style='default' />,
            title: 'Users to Provide Email',
            isDisabled: false,
            subtitle: props.require_email ? 'YES' : 'NO'
        },
    ]
}
