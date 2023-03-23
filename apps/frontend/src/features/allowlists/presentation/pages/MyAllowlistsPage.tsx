import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { FetchedAllowlist } from '../../../../core/store/allowlist';
import { GET_ALL_ALLOWLISTS } from '../../../../core/api/calls';
import CreatedAllowlistsPreview from './CreatedAllowlists';
import JoinedAllowlistsPreview from './JoinedAllowlists';
import { RootState } from '../../../../core/store';
import { StyledPuffLoader } from '../../../../core/presentation/components/Layout/helpers';

import { generalStyles } from './styles';

const MyAllowlistsPage = () => {

  const [joinedAllowlists, setJoinedAllowlists] = useState<FetchedAllowlist[]>([])
  const [createdAllowlists, setCreatedAllowlists] = useState<FetchedAllowlist[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { userId, connectedAddress } = useSelector((state: RootState) => state.userState)

  const contentHandler = useCallback((): JSX.Element => {
    if (loading) {
      return <StyledPuffLoader />
    }

    return (
      <Box id='gridsHolder' gap={4} sx={generalStyles.gridsHolder}>
        <CreatedAllowlistsPreview data={createdAllowlists} />
        <JoinedAllowlistsPreview data={joinedAllowlists} />
      </Box>
    )

  }, [loading, joinedAllowlists, createdAllowlists])

  const loadData = async () => {
    try {
      setLoading(true)
      const joined = []
      const created = []
      const allAllowlists = await GET_ALL_ALLOWLISTS()
      allAllowlists.forEach((record) => {
        if (userId && record.users.includes(userId.toString())) {
          joined.push(record)
          return
        }
        if (connectedAddress && record.admin === connectedAddress) {
          created.push(record)
          return
        }
      })

      setJoinedAllowlists(joined)
      setCreatedAllowlists(created)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (connectedAddress) {
      loadData()
    }
  }, [connectedAddress])

  return contentHandler()
}

export default MyAllowlistsPage
