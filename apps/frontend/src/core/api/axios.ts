import axios from 'axios';
import { APP_DETAILS } from '../utilities/Constants';

const instance = axios.create({
    headers: {
        'x-api-key': APP_DETAILS.API_KEY,
    },
});

export default instance;
