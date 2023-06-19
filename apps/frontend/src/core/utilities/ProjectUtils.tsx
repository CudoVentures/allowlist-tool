import { DISCORD_API_MSGS, DISCORD_SERVER_ROLES } from "../../../../common/interfaces"
import { blobToBase64 } from "../../features/allowlists/presentation/components/helpers"
import { GET_GUILD_NAME_BY_INVITE_CODE, GET_ROLE_NAME_BY_ROLE_ID } from "../api/calls"

export const getServerRoleNameByRoleId = async (inviteCode: string, roleId: string): Promise<string> => {
  try {
    const roleName = await GET_ROLE_NAME_BY_ROLE_ID(inviteCode, roleId)
    return roleName || DISCORD_SERVER_ROLES.default
  } catch (error) {
    console.error(error.response?.data?.message)
    return DISCORD_SERVER_ROLES.default
  }
}
export const getDiscordGuildNameByInviteCode = async (inviteCode: string): Promise<string> => {
  try {
    const guildName = await GET_GUILD_NAME_BY_INVITE_CODE(inviteCode)
    return guildName || DISCORD_API_MSGS.ExpiredOrUnknownInvite
  } catch (error) {
    console.error(error.response?.data?.message)
    return DISCORD_API_MSGS.ExpiredOrUnknownInvite
  }
}

export const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const getSum = (numbers: number[]): number => {
  const sum = numbers.reduce(function (a, b) {
    return a + b
  }, 0)
  return sum
}

export const handleLinkOut = (url: string) => {
  if (url) {
    window.open(url, url, 'rel=noreferrer')?.focus()
  }
}

export const setBlobToB64Img = async (imgData: Blob, setter: React.Dispatch<React.SetStateAction<string>>, thumbnail?: { MAX_WIDTH: number, MAX_HEIGHT: number }) => {
  const b64ImgString = await blobToBase64(imgData) as string
  if (thumbnail) {
    createThumbnail(b64ImgString, thumbnail, setter);
    return
  }
  setter(b64ImgString as string)
}

export const getTimeFromNumber = (time: number): DetailedTime => {
  const days = time / (24 * 60 * 60 * 1000)
  const hours = (days % 1) * 24
  const minutes = (hours % 1) * 60
  const secs = (minutes % 1) * 60
  return {
    days: Math.floor(days),
    hours: Math.floor(hours),
    minutes: Math.floor(minutes),
    seconds: Math.floor(secs)
  }
}

export const getSeparateDateAndTime = (fullDate: Date): { date: string, time: string } => {
  const period = fullDate?.toString().split(' ') || []
  return {
    date: period.slice(0, 4).join(' '),
    time: period.slice(4).join(' '),
  }
}

export const formatAddress = (text: string, sliceIndex: number): string => {
  if (!text) { return '' }
  const len = text.length
  if (len < sliceIndex) {
    return text
  }
  return `${text.slice(0, sliceIndex)}...${text.slice(len - 4, len)}`
}

const applySharpeningFilter = (
  r: number,
  g: number,
  b: number,
  alpha: number,
  neighborPixels: [number, number, number, number][]
) => {
  const kernel = [
    [-0.1, -0.1, -0.1],
    [-0.1, 1.8, -0.1],
    [-0.1, -0.1, -0.1],
  ];

  let rSharp = 0;
  let gSharp = 0;
  let bSharp = 0;

  for (let i = 0; i < neighborPixels.length; i++) {
    const [rNeighbor, gNeighbor, bNeighbor, alphaNeighbor] = neighborPixels[i];
    const weight = kernel[Math.floor(i / 3)][i % 3];

    rSharp += rNeighbor * weight;
    gSharp += gNeighbor * weight;
    bSharp += bNeighbor * weight;
  }

  rSharp = Math.max(0, Math.min(255, rSharp));
  gSharp = Math.max(0, Math.min(255, gSharp));
  bSharp = Math.max(0, Math.min(255, bSharp));

  return [rSharp, gSharp, bSharp];
};

const getNeighborPixels = (data: Uint8ClampedArray, width: number, height: number, row: number, col: number) => {
  const pixels: [number, number, number, number][] = [];

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i < height && j >= 0 && j < width) {
        const pixelIndex = (i * width + j) * 4;
        pixels.push([data[pixelIndex], data[pixelIndex + 1], data[pixelIndex + 2], data[pixelIndex + 3]]);
      }
    }
  }

  return pixels;
};

const sharpenImage = (imageData: ImageData) => {
  const { data, width, height } = imageData;
  const filteredData = new Uint8ClampedArray(data.length);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const pixelIndex = (i * width + j) * 4;
      const r = data[pixelIndex];
      const g = data[pixelIndex + 1];
      const b = data[pixelIndex + 2];

      const alpha = data[pixelIndex + 3];
      const neighborPixels = getNeighborPixels(data, width, height, i, j);

      const [rSharp, gSharp, bSharp] = applySharpeningFilter(r, g, b, alpha, neighborPixels);
      filteredData[pixelIndex] = rSharp;
      filteredData[pixelIndex + 1] = gSharp;
      filteredData[pixelIndex + 2] = bSharp;
      filteredData[pixelIndex + 3] = alpha;
    }
  }

  return new ImageData(filteredData, width, height);
};

export const createThumbnail = (originalImg: string, target: { MAX_WIDTH: number, MAX_HEIGHT: number }, callback: React.Dispatch<React.SetStateAction<string>>) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const { MAX_WIDTH, MAX_HEIGHT } = target;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = function () {
    let width = img.width;
    let height = img.height;

    const aspectRatio = width / height;
    const targetWidth = Math.min(MAX_WIDTH, width);
    const targetHeight = Math.min(MAX_HEIGHT, height);

    if (width > targetWidth || height > targetHeight) {
      if (aspectRatio > 1) {
        width = targetWidth;
        height = width / aspectRatio;
      } else {
        height = targetHeight;
        width = height * aspectRatio;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const filteredData = sharpenImage(imageData);
    ctx.putImageData(filteredData, 0, 0);

    const dataUrl = canvas.toDataURL('image/png');
    callback(dataUrl);
  };
  img.src = originalImg;
};
