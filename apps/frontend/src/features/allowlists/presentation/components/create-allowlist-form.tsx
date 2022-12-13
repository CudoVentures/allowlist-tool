import axios from 'axios';
import React, { SetStateAction, useState } from 'react';
declare let Config;

const CreateAllowlistForm = ({ walletStore }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [twitterAcc, setTwitterAcc] = useState('');
  const [tweet, setTweet] = useState('');
  const [discordServer, setDiscordServer] = useState('');
  const [serverRole, setServerRole] = useState('');
  const [projectChainId, setChainId] = useState(0);
  const [endDate, setEndDate] = useState(0 as unknown as Date);
  const [requireEmail, setRequireEmail] = useState(false);
  const [imageDataUri, setImageDataUri] = useState('');
  const [bannerDataUri, setBannerDataUri] = useState('');

  const fileToDataUri = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const setLink = (blob) => {
    document.querySelector('a').href = URL.createObjectURL(blob);
  };

  const addDiscordBot = () => {
    window.open(
      `https://discord.com/api/oauth2/authorize?client_id=${Config.REACT_APP_DISCORD_CLIENT_ID}&permissions=0&scope=bot`,
    );
  };

  const onChange = (e, stateFunc) => {
    stateFunc(e.target.value);
  };

  const onCheckboxChange = (target, stateFunc) => {
    stateFunc(!target);
  };

  const onImageChange = (file, stateFunc) => {
    if (!file) {
      stateFunc('');
      return;
    }

    fileToDataUri(file).then((data) => {
      stateFunc(data);
    });
  };

  const createAllowlist = async () => {
    if (!name) {
      return;
    }

    if (!customUrl) {
      return;
    }

    if (!projectChainId) {
      return;
    }

    if (!endDate) {
      return;
    }

    if (!imageDataUri) {
      return;
    }

    if (!bannerDataUri) {
      return;
    }

    const url = `/api/v1/allowlist`;
    const data = {
      name,
      url: customUrl,
      cosmos_chain_id: projectChainId,
      end_date: endDate,
      image: imageDataUri,
      banner_image: bannerDataUri,
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
      require_email: requireEmail,
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
          placeholder="Custom url"
          value={customUrl}
          onChange={(e) => onChange(e, setCustomUrl)}
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
        <br></br>
        <label>Allowlist Image</label>
        <input
          style={{ display: 'block' }}
          accept="image/*"
          type="file"
          onChange={(event) =>
            onImageChange(event.target.files[0] || null, setImageDataUri)
          }
        />
        <label>Banner Image</label>
        <input
          style={{ display: 'block' }}
          accept="image/*"
          type="file"
          onChange={(event) =>
            onImageChange(event.target.files[0] || null, setBannerDataUri)
          }
        />
        <label>Provide Email</label>
        <input
          type={'checkbox'}
          onChange={() => onCheckboxChange(requireEmail, setRequireEmail)}
        />
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
