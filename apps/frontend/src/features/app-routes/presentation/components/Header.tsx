import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Header = ({ walletStore }) => {
  const [isConnected, setIsConnected] = useState(walletStore.isConnected());
  const [user, setUser] = useState({
    twitterUsername: '',
    discordUsername: '',
  });

  useEffect(() => {
    (async () => {
      const addr = window.localStorage.getItem('addr');
      if (addr) {
        await walletStore.connectKeplr();
        setIsConnected(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!isConnected) {
        return;
      }

      window.localStorage.setItem(
        'addr',
        JSON.stringify(walletStore.getAddress()),
      );
      const url = 'api/v1/user';
      const res = await axios.get(url);
      setUser({
        twitterUsername: res.data.twitter_profile_username,
        discordUsername: res.data.discord_profile_username,
      });
    })();
  }, [isConnected]);

  const onClickAuth = async (service: string) => {
    const url = `api/v1/auth/${service}/login`;
    window.open(url, '_self');
  };

  const connectWallet = async () => {
    if (isConnected) {
      await walletStore.disconnect();
      window.localStorage.removeItem('addr');
      setIsConnected(false);
      return;
    }

    try {
      await walletStore.connectKeplr();
      const url = 'api/v1/auth/login';
      await axios.get(url);
      setIsConnected(true);
    } catch (error) {
      await walletStore.disconnect();
      console.log(error);
    }
  };

  return (
    <header
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '1rem',
        paddingTop: '1rem',
      }}
    >
      {isConnected && (
        <button onClick={() => onClickAuth('twitter')}>
          {user.twitterUsername ? user.twitterUsername : 'Twitter login'}
        </button>
      )}
      {isConnected && (
        <button onClick={() => onClickAuth('discord')}>
          {user.discordUsername ? user.discordUsername : 'Discord login'}
        </button>
      )}
      <button onClick={() => connectWallet()}>
        {isConnected ? walletStore.getAddress() : 'Connect Keplr'}
      </button>
    </header>
  );
};

export default Header;
