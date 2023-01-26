import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Parallax } from 'react-scroll-parallax';

import { GradientText } from "../../../../../core/theme/helpers"
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../../../../../core/presentation/components/Layout/helpers"
import { useIsScreenLessThan } from "../../../../../core/utilities/CustomHooks/screenChecks"
import useNavigateToRoute from "../../../../../core/utilities/CustomHooks/useNavigateToRoute";
import AppRoutes from "../../../entities/AppRoutes"

import { forCreatorsStyles } from "./styles"

const ForCreators = () => {

    const navigateToRoute = useNavigateToRoute()
    const isUnder1200px = useIsScreenLessThan('1200px', 'width')
    const isUnder800px = useIsScreenLessThan('800px', 'width')

    return (
        <Box
            id='ForCreators'
            gap={5}
            flexDirection={isUnder1200px ? 'column' : 'row'}
            sx={forCreatorsStyles.holder}
        >
            <Box
                id='ForCreatorsLeftContent'
                gap={2}
                height={'max-content'}
                sx={forCreatorsStyles.leftContent}>
                <Box sx={forCreatorsStyles.textHolder}>
                    <Box gap={1} display='flex' alignItems={'center'}>
                        <Typography marginTop={1} variant="h2">
                            For
                        </Typography>
                        <Typography variant="h1">
                            <GradientText
                                text={'Creators'.toUpperCase()}
                                fontFamily='CudosBit'
                                startColor={'rgba(142, 92, 222, 1)'}
                                endColor={'rgba(244, 237, 255, 1)'}
                            />
                        </Typography>
                    </Box>
                    <Typography marginTop={'-20px'} fontSize={isUnder800px ? 10 : 16} color='text.secondary'>
                        NFTs and new projects launching in the interchain need web3 tools we come to expect in other ecosystems so the Cosmos-native Allowlist tool from Cudos is setting out to bring parity to interchain creators.
                    </Typography>
                    <Typography marginTop={'20px'} fontSize={isUnder800px ? 10 : 16} color='text.secondary'>
                        Set specific allowlist requirements, including Twitter and Discord integration, to design community incentives and securely build out an audience using cryptographic signatures.
                    </Typography>
                </Box>
                <Button
                    onClick={() => navigateToRoute(AppRoutes.ALLOWLISTS)}
                    variant="contained"
                    sx={forCreatorsStyles.btn}
                >
                    Allowlists
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.ArrowRight}
                        style={{ marginLeft: '10px', height: '24px' }}
                    />
                </Button>
            </Box>
            <Box id='ForCreatorsRightContent' sx={forCreatorsStyles.rightContent} >
                <Box>
                    <SvgComponent type={LAYOUT_CONTENT_TEXT.SampleAllowListDetails}
                        style={{ position: 'absolute', left: -45 }} />
                    <SvgComponent type={LAYOUT_CONTENT_TEXT.RectangularShade}
                        style={{ position: 'absolute', left: -5, top: 205 }} />
                </Box>
                <Box>
                    <SvgComponent type={LAYOUT_CONTENT_TEXT.SampleAllowListMint}
                        style={{ position: 'absolute', bottom: -45, left: 55 }} />
                </Box>
                <Box>
                    <Box sx={forCreatorsStyles.yellowBox} />
                    <Parallax translateY={["50px", "0px"]} speed={20}>
                        <Box sx={forCreatorsStyles.avatar}>
                            <SvgComponent type={LAYOUT_CONTENT_TEXT.HeadImg}
                                style={{ width: '100%', height: '100%' }} />
                        </Box>
                    </Parallax>
                </Box>
                <Box sx={{ position: 'absolute', left: -60, bottom: 0 }}>
                    <Parallax speed={10}>
                        <SvgComponent type={LAYOUT_CONTENT_TEXT.BigPlusIcon}
                            style={{ width: '128px', height: '135px' }} />
                    </Parallax>
                </Box>
            </Box>
        </Box>
    )
}

export default ForCreators
