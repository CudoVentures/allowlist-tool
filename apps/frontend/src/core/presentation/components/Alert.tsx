// version 2.0.0
import React from 'react';
import { inject, observer } from 'mobx-react';

import S from '../../utilities/Main';
import AlertStore from '../stores/AlertStore';

import '../styles/alert.css';

interface Props {
    alertStore?: AlertStore;
}

const Alert = (props: Props) => {

    const onClickPositive = () => {
        const { alertStore } = props;

        let handled: boolean | void = false;
        if (alertStore.positiveListener !== null) {
            handled = alertStore.positiveListener();
        }

        if (handled !== true) {
            alertStore.hide();
        }
    }

    const onClickNegative = () => {
        const { alertStore } = props;

        let handled: boolean | void = false;
        if (alertStore.negativeListener !== null) {
            handled = alertStore.negativeListener();
        }

        if (handled !== true) {
            alertStore.hide();
        }
    }

    const onClickNeutral = () => {
        const { alertStore } = props;

        let handled: boolean | void = false;
        if (alertStore.neutralListener !== null) {
            handled = alertStore.neutralListener();
        }

        if (handled !== true) {
            alertStore.hide();
        }
    }

    const { alertStore } = props;

    return (
        <div className = { `AlertWrapper Transition ActiveVisibilityHidden ${S.CSS.getActiveClassName(alertStore.isVisible())}` } >
            <div className = { 'Alert ShadowDark' } >
                <div className = { 'Msg ScrollView' } >{alertStore.msg}</div>

                <div className = { 'FlexSplit' } >
                    { alertStore.neutralLabel !== null && (
                        <div
                            className = { 'TextButton Neutral' }
                            onClick = { onClickNeutral } >
                            { alertStore.neutralLabel }
                        </div>
                    ) }

                    <div className = { 'StartRight' } >
                        { alertStore.negativeLabel !== null && (
                            <div
                                className = { 'TextButton Negative' }
                                onClick = { onClickNegative } >
                                { alertStore.negativeLabel }
                            </div>
                        ) }

                        { alertStore.positiveLabel !== null && (
                            <div
                                className = { 'TextButton Positive' }
                                onClick = { onClickPositive } >
                                { alertStore.positiveLabel }
                            </div>
                        ) }

                    </div>
                </div>
            </div>
        </div>
    )

}

export default inject('alertStore')(observer(Alert));
