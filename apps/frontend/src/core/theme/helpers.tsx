import { Box, Link, Tooltip, Typography } from "@mui/material"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import copy from "copy-to-clipboard"

import { RootState } from "../store"
import { ATOMSCAN_ADDRESS_EXPLORER } from "../api/endpoints"
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../presentation/components/Layout/helpers"
import { COLORS_DARK_THEME } from "./colors"

import { themeStyles } from "./themeStyles"

export const GradientText = ({
    text,
    startColor,
    endColor,
    fontFamily,
    style
}: {
    style?: React.CSSProperties,
    text: string
    startColor: string,
    endColor: string,
    fontFamily: 'CudosBit' | 'Poppins'
}) => {

    return (
        <span
            style={{
                ...style,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundImage: `-webkit-linear-gradient(${startColor}, ${endColor})`,
                fontFamily: fontFamily
            }}
        >
            {text}
        </span >
    )
}

export const ConnectedChain = (): JSX.Element => {

    const { chosenChainId } = useSelector((state: RootState) => state.userState)
    return !!chosenChainId ? (
        <Box gap={2} style={themeStyles.centerFlexLinear}>
            <Typography variant="subtitle2" color={COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}>
                {chosenChainId}
            </Typography>
        </Box>
    ) : null
}

export const CopyAndFollowComponent = ({ address }: { address: string }): JSX.Element => {

    const [copied, setCopied] = useState<boolean>(false)

    const handleCopy = (value: string) => {
        copy(value)
        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    return (
        <Box gap={1} style={themeStyles.centerFlexLinear}>
            <Box sx={themeStyles.iconHolder}>
                <Tooltip
                    title={copied ? 'Copied' : 'Copy to clipboard'}
                >
                    <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy(address)}>
                        <SvgComponent type={LAYOUT_CONTENT_TEXT.CopyIcon} style={{ width: '24px', height: '24px', color: COLORS_DARK_THEME.PRIMARY_BLUE }} />
                    </Box>
                </Tooltip>
            </Box>
            <Box sx={themeStyles.iconHolder}>
                <Tooltip title="Check address on explorer">
                    <Link
                        href={ATOMSCAN_ADDRESS_EXPLORER(address)}
                        rel="noreferrer"
                        target='Checking address on explorer'
                    >
                        <SvgComponent type={LAYOUT_CONTENT_TEXT.LinkIcon} style={{ height: '24px' }} />
                    </Link>
                </Tooltip>
            </Box>
        </Box>
    )
}

export const LinkBox = ({ link, text, children }: { link: 'none' | string, text?: string | JSX.Element, children?: React.ReactNode }) => {
    const noLink = link === 'none'
    return (
        <Link
            sx={{ pointerEvents: noLink ? link : 'auto' }}
            variant='inherit'
            target={link}
            href={link}
            rel="noreferrer"
            underline="none"
            color={noLink ? 'inherit' : COLORS_DARK_THEME.PRIMARY_BLUE}
        >
            {text ? text : link}
        </Link>
    )
}
