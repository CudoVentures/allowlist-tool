import React from 'react';
import CreateAllowlistForm from '../components/create-allowlist-form';

function CreateAllowlistPage({ walletStore }) {
  return (
    <div style={{ padding: '3%' }}>
      <h1>Create a new allowlist</h1>
      <CreateAllowlistForm walletStore={walletStore} />
    </div>
  );
}

export default CreateAllowlistPage;
