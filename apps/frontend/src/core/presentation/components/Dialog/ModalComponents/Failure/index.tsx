import React from 'react'
import { Button, Typography } from '@mui/material'
import { Dialog as MuiDialog } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../../../store'
import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../Layout/helpers'
import { initialState, updateModalState } from '../../../../../store/modals'
import { AUTH_API_MSGS } from '../../../../../../../../common/interfaces'
import useDisconnectUser from '../../../../../../core/utilities/CustomHooks/useDisconnect'

import { CancelRoundedIcon, ModalContainer, styles as defaultStyles } from '../../styles'

const Failure = () => {

    const dispatch = useDispatch()
    const disconnectUser = useDisconnectUser()
    const { failure, message } = useSelector((state: RootState) => state.modalState)

    const handleModalClose = () => {
        if (message === AUTH_API_MSGS.NoUserSession) {
            disconnectUser()
            return
        }
        dispatch(updateModalState(initialState))
    }

    const handleMessage = (message: string) => {
        if (!message) {
            return "Something went wrong"
        }
        switch (message) {
            case AUTH_API_MSGS.NoUserSession:
                return 'No active user session. Please log in.'

            default:
                return message
        }
    }

    const closeModal = (event: {}, reason: string) => {
        if (reason !== 'backdropClick') {
            handleModalClose()
        }
    }

    return (
        <MuiDialog
            BackdropProps={defaultStyles.defaultBackDrop}
            open={failure!}
            onClose={closeModal}
            PaperProps={defaultStyles.defaultPaperProps}
        >
            <ModalContainer sx={{ width: '512px', padding: '4rem 2rem 2rem 2rem' }}>
                <SvgComponent type={LAYOUT_CONTENT_TEXT.FailureIcon} style={{}} />
                <CancelRoundedIcon onClick={handleModalClose} />
                <Typography
                    variant="h4"
                    fontWeight={900}
                    letterSpacing={2}
                >
                    Ooops!
                </Typography>
                <Typography
                    color='text.secondary'
                    variant="subtitle1"
                >
                    {handleMessage(message)}
                </Typography>
                <Button
                    variant="contained"
                    onClick={handleModalClose}
                    sx={{ marginTop: '10px', height: '48px', width: '100%' }}
                >
                    Close
                </Button>
            </ModalContainer>
        </MuiDialog>
    )
}

export default Failure
