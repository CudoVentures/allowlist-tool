import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Allowlist from '../components/Allowlist';
import NoResult from '../../../../core/presentation/components/Layout/NoResult';
import { FetchedAllowlist } from '../../../../core/store/allowlist';

function AllowlistPage() {

  const { id } = useParams();
  const [allowlist, setAllowlist] = useState<FetchedAllowlist>(null);

  useEffect(() => {
    const setAllowlistDetails = async () => {
      const url = `/api/v1/allowlist/${id}`;
      try {
        const res = await axios.get(url);
        const data = res.data;
        delete data.createdAt;
        delete data.updatedAt;
        setAllowlist(data);

      } catch (error) {
        console.error(error.message)
      }
    }
    setAllowlistDetails()
  }, [setAllowlist]);

  return Object.keys(allowlist || {}).length ?
    <Allowlist props={{ ...allowlist, end_date: new Date(allowlist.end_date) }} /> :
    <NoResult />;
}

export default AllowlistPage;
