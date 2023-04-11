import React, { useState, Fragment, useCallback, useEffect } from 'react';
import { Box, Fade, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { GET_ALL_ALLOWLISTS } from '../../../../core/api/calls';
import { COLORS } from '../../../../core/theme/colors';
import { RootState } from '../../../../core/store';
import { FetchedAllowlist } from '../../../../core/store/allowlist';
import { StyledPuffLoader } from '../../../../core/presentation/components/Layout/helpers';
import CreatedAllowlistsPreview from './CreatedAllowlists';
import JoinedAllowlistsPreview from './JoinedAllowlists';

import { generalStyles } from './styles';

enum MENU_CONTENT {
    Created = 'Created',
    Joined = 'Joined'
}

const DashboardPage = () => {

    //VARIABLES
    const [loadedRightContent, setLoadedRightContent] = useState<boolean>(true)
    const [loadingData, setLoadingData] = useState<boolean>(true)
    const [joinedAllowlists, setJoinedAllowlists] = useState<FetchedAllowlist[]>([])
    const [createdAllowlists, setCreatedAllowlists] = useState<FetchedAllowlist[]>([])
    const [menuSelection, setMenuSelection] = useState<MENU_CONTENT>(MENU_CONTENT.Created)
    const { userId, connectedAddress } = useSelector((state: RootState) => state.userState)
    const menuSwitchingTimeout = 200

    const MenuContentMapper = {
        [MENU_CONTENT.Created]: <CreatedAllowlistsPreview data={createdAllowlists} />,
        [MENU_CONTENT.Joined]: <JoinedAllowlistsPreview data={joinedAllowlists} />
    }

    //FUNCTIONS
    const loadData = async () => {
        try {
            setLoadingData(true)
            const joined = []
            const created = []
            const allAllowlists = await GET_ALL_ALLOWLISTS()
            allAllowlists.forEach((record) => {
                if (userId && record.users.includes(userId.toString())) {
                    joined.push(record)
                    return
                }
                if (connectedAddress && record.admin === connectedAddress) {
                    created.push(record)
                    return
                }
            })

            setJoinedAllowlists(joined)
            setCreatedAllowlists(created)

        } finally {
            setLoadingData(false)
        }
    }

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

    //COMPONENTS
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
        if (!loadingData) {
            return MenuContentMapper[menuSelection]
        }
    }, [menuSelection, loadingData])


    //EFFECTS
    useEffect(() => {
        if (!loadingData) {
            const selectedItem = document.getElementById(`menu-${menuSelection}`)
            if (selectedItem) {
                selectedItem.style.backgroundColor = COLORS.STEEL_GRAY[80]
            }
        }
    }, [menuSelection, loadingData])

    useEffect(() => {
        if (connectedAddress) {
            loadData()
        }
    }, [connectedAddress])

    //CONTENT
    return loadingData ? <StyledPuffLoader /> : (
        <Box id='dashboard' gap={4} sx={generalStyles.dashboardHolder}>
            <Box id='dashboardMenu' sx={generalStyles.dashboardMenu}>
                <MenuItems />
            </Box>
            <Fade in={loadedRightContent} timeout={menuSwitchingTimeout}>
                <Box id='dashboardRightContent' width={'100%'}>
                    <MenuContent />
                </Box>
            </Fade>
        </Box>
    )
}

export default DashboardPage
