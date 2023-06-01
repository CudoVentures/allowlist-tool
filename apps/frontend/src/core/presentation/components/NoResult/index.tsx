import React from "react"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../Layout/helpers"

const NoResult = ({ infoMsg }: { infoMsg: string }) => {

    return (
        <Box gap={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SvgComponent type={LAYOUT_CONTENT_TEXT.QuestionmarkIcon} style={{}} />
            <Typography variant="h5">{infoMsg}</Typography>
        </Box>
    )
}

export default NoResult
