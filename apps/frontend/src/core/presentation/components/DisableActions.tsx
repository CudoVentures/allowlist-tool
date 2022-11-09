// version 2.0.0

import React from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../utilities/Main';
import AppStore from '../stores/AppStore';

import '../styles/disable-actions.css';

interface Props {
    appStore?: AppStore;
}

const DisableActions = (props: Props) => {

    return (
        <div
            className = { `DisableActions Transition ActiveVisibilityHidden${S.CSS.getActiveClassName(props.appStore.hasDisabledActions())}` }
            onClick = { S.stopPropagation } >
            <label className = { 'Transition' } ></label>
        </div>
    );

}

export default inject('appStore')(observer(DisableActions));
