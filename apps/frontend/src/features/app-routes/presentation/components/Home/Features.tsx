import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../../../core/presentation/components/Layout/helpers'
import { featuresStyle } from './styles'
import { GradientText } from '../../../../../core/theme/helpers'

const iconStyle = {
    width: '104px',
    height: '104px'
}

const featuresArray = [
    {
        img: <SvgComponent type={LAYOUT_CONTENT_TEXT.SmileyFaceIcon} style={iconStyle} />,
        title: {
            partOne: 'Lorem ipsum',
            partTwo: 'dolor sit amet'
        },
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'
    },
    {
        img: <SvgComponent type={LAYOUT_CONTENT_TEXT.SmileyFaceIcon} style={iconStyle} />,
        title: {
            partOne: 'Lorem ipsum',
            partTwo: 'dolor sit amet'
        },
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'
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
