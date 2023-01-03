import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Allowlist from '../components/allowlist-preview';

function AllAllowlistsPage() {
  const [allowlists, setAllowlists] = useState([]);

  useEffect(() => {
    (async () => {
      const url = 'api/v1/allowlist/all';
      const res = await axios.get(url);
      setAllowlists(res.data);
    })();
  }, []);

  return (
    <div>
      <h1 style={{ padding: '0 5% 0 5%' }}>Allowlists</h1>
      {allowlists &&
        allowlists.map((allowlist) => {
          delete allowlist.createdаt;
          delete allowlist.updatedаt;
          return <Allowlist key={allowlist.id} {...allowlist}></Allowlist>;
        })}
    </div>
  );
}

export default AllAllowlistsPage;
