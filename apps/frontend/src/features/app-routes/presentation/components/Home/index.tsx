import React, { Suspense, lazy } from 'react';
import { Box } from '@mui/material';
import ClipLoader from "react-spinners/ClipLoader";

const FeaturesPreview = lazy(() => import('./Features'));
const MainCardPreview = lazy(() => import('./MainCard'));
const LowerSectionPreview = lazy(() => import('./LowerSection'));

import { homeStyles } from './styles';
import { COLORS } from '../../../../../core/theme/colors';
import { GradientText } from '../../../../../core/theme/helpers';

const InitialLoading = () => {
  return (
    <Box style={{
      fontSize: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh'
    }}>
      <ClipLoader
        color={COLORS.LIGHT_BLUE[90]}
        loading={true}
        size={45}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {/* <GradientText
        text={'loading'.toUpperCase()}
        fontFamily='CudosBit'
        startColor={'rgba(252, 247, 109, 1)'}
        endColor={'rgba(255, 253, 202, 1)'}
      /> */}
    </Box>
  )
}
const Home = () => {
  return (
    <Box id='Home' gap={8} sx={homeStyles.holder}>
      <Suspense fallback={<InitialLoading />}>
        <Box id='MainCardAndFeaturesHolder' sx={homeStyles.mainCardAndFeadturesHolder}>
          <MainCardPreview />
          <FeaturesPreview />
        </Box>
        <LowerSectionPreview />
      </Suspense >
    </Box >
  );
};

export default Home;
