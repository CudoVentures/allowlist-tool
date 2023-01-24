import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import WalletSelector from './ModalComponents/WalletSelector';
import Success from './ModalComponents/Success';
import { RootState } from '../../../store';
import Loading from './ModalComponents/Loading';


const Dialog = () => {
    const { selectWallet, success, pageTransitionLoading } = useSelector((state: RootState) => state.modalState)

    switch (true) {
        case pageTransitionLoading:
            return <Loading />
        case success:
            return <Success />
        case selectWallet:
            return <WalletSelector />
        default:
            return <Fragment></Fragment>
    }
}

export default Dialog
