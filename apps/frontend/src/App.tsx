import React, { Fragment } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

import theme from './core/theme';
import Layout from './core/presentation/components/Layout';
import AppRoutes from './features/app-routes/entities/AppRoutes';
import Home from './features/app-routes/presentation/components/Home';
import CreateAllowlistPage from './features/allowlists/presentation/pages/CreateAllowlist';
import AllowlistPage from './features/allowlists/presentation/pages/AllowlistPage';

const App = () => {

  const location = useLocation()

  return (
    <Fragment>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ParallaxProvider>
            <Layout>



              <Routes>
                <Route path={AppRoutes.MAIN} element={<Home />} />
                <Route
                  path={AppRoutes.CREATE_ALLOWLIST}
                  element={<CreateAllowlistPage />}
                />
                <Route
                  path={AppRoutes.ALLOWLIST}
                  element={<AllowlistPage />}
                />
                {/* <Route path={AppRoutes.ALLOWLISTS} element={<AllAllowlistsPage />} />
        <Route
          path={AppRoutes.MY_ALLOWLISTS}
          element={<MyAllowlistsPage walletStore={walletStore} />}
        /> */}
                <Route path="*" element={<Navigate to={AppRoutes.MAIN} state={{ from: location }} />} />
              </Routes>
            </Layout>
          </ParallaxProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </Fragment >
  );
};

export default App;
