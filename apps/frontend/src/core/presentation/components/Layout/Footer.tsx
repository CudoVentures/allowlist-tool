import { Box, Grid, Typography } from '@mui/material'
import { footerStyles } from './styles'
import React from 'react'
import { FOOTER } from './helpers'
import { useLowResCheck, useLowerResCheck } from '../../../utilities/CustomHooks/screenChecks'

const Footer = () => {

    const isLowRes = useLowResCheck()
    const isLowerRes = useLowerResCheck()

    return (
        <Box
            id='footer'
            sx={footerStyles.holder}
            flexDirection={isLowRes ? 'column' : 'row'}
            gap={1}
        >
            <Box display="flex">
                {FOOTER.LEFT_LINKS.map((link, idx) => (
                    <Grid
                        item
                        key={idx}
                        sx={footerStyles.leftItem}
                        onClick={() => window.open(link.url, '_blank')?.focus()}
                    >
                        <Typography
                            sx={footerStyles.typography}
                            fontSize={isLowerRes ? "0.5rem" : "0.8rem"}
                        >
                            {link.text}
                        </Typography>
                    </Grid>
                ))}
            </Box>
            <Box
                alignItems="center"
                display="flex"
                gap={3}
                sx={{ marginLeft: isLowRes ? 'none' : 'auto' }}
            >
                {FOOTER.RIGHT_LINKS.map((link) => (
                    <Grid
                        key={link.url}
                        onClick={() => window.open(link.url, '_blank')?.focus()}
                        sx={footerStyles.rightItem}
                    >
                        {link.icon}
                    </Grid>
                ))}
            </Box>
        </Box>
    )
}

export default Footer
