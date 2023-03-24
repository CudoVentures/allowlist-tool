import React, { Fragment, useState } from 'react'
import { Box, Collapse, Typography } from '@mui/material'

import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../../core/presentation/components/Layout/helpers'
import { COLORS_DARK_THEME } from '../../../../core/theme/colors'
import { FetchedAllowlist } from '../../../../core/store/allowlist';

import { generalStyles } from './styles';
import AllowListGrid from '../components/AllowListGrid';

const CollapsableGrid = ({ text, data, withCreateBox, withSearchBar
}: {
    text: string,
    data: FetchedAllowlist[],
    withCreateBox?: boolean,
    withSearchBar?: boolean
}) => {

    const [expanded, setExpanded] = useState<boolean>(text === 'My Allowlists' ? true : false)
    const [hovered, setHovered] = useState<boolean>(false)

    return (
        <Fragment>
            <Box
                gap={1}
                style={{ color: hovered ? COLORS_DARK_THEME.PRIMARY_BLUE : 'inherit' }}
                sx={generalStyles.collapsebleTextHolder}
                onClick={() => setExpanded(!expanded)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Typography fontWeight={700} variant='h6'>{text}</Typography>
                <Typography
                    fontWeight={600}
                    variant='subtitle1'
                    color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_50}
                >
                    ({data.length})
                </Typography>
                <Box sx={generalStyles.arrowIconHolder}>
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.ArrowIcon}
                        style={{
                            ...generalStyles.rotatingArrow,
                            transform: expanded ? 'rotate(180deg)' : 'rotate(360deg)'
                        }}
                    />
                </Box>
            </Box>
            <Collapse
                timeout={500}
                in={expanded}
            >
                <AllowListGrid
                    text={undefined}
                    data={data}
                    expanded={expanded}
                    withCreateBox={withCreateBox}
                    withSearchBar={withSearchBar}
                />
            </Collapse>
        </Fragment>
    )
}

export default CollapsableGrid
