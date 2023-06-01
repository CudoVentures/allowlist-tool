import { Box, Link, Tooltip, Typography } from "@mui/material"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import copy from "copy-to-clipboard"
import { getAtomscanExplorerUrl, getCosmosNetworkImg, getCosmosNetworkPrettyName } from "cudosjs"

import { RootState } from "../store"
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../presentation/components/Layout/helpers"
import { COLORS } from "./colors"

import { themeStyles } from "./themeStyles"
import { styles } from "../presentation/components/Dialog/ModalComponents/WalletSelector/styles"

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

export const ConnectedChain = ({ isHamburger }: { isHamburger: boolean }): JSX.Element => {

    const { chosenChainId } = useSelector((state: RootState) => state.userState)
    return !!chosenChainId ? (
        <Box gap={2} sx={isHamburger ? themeStyles.centerFlexLinear : themeStyles.centerFlexColumn}>
            <Box sx={themeStyles.logoHolder}>
                {getCosmosNetworkImg(chosenChainId) ?
                    <img
                        src={getCosmosNetworkImg(chosenChainId)}
                        alt={`Network logo`}
                        style={styles.logo}
                    /> : null}
                {getCosmosNetworkPrettyName(chosenChainId) ?
                    getCosmosNetworkPrettyName(chosenChainId) : null}
            </Box>
            <Typography variant="subtitle2" color={COLORS.STEEL_GRAY[20]}>
                {chosenChainId}
            </Typography>
        </Box>
    ) : null
}

export const CopyAndFollowComponent = ({ address }: { address: string }): JSX.Element => {

    const [copied, setCopied] = useState<boolean>(false)
    const { chosenChainId } = useSelector((state: RootState) => state.userState)

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
                    title={copied ? 'Copied' : 'Copy address to clipboard'}
                >
                    <Box sx={{ cursor: 'pointer' }} onClick={() => handleCopy(address)}>
                        <SvgComponent type={LAYOUT_CONTENT_TEXT.CopyIcon} style={{ width: '24px', height: '24px', color: COLORS.LIGHT_BLUE[90] }} />
                    </Box>
                </Tooltip>
            </Box>
            <Box sx={themeStyles.iconHolder}>
                <Tooltip title="Check address on explorer">
                    <Link
                        href={getAtomscanExplorerUrl(chosenChainId, address)}
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
            color={noLink ? 'inherit' : COLORS.LIGHT_BLUE[90]}
        >
            {text ? text : link}
        </Link>
    )
}
