import { COLORS } from '../../../theme/colors';

export const headerStyles = {
    menuIcon: (compensateRightMargin: boolean, hasScrollbar: boolean) => {
        return {
            cursor: 'pointer',
            marginRight: compensateRightMargin && hasScrollbar ? '4px' : '0px',
        }
    },
    rightNavContent: (compensateRightMargin: boolean, hasScrollbar: boolean) => {
        return {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            marginRight: compensateRightMargin && hasScrollbar ? '4px' : '0px',
        }
    },
    hamburgerAddressHolder: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    hamburgerFlexLine: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '-10px',
    },
    hamburgerMenuContent: {
        display: 'flex',
        height: '100%',
        width: '100%',
        marginBottom: '40px',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    hamburgerTopWideDivider: {
        margin: '20px 0px',
        borderColor: COLORS.STEEL_GRAY[70],
        backgroundColor: COLORS.STEEL_GRAY[70],
        position: 'absolute',
        left: 0,
        top: '65px',
        width: '100vw',
    },
    hamburgerBottomWideDivider: {
        margin: '20px 0px',
        borderColor: COLORS.STEEL_GRAY[70],
        backgroundColor: COLORS.STEEL_GRAY[70],
        position: 'relative',
        left: '-62px',
        width: '100vw',
    },
    headerDisabled: {
        pointerEvents: 'none',
    },
    disconnectBtn: {
        width: '195px',
        height: '45px',
        borderRadius: '100px',
    },
    logoGroup: {
        opacity: '1',
        transition: 'all .1s ease-in-out',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    hamburgerMidDivider: {
        height: '1px',
        width: '100%',
        margin: '10px 0px',
        borderColor: COLORS.STEEL_GRAY[70],
        backgroundColor: COLORS.STEEL_GRAY[70],
    },
    divider: {
        height: '24px',
        borderColor: COLORS.STEEL_GRAY[70],
        backgroundColor: COLORS.STEEL_GRAY[70],
    },
    hamburgerDropDownItemHolder: {
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 0px',
    },
    dropDownItemHolder: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 0px',
    },
    hamburgerDropDownContentHolder: {
        width: '176px',
        height: '48px',
        padding: '10px 20px',
        background: COLORS.STEEL_GRAY[90],
        '&:hover': {
            background: COLORS.STEEL_GRAY[80],
        },
        '&:click': {
            background: COLORS.STEEL_GRAY[70],
        },
        fontSize: '14px',
        fontWeight: '500',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropDownDisconnectBtnHolder: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        background: COLORS.STEEL_GRAY[90],
        '&:hover': {
            background: COLORS.STEEL_GRAY[80],
        },
        '&:click': {
            background: COLORS.STEEL_GRAY[70],
        },
        fontSize: '14px',
        width: '176px',
        fontWeight: '500',
        borderRadius: '24px',
        height: '48px',
        justifyContent: 'center',
    },
    dropDownContentHolder: {
        padding: '10px 20px',
        background: COLORS.STEEL_GRAY[100],
        fontSize: '14px',
        width: '100%',
        fontWeight: '500',
        borderRadius: '24px',
        display: 'flex',
        height: 'max-content',
        justifyContent: 'center',
    },
    collapse: {
        right: 0,
        position: 'absolute',
        marginTop: '17px',
        zIndex: '-1',
        width: '256px',
    },
    SMcollapse: {
        cursor: 'pointer',
        position: 'absolute',
        marginTop: '39px',
        minWidth: '100%',
        zIndex: '-1',
    },
    holder: {
        opacity: 1,
        backdropFilter: 'blur(12px)',
        background: 'rgba(16, 18, 26, 0.8)',
        height: '80px',
        transition: 'all .3s ease-in-out',
        padding: '16px 4rem !important',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    hashLogoAndAddressHolder: (isConnected: boolean) => {
        return {
            marginLeft: isConnected ? '-6px' : '0px',
            display: 'flex',
            alignItems: 'center',
        }
    },
    leftNavContentAndIcon: (hamburgerMenu: boolean) => {
        return {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: hamburgerMenu ? '8px' : '0px',
            marginBottom: hamburgerMenu ? '60px' : '0px',
        }
    },
    hamburger: {
        opacity: 1,
        overflowY: 'scroll',
        overflowX: 'clip',
        height: '100vh',
        backdropFilter: 'blur(20px)',
        background: 'rgba(16, 18, 26, 0.9)',
        transition: 'all .3s ease-in-out',
        padding: '16px 4rem !important',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    btnHolder: (isMenuOpen: boolean, isConnected: boolean) => {
        return {
            marginTop: isConnected ? '-3px' : '-9px',
            marginLeft: '-8px',
            position: 'relative',
            zIndex: '10',
            color: isMenuOpen ? COLORS.LIGHT_BLUE[90] : 'inherit',
            cursor: 'pointer',
            background: isMenuOpen ? COLORS.STEEL_GRAY[100] : 'transparent',
            borderRadius: '12px',
            padding: '9px 10px 2px 11px',
        }
    },
    logInBtn: (isConnected: boolean) => {
        return {
            '&:hover': {
                bgcolor: isConnected ? COLORS.STEEL_GRAY[80] : 'auto',
            },
            bgcolor: isConnected ? COLORS.STEEL_GRAY[90] : COLORS.LIGHT_BLUE[90],
            justifyContent: isConnected ? 'space-between' : 'center',
            padding: '10px 20px 10px 12px',
            borderRadius: '100px',
            height: '40px',
            width: '224px',
            display: 'flex',
            alignItems: 'center',
            textTransform: 'none',
        }
    },
}
export const footerStyles = {
    typography: {
        fontWeight: 700,
        color: COLORS.STEEL_GRAY[50],
        '&:hover': {
            color: COLORS.LIGHT_BLUE[90],
        },
    },
    holder: {
        padding: '1rem 2rem',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        display: 'flex',
    },
    rightItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: COLORS.STEEL_GRAY[50],
        '&:hover': {
            color: COLORS.LIGHT_BLUE[90],
        },
    },
    leftItem: {
        cursor: 'pointer',
    },
}

export const helperStyles = {
    footerLogo: {
        display: 'flex',
        color: COLORS.STEEL_GRAY[50],
        alignItems: 'center',
        '&:hover': {
            color: COLORS.LIGHT_BLUE[90],
        },
    },
    dropDownItem: {
        width: '100%',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'flex-start',
        padding: '8px',
    },
    defaultSvgIcon: {
        height: '18px',
        marginRight: '5px',
    },
    imgHolder: {
        overflow: 'clip',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
    },
}

export const layoutStyles = {
    contentWrapper: {
        justifyContent: 'flex-start',
        position: 'absolute',
        width: '100%',
        overflowWrap: 'break-word',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    contentHolder: {
        display: 'flex',
        justifyContent: 'center',

    },
    appWrapper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '650px',
    },
}
