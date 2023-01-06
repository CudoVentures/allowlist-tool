import React from "react"
import { Box, Typography } from "@mui/material"

import AppRoutes from "../../../../features/app-routes/entities/AppRoutes";
import useNavigateToRoute from "../../../utilities/CustomHooks/useNavigateToRoute";

const Menu = (): JSX.Element => {

    const navigateToRoute = useNavigateToRoute()
    
    return (
        <Box
            onClick={() => navigateToRoute(AppRoutes.CREATE_ALLOWLIST)}
            sx={{ cursor: 'pointer' }}
        >
            <Typography fontWeight={700}>
                Create
            </Typography>
        </Box>
    )
}

export default Menu
