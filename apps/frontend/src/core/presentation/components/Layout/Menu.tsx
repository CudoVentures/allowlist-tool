import React, { Fragment } from "react"
import { Box, Divider, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { useLocation, matchPath } from "react-router-dom";

import AppRoutes from "../../../../features/app-routes/entities/AppRoutes";
import useNavigateToRoute from "../../../utilities/CustomHooks/useNavigateToRoute";
import { RootState } from "../../../store";
import { SocialMediaButtons } from "../../../../features/allowlists/presentation/components/helpers";
import { COLORS_DARK_THEME } from "../../../theme/colors";

import { headerStyles } from "./styles";

const MENU_ITEMS = [
    { text: 'Create', route: AppRoutes.CREATE_ALLOWLIST },
    { text: 'Explore', route: AppRoutes.ALLOWLISTS }
]

const Menu = (): JSX.Element => {

    const navigateToRoute = useNavigateToRoute()
    const location = useLocation()
    const { connectedAddress } = useSelector((state: RootState) => state.userState)

    const isActive = (route: AppRoutes): boolean => {

        const match = matchPath(route as string, location.pathname)
        if (match ||
            (
                route === AppRoutes.ALLOWLISTS &&
                matchPath(AppRoutes.ALLOWLIST, location.pathname)
            )
        ) {
            return true
        }

        return false
    }

    const MenuItem = ({ route, text }: { route: AppRoutes, text: string }) => {
        return (
            <Typography
                fontWeight={700}
                sx={{ cursor: 'pointer' }}
                onClick={() => navigateToRoute(route)}
                color={isActive(route) ? COLORS_DARK_THEME.PRIMARY_BLUE : 'inherit'}
            >
                {text}
            </Typography>
        )
    }

    return (
        <Box gap={2} sx={{ display: 'flex', alignItems: 'center' }} >
            {MENU_ITEMS.map((item, idx) => {
                return <MenuItem key={idx} route={item.route} text={item.text} />
            })}
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
