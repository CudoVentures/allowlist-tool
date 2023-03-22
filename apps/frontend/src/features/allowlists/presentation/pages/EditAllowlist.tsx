import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import CreateAllowlistForm from '../components/CreateAllowlistForm';
import Stepper, { Controls } from '../components/Stepper';
import { RootState } from '../../../../core/store';
import RegistrationCriteriaForm from '../components/RegistrationCriteria';
import AllowlistCreationPreview from '../components/AllowlistCreationPreview';

import { createAllowlistStyles } from './styles';

const EditAllowlistPage = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [currentCreationStep, setCurrentCreationStep] = useState<number>(0)
  const { url: allowlistId } = useSelector((state: RootState) => state.allowlistState)


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

  // Sanity route check
  useEffect(() => {
    if (id !== allowlistId) {
      navigate(`/${id}`)
      return
    }
  }, [])

  useEffect(() => {

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentCreationStep])

  return (
    <Box id='createAllowlistPage' sx={createAllowlistStyles.holder}>
      <Box gap={4} id='contentHolder' sx={createAllowlistStyles.contentHolder}>
        <Box>
          <Typography
            variant='h4'
            fontWeight={700}
          >
            Edit Allowlist
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            fontWeight={400}
          >
            Here you can edit all the information about your Allowlist, including its sign up criteria. We remind you that this is only possible while no users have joined your Allowlist yet.
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

export default EditAllowlistPage;
