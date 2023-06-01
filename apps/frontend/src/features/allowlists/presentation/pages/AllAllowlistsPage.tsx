import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { FetchedAllowlist } from '../../../../core/store/allowlist';
import { GET_ALL_ALLOWLISTS } from '../../../../core/api/calls';
import AllAllowlistsPreview from './AllAllowlists';
import { RootState } from '../../../../core/store';
import { StyledPuffLoader } from '../../../../core/presentation/components/Layout/helpers';

import { generalStyles } from './styles';

const AllAllowlistsPage = () => {

  const [allowlists, setAllowlists] = useState<FetchedAllowlist[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { connectedAddress } = useSelector((state: RootState) => state.userState)

  const contentHandler = useCallback((): JSX.Element => {
    if (loading) {
      return <StyledPuffLoader />
    }

    return (
      <Box id='gridsHolder' gap={4} sx={generalStyles.gridsHolder}>
        <AllAllowlistsPreview data={allowlists} />
      </Box>
    )
  }, [loading, allowlists])

  const loadData = async () => {
    try {
      setLoading(true)
      const allAllowlists = await GET_ALL_ALLOWLISTS()
      setAllowlists(allAllowlists)

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
