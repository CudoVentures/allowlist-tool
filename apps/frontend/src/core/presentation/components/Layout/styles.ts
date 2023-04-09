import { COLORS_DARK_THEME } from "../../../theme/colors";

export const headerStyles = {
    menuIcon: (compensateRightMargin: boolean, hasScrollbar: boolean) => {
        return {
            cursor: 'pointer',
            marginRight: compensateRightMargin && hasScrollbar ? '4px' : '0px'
        }
    },
    rightNavContent: (compensateRightMargin: boolean, hasScrollbar: boolean) => {
        return {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            marginRight: compensateRightMargin && hasScrollbar ? '4px' : '0px'
        }
    },
    hamburgerAddressHolder: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    hamburgerFlexLine: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '-10px'
    },
    hamburgerMenuContent: {
        display: 'flex',
        height: '100%',
        width: '100%',
        marginBottom: '40px',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },
    hamburgerTopWideDivider: {
        margin: '20px 0px',
        borderColor: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_70,
        backgroundColor: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_70,
        position: 'absolute',
        left: 0,
        top: '65px',
        width: '100vw'
    },
    hamburgerBottomWideDivider: {
        margin: '20px 0px',
        borderColor: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_70,
        backgroundColor: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_70,
        position: 'relative',
        left: '-62px',
        width: '100vw'
    },
    headerDisabled: {
        pointerEvents: "none",
    },
    disconnectBtn: {
        width: '195px',
        height: '45px',
        borderRadius: '100px'
    },
    logoGroup: {
        opacity: '1',
        transition: 'all .1s ease-in-out',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    },
    hamburgerMidDivider: {
        height: '1px',
        width: '100%',
        margin: '10px 0px',
        borderColor: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_70,
        backgroundColor: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_70
    },
    divider: {
        height: '24px',
        borderColor: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_70,
        backgroundColor: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_70
    },
    hamburgerDropDownItemHolder: {
        cursor: 'pointer',
        justifyContent: "center",
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 0px'
    },
    dropDownItemHolder: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 0px'
    },
    hamburgerDropDownContentHolder: {
        width: '176px',
        height: '48px',
        padding: '10px 20px',
        background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_100,
        fontSize: '14px',
        fontWeight: '500',
        borderRadius: '24px',
        display: 'flex',
        justifyContent: 'center',
    },
    dropDownContentHolder: {
        padding: '10px 20px',
        background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_100,
        fontSize: '14px',
        width: '100%',
        fontWeight: '500',
        borderRadius: '24px',
        display: 'flex',
        height: 'max-content',
        justifyContent: 'center',
    },
    collapse: {
        position: 'absolute',
        marginTop: '8px',
        zIndex: '-1',
        width: '224px',
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
        backdropFilter: "blur(12px)",
        background: "rgba(16, 18, 26, 0.8)",
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
            alignItems: 'center'
        }
    },
    leftNavContentAndIcon: (hamburgerMenu: boolean) => {
        return {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: hamburgerMenu ? '8px' : '0px',
            marginBottom: hamburgerMenu ? '60px' : '0px'
        }
    },
    hamburger: {
        opacity: 1,
        overflowY: 'scroll',
        overflowX: 'clip',
        height: '100vh',
        backdropFilter: "blur(20px)",
        background: "rgba(16, 18, 26, 0.9)",
        transition: 'all .3s ease-in-out',
        padding: '16px 4rem !important',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
    btnHolder: {
        zIndex: '10',
        width: '224px',
    },
    logInBtn: (isConnected: boolean) => {
        return {
            bgcolor: isConnected ? COLORS_DARK_THEME.PRIMARY_STEEL_GRAY : COLORS_DARK_THEME.PRIMARY_BLUE,
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
        color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_50,
        "&:hover": {
            color: COLORS_DARK_THEME.PRIMARY_BLUE
        }
    },
    holder: {
        padding: '1rem 2rem',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        display: 'flex'
    },
    rightItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_50,
        '&:hover': {
            color: COLORS_DARK_THEME.PRIMARY_BLUE
        }
    },
    leftItem: {
        cursor: 'pointer'
    }
}

export const helperStyles = {
    footerLogo: {
        display: 'flex',
        color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_50,
        alignItems: 'center',
        "&:hover": {
            color: COLORS_DARK_THEME.PRIMARY_BLUE
        }
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
        borderRadius: '50%'
    }
}

export const layoutStyles = {
    contentWrapper: {
        justifyContent: 'flex-start',
        position: 'absolute',
        width: '100%',
        overflowWrap: 'break-word',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHolder: {
        display: 'flex',
        justifyContent: 'center',

    },
    appWrapper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '650px'
    }
}