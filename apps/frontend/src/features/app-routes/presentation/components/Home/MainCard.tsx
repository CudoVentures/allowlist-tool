import React from "react";
import SVG from 'react-inlinesvg';
import { Box, Typography, Button } from "@mui/material";

import AppRoutes from "../../../entities/AppRoutes";
import { GradientText } from "../../../../../core/theme/helpers";
import { LAYOUT_CONTENT_TEXT, SVG_FRAMES, SvgComponent } from "../../../../../core/presentation/components/Layout/helpers";
import { useIsScreenLessThan } from "../../../../../core/utilities/CustomHooks/screenChecks";
import useNavigateToRoute from "../../../../../core/utilities/CustomHooks/useNavigateToRoute";

import { mainCardStyles } from "./styles";

const MainCard = () => {

    const navigateToRoute = useNavigateToRoute()
    const isUnder1200px = useIsScreenLessThan('1200px', 'width')
    const isUnder800px = useIsScreenLessThan('800px', 'width')

    const btnStyles = {
        width: '192px',
        height: isUnder800px ? '30px' : '56px',
        borderRadius: '100px'
    }

    return (
        <Box
            id='MainCardHolder'
            gap={2}
            flexDirection={isUnder1200px ? 'column' : 'row'}
            sx={mainCardStyles.holder}>

            <Box
                id='mainCardLeftContent'
                gap={2}
                height={isUnder1200px ? 'max-content' : '384px'}
                sx={mainCardStyles.leftContent}>

                <Box gap={1} sx={mainCardStyles.textHolder}>
                    <Box>
                        <Typography
                            fontSize={isUnder800px ? 44 : 88}
                            display={'flex'}
                            flexDirection={'column'}
                            lineHeight={'normal'}
                        >
                            <GradientText
                                text={'Discover new allowlists or'.toUpperCase()}
                                fontFamily='CudosBit'
                                startColor={'rgba(245, 250, 255, 1)'}
                                endColor={'rgba(245, 250, 255, 1)'}
                            />
                            <GradientText
                                text={'Create your own'.toUpperCase()}
                                fontFamily='CudosBit'
                                startColor={'rgba(252, 247, 109, 1)'}
                                endColor={'rgba(255, 253, 202, 1)'}
                            />
                        </Typography>
                    </Box>
                    <Typography fontSize={isUnder800px ? 10 : 16} color='text.secondary'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    </Typography>
                </Box>
                <Box display='flex' justifyContent={isUnder1200px ? 'space-evenly' : 'flex-start'} gap={2}>
                    <Button variant="outlined" sx={btnStyles} >
                        Explore Allowlists
                    </Button>
                    <Button
                        onClick={() => navigateToRoute(AppRoutes.ALLOWLISTS)}
                        variant="contained"
                        sx={btnStyles}
                    >
                        Create Allowlist
                        <SvgComponent
                            type={LAYOUT_CONTENT_TEXT.PlusIcon}
                            style={{ height: '22px' }}
                        />
                    </Button>
                </Box>
            </Box>
            <Box id='mainCardRightContent' sx={mainCardStyles.rightContent}>
                <Box sx={mainCardStyles.svgHolder}>
                    <SVG
                        title={LAYOUT_CONTENT_TEXT.AllowlistBackground}
                        src={SVG_FRAMES.frame1673}
                        style={{ width: '100%' }}
                    />
                    <SVG
                        title={LAYOUT_CONTENT_TEXT.AllowlistAvatar}
                        src={SVG_FRAMES.frame1674}
                        style={mainCardStyles.avatar} />
                </Box>
                <Typography variant='h6' fontWeight={700}>
                    Allowlist Name
                </Typography>
            </Box>
        </Box >
    )
}

export default MainCard
