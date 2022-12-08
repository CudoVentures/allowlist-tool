import React from 'react';
import { Link } from 'react-router-dom';

const AllowlistPreview = (props) => {
  return (
    <div style={{ padding: '0 5% 0 5%', height: '100%' }}>
      <Link to={`/${props.url}`}>
        <h1>{props.name}</h1>
      </Link>
      {props.description && <p>{props.description}</p>}
      <h3>End date: {props.end_date}</h3>
      <h3>Cosmos chain id: {props.cosmos_chain_id}</h3>
      <hr></hr>
    </div>
  );
};

export default AllowlistPreview;
