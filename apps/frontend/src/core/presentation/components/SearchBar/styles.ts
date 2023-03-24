import { COLORS_DARK_THEME } from "../../../theme/colors";

export const styles = {
    sortingOrder: {
        width: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        height: '48px',
        borderRadius: '64px',
        padding: '15px 20px',
        border: `1px solid ${COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_70}`
    },
    cancelIcon: {
        marginTop: '5px',
        cursor: 'pointer',
        height: '20px', color: COLORS_DARK_THEME.SECONDARY_TEXT
    },
    searchBar: {
        cursor: 'pointer',
        transition: 'width .4s ease-in-out',
        padding: '15px 24px 15px 20px',
        height: '48px',
        border: `1px solid ${COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_70}`,
        borderRadius: '64px'
    },
    filterDropoDownMenuProps: {
        PaperProps: {
            style: {
                marginTop: '15px',
                background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_100,
                borderRadius: '8px',
                marginLeft: '8px',
                minWidth: '192px',
                maxWidth: '192px'
            },
        },
    },
    filterDropDown: {
        padding: '15px 24px 15px 20px',
        minWidth: '192px',
        maxWidth: '192px',
        height: '48px',
        border: `1px solid ${COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_70}`,
        borderRadius: '64px'
    },
    dropDownPlaceholder: {
        fontSize: '14px',
        fontWeight: 600,
        color: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20
    }
}
