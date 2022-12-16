import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import WalletSelector from './ModalComponents/WalletSelector';
import { RootState } from '../../../store';


const Dialog = () => {
    const { selectWallet } = useSelector((state: RootState) => state.modalState)

    switch (true) {
        case selectWallet:
            return <WalletSelector />
        default:
            return <Fragment></Fragment>
    }
}

export default Dialog
