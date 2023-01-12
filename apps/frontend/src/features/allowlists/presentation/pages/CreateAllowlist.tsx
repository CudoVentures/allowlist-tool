import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';

import CreateAllowlistForm from '../components/CreateAllowlistForm';
import Stepper, { Controls } from '../components/Stepper';
import RegistrationCriteriaForm from '../components/RegistrationCriteria';
import AllowlistCreationPreview from '../components/AllowlistCreationPreview';
import { initialState as initialAllowlistState, updateAllowlistObject } from '../../../../core/store/allowlist';
import { StyledCircleSpinner } from '../../../../core/presentation/components/Layout/helpers';

import { createAllowlistStyles } from './styles';

const CreateAllowlistPage = () => {

  const dispatch = useDispatch()
  const [currentCreationStep, setCurrentCreationStep] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  const contentHandler = useCallback((step: number): JSX.Element => {
    switch (step) {
      case 0:
        return <CreateAllowlistForm />
      case 1:
        return <RegistrationCriteriaForm />
      case 2:
        return <AllowlistCreationPreview />
      default:
        return <Fragment></Fragment>
    }
  }, [currentCreationStep])

  // CLEAN-UP
  useEffect(() => {
    try {
      dispatch(updateAllowlistObject(initialAllowlistState))
      return () => {
        dispatch(updateAllowlistObject(initialAllowlistState))
      }

    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [])

  useEffect(() => {

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentCreationStep])

  return loading ? <StyledCircleSpinner /> : (
    <Box id='createAllowlistPage' sx={createAllowlistStyles.holder}>
      <Box gap={4} id='contentHolder' sx={createAllowlistStyles.contentHolder}>
        <Box>
          <Typography
            variant='h4'
            fontWeight={700}
          >
            Create New Allowlist
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            fontWeight={400}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra.
          </Typography>
        </Box>
        <Stepper step={currentCreationStep} />
        {contentHandler(currentCreationStep)}
        <Controls
          currentStep={currentCreationStep}
          setStep={setCurrentCreationStep}
        />
      </Box>
    </Box>
  );
}

export default CreateAllowlistPage;
