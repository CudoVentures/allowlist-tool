import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import { Oval as OvalLoader } from 'svg-loaders-react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import GridCardContent from './GridCardContent';
import CreateBox from './CreateBox';
import { RootState } from '../../../../core/store';
import { COLORS_DARK_THEME } from '../../../../core/theme/colors';
import NoResult from '../../../../core/presentation/components/Layout/NoResult';
import { allowlistDetailsStyles } from './styles';

const GridList = ({ data, withCreateBox, expanded, withSearchBar }) => {

  const { activeSearch, searchTerms } = useSelector((state: RootState) => state.searchState)
  const gridSpacing = 1.5
  const gridCardWidth = 316

  return (
    <Box sx={{ width: '100%' }}
    >
      {activeSearch ? <OvalLoader style={{ position: 'absolute', top: '50%', left: '50%', stroke: COLORS_DARK_THEME.PRIMARY_BLUE }} /> :
        <Fragment>
          {withSearchBar && searchTerms && !data.length ?
            <NoResult /> :
            null}
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
                  <GridCardContent allowlist={allowlist} visible={expanded} width={gridCardWidth} />
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
