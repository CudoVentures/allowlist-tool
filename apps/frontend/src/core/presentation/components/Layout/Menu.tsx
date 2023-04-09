import React, { Fragment } from "react"
import { Box, Divider, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { useLocation, matchPath } from "react-router-dom";

import AppRoutes from "../../../../features/app-routes/entities/AppRoutes";
import useNavigateToRoute from "../../../utilities/CustomHooks/useNavigateToRoute";
import { RootState } from "../../../store";
import { SocialMediaButtons } from "../../../../features/allowlists/presentation/components/helpers";
import { COLORS } from "../../../theme/colors";
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "./helpers";

import { headerStyles } from "./styles";

const MENU_ITEMS = [
    { text: 'My Allowlists', route: AppRoutes.MY_ALLOWLISTS },
    { text: 'Explore', route: AppRoutes.ALLOWLISTS },
    { text: 'Create', route: AppRoutes.CREATE_ALLOWLIST }
]

const Menu = ({ hamburger }: { hamburger?: boolean }): JSX.Element => {

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
        if (route === AppRoutes.MY_ALLOWLISTS && !connectedAddress) {
            return
        }
        return (
            <Typography
                fontWeight={700}
                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', width: 'max-content' }}
                onClick={() => navigateToRoute(route)}
                color={isActive(route) ? COLORS.LIGHT_BLUE[90] : 'inherit'}
            >
                {text === 'Create' ? <SvgComponent
                    type={LAYOUT_CONTENT_TEXT.PlusIcon}
                    style={{ height: '18px' }}
                /> : null}
                {text}
            </Typography>
        )
    }

    return (
        <Box gap={hamburger ? 4 : 2} sx={{ width: '100%', display: 'flex', flexDirection: hamburger ? 'column' : 'row', alignItems: hamburger ? 'flex-start' : 'center', justifyContent: 'flex-end' }} >
            {MENU_ITEMS.map((item, idx) => {
                return <MenuItem key={idx} route={item.route} text={item.text} />
            })}
            {connectedAddress ?
                <Fragment>
                    <Divider
                        orientation={hamburger ? 'horizontal' : 'vertical'}
                        sx={{ ...headerStyles.divider, height: hamburger ? '1px' : '24px', width: hamburger ? '100%' : 'auto' }}
                    />
                    <SocialMediaButtons hamburger={hamburger} />
                </Fragment>
                : null}
        </Box>
    )
}

export default Menu
