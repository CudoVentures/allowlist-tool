import { useDispatch } from 'react-redux';
import { GET_USER_DETAILS } from '../../api/calls';
import { SOCIAL_MEDIA_LOGIN_URL } from '../../api/endpoints';
import { CONNECTED_SOCIAL_MEDIA, SOCIAL_MEDIA, updateUser } from '../../store/user';

const useSocialMedia = () => {

    const dispatch = useDispatch()

    const getConnectedSocialMedia = async (): Promise<CONNECTED_SOCIAL_MEDIA> => {
        const userDetails = await GET_USER_DETAILS();
        return {
            [SOCIAL_MEDIA.twitter]: userDetails.data.twitter_profile_username,
            [SOCIAL_MEDIA.discord]: userDetails.data.discord_profile_username
        }
    }

    const setConnectedSocialMedia = async (): Promise<void> => {
        const media = await getConnectedSocialMedia()
        dispatch(updateUser({ connectedSocialMedia: media }))
    }

    const connectSocialMedia = async (service: SOCIAL_MEDIA) => {
        window.open(SOCIAL_MEDIA_LOGIN_URL(service), '_blank', `toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=900, height=800,top=0`);
    };

    const disconnectSocialMedia = async (service: SOCIAL_MEDIA) => {
        //TODO:
    }

    return {
        getConnectedSocialMedia,
        setConnectedSocialMedia,
        connectSocialMedia,
        disconnectSocialMedia
    }
}
export default useSocialMedia
