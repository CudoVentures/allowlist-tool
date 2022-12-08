import { CHAIN_DETAILS } from '../../../../core/utilities/Constants';
import axios from 'axios';
import React, { useState } from 'react';
import ProjectUtils from '../../../../core/utilities/ProjectUtils';
declare let Config;

const CreateAllowlistForm = ({ walletStore }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [twitterAcc, setTwitterAcc] = useState('');
  const [tweet, setTweet] = useState('');
  const [discordServer, setDiscordServer] = useState('');
  const [serverRole, setServerRole] = useState('');
  const [projectChainId, setChainId] = useState(0);
  const [endDate, setEndDate] = useState(0 as unknown as Date);

  const onChange = (e, stateFunc) => {
    stateFunc(e.target.value);
  };

  const addDiscordBot = () => {
    window.open(
      `https://discord.com/api/oauth2/authorize?client_id=${Config.REACT_APP_DISCORD_CLIENT_ID}&permissions=0&scope=bot`,
    );
  };

  const createAllowlist = async () => {
    if (!name) {
      return;
    }

    if (!projectChainId) {
      return;
    }

    if (!endDate) {
      return;
    }

    const url = `/api/v1/allowlist`;
    const data = {
      name,
      project_chain_id: projectChainId,
      end_date: endDate,
    };

    if (description) {
      data['description'] = description;
    }

    if (twitterAcc) {
      data['twitter_account'] = twitterAcc;
    }

    if (tweet) {
      data['tweet'] = tweet;
    }

    if (discordServer && serverRole) {
      data['discord_server'] = discordServer;
      data['server_role'] = serverRole;
    }

    if (!walletStore.isConnected) {
      await walletStore.connectKeplr();
    }

    const message = JSON.stringify(data);

    const address = walletStore.getAddress();
    const {
      signature,
      chainId: chain_id,
      sequence,
      accountNumber: account_number,
    } = await walletStore.signNonceMsg(message);

    const reqData = {
      ...data,
      signature,
      address,
      message,
      sequence,
      account_number,
      chain_id,
    };
    try {
      await axios.post(url, reqData);
      alert('success');
    } catch (ex) {
      console.error(ex);
    }
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
          placeholder="Tweet to interact with(optional)"
          value={tweet}
          onChange={(e) => onChange(e, setTweet)}
          required={false}
        ></input>
        <br></br>
        <input
          style={{ width: '20%' }}
          type={'text'}
          placeholder="Discord invite link(optional)"
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
          value={projectChainId || ''}
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
      <button type="submit" onClick={addDiscordBot}>
        Add allowlist-bot to your server
      </button>
      <br></br>
      <button type="submit" onClick={createAllowlist}>
        Create allowlist
      </button>
    </div>
  );
};

export default CreateAllowlistForm;
