import { SigningStargateClient, StdSignature } from 'cudosjs';
import { CHAIN_DETAILS } from './Constants';
import S from './Main';

const QUERY_PATTERN = '?p=';

export default class ProjectUtils {
  static TRANSITION_DURATION = 400;

  static makeBgImgStyle(url: string) {
    return {
      backgroundImage: `url("${url}")`,
    };
  }

  static copyInput(inputN: HTMLElement) {
    inputN.focus();
    inputN.select();
    document.execCommand('copy');
    inputN.blur();
  }

  static copyText(text: string) {
    if (navigator.clipboard !== undefined) {
      navigator.clipboard.writeText(text);
      return;
    }

    const inputN = document.createElement('textarea');
    inputN.style.width = '0';
    inputN.style.height = '0';
    inputN.style.position = 'fixed';
    inputN.style.overflow = 'hidden';
    inputN.style.opacity = '0';
    inputN.value = text;
    document.body.appendChild(inputN);
    ProjectUtils.copyInput(inputN);
    document.body.removeChild(inputN);
  }

  static downloadUrl(url: string, filename = S.Strings.EMPTY) {
    const hyperlink = document.createElement('a');
    hyperlink.style.display = 'none';
    hyperlink.href = url;
    hyperlink.download = filename;
    hyperlink.target = '_blank';
    document.body.appendChild(hyperlink);
    hyperlink.click();
    document.body.removeChild(hyperlink);
  }

  static makeUrl(
    page: string,
    keys: string | string[],
    values: string | string[],
    wipe = false,
  ) {
    if (keys === undefined) {
      window.location.href = page;
    }

    if (keys.splice === undefined) {
      keys = [keys];
      values = [values];
    }

    let i;
    let pair;
    const queryMap = new Map();
    let queryArray;

    for (i = keys.length; i-- > 0; ) {
      keys[i] = encodeURIComponent(keys[i]);
      values[i] = encodeURIComponent(values[i]);
    }

    if (wipe === false) {
      queryArray = getQueryArray();
      for (i = queryArray.length; i-- > 0; ) {
        pair = queryArray[i].split('=');
        queryMap.set(pair[0], pair[1]);
      }
    }
    queryArray = [];
    for (i = 0; i < keys.length; ++i) {
      queryArray.push(`${keys[i]}=${values[i]}`);
      queryMap.delete(keys[i]);
    }

    queryMap.forEach((value, key) => {
      queryArray.push(`${key}=${value}`);
    });

    return page + QUERY_PATTERN + btoa(queryArray.join('&'));
  }

  static redirect(
    page: string,
    keys: string | string[],
    values: string | string[],
    wipe: boolean,
  ) {
    window.location.href = ProjectUtils.makeUrl(page, keys, values, wipe);
  }

  static getQueryParam(key: string) {
    const queryArray = getQueryArray();
    for (let pair, i = queryArray.length; i-- > 0; ) {
      pair = queryArray[i].split('=');
      if (decodeURIComponent(pair[0]) === key) {
        return decodeURIComponent(pair[1]);
      }
    }

    return null;
  }

  static redirectToUrl(url: string, newTab: boolean) {
    if (newTab !== true) {
      window.location.href = url;
      return;
    }

    const hyperlink = document.createElement('a');
    hyperlink.href = url;
    hyperlink.target = '_blank';
    hyperlink.rel = 'noopener noreferrer';
    hyperlink.style.display = 'none';
    document.body.appendChild(hyperlink);
    hyperlink.click();
  }

  static stripHtml(html: string, node: HTMLElement) {
    node = node !== undefined ? node : document.createElement('div');
    node.innerHTML = html;
    return (node.textContent || node.innerText || S.Strings.EMPTY).trim();
  }

  static isLandscape() {
    return (
      document.documentElement.clientWidth /
        document.documentElement.clientHeight >
      1.0
    );
  }

  static isPortrait() {
    return (
      document.documentElement.clientWidth /
        document.documentElement.clientHeight <
      1.0
    );
  }

  static requestAnimationFrame(callback: () => any) {
    requestAnimationFrame(() => {
      requestAnimationFrame(callback);
    });
  }

  static async signMessage(
    endpoint,
    signer,
    address,
  ): Promise<{
    signature: StdSignature;
    chainId: string;
    sequence: number;
    accountNumber: number;
    nonce: number;
    address: string;
  }> {
    const client = await SigningStargateClient.connectWithSigner(
      endpoint,
      signer,
    );

    const nonce = 0;
    const res = await client.signNonceMsg(address, nonce);
    return { ...res, nonce, address };
  }
}

function getQueryArray() {
  const hashIndex = document.URL.indexOf('#');
  const url =
    hashIndex === -1 ? document.URL : document.URL.substring(0, hashIndex);

  const queryStringStartIndex = url.indexOf(QUERY_PATTERN);
  if (queryStringStartIndex === -1) {
    return [];
  }

  const queryString = url.substring(
    queryStringStartIndex + QUERY_PATTERN.length,
  );
  return atob(queryString).split('&');
}
