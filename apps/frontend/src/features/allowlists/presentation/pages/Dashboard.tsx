import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';

import { StyledPuffLoader } from '../../../../core/presentation/components/Layout/helpers';

import { generalStyles } from './styles';

const DashboardPage = () => {

    const [loading, setLoading] = useState<boolean>(true)

    const contentHandler = useCallback((): JSX.Element => {
        if (loading) {
            return <StyledPuffLoader />
        }

        return (
            <Box id='dashboard' gap={4} sx={generalStyles.gridsHolder}>

            </Box>
        )

    }, [loading])


    return contentHandler()
}

export default DashboardPage
