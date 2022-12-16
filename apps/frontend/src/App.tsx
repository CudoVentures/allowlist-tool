import React, { Fragment } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';

import theme from './core/theme';
import Header from './core/presentation/components/Layout/Header';
import Footer from './core/presentation/components/Layout/Footer';

const App = () => {

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box id='appWrapper' sx={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box id='contentWrapper' marginTop={10} marginBottom={10} sx={{
              maxWidth: '1320px',
              overflowWrap: 'break-word',
              overflow: 'auto',
              padding: '0 2rem',
              display: 'flex',
            }}>
              <Box>
                {"CONTENT TEST ".repeat(1000)}
              </Box>
            </Box>
          </Box>

          <Footer />
        </Box>

        {/* <Routes location={displayLocation}>
        <Route path={AppRoutes.MAIN} element={<Home />} />
        <Route
          path={AppRoutes.ALLOWLIST}
          element={<AllowlistPage walletStore={walletStore} />}
        />
        <Route path={AppRoutes.ALLOWLISTS} element={<AllAllowlistsPage />} />
        <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
        <Route
          path={AppRoutes.CREATE_ALLOWLIST}
          element={<CreateAllowlistPage walletStore={walletStore} />}
        />
        <Route
          path={AppRoutes.MY_ALLOWLISTS}
          element={<MyAllowlistsPage walletStore={walletStore} />}
        />
      </Routes> */}
      </ThemeProvider>
    </Fragment >
  );
};

export default App;
