import React, { Fragment, useCallback, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { isExtensionEnabled, SUPPORTED_WALLET } from 'cudosjs';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import theme from './core/theme';
import Layout from './core/presentation/components/Layout';
import AppRoutes from './features/app-routes/entities/AppRoutes';
import Home from './features/app-routes/presentation/components/Home';
import CreateAllowlistPage from './features/allowlists/presentation/pages/CreateAllowlist';
import AllowlistPage from './features/allowlists/presentation/pages/AllowlistPage';
import EditAllowlistPage from './features/allowlists/presentation/pages/EditAllowlist';
import AllAllowlistsPage from './features/allowlists/presentation/pages/AllAllowlistsPage';
import MyAllowlistsPage from './features/allowlists/presentation/pages/MyAllowlistsPage';
import { updateModalState } from './core/store/modals';
import { connectUser } from './features/wallets/helpers';
import { updateUser } from './core/store/user';
import useSocialMedia from './core/utilities/CustomHooks/useSocialMedia';
import { WS_MSGS, WS_ROOM } from '../../common/interfaces';
import RequireConnectedWallet from './core/presentation/components/RequireConnectedWallet';

declare let Config: { APP_WS_ID: any, APP_URL: any };

export let socketConnection: Socket<DefaultEventsMap, DefaultEventsMap>;

export const disconnectSocket = () => {
  if (socketConnection && socketConnection.connected) {
    socketConnection.disconnect()
  }
}

export const connectSocket = async (userAddres: string, setMedia: () => Promise<void>) => {
  if (!socketConnection || socketConnection.disconnected) {
    socketConnection = io(Config.APP_URL, {
      query: { customId: Buffer.from(Config.APP_WS_ID + userAddres).toString('base64') }
    });

    socketConnection.on('connect', () => {
      socketConnection.emit(WS_MSGS.join, { roomName: WS_ROOM.socialMediaEvents });
    });

    socketConnection.on(WS_MSGS.socialMediaSuccess, async () => {
      await setMedia()
      disconnectSocket()
    });
  }
}

const App = () => {

  const location = useLocation()
  const dispatch = useDispatch()
  const { disconnectAllSocialMedias } = useSocialMedia()

  const reconnectUser = useCallback(async (ledgerType: SUPPORTED_WALLET) => {
    try {
      dispatch(updateModalState({ pageTransitionLoading: true }))
      const connectedUser = await connectUser(ledgerType)
      await disconnectAllSocialMedias()
      dispatch(updateUser(connectedUser))

    } catch (error) {
      console.error((error as Error).message)

    } finally {
      dispatch(updateModalState({ pageTransitionLoading: false }))
    }
  }, []);

  useEffect(() => {
    if (isExtensionEnabled(SUPPORTED_WALLET.Keplr)) {
      window.addEventListener("keplr_keystorechange",
        async () => {
          await reconnectUser(SUPPORTED_WALLET.Keplr)
          return
        });
    }

    if (isExtensionEnabled(SUPPORTED_WALLET.Cosmostation)) {
      window.cosmostation.cosmos.on("accountChanged",
        async () => {
          await reconnectUser(SUPPORTED_WALLET.Cosmostation)
          return
        });
    }
  }, [reconnectUser])

  useEffect(() => {
    //Clean-up on app closing
    return () => {
      disconnectSocket()
    };
  }, []);

  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ParallaxProvider>
            <Layout>
              <Routes location={location} key={location.pathname}>
                <Route path={AppRoutes.MAIN} element={<Home />} />
                <Route
                  path={AppRoutes.CREATE_ALLOWLIST}
                  element={<CreateAllowlistPage />}
                />
                <Route
                  path={AppRoutes.EDIT_ALLOWLIST}
                  element={<EditAllowlistPage />}
                />
                <Route
                  path={AppRoutes.ALLOWLIST}
                  element={<AllowlistPage />}
                />
                <Route
                  path={AppRoutes.ALLOWLISTS}
                  element={<AllAllowlistsPage />}
                />
                <Route element={<RequireConnectedWallet />}>
                  <Route
                    path={AppRoutes.MY_ALLOWLISTS}
                    element={<MyAllowlistsPage />}
                  />
                </Route>
                <Route
                  path="*"
                  element={<Navigate to={AppRoutes.MAIN} state={{ from: location }} />}
                />
              </Routes>
            </Layout>
          </ParallaxProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </Fragment >
  );
};

export default App;
