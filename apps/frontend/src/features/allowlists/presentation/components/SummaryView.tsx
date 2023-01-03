import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../../core/presentation/components/Layout/helpers';
import { FetchedAllowlist } from '../../../../core/store/allowlist';
import { COLORS_DARK_THEME } from '../../../../core/theme/colors';
import { getSeparateDateAndTime, handleLinkOut } from '../../../../core/utilities/ProjectUtils';
import useEditMode from '../../../../core/utilities/CustomHooks/useEditMode';

import { generalStyles, summaryViewStyles } from './styles';

export const SummaryView = ({
    props,
    isAdmin,
}: {
    props: FetchedAllowlist,
    isAdmin: boolean,
}) => {

    const editMode = useEditMode()
    const editIcon = useRef<HTMLDivElement>()
    const [displayEditIcon, setDisplayEditIcon] = useState<boolean>(false);
    const { date, time } = getSeparateDateAndTime(props.end_date)

    const handleMouseOut = () => {
        if (displayEditIcon) {
            setDisplayEditIcon(false)
        }
    }

    const handleMouseOver = () => {
        if (isAdmin) {
            setDisplayEditIcon(true)
        }
    }

    const handleClick = () => {
        if (isAdmin && displayEditIcon) {
            editMode(props)
        }
    }

    const StyledTypography = ({ text, color }: { text: string, color?: string }): JSX.Element => {
        return (
            <Typography
                variant='subtitle1'
                color={color ? color : COLORS_DARK_THEME.PRIMARY_STEEL_GRAY_20}
            >
                {text}
            </Typography>
        )
    }

    useEffect(() => {
        if (displayEditIcon) {
            editIcon.current!.style.visibility = 'visible'
            editIcon.current!.style.opacity = '1'
            return
        }

        if (editIcon.current) {
            editIcon.current!.style.opacity = '0'
            editIcon.current!.style.visibility = 'hidden'
        }
    }, [displayEditIcon])

    return (
        <Box gap={3} sx={generalStyles.flexColumn}>
            <Box
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                sx={summaryViewStyles.title}
            >
                <Typography variant='h4' fontWeight={900}>
                    {props.name}
                </Typography>
                {isAdmin ?
                    <Box
                        ref={editIcon}
                        sx={summaryViewStyles.editIconHolder}
                        onClick={handleClick}
                    >
                        <SvgComponent
                            type={LAYOUT_CONTENT_TEXT.EditIcon}
                            style={{ color: COLORS_DARK_THEME.PRIMARY_BLUE }}
                        />
                    </Box> : null}
            </Box>
            <Box>
                <Typography variant='h6' fontWeight={700}>
                    Description
                </Typography>
                <StyledTypography text={props.description.repeat(20)} />
            </Box>
            <Box gap={1} sx={generalStyles.flexColumn}>
                <Typography variant='h6' fontWeight={700}>
                    Links
                </Typography>
                <Box onClick={() => handleLinkOut(props.url)} sx={summaryViewStyles.linkHolder} >
                    <SvgComponent type={LAYOUT_CONTENT_TEXT.ChainLinkIcon} style={'default'} />
                    <StyledTypography text={props.url} />
                </Box>
                <Box onClick={() => handleLinkOut(props.twitter_account)} sx={summaryViewStyles.linkHolder} >
                    <SvgComponent type={LAYOUT_CONTENT_TEXT.TwitterIcon} style={'default'} />
                    <StyledTypography text={props.twitter_account} />
                </Box>
                <Box onClick={() => handleLinkOut(props.discord_url)} sx={summaryViewStyles.linkHolder}>
                    <SvgComponent type={LAYOUT_CONTENT_TEXT.DiscordIcon} style={'default'} />
                    <StyledTypography text={props.discord_url} />
                </Box>
            </Box>
            <Box gap={1} sx={generalStyles.flexColumn}>
                <Typography variant='h6' fontWeight={700}>
                    Mint Details
                </Typography>
                <Box gap={1} display='flex'>
                    <StyledTypography text='End date: ' color='inherit' />
                    <StyledTypography text={date} />
                </Box>
                <Box gap={1} display='flex'>
                    <StyledTypography text='End time: ' color='inherit' />
                    <StyledTypography text={time} />
                </Box>
            </Box>
        </Box>
    )
}

export default SummaryView
