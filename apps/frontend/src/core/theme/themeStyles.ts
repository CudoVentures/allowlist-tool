import { COLORS } from './colors';

export const themeStyles = {
    logoHolder: {
        gap: '10px',
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerFlexLinear: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    centerFlexColumn: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    icons: {
        marginLeft: '10px',
        cursor: 'pointer',
    },
    iconHolder: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        padding: '12px',
        borderRadius: '50%',
        background: COLORS.STEEL_GRAY[90],
        '&:hover': {
            background: COLORS.STEEL_GRAY[80],
        },
        '&:click': {
            background: COLORS.STEEL_GRAY[70],
        },
    },
}
