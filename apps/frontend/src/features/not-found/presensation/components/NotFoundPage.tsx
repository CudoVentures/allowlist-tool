import React from 'react';
import { useNavigate } from 'react-router-dom';

import AppRoutes from '../../../app-routes/entities/AppRoutes';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';

import '../styles/not-found-page.css';

const NotFoundPage = () => {
    const navigate = useNavigate();

    const onClickNavigate = () => {
        navigate(AppRoutes.HOME);
    }

    return (
        <PageLayoutComponent className = { 'NotFoundPage' } >
            <span onClick = { onClickNavigate } >NotFoundPage</span>
        </PageLayoutComponent>
    )

}

export default NotFoundPage;
