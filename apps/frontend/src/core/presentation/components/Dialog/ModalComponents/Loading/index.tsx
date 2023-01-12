import React from 'react'
import { Dialog as MuiDialog } from '@mui/material'
import { useSelector } from 'react-redux'

import { RootState } from '../../../../../store'

import { ModalContainer, styles as defaultStyles } from '../../styles'

const Loading = () => {

    const { pageTransitionLoading } = useSelector((state: RootState) => state.modalState)

    return (
        <MuiDialog
            BackdropProps={defaultStyles.defaultBackDrop}
            open={pageTransitionLoading}
            PaperProps={defaultStyles.loadingProps}
        >
            <ModalContainer sx={{
                backgroundColor: 'transparent',
                ...defaultStyles.loadingModalContainer
            }}>
            </ModalContainer>
        </MuiDialog>
    )
}

export default Loading
