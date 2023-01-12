import React, { useEffect, useState } from "react"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"

import AppRoutes from "./../../../../features/app-routes/entities/AppRoutes"
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "./helpers"
import useNavigateToRoute from "../../../utilities/CustomHooks/useNavigateToRoute"


const NoResult = ({ infoMsg }: { infoMsg?: string }) => {

    const navigateToRoute = useNavigateToRoute()
    const [timer, setTimer] = useState<number>(3)

    useEffect(() => {
        if (timer > 0) {
            setTimeout(() => { setTimer(timer - 1) }, 1000)
            return
        }
        navigateToRoute(AppRoutes.MAIN)
    }, [timer])

    return (
        <Box gap={2} style={{ marginTop: '30vh', paddingBottom: '6rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SvgComponent type={LAYOUT_CONTENT_TEXT.QuestionmarkIcon} style={{ width: '100%' }} />
            <Typography variant="h5">{infoMsg ? infoMsg : 'No Result'}</Typography>
            <Box gap={1} style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle1" color='text.secondary'>Redirecting in</Typography>
                <Typography variant="h6">{timer}</Typography>
            </Box>
        </Box>
    )
}

export default NoResult
