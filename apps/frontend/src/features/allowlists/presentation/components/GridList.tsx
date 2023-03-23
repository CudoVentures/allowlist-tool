import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import { Puff as PuffLoader } from 'svg-loaders-react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import GridCardContent from './GridCardContent';
import CreateBox from './CreateBox';
import { SearchFilter, updateSearchState } from '../../../../core/store/search';
import { RootState } from '../../../../core/store';
import { COLORS_DARK_THEME } from '../../../../core/theme/colors';

const GridList = ({ data: defaultData, withCreateBox, expanded, withSearchBar }) => {

  const dispatch = useDispatch()
  const { activeSearch, searchTerms, appliedFilter, ascendingOrder } = useSelector((state: RootState) => state.searchState)
  const [displayData, setDisplayData] = useState<FetchedAllowlist[]>([])

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

  return (
    <Fragment> {activeSearch ? <PuffLoader style={{ position: 'absolute', top: '50%', stroke: COLORS_DARK_THEME.PRIMARY_BLUE }} /> :
      <Fragment>
        {withSearchBar && searchTerms && !displayData.length ?
          <Typography
            sx={{ position: 'absolute', top: '50%' }}
            variant='h6'
            color={COLORS_DARK_THEME.TESTNET_ORANGE}
          >
            {`No result...`}
          </Typography> :
          null}
        <Grid
          container
          sx={{ justifyContent: 'center' }}
          spacing={2}
        >

          {withCreateBox && (
            <Grid item sx={{ flexGrow: 1, flexBasis: 0 }}>
              <CreateBox />
            </Grid>
          )}
          {displayData.map((allowlist: FetchedAllowlist, idx: React.Key) => (
            <Grid key={idx} item sx={{ flexGrow: 1, flexBasis: 0 }}>
              <GridCardContent allowlist={allowlist} visible={expanded} />
            </Grid>
          ))}
        </Grid>
      </Fragment>
    }
    </Fragment>
  );
};

export default GridList;
