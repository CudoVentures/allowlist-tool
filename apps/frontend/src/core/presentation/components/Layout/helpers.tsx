import React from 'react';
import SVG from 'react-inlinesvg';
import moment from "moment";
import { Box, Typography } from '@mui/material';

import { CHAIN_DETAILS } from '../../../utilities/Constants';
import walletIcon from '../../../../public/assets/vectors/wallet-icon.svg';
import arrowDown from '../../../../public/assets/vectors/arrow-down.svg';
import userIcon from '../../../../public/assets/vectors/user-icon.svg';
import arrowRight from '../../../../public/assets/vectors/menu-arrow-right.svg';
import linkIcon from '../../../../public/assets/vectors/link-icon.svg';
import infoIcon from '../../../../public/assets/vectors/info-icon.svg';
import keplrLogo from '../../../../public/assets/vectors/keplr-logo.svg';
import cosmostationLogo from '../../../../public/assets/vectors/cosmostation-logo.svg';
import twitterIcon from '../../../../public/assets/vectors/twitter.svg';
import telegramIcon from '../../../../public/assets/vectors/telegram.svg';
import discordIcon from '../../../../public/assets/vectors/discord.svg';
import linkedInIcon from '../../../../public/assets/vectors/linkedin.svg';
import mediumIcon from '../../../../public/assets/vectors/medium.svg';
import youTubeIcon from '../../../../public/assets/vectors/youtube.svg';
import facebookIcon from '../../../../public/assets/vectors/facebook.svg';
import spotifyIcon from '../../../../public/assets/vectors/spotify.svg';
import logoHeader from '../../../../public/assets/vectors/logo-header.svg';
import { JdenticonConfig, toSvg } from 'jdenticon';

import { helperStyles } from './styles';

export enum LAYOUT_CONTENT_TEXT {
    ConnectWallet = 'Connect Wallet',
    GoToDashboard = 'Go to Dashboard',
    WalletLogo = 'Wallet logo',
    ArrowIcon = 'Arrow icon',
    UserIcon = 'User icon',
    ArrowRight = 'Arrow right',
    LinkIcon = 'Link icon',
    InfoIcon = 'Info icon',
    KeplrLogo = 'Keplr logo',
    TwitterIcon = 'Twitter icon',
    TelegramIcon = 'Telegram icon',
    DiscordIcon = 'Discord icon',
    LinkedInIcon = 'LinkedIn icon',
    MediumIcon = 'Medium icon',
    YouTubeIcon = 'YouTube icon',
    FacebookIcon = 'Facebook icon',
    SpotifyIcon = 'Spotifu icon',
    MainCudosLogo = 'Main Cudos Logo',
    CosmostationLogo = 'Cosmostation logo',
    Logout = 'Logout'
}

const SVG_SRC_MAPPER = {
    [LAYOUT_CONTENT_TEXT.MainCudosLogo]: logoHeader,
    [LAYOUT_CONTENT_TEXT.Logout]: arrowRight,
    [LAYOUT_CONTENT_TEXT.UserIcon]: userIcon,
    [LAYOUT_CONTENT_TEXT.ArrowIcon]: arrowDown,
    [LAYOUT_CONTENT_TEXT.WalletLogo]: walletIcon,
    [LAYOUT_CONTENT_TEXT.LinkIcon]: linkIcon,
    [LAYOUT_CONTENT_TEXT.InfoIcon]: infoIcon,
    [LAYOUT_CONTENT_TEXT.KeplrLogo]: keplrLogo,
    [LAYOUT_CONTENT_TEXT.CosmostationLogo]: cosmostationLogo,
    [LAYOUT_CONTENT_TEXT.TwitterIcon]: twitterIcon,
    [LAYOUT_CONTENT_TEXT.TelegramIcon]: telegramIcon,
    [LAYOUT_CONTENT_TEXT.DiscordIcon]: discordIcon,
    [LAYOUT_CONTENT_TEXT.LinkedInIcon]: linkedInIcon,
    [LAYOUT_CONTENT_TEXT.MediumIcon]: mediumIcon,
    [LAYOUT_CONTENT_TEXT.YouTubeIcon]: youTubeIcon,
    [LAYOUT_CONTENT_TEXT.FacebookIcon]: facebookIcon,
    [LAYOUT_CONTENT_TEXT.SpotifyIcon]: spotifyIcon,
}

const TEXT_MAPPER = {
    [LAYOUT_CONTENT_TEXT.Logout]: LAYOUT_CONTENT_TEXT.Logout,
    [LAYOUT_CONTENT_TEXT.UserIcon]: LAYOUT_CONTENT_TEXT.GoToDashboard
}

const getSvgSrc = (type: LAYOUT_CONTENT_TEXT): string => {
    return SVG_SRC_MAPPER[type] || ''
}

export const SvgComponent = ({ type, style }: { type: LAYOUT_CONTENT_TEXT, style: React.CSSProperties | 'default' }) => {
    const src = getSvgSrc(type)
    return (
        <SVG title={type} style={style === 'default' ? helperStyles.defaultSvgIcon : style} src={src} />
    )
}

export const DropDownItem = ({ type, onClick }: { type: LAYOUT_CONTENT_TEXT, onClick: React.MouseEventHandler<HTMLDivElement> }): JSX.Element => {
    return (
        <Box onClick={onClick} sx={helperStyles.dropDownItem}>
            <SvgComponent type={type} style='default' />
            <Typography fontWeight={600}>
                {TEXT_MAPPER[type] || ''}
            </Typography>
        </Box>
    )
}

export const FOOTER = {
    LEFT_LINKS: [
        { text: 'Terms & Conditions', url: 'https://www.cudos.org/terms-and-conditions/' },
        { text: 'Privacy Policy', url: 'https://www.cudos.org/privacy-policy' },
        { text: 'cudos.org', url: 'https://www.cudos.org/' },
        { text: `License © 2018 - ${moment().year()}`, url: 'https://www.cudos.org/' },
        { text: `v${CHAIN_DETAILS.DEPLOYMENT_VERSION}`, url: `https://github.com/CudoVentures/cudos-allowlist-tool/releases/tag/v${CHAIN_DETAILS.DEPLOYMENT_VERSION}` }
    ],
    RIGHT_LINKS: [
        { icon: <SvgComponent style={'default'} type={LAYOUT_CONTENT_TEXT.TwitterIcon} />, url: 'https://twitter.com/CUDOS_' },
        { icon: <SvgComponent style={'default'} type={LAYOUT_CONTENT_TEXT.TelegramIcon} />, url: 'https://t.me/cudostelegram' },
        { icon: <SvgComponent style={'default'} type={LAYOUT_CONTENT_TEXT.DiscordIcon} />, url: 'https://discord.com/invite/t397SKqf4u' },
        { icon: <SvgComponent style={'default'} type={LAYOUT_CONTENT_TEXT.LinkedInIcon} />, url: 'https://www.linkedin.com/company/cudos1' },
        { icon: <SvgComponent style={'default'} type={LAYOUT_CONTENT_TEXT.MediumIcon} />, url: 'https://medium.com/cudos' },
        { icon: <SvgComponent style={'default'} type={LAYOUT_CONTENT_TEXT.YouTubeIcon} />, url: 'https://www.youtube.com/c/CUDOS' },
        { icon: <SvgComponent style={'default'} type={LAYOUT_CONTENT_TEXT.FacebookIcon} />, url: 'https://www.facebook.com/cudos.org' },
        { icon: <SvgComponent style={'default'} type={LAYOUT_CONTENT_TEXT.SpotifyIcon} />, url: 'https://open.spotify.com/show/2lZuBXJ270g7taK06tnK35' },

    ]
}

export const RESOLUTIONS = {
    HIGH: 1600,
    MID_LOW: 1300,
    LOW: 1000,
    MID_LOWER: 850,
    LOWER: 750,
    MID_LOWEST: 450,
    LOWEST: 200
}

export const JD_CONFIG: JdenticonConfig = {
    hues: [204],
    lightness: {
        color: [0.28, 0.59],
        grayscale: [0.26, 0.90]
    },
    saturation: {
        color: 1.00,
        grayscale: 0.42
    },
    backColor: "#0000"
}

export const HashBasedUserAvatar = ({
    UID,
    size,
}: {
    UID: string,
    size: number,
}): JSX.Element => {

    return (
        <Box sx={{
            ...helperStyles.imgHolder,
            bgcolor: '#1F2436',
            width: `${size + 4}px`,
            height: `${size + 4}px`,
        }}
        >
            <SVG
                title={'User avatar'}
                src={toSvg(UID, size, JD_CONFIG)}
            />
        </Box>
    )
}
