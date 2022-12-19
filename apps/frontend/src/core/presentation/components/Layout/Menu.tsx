import React from "react"
import { Link } from 'react-router-dom';
import { Box, Typography } from "@mui/material"

import AppRoutes from "../../../../features/app-routes/entities/AppRoutes";

const Menu = (): JSX.Element => {

    return (
        <Box>
            <Link
                style={{ all: 'unset', cursor: 'pointer' }}
                to={AppRoutes.CREATE_ALLOWLIST}
            >
                <Typography fontWeight={700}>
                    Create
                </Typography>
            </Link>
        </Box>
    )
}

export default Menu
