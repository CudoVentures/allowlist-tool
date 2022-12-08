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
    const userRes = await axios.get(`api/v1/user`);
    console.log(userRes);
    const data = {};
    if (userRes.data.twitter_access_token) {
      data['twitter_access_token'] = userRes.data.twitter_access_token;
    }
    if (userRes.data.discord_access_token) {
      data['discord_access_token'] = userRes.data.discord_access_tokens;
    }
    const message = JSON.stringify(data);

    await props.walletStore.connectKeplr();
    const url = `/api/v1/allowlist/join/${props.id}`;

    const address = props.walletStore.getAddress();
    const {
      signature,
      chainId: chain_id,
      sequence,
      accountNumber: account_number,
    } = await props.walletStore.signNonceMsg(message);

    try {
      await axios.post(url, {
        signature,
        address,
        message,
        sequence,
        account_number,
        chain_id,
      });
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
        const userDetails = await axios.get('api/v1/user');

        if (!props.walletStore.isConnected) {
          await props.walletStore.connectKeplr();
        }

        const network =
          CHAIN_DETAILS.CHAIN_ID[props.walletStore.selectedNetwork];
        const userAddress = props.walletStore.getAddress();
        const keplr = await ProjectUtils.getKeplr();

        const messageObj = {};
        if (props.twitter_account || props.tweet) {
          messageObj['twitter_access_token'] =
            userDetails.data.twitter_access_token;
        }
        if (props.discord_server) {
          messageObj['discord_access_token'] =
            userDetails.data.discord_access_token;
        }

        const message = JSON.stringify(messageObj);
        const signature = (
          await keplr.signArbitrary(network, userAddress, message)
        ).signature;

        data = { ...data, signature, message, address: userAddress };

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
      <h3>Cosmos chain id: {props.project_chain_id}</h3>
      <h2>Criteria:</h2>
      <ul>
        {props.twitter_account && (
          <li>
            Follow
            <h5>
              <a
                href={`https://www.twitter.com/${props.twitter_account}`}
                target="_blank"
              >
                {props.twitter_account}
              </a>
            </h5>
          </li>
        )}
        {props.tweet && (
          <li>
            Like/Retweet{' '}
            <h5>
              <a href={props.tweet} target="_blank">
                this tweet
              </a>
            </h5>
          </li>
        )}
        {props.discord_server && props.server_role && (
          <li>
            Join
            <h5>
              <a href={props.discord_server} target="_blank">
                this discord server
              </a>
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
