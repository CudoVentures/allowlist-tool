import React, { Fragment } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './core/theme';
import Layout from './core/presentation/components/Layout';

const App = () => {

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>

          {/* CONTENT PAGES HERE */}

          {/* {'TEST CONTENT'.repeat(2000)} */}

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

        </Layout>
      </ThemeProvider>
    </Fragment >
  );
};

export default App;
