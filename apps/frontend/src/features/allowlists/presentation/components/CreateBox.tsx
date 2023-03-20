import React from 'react'
import { Box, Typography } from '@mui/material'

import useNavigateToRoute from '../../../../core/utilities/CustomHooks/useNavigateToRoute'
import AppRoutes from '../../../app-routes/entities/AppRoutes'
import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../../core/presentation/components/Layout/helpers'
import { COLORS_DARK_THEME } from '../../../../core/theme/colors'

import { generalStyles } from '../pages/styles'

const CreateBox = () => {

    const navigateToRoute = useNavigateToRoute()

    return (
        <Box
            onClick={() => navigateToRoute(AppRoutes.CREATE_ALLOWLIST)}
            gap={1}
            sx={generalStyles.createBox}
        >
            <Box sx={generalStyles.plusIconBackground} >
                <SvgComponent
                    type={LAYOUT_CONTENT_TEXT.PlusIcon}
                    style={{ width: '100%' }}
                />
            </Box>
            <Typography variant={'subtitle1'} fontWeight={700} >
                Create new allowlist
            </Typography>
            <Typography variant={'subtitle2'} color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20} >
                Click here to begin the process of making your allowlist
            </Typography>
        </Box>
    )
}

export default CreateBox
