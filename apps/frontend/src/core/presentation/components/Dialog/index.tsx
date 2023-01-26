import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import WalletSelector from './ModalComponents/WalletSelector';
import Success from './ModalComponents/Success';
import { RootState } from '../../../store';
import Loading from './ModalComponents/Loading';
import Failure from './ModalComponents/Failure';

const Dialog = () => {
    const {
        selectWallet,
        success,
        failure,
        pageTransitionLoading
    } = useSelector((state: RootState) => state.modalState)

    switch (true) {
        case pageTransitionLoading:
            return <Loading />
        case success:
            return <Success />
        case failure:
            return <Failure />
        case selectWallet:
            return <WalletSelector />
        default:
            return <Fragment></Fragment>
    }
}

export default Dialog
