import React, { Fragment } from "react"
import { Box, Divider, Typography } from "@mui/material"
import { useSelector } from "react-redux";

import AppRoutes from "../../../../features/app-routes/entities/AppRoutes";
import useNavigateToRoute from "../../../utilities/CustomHooks/useNavigateToRoute";
import { RootState } from "../../../store";
import { SocialMediaButtons } from "../../../../features/allowlists/presentation/components/helpers";

import { headerStyles } from "./styles";

const Menu = (): JSX.Element => {

    const navigateToRoute = useNavigateToRoute()
    const { connectedAddress } = useSelector((state: RootState) => state.userState)

    return (
        <Box gap={2} sx={{ display: 'flex', alignItems: 'center' }} >
            <Typography
                fontWeight={700}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigateToRoute(AppRoutes.CREATE_ALLOWLIST)}
            >
                Create
            </Typography>
            {connectedAddress ?
                <Fragment>
                    <Divider orientation='vertical' sx={headerStyles.divider} />
                    <SocialMediaButtons />
                </Fragment>
                : null}
        </Box>
    )
}

export default Menu
