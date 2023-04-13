import { COLORS } from "../../../../../../core/theme/colors"

export const styles = {
    logoHolder: (logoLoaded: boolean, isLoadingComponent?: boolean) => {
        let extraStyles = isLoadingComponent ? {
            visibility: logoLoaded ? 'hidden' : 'visible',
            position: logoLoaded ? 'absolute' : 'relative'
        } : {
            visibility: logoLoaded ? 'visible' : 'hidden',
            position: logoLoaded ? 'relative' : 'absolute',
        }
        return {
            ...extraStyles,
            gap: '10px',
            height: '24px',
            marginRight: '-24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    logo: {
        width: '24px',
        height: '24px'
    },
    ovalLoader: {
        width: '50px',
        height: '50px',
        margin: '37px 0px',
        stroke: COLORS.LIGHT_BLUE[90]
    },
    pluginWarning: {
        maxWidth: '550px',
        fontSize: '14px',
        height: '60px',
        backgroundColor: 'rgba(82, 166, 248, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        borderRadius: '10px',
        padding: '10px 20px 10px 20px',
        marginBottom: '10px',
    },
    infoIcon: {
        display: 'flex',
        marginRight: '10px',
    },
    connectButton: {
        height: '50px',
        width: '100%'
    },
    btnsHolder: {
        alignItems: 'center',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    keplrLogo: {
        marginRight: '10px',
    },
    cosmostationLogo: {
        marginRight: '10px',
        height: '25px',
    },
    contentHolder: {
        height: '350px',
        width: '500px',
        display: 'block',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
} as const
