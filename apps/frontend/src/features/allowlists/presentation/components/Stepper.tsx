import React, { useCallback } from 'react'
import { Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../../../../core/presentation/components/Layout/helpers"
import { COLORS } from '../../../../core/theme/colors'
import { RootState } from '../../../../core/store'
import { isValidStepOne, isValidStepTwo } from '../../validation'
import useManipulateAllowlist from '../../../../core/utilities/CustomHooks/useManipulateAllowlist'
import { updateModalState } from '../../../../core/store/modals'
import { IS_VALID_TWITTER_ACC } from '../../../../core/api/calls'

export const STEP_MAPPER = {
    0: LAYOUT_CONTENT_TEXT.StepOne,
    1: LAYOUT_CONTENT_TEXT.StepTwo,
    2: LAYOUT_CONTENT_TEXT.StepThree
}

export const Controls = ({
    currentStep,
    setStep
}: {
    currentStep: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { createAllowlist, updateAllowlist } = useManipulateAllowlist()
    const allowlistState = useSelector((state: RootState) => state.allowlistState)
    const { connectedAddress, connectedWallet } = useSelector((state: RootState) => state.userState)

    const isDisabled = useCallback((step: number) => {
        if (STEP_MAPPER[step]) {
            switch (step) {
                case 0:
                    return !isValidStepOne(allowlistState)
                case 1:
                    return !isValidStepTwo(allowlistState)
                case 2:
                    return false
                default:
                    return true
            }
        }
        return true
    }, [allowlistState])

    const handleStep = async (number: number) => {

        if (number < 0 && allowlistState.editMode) {
            navigate(`/${allowlistState.url}`)
        }

        if (number > 2) {
            if (!connectedAddress || !connectedWallet) {
                dispatch(updateModalState({ selectWallet: true }))
                return
            }

            try {
                dispatch(updateModalState({ pageTransitionLoading: true }))
                let validatedBeforeSubmit = true
                let errMsg = ''

                if (allowlistState.twitter_account) {
                    const isValid = await IS_VALID_TWITTER_ACC(allowlistState.twitter_account)
                    if (!isValid) {
                        validatedBeforeSubmit = false
                        errMsg = `Invalid Twitter account: ${allowlistState.twitter_account}`
                    }
                }

                if (allowlistState.twitter_account_to_follow) {
                    const isValid = await IS_VALID_TWITTER_ACC(allowlistState.twitter_account_to_follow)
                    if (!isValid) {
                        validatedBeforeSubmit = false
                        errMsg = `Invalid Twitter account: ${allowlistState.twitter_account_to_follow}`
                    }
                }

                if (!validatedBeforeSubmit) {
                    throw new Error(errMsg)
                }

                const { success, message } = allowlistState.editMode ?
                    await updateAllowlist(allowlistState) :
                    await createAllowlist(allowlistState)
                if (success) {
                    dispatch(updateModalState({ pageTransitionLoading: false, success: true }))
                } else {
                    throw new Error(message)
                }

            } catch (error) {
                dispatch(updateModalState({
                    pageTransitionLoading: false,
                    failure: true,
                    message: error.message
                }))
            }

            return
        }

        if (STEP_MAPPER[number]) {
            setStep(number)
        }
    }

    return (
        <Box width='100%' height='56px'>
            {currentStep > 0 || allowlistState.editMode ?
                <Button
                    variant="outlined"
                    onClick={() => handleStep(currentStep - 1)}
                    sx={{ float: 'left', width: '47%' }}
                >
                    <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.ArrowRight}
                        style={{ rotate: '180deg', color: COLORS.LIGHT_BLUE[90], marginRight: '10px' }}
                    />
                    Back
                </Button> : null}
            <Button
                disabled={isDisabled(currentStep)}
                variant="contained"
                onClick={() => handleStep(currentStep + 1)}
                sx={{ float: 'right', width: '47%' }}
            >
                {currentStep < 2 ? "Next Step" : allowlistState.editMode ? "Update Allowlist" : "Create Allowlist"}
                <SvgComponent
                    type={currentStep < 2 ?
                        LAYOUT_CONTENT_TEXT.ArrowRight :
                        LAYOUT_CONTENT_TEXT.SmallCheckmark}
                    style={{ marginLeft: '10px' }}
                />
            </Button>
        </Box>
    )
}

const Stepper = ({ step }: { step: number }): JSX.Element => {
    return <SvgComponent type={STEP_MAPPER[step]} style={{ width: '100%' }} />
}

export default Stepper
