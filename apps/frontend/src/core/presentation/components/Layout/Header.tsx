import React, { useEffect, useState } from 'react';
import { Box, Button, Collapse, Typography, Paper, Divider, AppBar } from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { formatAddress, isMainnetInstance } from '../../../utilities/ProjectUtils';
import { HashBasedUserAvatar, LAYOUT_CONTENT_TEXT, SvgComponent } from './helpers';
import { RootState } from '../../../store';
import { updateUser } from '../../../store/user';
import { initialState as initialUserState } from '../../../store/user';
import { disconnectWalletByType } from '../../../../features/wallets/helpers';
import AppRoutes from '../../../../features/app-routes/entities/AppRoutes';
import { updateModalState, initialState as initialModalState } from '../../../store/modals';
import Dialog from '../Dialog';
import { COLORS_DARK_THEME } from '../../../theme/colors';
import { useMidLowerResCheck } from '../../../utilities/CustomHooks/screenChecks';
import Menu from './Menu';
import { CopyAndFollowComponent } from '../../../theme/helpers';

import { headerStyles } from './styles';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { connectedAddress, connectedWallet } = useSelector((state: RootState) => state.userState)
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const isMidLowerRes = useMidLowerResCheck()

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
      return
    }

    setIsConnected(false)
  }, [connectedAddress])

  return (
    <AppBar
      id='header'
      elevation={0}
      sx={isMidLowerRes ? headerStyles.holderLowRes : headerStyles.holder}
      component="nav"
    >
      <Dialog />
      <Box
        id='leftNavContent'
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
      <Box
        id='rightNavContent'
        gap={2}
        sx={{ display: 'flex', alignItems: 'center' }}>
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
              <Box gap={2} sx={headerStyles.dropDownItemHolder}>
                <HashBasedUserAvatar UID={connectedAddress} size={50} />
                <Typography color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}>
                  {formatAddress(connectedAddress, 10)}
                </Typography>
                <CopyAndFollowComponent address={connectedAddress} />
                <Button
                  variant="contained"
                  sx={headerStyles.disconnectBtn}
                  onClick={handleDisconnect}
                >
                  Disconnect
                </Button>
              </Box>
            </Paper>
          </Collapse>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
