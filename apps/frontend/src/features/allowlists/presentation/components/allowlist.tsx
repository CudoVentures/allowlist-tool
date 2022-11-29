import { CHAIN_DETAILS } from '../../../../core/utilities/Constants';
import axios from 'axios';
import React, { useState } from 'react';
import ProjectUtils from '../../../../core/utilities/ProjectUtils';

const Allowlist = (props) => {
  const end_date = props.end_date.substring(0, 10);
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState(props.description || '');
  const [endDate, setEndDate] = useState(end_date);

  const signUp = async () => {
    const url = `/api/v1/allowlist/join/${props.id}`;

    const data = await ProjectUtils.signMessage(
      CHAIN_DETAILS.RPC_ADDRESS[props.walletStore.selectedNetwork],
      props.walletStore.ledger.offlineSigner,
      props.walletStore.getAddress(),
    );

    try {
      const res = await axios.post(url, data);
      alert('success');
    } catch (ex) {
      console.error(ex);
    }
  };

  const onClick = () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }

    (async () => {
      const url = `/api/v1/allowlist/${props.id}`;
      let data = {};

      if (description && description !== props.description) {
        data['description'] = description;
      }

      if (endDate && endDate !== end_date) {
        data['end_date'] = endDate;
      }

      if (Object.keys(data).length === 0) {
        setEditMode(false);
        return;
      }

      try {
        const signData = await ProjectUtils.signMessage(
          CHAIN_DETAILS.RPC_ADDRESS[props.walletStore.selectedNetwork],
          props.walletStore.ledger.offlineSigner,
          props.walletStore.getAddress(),
        );

        data = { ...data, ...signData };

        const res = await axios.put(url, data);

        if (res.data.description) {
          setDescription(res.data.description);
        }

        if (res.data.end_date) {
          setEndDate(res.data.end_date.substring(0, 10));
        }
      } catch (ex) {
        console.error(ex);
      } finally {
        setEditMode(false);
      }
    })();
  };

  const onDateChange = (e) => {
    setEndDate(e.target.value.substring(0, 10));
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div style={{ padding: '0 5% 0 5%', height: '100%' }}>
      <h1>{props.name}</h1>
      {!editMode && description && <p>{description}</p>}
      {props.isAdmin && editMode && (
        <input
          type="text"
          value={description}
          onChange={onDescriptionChange}
        ></input>
      )}
      {!editMode && <h3>End date: {endDate}</h3>}
      {props.isAdmin && editMode && (
        <input type="date" value={endDate} onChange={onDateChange}></input>
      )}
      <h3>Cosmos chain id: {props.cosmos_chain_id}</h3>
      <h2>Criteria:</h2>
      <ul>
        {props.twitter_account && (
          <li>
            Follow
            <h5>
              <a href={`https://www.twitter.com/${props.twitter_account}`}>
                {props.twitter_account}
              </a>
            </h5>
          </li>
        )}
        {props.tweet && (
          <li>
            Like/Retweet{' '}
            <h5>
              <a href={props.tweet}>this tweet</a>
            </h5>
          </li>
        )}
        {props.discord_server && props.server_role && (
          <li>
            Join
            <h5>
              <a href={props.discord_server}>this discord server</a>
            </h5>
            and get {props.server_role} role
          </li>
        )}
      </ul>
      {props.isAdmin && (
        <button onClick={onClick}>{editMode ? 'Save' : 'Edit'}</button>
      )}
      {!props.isAdmin && <button onClick={() => signUp()}>Sign up</button>}
      <hr></hr>
    </div>
  );
};

export default Allowlist;
