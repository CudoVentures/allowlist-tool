import axios from 'axios';
import React, { useState } from 'react';

const Allowlist = (props) => {
  const end_date = props.end_date.substring(0, 10);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(props.name || '');
  const [url, setUrl] = useState(props.url || '');
  const [website, setWebsite] = useState(props.website || '');
  const [twitterAcc, setTwitterAcc] = useState(props.twitter_account || '');
  const [discordUrl, setDiscordUrl] = useState(props.discord_url || '');
  const [description, setDescription] = useState(props.description || '');
  const [endDate, setEndDate] = useState(end_date);
  const [email, setEmail] = useState('');

  const signUp = async () => {
    if (props.require_email && !email) {
      return;
    }

    const userRes = await axios.get(`api/v1/user`);
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
        email,
      });
      alert('success');
    } catch (ex) {
      console.error(ex);
    }
  };

  const onEdit = () => {
    if (!editMode) {
      setEditMode(true);
      return;
    }

    (async () => {
      let data = {};

      if (name && name !== props.name) {
        data['name'] = name;
      }

      if (url && url !== props.url) {
        data['url'] = url;
      }

      if (description && description !== props.description) {
        data['description'] = description;
      }

      if (website && website !== props.website) {
        data['website'] = website;
      }

      if (twitterAcc && twitterAcc !== props.twitter_account) {
        data['twitter_account'] = twitterAcc;
      }

      if (discordUrl && discordUrl !== props.discord_url) {
        data['discord_url'] = discordUrl;
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
        const address = props.walletStore.getAddress();
        const {
          signature,
          chainId: chain_id,
          sequence,
          accountNumber: account_number,
        } = await props.walletStore.signNonceMsg(message);

        data = {
          ...data,
          signature,
          message,
          address,
          chain_id,
          account_number,
          sequence,
        };

        const url = `/api/v1/allowlist/${props.id}`;
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

  const onInputChange = (e, stateFunc) => {
    stateFunc(e.target.value);
  };

  const onDateChange = (e) => {
    setEndDate(e.target.value.substring(0, 10));
  };

  const getElement = (title, value, stateFunc) => {
    return (
      <div>
        {editMode && <h4>{title}:</h4>}
        {!editMode && value && <p>{value}</p>}
        {props.isAdmin && editMode && (
          <input
            type="text"
            value={value}
            onChange={(e) => onInputChange(e, stateFunc)}
          ></input>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: '0 5% 0 5%', height: '100%' }}>
      {getElement('name', name, setName)}
      {getElement('custom url', url, setUrl)}
      {getElement('description', description, setDescription)}
      {getElement('website', website, setWebsite)}
      {getElement('twitter account', twitterAcc, setTwitterAcc)}
      {getElement('discord url', discordUrl, setDiscordUrl)}
      {!editMode && <h3>End date: {endDate}</h3>}
      {props.isAdmin && editMode && (
        <input type="date" value={endDate} onChange={onDateChange}></input>
      )}
      <h3>Cosmos chain id: {props.project_chain_id}</h3>
      <h2>Criteria:</h2>
      <ul>
        {props.twitter_account_to_follow && (
          <li>
            Follow
            <h5>
              <a
                href={`https://www.twitter.com/${props.twitter_account_to_follow}`}
                target="_blank"
              >
                {props.twitter_account_to_follow}
              </a>
            </h5>
          </li>
        )}
        {props.tweet_to_like && (
          <li>
            Like/Retweet{' '}
            <h5>
              <a href={props.tweet_to_like} target="_blank">
                this tweet
              </a>
            </h5>
          </li>
        )}
        {props.discord_invite_link && props.server_role && (
          <li>
            Join
            <h5>
              <a href={props.discord_invite_link} target="_blank">
                this discord server
              </a>
            </h5>
            and get {props.server_role} role
          </li>
        )}
      </ul>
      {!props.isAdmin && !editMode && (
        <input
          type="text"
          value={email}
          onChange={(e) => onInputChange(e, setEmail)}
        ></input>
      )}
      <br></br>
      {props.isAdmin && (
        <button onClick={onEdit}>{editMode ? 'Save' : 'Edit'}</button>
      )}
      {!props.isAdmin && <button onClick={() => signUp()}>Sign up</button>}
      <hr></hr>
    </div>
  );
};

export default Allowlist;
