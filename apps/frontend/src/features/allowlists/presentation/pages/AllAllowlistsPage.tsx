import React, { useEffect, useState, useCallback } from 'react';
import { Circles as CirclesSpinner } from 'svg-loaders-react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { FetchedAllowlist } from '../../../../core/store/allowlist';
import { GET_ALL_ALLOWLISTS } from '../../../../core/api/calls';
import { COLORS_DARK_THEME } from '../../../../core/theme/colors';
import CreatedAllowlistsPreview from './CreatedAllowlists';
import JoinedAllowlistsPreview from './JoinedAllowlists';
import AllAllowlistsPreview from './AllAllowlists';
import { RootState } from '../../../../core/store';

import { generalStyles } from './styles';

const AllAllowlistsPage = () => {

  const [allowlists, setAllowlists] = useState<FetchedAllowlist[]>([])
  const [joinedAllowlists, setJoinedAllowlists] = useState<FetchedAllowlist[]>([])
  const [createdAllowlists, setCreatedAllowlists] = useState<FetchedAllowlist[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { userId, connectedAddress } = useSelector((state: RootState) => state.userState)

  const contentHandler = useCallback((): JSX.Element => {
    if (loading) {
      return <CirclesSpinner style={generalStyles.spinner}
        fill={COLORS_DARK_THEME.PRIMARY_BLUE} />
    }

    return (
      <Box id='swipersHolder' gap={4} sx={generalStyles.swipersHolder}>
        <CreatedAllowlistsPreview data={createdAllowlists} />
        <JoinedAllowlistsPreview data={joinedAllowlists} />
        <AllAllowlistsPreview data={allowlists} />
      </Box>
    )
  }, [loading, allowlists, joinedAllowlists])

  const loadData = async () => {
    try {
      const allAllowlists = await GET_ALL_ALLOWLISTS()
      if (!userId || !connectedAddress) {
        setAllowlists(allAllowlists)
        return
      }

      const all = []
      const joined = []
      const created = []

      allAllowlists.forEach((record) => {
        if (userId && record.users.includes(userId.toString())) {
          joined.push(record)
          return
        }
        if (connectedAddress && record.admin === connectedAddress) {
          created.push(record)
          return
        }
        all.push(record)
      })

      setJoinedAllowlists(joined)
      setCreatedAllowlists(created)
      setAllowlists(all)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [connectedAddress])

  return contentHandler()
}

export default AllAllowlistsPage
