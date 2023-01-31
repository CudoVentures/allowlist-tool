import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Input, Tooltip, Typography } from '@mui/material'

import { FieldTooltips, FormField } from './helpers'
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
    text: string
    placeholder?: string,
    startAdornment?: React.ReactNode,
    svgIcon?: React.ReactNode,
    switchElement?: React.ReactNode
    isDisabled?: boolean
}) => {

    const dispatch = useDispatch()
    const [isValid, setIsValid] = useState<boolean>(true)
    const [pastedData, setPastedData] = useState<boolean>(false)
    const allowlistState = useSelector((state: RootState) => state.allowlistState)

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
                    componentsProps={validationStyles.tooltipProps}
                    open={!isValid}
                    title={FieldTooltips[type]}
                >
                    <Input
                        disabled={isDisabled}
                        startAdornment={startAdornment ? startAdornment : null}
                        placeholder={placeholder ? placeholder : null}
                        multiline={type === FormField.description ? true : false}
                        rows={type === FormField.description ? 3 : 1}
                        disableUnderline
                        type='text'
                        sx={isValid ? generalStyles.input : validationStyles.invalidInput}
                        value={allowlistState[type] || ''}
                        onChange={handleChange}
                        onPaste={() => setPastedData(true)}
                    />
                </Tooltip>
            </Fragment>
        </Box>
    )
}

export default CreationField
