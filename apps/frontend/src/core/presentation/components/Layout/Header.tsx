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
import { COLORS } from '../../../theme/colors';
import { useIsScreenLessThan } from '../../../utilities/CustomHooks/screenChecks';
import Menu from './Menu';
import { ConnectedChain, CopyAndFollowComponent } from '../../../theme/helpers';
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
  const [compensateRightMargin, setCompensateRightMargin] = useState<boolean>(false)
  const isScreenLessThan1400px = useIsScreenLessThan('1400px', 'width')

  //Dirty Hack fighting elements displacement on the UI when MUI Select dropdown is active. 
  const observeAriaHidden = () => {
    const rootElement = document.getElementById('root');
    function handleMutations(mutations: any[]) {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'aria-hidden') {
          const isAriaHidden = rootElement.getAttribute('aria-hidden') === 'true';
          setCompensateRightMargin(isAriaHidden)
        }
      });
    }

    const observer = new MutationObserver(handleMutations);
    if (rootElement) {
      observer.observe(rootElement, { attributes: true });
    }

    return () => {
      observer.disconnect();
    };
  }

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

  const hasScrollbar = () => {
    return document.documentElement.scrollHeight > document.documentElement.clientHeight;
  };

  const toggleBodyScroll = (disable: boolean) => {
    document.body.style.overflow = disable ? 'hidden' : 'auto';
    document.body.style.paddingRight = disable && hasScrollbar() ? '4px' : '0px';
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

  useEffect(() => {
    const cleanup = observeAriaHidden();
    return cleanup;
  }, []);

  return (
    <AppBar
      id='header'
      elevation={0}
      sx={hamburgerMenu ? headerStyles.hamburger : headerStyles.holder}
      component="nav"
    >
      <Dialog />
      <Box ref={navBar} id='leftNavContentAndIcon'
        sx={headerStyles.leftNavContentAndIcon(hamburgerMenu)}>
        <Box
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
                color={COLORS.ORANGE[50]}
                fontWeight={300}
                component="span"
                fontSize={18}
              >
                Testnet
              </Typography> :
              null}
          </Typography>
        </Box>
        {hamburgerMenu ?
          <CloseIcon
            style={{ cursor: 'pointer' }}
            fontSize='medium'
            onClick={closeHamburgerMenu}
          /> : null}
        {isScreenLessThan1400px && !hamburgerMenu ?
          <MenuIcon
            style={headerStyles.menuIcon(compensateRightMargin, hasScrollbar())}
            fontSize='large'
            onClick={openHamburgerMenu}
          /> : null}
      </Box>
      {hamburgerMenu ? <HamburgerMenu /> : isScreenLessThan1400px ? null :
        <Box
          id='rightNavContent'
          gap={2}
          sx={headerStyles.rightNavContent(compensateRightMargin, hasScrollbar())}>
          <Menu hamburger={false} />
          {isConnected ? null :
            <Divider
              orientation='vertical'
              sx={headerStyles.divider}
            />}
          <Box onClick={handleClick} sx={headerStyles.btnHolder(openMenu, isConnected)}>
            <ClickAwayListener
              onClickAway={() => setOpenMenu(false)}
              children={isConnected ?
                <Box component={'span'}>
                  <SvgComponent
                    type={LAYOUT_CONTENT_TEXT.WalletLogo}
                    style={{ height: '32px', width: '32px' }}
                  />
                </Box> :
                <Button
                  variant="contained"
                  sx={headerStyles.logInBtn(isConnected)}
                  onClick={handleClick}
                >
                  <Box id='hashLogoAndAddressHolder' gap={1} sx={headerStyles.hashLogoAndAddressHolder(isConnected)}>
                    <SvgComponent
                      type={LAYOUT_CONTENT_TEXT.WalletLogo}
                      style={{ height: '24px', marginRight: '5px' }}
                    />
                    <Typography fontWeight={700}>{LAYOUT_CONTENT_TEXT.ConnectWallet} </Typography>
                  </Box>
                </Button>
              }
            />
            <Collapse
              id='collapseMenu'
              sx={headerStyles.collapse}
              in={openMenu}
            >
              <Paper elevation={1} sx={headerStyles.dropDownContentHolder}>
                <Box gap={2} sx={headerStyles.dropDownItemHolder}>
                  <HashBasedUserAvatar UID={connectedAddress} size={50} />
                  <ConnectedChain />
                  <Typography color={COLORS.STEEL_GRAY[20]}>
                    {formatAddress(connectedAddress, 15)}
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
