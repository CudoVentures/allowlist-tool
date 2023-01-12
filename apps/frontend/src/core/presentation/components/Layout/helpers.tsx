import React from 'react';
import SVG from 'react-inlinesvg';
import moment from "moment";
import { Box, Divider } from '@mui/material';
import { JdenticonConfig, toSvg } from 'jdenticon';
import { Circles as CirclesSpinner } from 'svg-loaders-react';

import { CHAIN_DETAILS } from '../../../utilities/Constants';
import { COLORS_DARK_THEME } from '../../../theme/colors';
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
import logoFooter from '../../../../public/assets/vectors/logo-footer.svg';
import frame1673 from '../../../../public/assets/vectors/frames/frame-1673.svg';
import frame1674 from '../../../../public/assets/vectors/frames/frame-1674.svg';
import plusIcon from '../../../../public/assets/vectors/plus-icon.svg';
import questionMarkIcon from '../../../../public/assets/vectors/questionmark-icon.svg';
import globusIcon from '../../../../public/assets/vectors/globus-icon.svg';
import minusIcon from '../../../../public/assets/vectors/minus-icon.svg';
import smileyFaceIcon from '../../../../public/assets/vectors/smiley-face-icon.svg';
import copyIcon from '../../../../public/assets/vectors/copy-icon.svg';
import smallCheckmark from '../../../../public/assets/vectors/checkmark.svg';
import calendarIcon from '../../../../public/assets/vectors/calendar-icon.svg';
import clockIcon from '../../../../public/assets/vectors/clock-icon.svg';
import envelopIcon from '../../../../public/assets/vectors/envelop-icon.svg';
import chainLinkIcon from '../../../../public/assets/vectors/chain-link-icon.svg';
import editIcon from '../../../../public/assets/vectors/edit-icon.svg';
import bigPlusIcon from '../../../../public/assets/vectors/parallax/big-plus.svg';
import sampleAllowListDetails from '../../../../public/assets/vectors/parallax/sample-allowlist-details.svg';
import sampleAllowListMint from '../../../../public/assets/vectors/parallax/sample-allowlist-mint.svg';
import sampleAllowListPage from '../../../../public/assets/vectors/parallax/sample-allowlist-page.svg';
import sampleAllowListRegister from '../../../../public/assets/vectors/parallax/sample-allowlist-register.svg';
import headImg from '../../../../public/assets/vectors/parallax/head.svg';
import checkmark from '../../../../public/assets/vectors/parallax/checkmark.svg';
import rectangularShade from '../../../../public/assets/vectors/parallax/rectangular-shade.svg';
import stepOne from '../../../../public/assets/vectors/stepper/step-1.svg';
import stepTwo from '../../../../public/assets/vectors/stepper/step-2.svg';
import stepThree from '../../../../public/assets/vectors/stepper/step-3.svg';

import { generalStyles } from '../../../../features/allowlists/presentation/pages/styles';
import { headerStyles, helperStyles } from './styles';

export enum LAYOUT_CONTENT_TEXT {
    ChainLinkIcon = 'Chain link icon',
    EditIcon = 'Edit icon',
    EnvelopIcon = 'Envelop icon',
    QuestionmarkIcon = 'Questionmark icon',
    AllowlistBackground = 'Allowlist background',
    AllowlistAvatar = 'Allowlist avatar',
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
    FooterCudosLogo = 'Footer Cudos Logo',
    CosmostationLogo = 'Cosmostation logo',
    PlusIcon = 'Plus Icon',
    MinusIcon = 'Minus Icon',
    SmileyFaceIcon = 'Smiley face icon',
    SvgImg = 'SVG Image',
    CopyIcon = 'Copy icon',
    BigPlusIcon = 'Big plus icon',
    Logout = 'Logout',
    HeadImg = 'Head image',
    SampleAllowListDetails = 'Sample Allowlist details',
    SampleAllowListMint = 'Sample Allowlist mint form',
    SampleAllowListPage = 'Sample Allowlist page',
    SampleAllowListRegister = 'Sample Allowlist registration form',
    Checkmark = 'Checkmark icon',
    SmallCheckmark = 'Small checkmark icon',
    RectangularShade = 'Shade element',
    StepOne = 'Step One of Creating Allowlist',
    StepTwo = 'Step two of Creating Allowlist',
    StepThree = 'Step three of Creating Allowlist',
    GlobusIcon = 'Globus icon',
    CalendarIcon = 'Calendar icon',
    ClockIcon = 'Clock icon'
}

const SVG_SRC_MAPPER = {
    [LAYOUT_CONTENT_TEXT.ChainLinkIcon]: chainLinkIcon,
    [LAYOUT_CONTENT_TEXT.EditIcon]: editIcon,
    [LAYOUT_CONTENT_TEXT.EnvelopIcon]: envelopIcon,
    [LAYOUT_CONTENT_TEXT.QuestionmarkIcon]: questionMarkIcon,
    [LAYOUT_CONTENT_TEXT.ClockIcon]: clockIcon,
    [LAYOUT_CONTENT_TEXT.CalendarIcon]: calendarIcon,
    [LAYOUT_CONTENT_TEXT.GlobusIcon]: globusIcon,
    [LAYOUT_CONTENT_TEXT.SmallCheckmark]: smallCheckmark,
    [LAYOUT_CONTENT_TEXT.StepOne]: stepOne,
    [LAYOUT_CONTENT_TEXT.StepTwo]: stepTwo,
    [LAYOUT_CONTENT_TEXT.StepThree]: stepThree,
    [LAYOUT_CONTENT_TEXT.Checkmark]: checkmark,
    [LAYOUT_CONTENT_TEXT.RectangularShade]: rectangularShade,
    [LAYOUT_CONTENT_TEXT.HeadImg]: headImg,
    [LAYOUT_CONTENT_TEXT.SampleAllowListRegister]: sampleAllowListRegister,
    [LAYOUT_CONTENT_TEXT.SampleAllowListPage]: sampleAllowListPage,
    [LAYOUT_CONTENT_TEXT.SampleAllowListDetails]: sampleAllowListDetails,
    [LAYOUT_CONTENT_TEXT.SampleAllowListMint]: sampleAllowListMint,
    [LAYOUT_CONTENT_TEXT.BigPlusIcon]: bigPlusIcon,
    [LAYOUT_CONTENT_TEXT.FooterCudosLogo]: logoFooter,
    [LAYOUT_CONTENT_TEXT.CopyIcon]: copyIcon,
    [LAYOUT_CONTENT_TEXT.MainCudosLogo]: logoHeader,
    [LAYOUT_CONTENT_TEXT.ArrowRight]: arrowRight,
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
    [LAYOUT_CONTENT_TEXT.PlusIcon]: plusIcon,
    [LAYOUT_CONTENT_TEXT.MinusIcon]: minusIcon,
    [LAYOUT_CONTENT_TEXT.SmileyFaceIcon]: smileyFaceIcon
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

export const FOOTER_LOGO = () => {

    return (
        <Box gap={3} sx={helperStyles.footerLogo} >
            <SvgComponent
                style={{ height: '32px' }}
                type={LAYOUT_CONTENT_TEXT.FooterCudosLogo}
            />
            <Divider
                orientation='vertical'
                sx={headerStyles.divider}
            />
        </Box>
    )
}

const FOOTER_ICON_STYLE = { height: '22px', width: '22px' }
export const FOOTER = {
    LEFT_LINKS: [
        { text: <FOOTER_LOGO />, url: 'https://www.cudos.org' },
        { text: 'Terms & Conditions', url: 'https://www.cudos.org/terms-and-conditions/' },
        { text: 'Privacy Policy', url: 'https://www.cudos.org/privacy-policy' },
        { text: 'cudos.org', url: 'https://www.cudos.org/' },
        { text: `License © 2018 - ${moment().year()}`, url: 'https://www.cudos.org/' },
        { text: `v${CHAIN_DETAILS.DEPLOYMENT_VERSION}`, url: `https://github.com/CudoVentures/cudos-allowlist-tool/releases/tag/v${CHAIN_DETAILS.DEPLOYMENT_VERSION}` }
    ],
    RIGHT_LINKS: [
        { icon: <SvgComponent style={FOOTER_ICON_STYLE} type={LAYOUT_CONTENT_TEXT.TwitterIcon} />, url: 'https://twitter.com/CUDOS_' },
        { icon: <SvgComponent style={FOOTER_ICON_STYLE} type={LAYOUT_CONTENT_TEXT.TelegramIcon} />, url: 'https://t.me/cudostelegram' },
        { icon: <SvgComponent style={FOOTER_ICON_STYLE} type={LAYOUT_CONTENT_TEXT.DiscordIcon} />, url: 'https://discord.com/invite/t397SKqf4u' },
        { icon: <SvgComponent style={FOOTER_ICON_STYLE} type={LAYOUT_CONTENT_TEXT.LinkedInIcon} />, url: 'https://www.linkedin.com/company/cudos1' },
        { icon: <SvgComponent style={FOOTER_ICON_STYLE} type={LAYOUT_CONTENT_TEXT.MediumIcon} />, url: 'https://medium.com/cudos' },
        { icon: <SvgComponent style={FOOTER_ICON_STYLE} type={LAYOUT_CONTENT_TEXT.YouTubeIcon} />, url: 'https://www.youtube.com/c/CUDOS' },
        { icon: <SvgComponent style={FOOTER_ICON_STYLE} type={LAYOUT_CONTENT_TEXT.FacebookIcon} />, url: 'https://www.facebook.com/cudos.org' },
        { icon: <SvgComponent style={FOOTER_ICON_STYLE} type={LAYOUT_CONTENT_TEXT.SpotifyIcon} />, url: 'https://open.spotify.com/show/2lZuBXJ270g7taK06tnK35' },

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
            bgcolor: COLORS_DARK_THEME.DARK_BACKGROUND,
            padding: `${size / 5}px`
        }}
        >
            <SVG
                title={'User avatar'}
                src={toSvg(UID, size, JD_CONFIG)}
            />
        </Box>
    )
}

export const SVG_FRAMES = {
    frame1673: frame1673,
    frame1674: frame1674
}

export const StyledCircleSpinner = () => {
    return <CirclesSpinner style={generalStyles.spinner}
        fill={COLORS_DARK_THEME.PRIMARY_BLUE} />
}
