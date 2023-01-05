import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import WalletSelector from './ModalComponents/WalletSelector';
import Success from './ModalComponents/Success';
import { RootState } from '../../../store';

const Dialog = () => {
    const { selectWallet, success } = useSelector((state: RootState) => state.modalState)

    switch (true) {
        case success:
            return <Success />
        case selectWallet:
            return <WalletSelector />
        default:
            return <Fragment></Fragment>
    }
}

export default Dialog
