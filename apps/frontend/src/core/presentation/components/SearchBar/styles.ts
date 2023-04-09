import { COLORS_DARK_THEME } from "../../../theme/colors";

export const styles = {
    sortingOrder: {
        width: '48px',
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
        marginRight: '-10px',
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
    menuItem: {
        height: '48px',
        borderRadius: '10px',
        width: '100%',
        "&:focus": {
            backgroundColor: 'transparent !important',
        },
        "&:hover": {
            cursor: 'pointer',
            backgroundColor: `${COLORS_DARK_THEME.PRIMARY_STEEL_GRAY} !important`
        },
        "&:selected:hover": {
            backgroundColor: `${COLORS_DARK_THEME.PRIMARY_STEEL_GRAY} !important`
        },
        "&:focus:hover": {
            backgroundColor: `${COLORS_DARK_THEME.PRIMARY_STEEL_GRAY} !important`
        }
    },
    chainSelectorDropoDownMenuProps: {
        PaperProps: {
            sx: {
                '& .MuiList-root': {
                    width: '100%',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                }
            },
            style: {
                display: 'flex',
                marginTop: '15px',
                background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_100,
                borderRadius: '8px',
                marginLeft: '-18px',
                minWidth: '200px',
                maxWidth: '200px'
            },
        },
    },
    filterDropoDownMenuProps: {
        PaperProps: {
            sx: {
                '& .MuiList-root': {
                    width: '100%',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                }
            },
            style: {
                display: 'flex',
                marginTop: '15px',
                background: COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_100,
                borderRadius: '8px',
                marginLeft: '8px',
                minWidth: '192px',
                maxWidth: '192px'
            },
        },
    },
    chainSelectorDropDown: {
        width: '100%',
        height: '48px',
        borderRadius: '64px'
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
