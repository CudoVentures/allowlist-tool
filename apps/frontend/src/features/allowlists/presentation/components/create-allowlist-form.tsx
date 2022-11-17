import axios from 'axios';
import React, { useState } from 'react';

const CreateAllowlistForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [twitterAcc, setTwitterAcc] = useState('');
  const [tweet, setTweet] = useState('');
  const [discordServer, setDiscordServer] = useState('');
  const [serverRole, setServerRole] = useState('');
  const [chainId, setChainId] = useState(0);
  const [endDate, setEndDate] = useState(0 as unknown as Date);

  const onChange = (e, stateFunc) => {
    stateFunc(e.target.value);
  };

  const createAllowlist = async () => {
    if (!name) {
      return;
    }

    if (!chainId) {
      return;
    }

    if (!endDate) {
      return;
    }

    const url = `/api/v1/allowlist`;
    const data = {
      name,
      cosmos_chain_id: chainId,
      end_date: endDate,
    };

    if (description) {
      data['description'] = description;
    }

    if (twitterAcc) {
      data['twitter_account'] = twitterAcc;
    }

    if (tweet) {
      const tweetId = tweet.split('/').at(-1).split('?')[0];
      data['tweet'] = Number(tweetId);
    }

    if (discordServer && serverRole) {
      data['discord_server'] = twitterAcc;
      data['server_role'] = serverRole;
    }

    const res = await axios.post(url, data);
    console.log(res);
  };

  return (
    <div>
      <form>
        <input
          style={{ width: '20%' }}
          type={'text'}
          placeholder="Name"
          value={name}
          onChange={(e) => onChange(e, setName)}
          required={true}
        ></input>
        <br></br>
        <input
          style={{ width: '20%' }}
          type={'text'}
          placeholder="Description(optional)"
          value={description}
          onChange={(e) => onChange(e, setDescription)}
          required={false}
        ></input>
        <br></br>
        <input
          style={{ width: '20%' }}
          type={'text'}
          placeholder="Twitter account to follow(optional)"
          value={twitterAcc}
          onChange={(e) => onChange(e, setTwitterAcc)}
          required={false}
        ></input>
        <br></br>
        <input
          style={{ width: '20%' }}
          type={'text'}
          placeholder="Tweet to interact(optional)"
          value={tweet}
          onChange={(e) => onChange(e, setTweet)}
          required={false}
        ></input>
        <br></br>
        <input
          style={{ width: '20%' }}
          type={'text'}
          placeholder="Discord server(optional)"
          value={discordServer}
          onChange={(e) => onChange(e, setDiscordServer)}
          required={false}
        ></input>
        <br></br>
        <input
          style={{ width: '20%' }}
          type={'text'}
          placeholder="Discord server role(optional)"
          value={serverRole}
          onChange={(e) => onChange(e, setServerRole)}
          required={false}
        ></input>
        <br></br>
        <input
          style={{ width: '10%' }}
          type={'text'}
          placeholder="Cosmos chain id"
          value={chainId || ''}
          onChange={(e) => onChange(e, setChainId)}
        ></input>
        <br></br>
        <input
          style={{ width: '10%' }}
          type={'date'}
          placeholder="End date"
          value={endDate.toString()}
          onChange={(e) => onChange(e, setEndDate)}
        ></input>
      </form>
      <button type="submit" onClick={createAllowlist}>
        Create allowlist
      </button>
    </div>
  );
};

export default CreateAllowlistForm;
