import React from "react"
import { Box } from "@mui/material"

import FAQ from "./FAQ"
import ForCreators from "./ForCreators"
import ForCollectors from "./ForCollectors"

import { lowerSectionStyles } from "./styles"

const LowerSection = () => {

    return (
        <Box id='LowerSectionHolder' sx={lowerSectionStyles.holder}>
            <Box gap={15} id='LowerSectionContent' sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1300px' }}>
                <ForCreators />
                <ForCollectors />
                <FAQ />
            </Box>
        </Box>
    )
}

export default LowerSection
