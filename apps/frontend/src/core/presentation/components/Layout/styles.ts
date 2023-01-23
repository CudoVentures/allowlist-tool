import { COLORS_DARK_THEME } from "../../../theme/colors";

export const headerStyles = {
    disconnectBtn: {
        width: '195px',
        height: '45px',
        borderRadius: '100px'
    },
    logoGroup: {
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    },
    divider: {
        height: '24px',
        backgroundColor: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY
    },
    dropDownItemHolder: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 0px'
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
        marginTop: '24px',
        zIndex: '-1',
        width: '224px',
    },
    SMcollapse: {
        cursor: 'pointer',
        position: 'absolute',
        marginTop: '55px',
        minWidth: '100%',
        zIndex: '-1',
    },
    holderLowRes: {
        padding: '16px 4rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        background: "rgba(16, 18, 26, 0.8)",
        backdropFilter: 'blur(12px)'
    },
    holder: {
        padding: '16px 4rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        background: "rgba(16, 18, 26, 0.8)",
        backdropFilter: 'blur(12px)'
    },
    btnHolder: {
        zIndex: '10',
        width: '224px',
    },
    logInBtn: {
        padding: '10px 20px 10px 12px',
        borderRadius: '100px',
        height: '40px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textTransform: 'none',
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