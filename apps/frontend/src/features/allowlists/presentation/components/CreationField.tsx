import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Input, Tooltip, Typography } from '@mui/material'

import { BaseURL, FieldTooltips, FormField } from './helpers'
import { RootState } from '../../../../core/store';
import { getFieldisValid } from '../../validation';
import { updateAllowlistObject } from '../../../../core/store/allowlist';

import { generalStyles, registrationCriteriaStyles, validationStyles } from './styles'

const CreationField = ({
    type,
    text,
    placeholder,
    startAdornment,
    svgIcon,
    switchElement,
    isDisabled
}: {
    type: FormField,
    text: string | JSX.Element,
    placeholder?: string,
    startAdornment?: React.ReactNode,
    svgIcon?: React.ReactNode,
    switchElement?: React.ReactNode,
    isDisabled?: boolean
}) => {

    const dispatch = useDispatch()
    const [isValid, setIsValid] = useState<boolean>(true)
    const [pastedData, setPastedData] = useState<boolean>(false)
    const allowlistState = useSelector((state: RootState) => state.allowlistState)
    const { connectedSocialMedia } = useSelector((state: RootState) => state.userState)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = e.target.value
        if (pastedData &&
            (
                type === FormField.discord_url ||
                type === FormField.discord_server ||
                type === FormField.twitter_account ||
                type === FormField.twitter_account_to_follow
            )
        ) { value = value.split('/').pop() || value }
        setIsValid(getFieldisValid(type, value))
        setPastedData(false)
        dispatch(updateAllowlistObject({ [type]: value }))

        if (type === FormField.discord_server && !value) {
            dispatch(updateAllowlistObject({ server_role: value }))
        }
    }

    const handleValue = () => {
        if (!allowlistState[type]) {
            return ''
        }

        if (type === FormField.discord_server) {
            return `${BaseURL.discord_server}${allowlistState[type]}`
        }

        return allowlistState[type]
    }

    const isConnectedDiscordServer = (): boolean => {
        if (
            type === FormField.discord_server &&
            !!connectedSocialMedia.discord.guild.guildName &&
            !!connectedSocialMedia.discord.guild.inviteCode &&
            !!allowlistState.discord_server
        ) {
            return true
        }
        return false
    }

    return (
        <Box id={`allowlist${type}`}>
            <Box sx={registrationCriteriaStyles.titleSwitchHolder}>
                <Typography
                    display={'flex'}
                    alignItems='center'
                    fontWeight={600}
                >
                    {svgIcon ? svgIcon : null}
                    {text}
                </Typography>
                {switchElement ? switchElement : null}
            </Box>
            <Fragment>
                <Tooltip
                    placement='bottom-start'
                    PopperProps={validationStyles.tooltipPopper}
                    componentsProps={isConnectedDiscordServer() ?
                        validationStyles.connectedTooltipProps :
                        validationStyles.tooltipProps}
                    open={!isValid || isConnectedDiscordServer()}
                    title={!isValid ?
                        FieldTooltips[type] : isConnectedDiscordServer() ?
                            `Connected to ${connectedSocialMedia.discord.guild.guildName} server` :
                            ''}
                >
                    <Input
                        disabled={isDisabled}
                        startAdornment={startAdornment ? startAdornment : null}
                        placeholder={placeholder ? placeholder : null}
                        multiline={type === FormField.description ? true : false}
                        rows={type === FormField.description ? 3 : 1}
                        disableUnderline
                        type='text'
                        sx={isValid ? isConnectedDiscordServer() ? validationStyles.connectedInput : generalStyles.input : validationStyles.invalidInput}
                        value={handleValue()}
                        onChange={handleChange}
                        onPaste={() => setPastedData(true)}
                    />
                </Tooltip>
            </Fragment>
        </Box>
    )
}

export default CreationField
