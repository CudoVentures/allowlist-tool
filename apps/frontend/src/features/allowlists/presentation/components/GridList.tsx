import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import { Oval as OvalLoader } from 'svg-loaders-react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import GridCardContent from './GridCardContent';
import CreateBox from './CreateBox';
import { RootState } from '../../../../core/store';
import { COLORS } from '../../../../core/theme/colors';
import { allowlistDetailsStyles } from './styles';

const GridList = ({ data, withCreateBox }) => {

  const { activeSearch } = useSelector((state: RootState) => state.searchState)
  const gridSpacing = 1.5
  const gridCardWidth = 316

  return (
    <Box sx={{ width: '100%' }}
    >
      {activeSearch ? <OvalLoader style={{ position: 'absolute', top: '50%', left: '50%', stroke: COLORS.LIGHT_BLUE[90] }} /> :
        <Fragment>
          <Box sx={allowlistDetailsStyles.contentHolder} >
            <Grid container
              spacing={gridSpacing}
            >
              {withCreateBox && (
                <Grid id='GridCreateBoxHolder' item key={'CreateBox'}
                  style={{ display: 'flex', justifyContent: 'flex-start' }}
                >
                  <CreateBox width={gridCardWidth} />
                </Grid>
              )}
              {data.map((allowlist: FetchedAllowlist, idx: React.Key) => (
                <Grid id='GridCardContentHolder' item key={idx}
                  style={{ display: 'flex', justifyContent: 'flex-start' }}
                >
                  <GridCardContent allowlist={allowlist} width={gridCardWidth} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fragment>
      }
    </Box>
  );
};

export default GridList;
