import { COLORS_DARK_THEME } from "../../../theme/colors";

export const headerStyles = {
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
        display: 'flex',
        flexDirection: 'column',
        padding: '8px 0px'
    },
    dropDownContentHolder: {
        fontSize: '14px',
        width: '100%',
        fontWeight: '500',
        borderRadius: '8px',
        display: 'flex',
        height: 'max-content',
        justifyContent: 'center',
    },
    collapse: {
        position: 'absolute',
        marginTop: '25px',
        zIndex: '-1',
        width: '192px',
    },
    holderLowRes: {
        padding: '16px 60px',
        borderBottom: '1px solid #E1E1E1',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        background: "rgba(16, 18, 26, 0.7)",
        backdropFilter: 'blur(5px)'
    },
    holder: {
        padding: '16px 60px',
        borderBottom: '1px solid #E1E1E1',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        background: "rgba(16, 18, 26, 0.7)",
        backdropFilter: 'blur(5px)'
    },
    btnHolder: {
        zIndex: '10',
        width: '192px',
    },
    logInBtn: {
        padding: '10px, 16px',
        borderRadius: '12px',
        height: '40px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textTransform: 'none',
    },
}
export const footerStyles = {
    typography: {
        fontWeight: 500,
        color: "text.secondary",
        "&:hover": {
            color: COLORS_DARK_THEME.PRIMARY_BLUE
        }
    },
    holder: {
        position: 'relative',
        bottom: 0,
        width: '100%',
        height: '50px',
        alignItems: 'center',
        display: 'flex'
    },
    rightItem: {
        cursor: 'pointer',
        color: COLORS_DARK_THEME.SECONDARY_TEXT,
        '&:hover': {
            color: COLORS_DARK_THEME.PRIMARY_BLUE
        }
    },
    leftItem: {
        padding: `0 0.5rem`,
        '&:not(:last-child)': {
            borderRight: `1px solid ${COLORS_DARK_THEME.SECONDARY_TEXT}`
        },
        cursor: 'pointer'
    }
}

export const helperStyles = {
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
}

export const layoutStyles = {
    contentWrapper: {
        marginBottom: '2rem',
        maxWidth: '1320px',
        overflowWrap: 'break-word',
        overflow: 'auto',
        padding: '0 2rem',
        display: 'flex',
    },
    contentHolder: {
        display: 'flex',
        justifyContent: 'center',

    },
    appWrapper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
    }
}