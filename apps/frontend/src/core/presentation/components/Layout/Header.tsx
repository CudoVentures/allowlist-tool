import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Collapse, Typography, Paper, Divider, AppBar } from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { formatAddress, isMainnetInstance } from '../../../utilities/ProjectUtils';
import { DropDownItem, HashBasedUserAvatar, LAYOUT_CONTENT_TEXT, SvgComponent } from './helpers';
import { RootState } from '../../../store';
import { updateUser } from '../../../store/user';
import { initialState as initialUserState } from '../../../store/user';
import { disconnectWalletByType } from '../../../../features/wallets/helpers';
import AppRoutes from '../../../../features/app-routes/entities/AppRoutes';
import { updateModalState, initialState as initialModalState } from '../../../store/modals';
import Dialog from '../Dialog';
import { COLORS_DARK_THEME } from '../../../theme/colors';
import { useLowerResCheck } from '../../../utilities/CustomHooks/screenChecks';

import { headerStyles } from './styles';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { connectedAddress, connectedWallet } = useSelector((state: RootState) => state.userState)
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const isLowerRes = useLowerResCheck()
  const [user, setUser] = useState({
    twitterUsername: '',
    discordUsername: '',
  });

  const setSocialMediaUser = async () => {
    const res = await axios.get('api/v1/user');
    setUser({
      twitterUsername: res.data.twitter_profile_username,
      discordUsername: res.data.discord_profile_username,
    })
  }

  // const onClickAuth = async (service: string) => {
  //   const url = `api/v1/auth/${service}/login`;
  //   window.open(url, '_self');
  // };


  const handleClick = () => {
    if (isConnected) {
      setOpenMenu(!openMenu)
      return;
    }

    dispatch(updateModalState({ selectWallet: true }))
  }

  const handleDisconnect = async () => {
    sessionStorage.clear()
    localStorage.clear()
    dispatch(updateUser(initialUserState))
    dispatch(updateModalState(initialModalState))
    await disconnectWalletByType(connectedWallet!)
    navigate(AppRoutes.MAIN)
  }

  useEffect(() => {
    if (connectedAddress) {
      setIsConnected(true)
      setSocialMediaUser()
      return
    }

    setIsConnected(false)
  }, [connectedAddress])

  return (
    <AppBar
      id='header'
      elevation={5}
      sx={isLowerRes ? headerStyles.holderLowRes : headerStyles.holder}
      component="nav"
    >
      <Dialog />
      <Box
        onClick={() => navigate(AppRoutes.MAIN)}
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
              color='#E89518'
              fontWeight={300}
              component="span"
              fontSize={18}
            >
              Testnet
            </Typography> :
            null}
        </Typography>
      </Box>
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
            {isConnected ? <HashBasedUserAvatar UID={connectedAddress} size={25} /> :
              <SvgComponent
                type={LAYOUT_CONTENT_TEXT.WalletLogo}
                style={{ height: '24px', marginRight: '5px' }}
              />}
            <Typography fontWeight={700}>
              {isConnected ?
                formatAddress(connectedAddress, 7) :
                LAYOUT_CONTENT_TEXT.ConnectWallet}
            </Typography>
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
            <Box gap={1} sx={headerStyles.dropDownItemHolder}>
              <DropDownItem
                type={LAYOUT_CONTENT_TEXT.UserIcon}
                onClick={() => setOpenMenu(true)}
              />
              <Divider sx={{ width: '100%' }} />
              <DropDownItem
                type={LAYOUT_CONTENT_TEXT.Logout}
                onClick={handleDisconnect}
              />
            </Box>
          </Paper>
        </Collapse>
      </Box>
    </AppBar>

    // <header
    //   style={{
    //     width: '100%',
    //     display: 'flex',
    //     justifyContent: 'flex-end',
    //     alignItems: 'center',
    //     gap: '1rem',
    //     paddingTop: '1rem',
    //   }}
    // >
    //   {isConnected && (
    //     <button onClick={() => onClickAuth('twitter')}>
    //       {user.twitterUsername ? user.twitterUsername : 'Twitter login'}
    //     </button>
    //   )}
    //   {isConnected && (
    //     <button onClick={() => onClickAuth('discord')}>
    //       {user.discordUsername ? user.discordUsername : 'Discord login'}
    //     </button>
    //   )}
    //   <button onClick={() => connectWallet()}>
    //     {isConnected ? walletStore.getAddress() : 'Connect Keplr'}
    //   </button>
    // </header>
  );
};

export default Header;
