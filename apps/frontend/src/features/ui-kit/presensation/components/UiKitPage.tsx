import React from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import AppRoutes from '../../../app-routes/entities/AppRoutes';

import AlertStore from '../../../../core/presentation/stores/AlertStore';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';

import '../styles/ui-kit-page.css';

interface Props {
    alertStore?: AlertStore;
}

const UiKitPage = (props: Props) => {
    const navigate = useNavigate();

    const onClickNavigate = () => {
        navigate(AppRoutes.NOT_FOUND);
    }

    const onClickShowAlert = () => {
        props.alertStore.show('Alert');
    }

    return (
        <PageLayoutComponent
            className = { 'UiKitPage' }
            modals = { [
            ] } >
            <span onClick = { onClickNavigate } >UiKitPage</span>
            <span onClick = { onClickShowAlert } >show alert</span>
        </PageLayoutComponent>
    )

}

export default inject('alertStore')(observer(UiKitPage));
