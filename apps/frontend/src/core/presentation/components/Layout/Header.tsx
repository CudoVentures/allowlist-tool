import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Collapse, Typography, Paper, Divider, AppBar } from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import { useDispatch, useSelector } from 'react-redux'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { formatAddress, isMainnetInstance } from '../../../utilities/ProjectUtils';
import { HashBasedUserAvatar, LAYOUT_CONTENT_TEXT, SvgComponent } from './helpers';
import { RootState } from '../../../store';
import AppRoutes from '../../../../features/app-routes/entities/AppRoutes';
import { updateModalState } from '../../../store/modals';
import Dialog from '../Dialog';
import { COLORS_DARK_THEME } from '../../../theme/colors';
import { useIsScreenLessThan } from '../../../utilities/CustomHooks/screenChecks';
import Menu from './Menu';
import { CopyAndFollowComponent } from '../../../theme/helpers';
import useNavigateToRoute from '../../../utilities/CustomHooks/useNavigateToRoute';
import useDisconnectUser from '../../../utilities/CustomHooks/useDisconnect';
import HamburgerMenu from './HamburgerMenu';

import { headerStyles } from './styles';

const Header = () => {
  const dispatch = useDispatch()
  const navigateToRoute = useNavigateToRoute()
  const disconnectUser = useDisconnectUser()
  const navBar = useRef<HTMLInputElement>()
  const { connectedAddress } = useSelector((state: RootState) => state.userState)
  const { hamburgerMenu } = useSelector((state: RootState) => state.modalState)
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const isScreenLessThan1280px = useIsScreenLessThan('1280px', 'width')

  const handleCloseTransition = () => {
    navBar.current.style.opacity = '0'
    setTimeout(() => {
      navBar.current.style.opacity = '1'
    }, 350)
  }

  const closeHamburgerMenu = () => {
    handleCloseTransition()
    dispatch(updateModalState({ hamburgerMenu: false }))
  }

  const openHamburgerMenu = () => {
    dispatch(updateModalState({ hamburgerMenu: true }))
  }

  const toggleBodyScroll = (disable: boolean) => {
    document.body.style.overflow = disable ? 'hidden' : 'auto';
    document.body.style.paddingRight = disable ? '4px' : '0px';
  };

  const handleClick = () => {
    if (isConnected) {
      setOpenMenu(!openMenu)
      return;
    }

    dispatch(updateModalState({ selectWallet: true }))
  }

  useEffect(() => {
    if (connectedAddress) {
      setIsConnected(true)
      return
    }

    setIsConnected(false)
  }, [connectedAddress])

  useEffect(() => {
    toggleBodyScroll(hamburgerMenu)
  }, [hamburgerMenu])

  return (
    <AppBar
      id='header'
      elevation={0}
      sx={hamburgerMenu ? headerStyles.hamburger : headerStyles.holder}
      component="nav"
    >
      <Dialog />
      <Box id='leftNavContentAndIcon'
        sx={{ ...headerStyles.leftNavContentAndIcon, paddingTop: hamburgerMenu ? '8px' : '0px', marginBottom: hamburgerMenu ? '60px' : '0px' }}>
        <Box
          ref={navBar}
          style={{ width: "max-content" }}
          id='leftNavContent'
          onClick={() => navigateToRoute(AppRoutes.MAIN)}
          gap={1}
          sx={headerStyles.logoGroup}
        >
          <SvgComponent style={{ height: '32px' }} type={LAYOUT_CONTENT_TEXT.MainCudosLogo} />
          <Divider
            orientation='vertical'
            sx={headerStyles.divider}
          />
          <Typography fontWeight={700} variant="h6" color="text.primary">
            Allowlist Tool
            {!isMainnetInstance() ?
              <Typography
                marginLeft={1}
                color={COLORS_DARK_THEME.TESTNET_ORANGE}
                fontWeight={300}
                component="span"
                fontSize={18}
              >
                Testnet
              </Typography> :
              null}
          </Typography>
        </Box>
        {hamburgerMenu ? <CloseIcon style={{ cursor: 'pointer' }} fontSize='medium' onClick={closeHamburgerMenu} /> : null}
        {isScreenLessThan1280px && !hamburgerMenu ? <MenuIcon style={{ cursor: 'pointer' }} fontSize='large' onClick={openHamburgerMenu} /> : null}
      </Box>
      {
        hamburgerMenu ? <HamburgerMenu /> : isScreenLessThan1280px ? null :
          <Box
            id='rightNavContent'
            gap={2}
            sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Menu />
            <Divider
              orientation='vertical'
              sx={headerStyles.divider}
            />
            <Box sx={headerStyles.btnHolder}>
              <ClickAwayListener
                onClickAway={() => setOpenMenu(false)}
                children={<Button
                  variant="contained"
                  style={{ justifyContent: isConnected ? 'space-between' : 'center' }}
                  sx={{
                    ...
                    headerStyles.logInBtn,
                    bgcolor: isConnected ? COLORS_DARK_THEME.PRIMARY_STEEL_GRAY : COLORS_DARK_THEME.PRIMARY_BLUE
                  }}
                  onMouseEnter={() => isConnected ? setOpenMenu(true) : null}
                  onClick={handleClick}
                >
                  <Box id='hashLogoAndAddressHolder' gap={1} sx={{ marginLeft: isConnected ? '-6px' : '0px', display: 'flex', alignItems: 'center' }}>
                    {isConnected ? <HashBasedUserAvatar UID={connectedAddress} size={23} /> :
                      <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.WalletLogo}
                        style={{ height: '24px', marginRight: '5px' }}
                      />}
                    <Typography fontWeight={700}>
                      {isConnected ?
                        formatAddress(connectedAddress, 7) :
                        LAYOUT_CONTENT_TEXT.ConnectWallet}
                    </Typography>
                  </Box>
                  {isConnected ?
                    <SvgComponent
                      type={LAYOUT_CONTENT_TEXT.ArrowIcon}
                      style={{ color: COLORS_DARK_THEME.PRIMARY_BLUE, transform: openMenu ? 'rotate(180deg)' : 'rotate(360deg)' }}
                    /> : null}
                </Button>}
              />
              <Collapse
                sx={headerStyles.collapse}
                onMouseEnter={() => setOpenMenu(true)}
                onMouseLeave={() => setOpenMenu(false)}
                in={openMenu}
              >
                <Paper elevation={1} sx={headerStyles.dropDownContentHolder}>
                  <Box gap={2} sx={headerStyles.dropDownItemHolder}>
                    <HashBasedUserAvatar UID={connectedAddress} size={50} />
                    <Typography color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}>
                      {formatAddress(connectedAddress, 10)}
                    </Typography>
                    <CopyAndFollowComponent address={connectedAddress} />
                    <Button
                      variant="contained"
                      sx={headerStyles.disconnectBtn}
                      onClick={disconnectUser}
                    >
                      Disconnect
                    </Button>
                  </Box>
                </Paper>
              </Collapse>
            </Box>
          </Box>
      }
    </AppBar >
  );
};

export default Header;
