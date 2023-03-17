import React from 'react'
import { Box, Dialog as MuiDialog, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { Circles as CirclesSpinner } from 'svg-loaders-react'

import { RootState } from '../../../../../store'

import { ModalContainer, styles as defaultStyles } from '../../styles'

const Loading = () => {

    const { pageTransitionLoading, message, loadingSpinner } = useSelector((state: RootState) => state.modalState)

    return (
        <MuiDialog
            BackdropProps={message ? defaultStyles.msgBackDrop : defaultStyles.defaultBackDrop}
            open={pageTransitionLoading}
            PaperProps={defaultStyles.loadingProps}
        >
            <ModalContainer sx={{
                backgroundColor: 'transparent',
                ...defaultStyles.loadingModalContainer
            }}>
                {message ?
                    <Box gap={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {loadingSpinner ? <CirclesSpinner style={{ width: '60px', height: '60px' }} /> : null}
                        <Typography variant='h5'>{message}</Typography>
                    </Box>
                    : null}
            </ModalContainer>
        </MuiDialog>
    )
}

export default Loading
