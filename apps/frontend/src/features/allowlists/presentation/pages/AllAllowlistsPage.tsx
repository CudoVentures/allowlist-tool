import React, { useEffect, useState, useCallback } from 'react';
import { Circles as CirclesSpinner } from 'svg-loaders-react';
import { Box } from '@mui/material';

import { FetchedAllowlist } from '../../../../core/store/allowlist';
import { GET_ALL_ALLOWLISTS } from '../../../../core/api/calls';
import NoResult from '../../../../core/presentation/components/Layout/NoResult';
import { COLORS_DARK_THEME } from '../../../../core/theme/colors';
import CreatedAllowlistsPreview from './CreatedAllowlists';
import JoinedAllowlistsPreview from './JoinedAllowlists';

import { generalStyles } from './styles';

const AllAllowlistsPage = () => {

  const [allowlists, setAllowlists] = useState<FetchedAllowlist[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const contentHandler = useCallback((): JSX.Element => {
    if (loading) {
      return <CirclesSpinner style={generalStyles.spinner}
        fill={COLORS_DARK_THEME.PRIMARY_BLUE} />
    }

    if (allowlists.length) {
      return (
        <Box id='swipersHolder' gap={4} sx={generalStyles.swipersHolder}>
          <CreatedAllowlistsPreview data={allowlists} />
          <JoinedAllowlistsPreview data={allowlists} />
        </Box>
      )
    }

    return <NoResult />
  }, [loading, allowlists])

  const loadData = async () => {
    try {
      const data = await GET_ALL_ALLOWLISTS()
      setAllowlists(data)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return contentHandler()
}

export default AllAllowlistsPage
