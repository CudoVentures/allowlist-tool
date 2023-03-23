import { COLORS_DARK_THEME } from "../../../../core/theme/colors"

export const createAllowlistStyles = {
    holder: {
        alignItems: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHolder: {
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem 4rem 8rem 4rem',
        maxWidth: '900px'
    },
}

export const generalStyles = {
    arrowIconHolder: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    rotatingArrow: {
        position: 'absolute' as 'absolute',
        transition: "transform 0.2s ease-in-out",
        height: '20px',
        width: '20px',
        color: COLORS_DARK_THEME.PRIMARY_BLUE
    },
    collapsebleTextHolder: {
        justifyContent: 'flex-start',
        marginBottom: '-10px',
        cursor: 'pointer',
        alignItems: 'center',
        display: 'flex'
    },
    plusIconBackground: {
        background: COLORS_DARK_THEME.PRIMARY_BLUE,
        borderRadius: '50%',
        width: '48px',
        height: '48px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center'
    },
    clocIcon: {
        width: '24px',
        height: '24px',
        marginRight: '10px',
        color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20
    },
    avatar: {
        transform: "translateY(-70%)",
        backdropFilter: 'blur(16px)',
        border: "2px solid #F5FAFF",
        borderRadius: '16px',
        padding: '5px',
        minWidth: "128px",
        minHeight: "128px",
        width: "128px",
        height: "128px",
        objectFit: "fill" as 'fill'
    },
    banner: {
        borderRadius: '12px',
        width: "100%",
        minHeight: "210px",
        objectFit: "cover" as 'cover'
    },
    imgHolder: {
        width: '100%',
        position: 'relative',
        flexDirection: 'column',
        display: 'flex',
        height: '270px',
        alignItems: 'center'
    },
    gridsHolder: {
        width: '100%',
        padding: '4rem 4rem 6rem 4rem',
        display: 'flex',
        flexDirection: 'column'
    },
    createBox: {
        "&:hover": {
            transform: 'scale(1.025)'
        },
        transition: "transform 0.5s ease, top 0.5s ease",
        textAlign: 'center',
        padding: '16px 16px 24px 16px',
        cursor: 'pointer',
        justifyContent: 'center',
        marginLeft: '5px',
        background: 'transparent',
        border: "1px dashed #363E5A",
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '318px',
        minHeight: '360px',
        width: '100%',
        height: '360px',
        borderRadius: '16px',
    },
    gridDataBox: {
        "&:hover": {
            transform: 'scale(1.025)'
        },
        justifyContent: 'center',
        transition: "transform 0.5s ease, top 0.5s ease",
        cursor: 'pointer',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 16px 24px 16px',
        minWidth: '318px',
        width: '100%',
        height: '360px',
        borderRadius: '16px',
        background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_100
    },
    spinner: {
        width: '80px',
        height: '80vh',
        display: 'flex',
        alignSelf: 'center',
        stroke: COLORS_DARK_THEME.PRIMARY_BLUE
    }
}
