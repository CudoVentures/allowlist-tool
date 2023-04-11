import { COLORS } from "../../../../core/theme/colors"

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
    noJoinedTitle: {
        alignSelf: 'flex-start',
        color: COLORS.LIGHT_BLUE[10]
    },
    noJoinedSubtitle: {
        marginTop: '15%',
        alignSelf: 'center',
        textAlign: 'center',
        color: COLORS.LIGHT_BLUE[10]
    },
    noJoinedHolder: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column'
    },
    noJoinedBtn: {
        margin: '35px 0px 10% 0px',
        alignSelf: 'center',
        width: '192px',
        height: '48px'
    },
    dashboardMenu: {
        marginTop: '-10px',
        gap: '8px',
        width: '50%',
        minWidth: 'max-content',
        maxWidth: '270px',
        display: 'flex',
        flexDirection: 'column'
    },
    dasboardMenuItem: (menuSwitchingTimeout: number) => {
        return {
            cursor: 'pointer',
            padding: '18px 16px',
            borderRadius: '8px',
            transition: `background-color 0.${menuSwitchingTimeout}s`,
            backgroundColor: 'transparent'
        }
    },
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
        color: COLORS.LIGHT_BLUE[90]
    },
    collapsebleTextHolder: {
        justifyContent: 'flex-start',
        marginBottom: '-10px',
        cursor: 'pointer',
        alignItems: 'center',
        display: 'flex'
    },
    plusIconBackground: {
        background: COLORS.LIGHT_BLUE[90],
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
        color: COLORS.STEEL_GRAY[20]
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
    dashboardHolder: {
        width: '100%',
        padding: '4rem 4rem 6rem 4rem',
        display: 'flex'
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
        height: '360px',
        borderRadius: '16px',
        background: COLORS.STEEL_GRAY[100]
    },
    spinner: {
        width: '40px',
        height: '80vh',
        display: 'flex',
        alignSelf: 'center',
        stroke: COLORS.LIGHT_BLUE[90]
    }
}
