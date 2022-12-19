import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import AppRoutes from '../../entities/AppRoutes';

import NotFoundPage from '../../../not-found/presensation/components/NotFoundPage';

import '../styles/app-router.css';
import CreateAllowlistPage from '../../../allowlists/presentation/pages/create-allowlist';
import MyAllowlistsPage from '../../../allowlists/presentation/pages/my-allowlists';
import AllAllowlistsPage from '../../../allowlists/presentation/pages/all-allowlists';
import Header from './Header';
import Home from './home';
import AllowlistPage from '../../../allowlists/presentation/pages/allowlist';

const AppRouter = ({ walletStore }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState('PageTransitionIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransistionStage('PageTransitionOut');
    }
  }, [location, displayLocation]);

  const onRouterTransitionEnd = () => {
    if (transitionStage === 'PageTransitionOut') {
      setTransistionStage('PageTransitionIn');
      setDisplayLocation(location);
    }
  };

  return (
    <div
      className={`AppRouter ${transitionStage}`}
      onAnimationEnd={onRouterTransitionEnd}
    >
      <Header walletStore={walletStore} />
      <Routes location={displayLocation}>
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
      </Routes>
    </div>
  );
};

export default AppRouter;