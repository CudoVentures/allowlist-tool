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
import { isExpired } from '../components/helpers';
import ExpiredAllowlists from './ExpiredAllowlists';

import { generalStyles } from './styles';

const AllAllowlistsPage = () => {

  const [allowlists, setAllowlists] = useState<FetchedAllowlist[]>([])
  const [expiredAllowlists, setExpiredAllowlists] = useState<FetchedAllowlist[]>([])
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
        <ExpiredAllowlists data={expiredAllowlists} />
      </Box>
    )
  }, [loading, allowlists, joinedAllowlists])

  const loadData = async () => {
    try {
      const all = []
      const expired = []

      const allAllowlists = await GET_ALL_ALLOWLISTS()

      if (!userId || !connectedAddress) {
        allAllowlists.forEach((record) => {
          if (isExpired(record.end_date)) {
            expired.push(record)
          } else {
            all.push(record)
          }
        })
        setExpiredAllowlists(expired)
        setAllowlists(all)
        return
      }

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
        if (isExpired(record.end_date)) {
          expired.push(record)
          return
        }
        all.push(record)
      })

      setJoinedAllowlists(joined)
      setCreatedAllowlists(created)
      setAllowlists(all)
      setExpiredAllowlists(expired)

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
