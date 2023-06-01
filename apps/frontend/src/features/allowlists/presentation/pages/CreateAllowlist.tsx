import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

import CreateAllowlistForm from '../components/CreateAllowlistForm';
import Stepper, { Controls } from '../components/Stepper';
import RegistrationCriteriaForm from '../components/RegistrationCriteria';
import AllowlistCreationPreview from '../components/AllowlistCreationPreview';
import { initialState as initialAllowlistState, updateAllowlistObject } from '../../../../core/store/allowlist';
import { StyledPuffLoader } from '../../../../core/presentation/components/Layout/helpers';
import { updateUser } from '../../../../core/store/user';
import { RootState } from '../../../../core/store';
import { emptyGuildInfo } from '../../../../../../common/interfaces';

import { createAllowlistStyles } from './styles';

const CreateAllowlistPage = () => {

  const dispatch = useDispatch()
  const [currentCreationStep, setCurrentCreationStep] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const { connectedSocialMedia } = useSelector((state: RootState) => state.userState)

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

  const cleanUp = () => {
    dispatch(updateAllowlistObject(initialAllowlistState))
    dispatch(updateUser({
      connectedSocialMedia: {
        twitter: {
          id: connectedSocialMedia.twitter.id,
          userName: connectedSocialMedia.twitter.userName,
          guild: emptyGuildInfo
        },
        discord: {
          id: connectedSocialMedia.discord.id,
          userName: connectedSocialMedia.discord.userName,
          guild: emptyGuildInfo
        }
      }
    }))
  }

  // CLEAN-UP
  useEffect(() => {
    try {
      cleanUp()
      return () => cleanUp()

    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [])

  useEffect(() => {

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentCreationStep])

  return loading ? <StyledPuffLoader /> : (
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
            Please provide all required information in the sections below. We advise creators to be as descriptive as possible when creating an Allowlist, to provide your audience with sufficient information about the project. It is possible to edit an Allowlist after it has been created, but only if no users have joined it yet.
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
