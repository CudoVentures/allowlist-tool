import { useDispatch } from 'react-redux';

import { GET_USER_DETAILS, LOG_OUT_MEDIA_USER } from '../../api/calls';
import { ADD_DISCORD_BOT_URL, SOCIAL_MEDIA_LOGIN_URL } from '../../api/endpoints';
import { CONNECTED_SOCIAL_MEDIA, emptySocialMedia, SOCIAL_MEDIA } from '../../../../../common/interfaces';
import { updateUser } from '../../store/user';

const windowOptions = `toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=600, height=800,top=0`

declare let Config: { APP_DISCORD_CLIENT_ID: any; APP_DISCORD_CALLBACK_URL: any };

const useSocialMedia = () => {

    const dispatch = useDispatch()

    const getConnectedSocialMedia = async (): Promise<CONNECTED_SOCIAL_MEDIA> => {
        const userDetails = await GET_USER_DETAILS();
        return {
            [SOCIAL_MEDIA.twitter]: userDetails.data.twitter,
            [SOCIAL_MEDIA.discord]: userDetails.data.discord
        }
    }

    const setConnectedSocialMedia = async (): Promise<void> => {
        const media = await getConnectedSocialMedia()
        dispatch(updateUser({ connectedSocialMedia: media }))
    }

    const connectSocialMedia = async (service: SOCIAL_MEDIA) => {
        const openedWindow = window.open(
            SOCIAL_MEDIA_LOGIN_URL(service),
            `${service} Log In`,
            windowOptions
        )
        const timer = setInterval(async () => {
            if (openedWindow.closed) {
                await setConnectedSocialMedia()
                clearInterval(timer)
            }
        }, 1000)
    }

    const addDiscordBot = async () => {
        const openedWindow = window.open(
            ADD_DISCORD_BOT_URL(Config.APP_DISCORD_CLIENT_ID, Config.APP_DISCORD_CALLBACK_URL),
            `Adding Discord Bot`,
            windowOptions
        )

        const timer = setInterval(async () => {
            if (openedWindow.closed) {
                await setConnectedSocialMedia()
                clearInterval(timer)
            }
        }, 1000)
    };

    const disconnectSocialMedia = async (service: SOCIAL_MEDIA) => {
        await LOG_OUT_MEDIA_USER(service)
        await setConnectedSocialMedia()
    }

    const disconnectAllSocialMedias = async () => {
        await LOG_OUT_MEDIA_USER(SOCIAL_MEDIA.discord)
        await LOG_OUT_MEDIA_USER(SOCIAL_MEDIA.twitter)
        dispatch(updateUser({
            connectedSocialMedia: {
                [SOCIAL_MEDIA.twitter]: emptySocialMedia,
                [SOCIAL_MEDIA.discord]: emptySocialMedia,
            }
        }))
    }

    return {
        getConnectedSocialMedia,
        setConnectedSocialMedia,
        connectSocialMedia,
        disconnectSocialMedia,
        disconnectAllSocialMedias,
        addDiscordBot
    }
}
export default useSocialMedia
