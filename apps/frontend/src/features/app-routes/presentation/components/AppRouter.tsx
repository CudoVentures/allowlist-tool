import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import AppRoutes from '../../entities/AppRoutes';

import NotFoundPage from '../../../not-found/presensation/components/NotFoundPage';
import UiKitPage from '../../../ui-kit/presensation/components/UiKitPage';

import '../styles/app-router.css';

const AppRouter = () => {
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
    }

    return (
        <div
            className={`AppRouter ${transitionStage}`}
            onAnimationEnd = { onRouterTransitionEnd } >
            <Routes location = { displayLocation } >
                <Route path = { AppRoutes.HOME } element = { <UiKitPage /> } />
                <Route path = { AppRoutes.NOT_FOUND } element = { <NotFoundPage /> } />
            </Routes>
        </div>
    )
}

export default AppRouter;
