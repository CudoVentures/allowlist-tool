import React from 'react';

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import CollapsableGrid from './CollapsableGrid'

const ExpiredAllowlists = ({ data }: { data: FetchedAllowlist[] }) => {
    return !data.length ? null :
        <CollapsableGrid
            text='All Expired'
            data={data}
        />
}

export default ExpiredAllowlists
