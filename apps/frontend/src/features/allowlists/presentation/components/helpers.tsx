import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { AnyAction, Dispatch } from "redux";
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, List, ListItem, Tooltip, Typography } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import { RootState } from "../../../../core/store";
import { CollectedData, FetchedAllowlist, OptionalAllowlistData, updateAllowlistObject } from "../../../../core/store/allowlist";
import { SOCIAL_MEDIA } from "../../../../core/store/user";
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../../../../core/presentation/components/Layout/helpers";
import { COLORS_DARK_THEME } from "../../../../core/theme/colors";
import useSocialMedia from "../../../../core/utilities/CustomHooks/useSocialMedia";
import { getTimeFromNumber } from "../../../../core/utilities/ProjectUtils";
import { LinkBox } from "../../../../core/theme/helpers";

import { allowlistPreviewStyles, allowListStyles } from "./styles";

declare let Config: { REACT_APP_DISCORD_CLIENT_ID: any; };

export const acceptedImgTypes = ['png', 'jpeg', 'jpg', 'svg']

export const fileToDataUri = async (file: any) => {
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

export const onImageChange = (
    type: 'image' | 'banner',
    file: Blob | MediaSource,
    setState: Dispatch<AnyAction>,
) => {

    if (!file) {
        if (type === 'image') {
            setState(updateAllowlistObject({ image: '' }));
            return
        }
        setState(updateAllowlistObject({ banner_image: '' }));
        return;
    }

    fileToDataUri(file).then((data) => {
        if (type === 'image') {
            setState(updateAllowlistObject({ image: data as string }));
        } else {
            setState(updateAllowlistObject({ banner_image: data as string }));
        }
    });
};

export const addDiscordBot = () => {
    window.open(
        `https://discord.com/api/oauth2/authorize?client_id=${Config.REACT_APP_DISCORD_CLIENT_ID}&permissions=0&scope=bot`,
    );
};


export const SocialMediaButtons = () => {

    const { connectSocialMedia } = useSocialMedia()
    const { connectedSocialMedia } = useSelector((state: RootState) => state.userState)

    return (
        <Box gap={1} display='flex'>
            <Tooltip title={`Login with Twitter`}>
                <Button
                    variant="text"
                    sx={{ height: '40px' }}
                    onClick={() => connectSocialMedia(SOCIAL_MEDIA.twitter)}
                >
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.TwitterIcon}
                        style={{ width: '25px', height: '25px', color: connectedSocialMedia?.twitter ? 'inherit' : COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_50 }}
                    />
                </Button>
            </Tooltip>
            <Tooltip title={`${connectedSocialMedia?.discord ? 'Logged in' : 'Login'} with Discord`}>
                <Button
                    variant="text"
                    sx={{ height: '40px', color: connectedSocialMedia?.discord ? 'inherit' : COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_50 }}
                    onClick={() => connectSocialMedia(SOCIAL_MEDIA.discord)}
                >
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.DiscordIcon}
                        style={{ width: '25px', height: '25px' }}
                    />
                </Button>
            </Tooltip>
        </Box >
    )
}

export const isValidStepOne = (data: CollectedData): boolean => {
    if (
        data.name &&
        data.url &&
        data.description &&
        data.cosmos_chain_id &&
        data.website &&
        data.discord_url &&
        data.twitter_account &&
        data.image &&
        data.banner_image &&
        data.end_date
    ) { return true }

    return false
}

export const isValidStepTwo = (data: CollectedData) => {

    if (
        data.twitter_account_to_follow ||
        data.tweet ||
        data.discord_server && data.server_role ||
        data.require_email
    ) {
        return true
    }

    return false
}

export const isValidOptionalData = (data: OptionalAllowlistData): boolean => {

    //TODO: What are the criteria for the optional data?
    return true
}

export const SocialMediaBoxes = ({
    handleCheckbox, props
}: {
    handleCheckbox: (e: React.ChangeEvent<HTMLInputElement>, isOn: boolean) => void,
    props: FetchedAllowlist
}) => {

    const { connectSocialMedia } = useSocialMedia()
    const { connectedSocialMedia } = useSelector((state: RootState) => state.userState)

    return (
        <Fragment>
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
                    {connectedSocialMedia.twitter ?
                        <Box gap={1} sx={{ display: 'fex' }}>
                            <Typography variant='subtitle2' color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}>
                                Connected:
                            </Typography>
                            <Typography variant='subtitle2'>
                                {connectedSocialMedia.twitter}
                            </Typography>
                        </Box>
                        :
                        <Button
                            variant="contained"
                            sx={{ height: '40px', width: '104px' }}
                            onClick={() => connectSocialMedia(SOCIAL_MEDIA.twitter)}
                        >
                            Connect
                        </Button>}
                </Box>
                <FormGroup>
                    <FormControlLabel
                        disabled={!connectedSocialMedia.twitter}
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
                            {`Follow ${props.twitter_account_to_follow}`}
                        </Typography>}
                    />
                    <FormControlLabel
                        disabled={!connectedSocialMedia.twitter}
                        control={<Checkbox
                            onChange={handleCheckbox}
                            value={`Like & retweet ${props.tweet_to_retweet}`}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                        />}
                        label={<Typography
                            lineHeight='normal'
                            variant='subtitle2'
                            color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}
                        >
                            {`Like & retweet ${props.tweet_to_retweet}`}
                        </Typography>}
                    />
                </FormGroup>
            </Box>
            <Divider sx={{ width: '100%' }} />
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
                    {connectedSocialMedia.discord ?
                        <Box gap={1} sx={{ display: 'fex' }}>
                            <Typography variant='subtitle2' color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}>
                                Connected:
                            </Typography>
                            <Typography variant='subtitle2'>
                                {connectedSocialMedia.discord}
                            </Typography>
                        </Box>
                        :
                        <Button
                            variant="contained"
                            sx={{ height: '40px', width: '104px' }}
                            onClick={() => connectSocialMedia(SOCIAL_MEDIA.discord)}
                        >
                            Connect
                        </Button>}
                </Box>
                <FormControlLabel
                    disabled={!connectedSocialMedia.discord}
                    control={<Checkbox
                        onChange={handleCheckbox}
                        value={`Follow ${props.twitter_account_to_follow}`}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleIcon />}
                    />}
                    label={<Box gap={1} display='flex'>
                        <Typography
                            lineHeight='normal'
                            variant='subtitle2'
                            color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}
                        >
                            {`Join the ${props.name} server with role: `}
                        </Typography>
                        <Typography
                            color='text.primary'
                            lineHeight='normal'
                            variant='subtitle2'
                        >
                            {`${props.server_role}`}
                        </Typography>
                    </Box>}
                />
            </Box>
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

export const getRegistrationCriteriaArray = (props: CollectedData | FetchedAllowlist): {
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
            return props.checkedFields['tweet_to-_retweet'] ? true : false
        }
        return props.tweet_to_retweet !== '' ? true : false
    }

    return [
        {
            icon: <SvgComponent type={LAYOUT_CONTENT_TEXT.TwitterIcon} style='default' />,
            title: 'Twitter Page to Follow',
            isDisabled: !props.twitter_account_to_follow,
            subtitle: <LinkBox link={props.twitter_account_to_follow} />
        },
        {
            icon: <SvgComponent type={LAYOUT_CONTENT_TEXT.TwitterIcon} style='default' />,
            title: 'Interact With Twitter Post',
            isDisabled: isCollectedData ? !props.tweet : !props.tweet_to_like && !props.tweet_to_retweet,
            subtitle: <Box>
                <LinkBox link={props.tweet} />
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
            title: 'Discord Group to Join',
            isDisabled: isCollectedData ? !props.discord_server : !props.discord_invite_link,
            subtitle: <LinkBox link={isCollectedData ? props.discord_server : props.discord_invite_link} />
        },
        {
            icon: <SvgComponent type={LAYOUT_CONTENT_TEXT.DiscordIcon} style='default' />,
            title: 'Discord Group Roles',
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
