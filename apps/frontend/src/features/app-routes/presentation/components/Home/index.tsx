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

    // <div
    //   style={{
    //     height: '70%',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     gap: '1rem',
    //   }}
    // >
    //   <Link to="/allowlists">
    //     <button>Allowlists</button>
    //   </Link>
    //   <Link to="/create">
    //     <button>Create an allowlist</button>
    //   </Link>
    // </div>
  );
};

export default Home;
