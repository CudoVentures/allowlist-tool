import React from "react"
import { Box } from "@mui/material"

import FAQ from "./FAQ"

import { lowerSectionStyles } from "./styles"

const LowerSection = () => {

    return (
        <Box id='LowerSectionHolder' sx={lowerSectionStyles.holder}>
            <Box id='LowerSectionContent' sx={{ maxWidth: '1600px' }}>
                <FAQ />
            </Box>
        </Box>
    )
}

export default LowerSection
