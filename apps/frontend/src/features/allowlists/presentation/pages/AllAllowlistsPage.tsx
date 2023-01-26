import React, { useEffect, useState, useCallback } from 'react';
import { Circles as CirclesSpinner } from 'svg-loaders-react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { FetchedAllowlist } from '../../../../core/store/allowlist';
import { GET_ALL_ALLOWLISTS } from '../../../../core/api/calls';
import { COLORS_DARK_THEME } from '../../../../core/theme/colors';
import CreatedAllowlistsPreview from './CreatedAllowlists';
import JoinedAllowlistsPreview from './JoinedAllowlists';
import { RootState } from '../../../../core/store';

import { generalStyles } from './styles';

const AllAllowlistsPage = () => {

  const [allowlists, setAllowlists] = useState<FetchedAllowlist[]>([])
  const [joinedAllowlists, setJoinedAllowlists] = useState<FetchedAllowlist[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { userId } = useSelector((state: RootState) => state.userState)

  const contentHandler = useCallback((): JSX.Element => {
    if (loading) {
      return <CirclesSpinner style={generalStyles.spinner}
        fill={COLORS_DARK_THEME.PRIMARY_BLUE} />
    }

    return (
      <Box id='swipersHolder' gap={4} sx={generalStyles.swipersHolder}>
        <CreatedAllowlistsPreview data={allowlists} />
        <JoinedAllowlistsPreview data={joinedAllowlists} />
      </Box>
    )
  }, [loading, allowlists, joinedAllowlists])

  const loadData = async () => {
    try {
      const data = await GET_ALL_ALLOWLISTS()
      const joined = []
      if (userId) {
        data.forEach((record) => {
          if (record.users.includes(userId)) {
            joined.push(record)
          }
        })
      }
      setAllowlists(data)
      setJoinedAllowlists(joined)

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
