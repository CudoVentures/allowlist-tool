import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { CONNECTED_SOCIAL_MEDIA, SOCIAL_MEDIA, updateUser } from '../../store/user';

const useConnectedSocialMedia = () => {

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

    return { getConnectedSocialMedia, setConnectedSocialMedia }
}
export default useConnectedSocialMedia
