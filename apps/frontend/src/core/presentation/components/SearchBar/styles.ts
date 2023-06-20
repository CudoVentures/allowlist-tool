import { COLORS } from '../../../theme/colors';

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
        border: `1px solid ${COLORS.STEEL_GRAY[70]}`,
    },
    cancelIcon: {
        marginRight: '-10px',
        marginTop: '5px',
        cursor: 'pointer',
        height: '20px',
        color: COLORS.STEEL_GRAY[40],
    },
    searchBar: (expandSearchBar: boolean, noResult: boolean, width?: string) => {
        return {
            width: expandSearchBar ? width : '48px',
            cursor: 'pointer',
            transition: 'width .4s ease-in-out',
            padding: '15px 24px 15px 20px',
            height: '48px',
            border: noResult ? `1px solid ${COLORS.RED[60]}` : `1px solid ${COLORS.STEEL_GRAY[70]}`,
            borderRadius: '64px',
        }
    },
    chainSelector: {
        width: '48px',
        cursor: 'pointer',
        transition: 'width .4s ease-in-out',
        padding: '15px 24px 15px 20px',
        height: '48px',
        border: `1px solid ${COLORS.STEEL_GRAY[70]}`,
        borderRadius: '64px',

    },
    menuItem: {
        height: '48px',
        borderRadius: '10px',
        width: '100%',
        '&:focus': {
            backgroundColor: 'transparent !important',
        },
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: `${COLORS.STEEL_GRAY[90]} !important`,
        },
        '&:selected:hover': {
            backgroundColor: `${COLORS.STEEL_GRAY[90]} !important`,
        },
        '&:focus:hover': {
            backgroundColor: `${COLORS.STEEL_GRAY[90]} !important`,
        },
    },
    chainSelectorDropoDownMenuProps: {
        PaperProps: {
            sx: {
                '& .MuiList-root': {
                    width: '100%',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                },
            },
            style: {
                display: 'flex',
                marginTop: '15px',
                background: COLORS.STEEL_GRAY[100],
                borderRadius: '8px',
                marginLeft: '-18px',
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
                    gap: '4px',
                },
            },
            style: {
                display: 'flex',
                marginTop: '15px',
                background: COLORS.STEEL_GRAY[100],
                borderRadius: '8px',
                marginLeft: '8px',
                minWidth: '192px',
                maxWidth: '192px',
            },
        },
    },
    chainSelectorDropDown: {
        width: '100%',
        height: '48px',
        borderRadius: '64px',
    },
    filterDropDown: {
        padding: '15px 24px 15px 20px',
        minWidth: '192px',
        maxWidth: '192px',
        height: '48px',
        border: `1px solid ${COLORS.STEEL_GRAY[70]}`,
        borderRadius: '64px',
    },
    dropDownPlaceholder: {
        fontSize: '14px',
        fontWeight: 600,
        color: COLORS.STEEL_GRAY[20],
    },
}
