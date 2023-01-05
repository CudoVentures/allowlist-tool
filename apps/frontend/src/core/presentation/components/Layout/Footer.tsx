import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

import { FOOTER } from './helpers'
import { useIsScreenLessThan } from '../../../utilities/CustomHooks/screenChecks'

import { footerStyles } from './styles'

const Footer = () => {

    const isUnder1200px = useIsScreenLessThan('1200px', 'width')
    const isUnder800px = useIsScreenLessThan('800px', 'width')

    return (
        <Box
            id='footer'
            sx={footerStyles.holder}
            flexDirection={isUnder1200px ? 'column' : 'row'}
            gap={1}
        >
            <Box gap={3} display="flex" alignItems={'center'} >
                {FOOTER.LEFT_LINKS.map((link, idx) => (
                    <Grid
                        item
                        key={idx}
                        sx={footerStyles.leftItem}
                        onClick={() => window.open(link.url, '_blank')?.focus()}
                    >
                        {idx === 0 ? link.text :
                            <Typography
                                sx={footerStyles.typography}
                                fontSize={isUnder800px ? "0.5rem" : "0.8rem"}
                            >
                                {link.text}
                            </Typography>}
                    </Grid>
                ))}
            </Box>
            <Box
                alignItems="center"
                display="flex"
                gap={3}
                sx={{ marginLeft: isUnder1200px ? 'none' : 'auto' }}
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
