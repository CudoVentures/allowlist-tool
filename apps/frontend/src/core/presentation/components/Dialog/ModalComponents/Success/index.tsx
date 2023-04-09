import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Dialog as MuiDialog } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../../../store'
import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../Layout/helpers'
import { COLORS } from '../../../../../theme/colors'
import { initialState, updateModalState } from '../../../../../store/modals'
import AppRoutes from '../../../../../../features/app-routes/entities/AppRoutes'
import useNavigateToRoute from '../../../../../../core/utilities/CustomHooks/useNavigateToRoute'

import { CancelRoundedIcon, ModalContainer, styles as defaultStyles } from '../../styles'

const Success = () => {

    const dispatch = useDispatch()
    const navigateToRoute = useNavigateToRoute()

    const { success } = useSelector((state: RootState) => state.modalState)

    const handleModalClose = (path: AppRoutes) => {
        dispatch(updateModalState(initialState))
        navigateToRoute(path)
    }

    const closeModal = (event: {}, reason: string) => {
        if (reason !== 'backdropClick') {
            handleModalClose(AppRoutes.MAIN)
        }
    }

    return (
        <MuiDialog
            BackdropProps={defaultStyles.defaultBackDrop}
            open={success!}
            onClose={closeModal}
            PaperProps={defaultStyles.defaultPaperProps}
        >
            <ModalContainer sx={{ width: '512px', padding: '4rem 2rem 1rem 2rem' }}>
                <SvgComponent type={LAYOUT_CONTENT_TEXT.SuccessIcon} style={{ color: COLORS.LIGHT_BLUE[90] }} />
                <CancelRoundedIcon onClick={handleModalClose} />
                <Typography
                    variant="h4"
                    fontWeight={900}
                    letterSpacing={2}
                >
                    Success!
                </Typography>
                <Box
                    width={'100%'}
                    marginTop={3}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                >
                    <Button
                        variant="contained"
                        onClick={() => handleModalClose(AppRoutes.ALLOWLISTS)}
                        sx={{ height: '48px', width: '100%' }}
                    >
                        Go to Allowlists
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => handleModalClose(AppRoutes.MAIN)}
                        sx={{ height: '48px', width: '100%', background: COLORS.STEEL_GRAY[90], border: 'none', '&:hover': { border: 'none' } }}
                    >
                        Back to Home
                    </Button>
                </Box>
            </ModalContainer>
        </MuiDialog>
    )
}

export default Success
