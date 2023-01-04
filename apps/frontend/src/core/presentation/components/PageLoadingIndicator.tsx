import React from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../utilities/Main';
import AppStore from '../stores/AppStore';

import LoadingIndicator from './LoadingIndicator';

import '../styles/page-loading-indicator.css';

interface Props {
    appStore?: AppStore;
}

const PageLoadingIndicator = (props: Props) => {

    return (
        <div className = { `PageLoadingIndicator FlexSingleCenter Transition ActiveVisibilityHidden ${S.CSS.getActiveClassName(props.appStore.hasLoading())}` }>
            <LoadingIndicator margin = { 'auto' } />
        </div>
    )

}

export default inject('appStore')(observer(PageLoadingIndicator));
