import { Box, Link, Tooltip } from "@mui/material"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import copy from "copy-to-clipboard"

import { RootState } from "../store"
import { EXPLORER_ADDRESS_DETAILS } from "../api/endpoints"
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../presentation/components/Layout/helpers"

import { themeStyles } from "./themeStyles"

export const GradientText = ({
    text,
    startColor,
    endColor,
    fontFamily,
}: {
    text: string
    startColor: string,
    endColor: string,
    fontFamily: 'CudosBit' | 'Poppins'
}) => {

    return (
        <span
            style={{
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

export const CopyAndFollowComponent = ({ address }: { address: string }): JSX.Element => {

    const { connectedNetwork } = useSelector((state: RootState) => state.userState)
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
                    <Link onClick={() => handleCopy(address)} href="#">
                        <SvgComponent type={LAYOUT_CONTENT_TEXT.CopyIcon} style={{ width: '24px', height: '24px' }} />
                    </Link>
                </Tooltip>
            </Box>
            <Box sx={themeStyles.iconHolder}>
                <Tooltip title="Check address on explorer">
                    <Link
                        href={EXPLORER_ADDRESS_DETAILS(connectedNetwork, address)}
                        rel="noreferrer"
                        target='_blank'
                    >
                        <SvgComponent type={LAYOUT_CONTENT_TEXT.LinkIcon} style={{ height: '24px' }} />
                    </Link>
                </Tooltip>
            </Box>
        </Box>
    )
}
