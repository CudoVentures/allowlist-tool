import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../../../core/presentation/components/Layout/helpers'
import { featuresStyle } from './styles'
import { GradientText } from '../../../../../core/theme/helpers'

const featuresArray = [
    {
        img: <SvgComponent type={LAYOUT_CONTENT_TEXT.RocketIcon} style={{}} />,
        title: {
            partOne: 'Launch an',
            partTwo: 'NFT allowlist'
        },
        subtitle: 'You can create and launch an allowlist in under 5 minutes! Select social media requirements to help ensure the right collectors join your list and boost your reach.'
    },
    {
        img: <SvgComponent type={LAYOUT_CONTENT_TEXT.CosmosLogo} style={{}} />,
        title: {
            partOne: 'configurable',
            partTwo: 'Cosmos'
        },
        subtitle: 'Select which chain you want to launch on and start building a community right away with out of the box Keplr wallet support.'
    }
]

const Features = () => {

    return (
        <Box gap={8} sx={featuresStyle.containerBox}>
            <Typography variant='h3' fontWeight={300}>
                Features
            </Typography>
            <Grid container
                style={featuresStyle.gridHolder}
                spacing={{ xs: 8 }}
                columns={{
                    lg: 2,
                }}
            >
                {featuresArray.map((FEATURE, idx) => {
                    return (
                        <Grid sx={{ textAlign: 'left' }} item key={idx} lg={1} xs={1}>
                            <Box paddingBottom={2}>
                                {FEATURE.img}
                            </Box>
                            <Box>
                                <Typography
                                    minWidth={'max-content'}
                                    gap={1}
                                    fontSize={24}
                                    display={'flex'}
                                    justifyContent={idx === 1 ? 'flex-end' : 'flex-start'}
                                    flexDirection={idx === 1 ? 'row-reverse' : 'row'}
                                    lineHeight={'normal'}
                                >
                                    <GradientText
                                        text={FEATURE.title.partOne}
                                        fontFamily='Poppins'
                                        startColor={'rgba(245, 250, 255, 1)'}
                                        endColor={'rgba(245, 250, 255, 1)'}
                                    />
                                    <GradientText
                                        text={FEATURE.title.partTwo}
                                        fontFamily='Poppins'
                                        startColor={'rgba(208, 243, 255, 1)'}
                                        endColor={'rgba(82, 166, 248, 1)'}
                                    />
                                </Typography>
                            </Box>
                            <Typography marginTop={2} color='text.secondary'>
                                {FEATURE.subtitle}
                            </Typography>
                        </Grid>
                    )
                })}
            </Grid>
        </Box >
    )
}

export default Features
