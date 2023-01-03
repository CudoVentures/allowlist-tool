import axios from 'axios';
import { useDispatch } from 'react-redux';

import { CONNECTED_SOCIAL_MEDIA, SOCIAL_MEDIA, updateUser } from '../../store/user';

const useSocialMedia = () => {

    const dispatch = useDispatch()

    const getConnectedSocialMedia = async (): Promise<CONNECTED_SOCIAL_MEDIA> => {
        const res = await axios.get('api/v1/user');
        return {
            [SOCIAL_MEDIA.twitter]: res.data.twitter_profile_username,
            [SOCIAL_MEDIA.discord]: res.data.discord_profile_username
        }
    }

    const setConnectedSocialMedia = async (): Promise<void> => {
        const media = await getConnectedSocialMedia()
        dispatch(updateUser({ connectedSocialMedia: media }))
    }

    const connectSocialMedia = async (service: SOCIAL_MEDIA) => {
        const url = `api/v1/auth/${service}/login`;
        window.open(url, '_self');
    };

    return { getConnectedSocialMedia, setConnectedSocialMedia, connectSocialMedia }
}
export default useSocialMedia
