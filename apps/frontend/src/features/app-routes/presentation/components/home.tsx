import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      style={{
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <Link to="/allowlists">
        <button>Allowlists</button>
      </Link>
      <Link to="/create">
        <button>Create an allowlist</button>
      </Link>
    </div>
  );
};

export default Home;
