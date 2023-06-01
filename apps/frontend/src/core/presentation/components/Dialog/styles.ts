import { styled, Box } from '@mui/material'
import { CancelRounded, ArrowBackRounded } from '@mui/icons-material'

import { COLORS } from '../../../theme/colors'

export const BackRoundedIcon = styled(ArrowBackRounded)(({ theme }) => ({
    color: theme.palette.text.secondary,
    position: 'absolute',
    top: 32,
    left: 32,
    cursor: 'pointer',
}))

export const CancelRoundedIcon = styled(CancelRounded)(({ theme }) => ({
    color: theme.palette.text.secondary,
    position: 'absolute',
    top: 32,
    right: 32,
    cursor: 'pointer',
}))

export const ModalContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '30px 57px',
    borderRadius: '20px',
    boxShadow: '2px 10px 20px rgba(2, 6, 20, 0.6)',
    zIndex: 1,
}))

export const styles = {
    msgBackDrop: {
        style: {
            opacity: 1,
        },
    },
    defaultBackDrop: {
        style: {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(6px)',
            opacity: 1,
        },
    },
    loadingProps: {
        sx: {
            background: 'transparent',
            boxShadow: 'none',
            position: 'fixed',
            overflow: 'hidden',
            borderRadius: '25px',
        },
    },
    defaultPaperProps: {
        sx: {
            width: 'max-content',
            background: COLORS.STEEL_GRAY[100],
            height: 'min-content',
            overflow: 'hidden',
            borderRadius: '25px',
        },
    },
    loadingModalContainer: {
        minWidth: '600px',
        minHeight: '300px',
        padding: '4rem',
    },
}
