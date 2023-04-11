import { Box, Button, Typography } from '@mui/material';
import React, { Fragment } from 'react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import useNavigateToRoute from '../../../../core/utilities/CustomHooks/useNavigateToRoute';
import { COLORS } from '../../../../core/theme/colors';
import AllowListGrid from '../components/AllowListGrid';
import AppRoutes from '../../../app-routes/entities/AppRoutes';

import { generalStyles } from './styles';

const NoJoinedAllowlists = () => {
    const navigate = useNavigateToRoute()
    return (
        <Box sx={generalStyles.noJoinedHolder}>
            <Typography fontWeight={700} variant='h4' sx={generalStyles.noJoinedTitle}>
                {'Joined'}
            </Typography>
            <Typography variant='h5' sx={generalStyles.noJoinedSubtitle} >
                {"It seems you haven't joined any allowlists"}
            </Typography>
            <Button
                onClick={() => navigate(AppRoutes.ALLOWLISTS)}
                variant='outlined'
                sx={generalStyles.noJoinedBtn}
            >
                <Typography fontWeight={700} variant='subtitle1' color={COLORS.LIGHT_BLUE[10]}>{'Explore Allowlists'}</Typography>
            </Button>
        </Box>
    )
}

const JoinedAllowlistsPreview = ({ data }: { data: FetchedAllowlist[] }) => {
    return !data.length ? <NoJoinedAllowlists /> :
        <Fragment>
            <AllowListGrid
                text={'Joined'}
                data={data}
                withCreateBox={false}
                withCount={true}
                withSearchBar={true}
            />
        </Fragment>
}

export default JoinedAllowlistsPreview
