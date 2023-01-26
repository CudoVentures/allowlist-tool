import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Allowlist from '../components/Allowlist';
import NoResult from '../../../../core/presentation/components/Layout/NoResult';
import { FetchedAllowlist } from '../../../../core/store/allowlist';
import { GET_ALLOWLIST_DETAILS } from '../../../../core/api/calls';
import { StyledCircleSpinner } from '../../../../core/presentation/components/Layout/helpers';

function AllowlistPage() {

  const { id } = useParams();
  const [allowlist, setAllowlist] = useState<FetchedAllowlist>(null);
  const [loading, setLoading] = useState<boolean>(true)

  const contentHandler = useCallback((): JSX.Element => {
    if (loading) {
      return <StyledCircleSpinner />
    }
    if (Object.keys(allowlist || {}).length) {
      return <Allowlist props={{ ...allowlist, end_date: new Date(allowlist.end_date) }} />
    }
    return <NoResult />
  }, [loading, allowlist])

  useEffect(() => {
    const setAllowlistDetails = async () => {

      try {
        const res = await GET_ALLOWLIST_DETAILS(id)
        const data = res.data;
        delete data.createdAt;
        delete data.updatedAt;
        setAllowlist(data);

      } catch (error) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    setAllowlistDetails()
  }, []);

  return contentHandler()
}

export default AllowlistPage;