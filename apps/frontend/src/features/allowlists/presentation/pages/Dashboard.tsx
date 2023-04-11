import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Box, Fade, Typography } from '@mui/material';

import { generalStyles } from './styles';
import { COLORS } from '../../../../core/theme/colors';

enum MENU_CONTENT {
    Created = 'Created',
    Joined = 'Joined'
}

const MenuContentMapper = {
    [MENU_CONTENT.Created]: <Typography>Created</Typography>,
    [MENU_CONTENT.Joined]: <Typography>Joined</Typography>
}

const DashboardPage = () => {

    const [loadedRightContent, setLoadedRightContent] = useState<boolean>(true)
    const [menuSelection, setMenuSelection] = useState<MENU_CONTENT>(MENU_CONTENT.Joined)
    const menuSwitchingTimeout = 200

    const isMenuItemSelected = (menuItem: MENU_CONTENT) => {
        if (!loadedRightContent) {
            return false
        }
        return menuSelection === menuItem
    }

    const handleMenuSelection = (menuItem: MENU_CONTENT) => {
        if (!isMenuItemSelected(menuItem)) {
            setLoadedRightContent(false)
            setTimeout(() => {
                setMenuSelection(menuItem)
                setLoadedRightContent(true)
            }, menuSwitchingTimeout)
        }
    }

    const MenuItems = useCallback(() => {
        return <Fragment>
            {Object.values(MENU_CONTENT).map((menuItem, idx) => {
                return (
                    <Box
                        id={`menu-${menuItem}`}
                        onClick={() => handleMenuSelection(menuItem)}
                        key={menuItem + idx.toString()}
                        sx={generalStyles.dasboardMenuItem(menuSwitchingTimeout)}
                    >
                        <Typography variant='subtitle1' fontWeight={700}>
                            {menuItem}
                        </Typography>
                    </Box>
                )
            })}
        </Fragment>
    }, [menuSelection])

    const MenuContent = useCallback((): JSX.Element => {
        return MenuContentMapper[menuSelection]
    }, [menuSelection])

    useEffect(() => {
        const selectedItem = document.getElementById(`menu-${menuSelection}`)
        if (selectedItem) {
            selectedItem.style.backgroundColor = COLORS.STEEL_GRAY[80]
        }
    }, [menuSelection])

    return (
        <Box id='dashboard' gap={4} sx={generalStyles.dashboardHolder}>
            <Box id='dashboardMenu' sx={generalStyles.dashboardMenu}>
                <MenuItems />
            </Box>
            <Fade in={loadedRightContent} timeout={menuSwitchingTimeout}>
                <Box id='dashboardRightContent'>
                    <MenuContent />
                </Box>
            </Fade>
        </Box>
    )
}

export default DashboardPage
