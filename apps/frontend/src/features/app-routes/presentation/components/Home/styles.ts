import { COLORS_DARK_THEME } from "../../../../../core/theme/colors"

export const forCollectorsStyles = {
    avatar: {
        padding: '10px 10px 0px 10px',
        borderRadius: '8px',
        border: "1px solid #F5FAFF",
        position: 'absolute',
        top: -5,
        right: 55,
        backdropFilter: 'blur(16px)',
        background: 'gba(16, 18, 26, 0.8)',
        height: '164px',
        width: '164px'
    },
    yellowBox: {
        borderRadius: '8px',
        border: "1px solid #F5FAFF",
        position: 'absolute',
        top: 20,
        right: 30,
        background: 'rgba(218, 251, 51, 1)',
        height: '164px',
        width: '164px'
    },
    leftContent: {
        position: 'relative',
        width: '490px',
        height: '480px'
    },
    holder: {
        marginBottom: '4rem',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    textHolder: {
        flexDirection: 'column',
        display: 'flex',
        width: '551px'
    },
    btn: {
        marginTop: '3rem',
        width: '192px',
        height: '56px',
        borderRadius: '100px'
    },
    rightContent: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        display: 'flex',
    },
}

export const forCreatorsStyles = {
    avatar: {
        padding: '10px 10px 0px 10px',
        borderRadius: '8px',
        border: "1px solid #F5FAFF",
        position: 'absolute',
        top: -5,
        right: 55,
        backdropFilter: 'blur(16px)',
        background: 'gba(16, 18, 26, 0.8)',
        height: '164px',
        width: '164px'
    },
    yellowBox: {
        borderRadius: '8px',
        border: "1px solid #F5FAFF",
        position: 'absolute',
        top: 20,
        right: 30,
        background: 'rgba(218, 251, 51, 1)',
        height: '164px',
        width: '164px'
    },
    rightContent: {
        position: 'relative',
        width: '490px',
        height: '480px'
    },
    holder: {
        marginBottom: '4rem',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    },
    textHolder: {
        flexDirection: 'column',
        display: 'flex',
        width: '551px'
    },
    btn: {
        marginTop: '3rem',
        width: '192px',
        height: '56px',
        borderRadius: '100px'
    },
    leftContent: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        display: 'flex',
    },
}
export const homeStyles = {
    mainCardAndFeadturesHolder: {
        margin: '0rem 4rem',
        maxWidth: '1600px'
    },

    holder: {
        alignItems: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
}

export const lowerSectionStyles = {
    holder: {
        padding: '6rem',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: 'max-content',
        borderRadius: '64px 64px 0px 0px',
        background: 'linear-gradient(135deg, #10121A 0%, #1D243F 100%)'
    }
}

export const mainCardStyles = {
    textHolder: {
        flexDirection: 'column',
        display: 'flex',
        width: '551px'
    },
    avatar: {
        width: '128px',
        marginLeft: '-64px',
        position: 'absolute' as 'absolute',
        left: '50%',
        bottom: -60
    },
    svgHolder: {
        position: 'relative',
        flexDirection: 'column',
        display: 'flex',
        height: '288px'
    },
    rightContent: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '24px',
        padding: '16px 16px 24px 16px',
        background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY,
        height: '384px',
        minWidth: '384px',
    },
    leftContent: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        display: 'flex',
    },
    holder: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        padding: "115px 111px",
        borderRadius: '24px',
        width: '100%',
        background: 'linear-gradient(135deg, #10121A 0%, #2F4597 100%)'
    }
}

export const featuresStyle = {
    containerBox: {
        marginTop: '100px',
        padding: '0 120px',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    gridHolder: {
        display: 'flex',
        justifyContent: "space-around",
        alignItems: 'center',
        height: "100%"
    },
}

export const FAQStyle = {
    expandIcon: {
        color: COLORS_DARK_THEME.PRIMARY_BLUE,
        height: '22px'
    },
    containerBox: {
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    FaqItemHolder: {
        width: '100%',
        display: 'flex',
        borderRadius: '32px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    accordion: {
        borderRadius: '32px',
        background: COLORS_DARK_THEME.PRIMARY_DARK_BLUE_50
    },
}