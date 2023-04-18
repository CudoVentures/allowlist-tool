import React, { useState, useEffect } from 'react';
import { Box, Tooltip, Typography } from '@mui/material';

import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../../core/presentation/components/Layout/helpers';
import { FetchedAllowlist } from '../../../../core/store/allowlist';
import { COLORS } from '../../../../core/theme/colors';
import { getSeparateDateAndTime } from '../../../../core/utilities/ProjectUtils';
import useEditMode from '../../../../core/utilities/CustomHooks/useEditMode';
import { LinkBox } from '../../../../core/theme/helpers';
import { BaseURL } from './helpers';

import { generalStyles, summaryViewStyles } from './styles';
import { getCosmosNetworkImg, getCosmosNetworkPrettyName } from 'cudosjs';
import { styles as walletSelectorStyles } from '../../../../core/presentation/components/Dialog/ModalComponents/WalletSelector/styles';

export const SummaryView = ({
    props,
    isAdmin,
}: {
    props: FetchedAllowlist,
    isAdmin: boolean,
}) => {

    const editMode = useEditMode()
    const [hovered, setHovered] = useState<boolean>(false)
    const [editAllowed, setEditallowed] = useState<boolean>(false)
    const [networkLogo, setNetworkLogo] = useState<string>(undefined)
    const { date, time } = getSeparateDateAndTime(props.end_date)

    const handleClick = () => {
        if (isAdmin && editAllowed) {
            editMode(props)
        }
    }

    useEffect(() => {
        setEditallowed(!props.users.length)
    }, [props.users])

    useEffect(() => {
        const imgSrc = getCosmosNetworkImg(props.cosmos_chain_id)
        if (imgSrc) {
            setNetworkLogo(imgSrc)
            return
        }
        setNetworkLogo(undefined)
    }, [])

    const StyledTypography = ({ text, color }: { text: string, color?: string }): JSX.Element => {
        return (
            <Typography
                variant='subtitle1'
                color={color ? color : COLORS.STEEL_GRAY[20]}
            >
                {text}
            </Typography>
        )
    }

    return (
        <Box gap={3} sx={generalStyles.flexColumn}>
            <Box
                sx={summaryViewStyles.title}
            >
                <Typography variant='h4' fontWeight={900}>
                    {props.name}
                </Typography>
                {isAdmin ?
                    <Tooltip title={editAllowed ? '' : 'Edit Disabled. Possible if no users joined.'}>
                        <Box
                            onMouseOver={() => setHovered(true)}
                            onMouseOut={() => setHovered(false)}
                            sx={summaryViewStyles.editIconHolder}
                            onClick={handleClick}
                        >
                            <SvgComponent
                                type={LAYOUT_CONTENT_TEXT.EditIcon}
                                style={{ opacity: editAllowed ? hovered ? 1 : 0.5 : 0.5, color: COLORS.LIGHT_BLUE[90] }}
                            />
                        </Box>
                    </Tooltip>
                    : null}
            </Box>
            {props.cosmos_chain_id ?
                <Box>
                    <Typography variant='h6' fontWeight={700}>
                        Cosmos Network
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        {networkLogo ? <img
                            src={networkLogo}
                            alt={`Network logo`}
                            style={walletSelectorStyles.logo}
                        /> : null}
                        <StyledTypography text={getCosmosNetworkPrettyName(props.cosmos_chain_id) ?
                            `${getCosmosNetworkPrettyName(props.cosmos_chain_id)} (${props.cosmos_chain_id})` :
                            props.cosmos_chain_id}
                        />
                    </Box>
                </Box>
                : null}
            {props.description ?
                <Box>
                    <Typography variant='h6' fontWeight={700}>
                        Description
                    </Typography>
                    <StyledTypography text={props.description} />

                </Box>
                : null}
            {props.website || props.twitter_account || props.discord_url ?
                <Box gap={1} sx={generalStyles.flexColumn}>
                    <Typography variant='h6' fontWeight={700}>
                        Links
                    </Typography>
                    {props.website ?
                        <Box sx={summaryViewStyles.linkHolder} >
                            <SvgComponent type={LAYOUT_CONTENT_TEXT.ChainLinkIcon} style={'default'} />
                            <LinkBox
                                link={props.website}
                                text={<StyledTypography text={props.website} />}
                            />
                        </Box> : null}
                    {props.twitter_account ?
                        <Box sx={summaryViewStyles.linkHolder} >
                            <SvgComponent type={LAYOUT_CONTENT_TEXT.TwitterIcon} style={'default'} />
                            <LinkBox
                                link={`${BaseURL.twitter_acc}${props.twitter_account}`}
                                text={<StyledTypography text={props.twitter_account} />}
                            />
                        </Box> : null}
                    {props.discord_url ?
                        <Box sx={summaryViewStyles.linkHolder} >
                            <SvgComponent type={LAYOUT_CONTENT_TEXT.DiscordIcon} style={'default'} />
                            <LinkBox
                                link={`${BaseURL.discord_server}${props.discord_url}`}
                                text={<StyledTypography text='Discord' />}
                            />
                        </Box> : null}
                </Box> : null}
            <Box gap={1} sx={generalStyles.flexColumn}>
                <Typography variant='h6' fontWeight={700}>
                    Mint Details
                </Typography>
                {isAdmin ?
                    <Box gap={1} display='flex'>
                        <StyledTypography text='Users joined: ' color='inherit' />
                        <StyledTypography text={props.users.length.toString()} />
                    </Box> : null
                }
                <Box gap={1} display='flex'>
                    <StyledTypography text='End date: ' color='inherit' />
                    <StyledTypography text={date} />
                </Box>
                <Box gap={1} display='flex'>
                    <StyledTypography text='End time: ' color='inherit' />
                    <StyledTypography text={time} />
                </Box>
            </Box>
        </Box >
    )
}

export default SummaryView
