import React, { Fragment, useState } from 'react'
import { Box, Collapse, Typography } from '@mui/material'

import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../../core/presentation/components/Layout/helpers'
import { COLORS_DARK_THEME } from '../../../../core/theme/colors'

import { generalStyles } from './styles';

const CollapsableCarousel = ({ text, carousel }: { text: string, carousel: JSX.Element }) => {

    const [expanded, setExpanded] = useState<boolean>(false)
    const [hovered, setHovered] = useState<boolean>(false)

    return (
        <Fragment>
            <Box
                gap={2}
                style={{ color: hovered ? COLORS_DARK_THEME.PRIMARY_BLUE : 'inherit' }}
                sx={generalStyles.collapsebleTextHolder}
                onClick={() => setExpanded(!expanded)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Typography fontWeight={700} variant='h6'>{text}</Typography>
                <Box sx={generalStyles.minusIconHolder}>
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.MinusIcon}
                        style={{
                            ...generalStyles.rotatingMinus,
                            transform: expanded ? "none" : "rotate(90deg)"
                        }}
                    />
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.MinusIcon}
                        style={{
                            ...generalStyles.rotatingMinus,
                            transform: expanded ? "none" : "rotate(-180deg)"
                        }}
                    />
                </Box>
            </Box>
            <Collapse
                timeout={500}
                in={expanded}
            >
                {carousel}
            </Collapse>
        </Fragment>
    )
}

export default CollapsableCarousel
