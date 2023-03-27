import React from 'react';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { updateModalState } from '../../../store/modals';
import { RootState } from '../../../store';
import Menu from './Menu';
import { HashBasedUserAvatar, LAYOUT_CONTENT_TEXT, SvgComponent } from './helpers';
import { CopyAndFollowComponent } from '../../../theme/helpers';
import { formatAddress } from '../../../utilities/ProjectUtils';
import { COLORS_DARK_THEME } from '../../../theme/colors';
import useDisconnectUser from '../../../utilities/CustomHooks/useDisconnect';

import { headerStyles } from './styles';

const HamburgerMenu = () => {

    const dispatch = useDispatch()
    const disconnectUser = useDisconnectUser()
    const { connectedAddress } = useSelector((state: RootState) => state.userState)

    const handleClick = () => {
        dispatch(updateModalState({ selectWallet: true }))
    }

    return (
        <Box gap={2} id='hamburgerMenuContent' sx={headerStyles.hamburgerMenuContent} >
            <Divider sx={headerStyles.hamburgerTopWideDivider} />
            <Menu hamburger={true} />
            <Divider orientation={'horizontal'} sx={headerStyles.hamburgerMidDivider} />
            {connectedAddress ?
                <Box gap={2} sx={headerStyles.hamburgerAddressHolder}>
                    <Box gap={2} sx={headerStyles.hamburgerFlexLine}>
                        <HashBasedUserAvatar UID={connectedAddress} size={48} />
                        <Typography fontWeight={700}>{formatAddress(connectedAddress, 7)}</Typography>
                    </Box>
                    <Box gap={2} sx={headerStyles.hamburgerFlexLine}>
                        <CopyAndFollowComponent address={connectedAddress} />
                        <Paper elevation={1} sx={headerStyles.hamburgerDropDownContentHolder}>
                            <Box gap={2} sx={headerStyles.hamburgerDropDownItemHolder}>
                                <Typography onClick={disconnectUser}>
                                    {`Disconnect`}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
                :
                <Button
                    variant="contained"
                    style={{ justifyContent: 'center' }}
                    sx={{ ...headerStyles.logInBtn, bgcolor: COLORS_DARK_THEME.PRIMARY_BLUE }}
                    onClick={handleClick}
                >
                    <Box id='hashLogoAndAddressHolder' gap={1} sx={{ marginLeft: '0px', display: 'flex', alignItems: 'center' }}>
                        <SvgComponent
                            type={LAYOUT_CONTENT_TEXT.WalletLogo}
                            style={{ height: '24px', marginRight: '5px' }}
                        />
                        <Typography fontWeight={700}>{LAYOUT_CONTENT_TEXT.ConnectWallet} </Typography>
                    </Box>
                </Button>
            }
            <Divider sx={headerStyles.hamburgerBottomWideDivider} />
        </Box>
    );
};

export default HamburgerMenu;
