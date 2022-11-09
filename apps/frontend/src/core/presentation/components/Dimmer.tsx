// version 2.0.0

import React from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../utilities/Main';
import AppStore from '../stores/AppStore';

import '../styles/dimmer.css';

interface Props {
    appStore?: AppStore;
}

const Dimmer = (props: Props) => {
    return (
        <div className = { `Dim Transition ActiveVisibilityHidden ${S.CSS.getActiveClassName(props.appStore.hasDimmer())}` } />
    );
}

export default inject('appStore')(observer(Dimmer));
