import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Parallax } from 'react-scroll-parallax';

import { GradientText } from "../../../../../core/theme/helpers"
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../../../../../core/presentation/components/Layout/helpers"
import { useIsScreenLessThan } from "../../../../../core/utilities/CustomHooks/screenChecks"
import AppRoutes from "../../../entities/AppRoutes";
import useNavigateToRoute from "../../../../../core/utilities/CustomHooks/useNavigateToRoute";

import { forCollectorsStyles } from "./styles"

const ForCollectors = () => {

    const navigateToRoute = useNavigateToRoute()
    const isUnder1350px = useIsScreenLessThan('1350px', 'width')
    const isUnder800px = useIsScreenLessThan('800px', 'width')

    return (
        <Box
            id='ForCollectors'
            gap={2}
            flexDirection={isUnder1350px ? 'column-reverse' : 'row'}
            sx={forCollectorsStyles.holder}
        >
            <Box
                id='ForCollectorsLeftContent'
                gap={5}
                height={'max-content'}
                sx={forCollectorsStyles.leftContent}>
                <Box>
                    <SvgComponent type={LAYOUT_CONTENT_TEXT.SampleAllowListPage}
                        style={{ position: 'absolute', top: 0, left: 0 }} />
                </Box>
                <Box>
                    <SvgComponent type={LAYOUT_CONTENT_TEXT.SampleAllowListRegister}
                        style={{ position: 'absolute', right: -140, top: 55 }} />
                    <SvgComponent type={LAYOUT_CONTENT_TEXT.RectangularShade}
                        style={{ position: 'absolute', bottom: -22, right: -100 }} />
                </Box>
                <Box sx={{ position: 'absolute', left: -20, bottom: -40 }}>
                    <Parallax speed={10}>
                        <SvgComponent type={LAYOUT_CONTENT_TEXT.Checkmark}
                            style={{ width: '140px', height: '126px' }} />
                    </Parallax>
                </Box>
            </Box>
            <Box id='ForCollectorsRightContent' sx={forCollectorsStyles.rightContent} >
                <Box sx={forCollectorsStyles.textHolder}>
                    <Box gap={1} display='flex' alignItems={'center'}>
                        <Typography marginTop={1} variant="h2">
                            For
                        </Typography>
                        <Typography variant="h1">
                            <GradientText
                                text={'Collectors'.toUpperCase()}
                                fontFamily='CudosBit'
                                startColor={'rgba(231, 91, 91, 1)'}
                                endColor={'rgba(255, 250, 250, 1)'}
                            />
                        </Typography>
                    </Box>
                    <Typography marginTop={'-20px'} fontSize={isUnder800px ? 10 : 16} color='text.secondary'>
                        If you are using Cosmos already or just exploring new NFT frontiers the Cudos Allowlist is a hub for new opportunity and one of the best places to find alpha on new drops!
                    </Typography>
                    <Typography marginTop={'20px'} fontSize={isUnder800px ? 10 : 16} color='text.secondary'>
                        Keep up to date with upcoming mints and find out how to participate in exciting communities. Plus keep your eyes peeled for an upcoming dashboard to keep track and explore new projects, all tracked by your interchain wallet.
                    </Typography>
                </Box>
                <Button onClick={() => navigateToRoute(AppRoutes.ALLOWLISTS)} variant="contained" sx={forCollectorsStyles.btn} >
                    See Example
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.ArrowRight}
                        style={{ marginLeft: '10px', height: '24px' }}
                    />
                </Button>
            </Box>
        </Box>
    )
}

export default ForCollectors
