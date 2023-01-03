import axios from 'axios';

import { FetchedAllowlist } from "../store/allowlist";
import { ALL_ALLOWLISTS } from './endpoints';

export const GET_ALL_ALLOWLISTS = async (): Promise<FetchedAllowlist[]> => {
    const result = await axios.get(ALL_ALLOWLISTS)
    return result.data
}
