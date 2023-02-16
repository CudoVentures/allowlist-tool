import React, { Fragment, useCallback, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { isExtensionEnabled, SUPPORTED_WALLET } from 'cudosjs';
import { useDispatch } from 'react-redux';

import theme from './core/theme';
import Layout from './core/presentation/components/Layout';
import AppRoutes from './features/app-routes/entities/AppRoutes';
import Home from './features/app-routes/presentation/components/Home';
import CreateAllowlistPage from './features/allowlists/presentation/pages/CreateAllowlist';
import AllowlistPage from './features/allowlists/presentation/pages/AllowlistPage';
import EditAllowlistPage from './features/allowlists/presentation/pages/EditAllowlist';
import AllAllowlistsPage from './features/allowlists/presentation/pages/AllAllowlistsPage';
import { updateModalState } from './core/store/modals';
import { connectUser } from './features/wallets/helpers';
import { updateUser } from './core/store/user';
import useSocialMedia from './core/utilities/CustomHooks/useSocialMedia';

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
