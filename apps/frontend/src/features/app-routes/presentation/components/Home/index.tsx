import React from 'react';
import { Box } from '@mui/material';

import Features from './Features';
import MainCard from './MainCard';
import LowerSection from './LowerSection';

import { homeStyles } from './styles';

const Home = () => {

  return (
    <Box id='Home' gap={8} sx={homeStyles.holder}>
      <Box
        id='MainCardAndFeaturesHolder'
        sx={homeStyles.mainCardAndFeadturesHolder}
      >
        <MainCard />
        <Features />
      </Box>
      <LowerSection />
    </Box>
  );
};

export default Home;
