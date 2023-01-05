import { COLORS_DARK_THEME } from "./colors";

export const themeStyles = {
    centerFlexLinear: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    icons: {
        marginLeft: '10px',
        cursor: 'pointer'
    },
    iconHolder: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        padding: '12px',
        borderRadius: '50%',
        background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY
    }
}
