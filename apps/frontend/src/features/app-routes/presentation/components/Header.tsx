import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ walletStore }) => {
  const [isConnected, setIsConnected] = useState(walletStore.isConnected());

  const onClickAuth = async (service: string) => {
    const url = `/api/v1/auth/${service}/login`;
    window.open(url, '_self');
  };

  const connectWallet = async () => {
    if (isConnected) {
      await walletStore.disconnect();
      setIsConnected(false);
    } else {
      await walletStore.connectKeplr();
      setIsConnected(true);
    }
  };

  return (
    <header
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <ul
        style={{
          listStyleType: 'none',
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          gap: '2rem',
        }}
      >
        <li>
          <Link to="/home">Allowlists</Link>
        </li>
        <li>
          <Link to="/create">Create an allowlist</Link>
        </li>
        <li>
          <Link to="/allowlists">My allowlists</Link>
        </li>
      </ul>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          gap: '1rem',
          paddingRight: '1rem',
        }}
      >
        <button onClick={() => onClickAuth('twitter')}>Twitter auth</button>
        <button onClick={() => onClickAuth('discord')}>Discord auth</button>
        <button onClick={() => connectWallet()}>
          {isConnected ? walletStore.address : 'Connect Keplr'}
        </button>
      </div>
    </header>
  );
};

export default Header;
