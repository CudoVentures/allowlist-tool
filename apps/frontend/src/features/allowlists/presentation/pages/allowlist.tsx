import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Allowlist from '../components/allowlist';
import { useParams } from 'react-router-dom';

function AllowlistPage() {
  const { id } = useParams();
  const [allowlist, setAllowlist] = useState({});

  useEffect(() => {
    (async () => {
      const url = `/api/v1/allowlist/${id}`;
      const res = await axios.get(url);
      const data = res.data;
      delete data.createdAt;
      delete data.updatedAt;
      setAllowlist({ ...data });
    })();
  }, []);

  return Object.keys(allowlist).length ? (
    <Allowlist {...allowlist} />
  ) : (
    <div></div>
  );
}

export default AllowlistPage;
