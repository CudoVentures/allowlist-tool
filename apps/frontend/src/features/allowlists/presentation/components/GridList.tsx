import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import { Oval as OvalLoader } from 'svg-loaders-react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import GridCardContent from './GridCardContent';
import CreateBox from './CreateBox';
import { initialState, SearchFilter, updateSearchState } from '../../../../core/store/search';
import { RootState } from '../../../../core/store';
import { COLORS_DARK_THEME } from '../../../../core/theme/colors';
import NoResult from '../../../../core/presentation/components/Layout/NoResult';
import { allowlistDetailsStyles } from './styles';

const GridList = ({ data: defaultData, withCreateBox, expanded, withSearchBar }) => {

  const dispatch = useDispatch()
  const { activeSearch, searchTerms, appliedFilter, ascendingOrder } = useSelector((state: RootState) => state.searchState)
  const [displayData, setDisplayData] = useState<FetchedAllowlist[]>([])
  const gridSpacing = 1.5
  const gridCardWidth = 316
  const dataLength: number = displayData.length

  const sanitizeString = (text: string): string => {
    return text.trim().toLowerCase()
  }

  const filterBySearchTerms = (allowlist: FetchedAllowlist): boolean => {
    if (sanitizeString(allowlist.name!)
      .includes(sanitizeString(searchTerms!))) {
      return true
    }
    return false
  }

  useEffect(() => {
    let dataToDisplay = [...defaultData]
    if (withSearchBar) {
      try {
        if (!!searchTerms) {
          dataToDisplay = [...dataToDisplay].filter(filterBySearchTerms)
        }
        if (!!appliedFilter) {
          if (appliedFilter === SearchFilter.name) {
            dataToDisplay = [...dataToDisplay].sort((a, b) => {
              if (ascendingOrder) {
                return sanitizeString(a.name!).localeCompare(sanitizeString(b.name!))
              } else {
                return sanitizeString(b.name!).localeCompare(sanitizeString(a.name!))
              }
            })
          } else
            if (appliedFilter === SearchFilter.remainingTime) {
              dataToDisplay = [...dataToDisplay].sort((a, b) => {
                const date1 = new Date(a.end_date).valueOf()
                const date2 = new Date(b.end_date).valueOf()
                if (ascendingOrder) {
                  return date2 - date1
                } else {
                  return date1 - date2
                }
              })
            }
        }
      } catch (error) {
        console.error(error.message)
      }
    }

    setDisplayData(dataToDisplay)

  }, [withSearchBar, searchTerms, appliedFilter, ascendingOrder])

  useEffect(() => {
    if (!searchTerms) {
      dispatch(updateSearchState({ activeSearch: true }))
      setTimeout(() => {
        dispatch(updateSearchState({ activeSearch: false }))
      }, 300)
    }
  }, [searchTerms, appliedFilter, ascendingOrder])

  const cleanUp = () => {
    dispatch(updateSearchState(initialState))
  }

  useEffect(() => {
    cleanUp()
    return () => cleanUp()
    //eslint-disable-next-line
  }, [])

  return (
    <Box sx={{ width: '100%' }}
    >
      {activeSearch ? <OvalLoader style={{ position: 'absolute', top: '50%', left: '50%', stroke: COLORS_DARK_THEME.PRIMARY_BLUE }} /> :
        <Fragment>
          {withSearchBar && searchTerms && !dataLength ?
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
              {displayData.map((allowlist: FetchedAllowlist, idx: React.Key) => (
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
