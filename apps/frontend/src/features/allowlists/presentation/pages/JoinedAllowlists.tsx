import React from 'react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import CollapsableGrid from './CollapsableGrid'

const JoinedAllowlistsPreview = ({ data }: { data: FetchedAllowlist[] }) => {
    return !data.length ? null :
        <CollapsableGrid
            text='Allowlists Joined'
            data={data}
        />
}

export default JoinedAllowlistsPreview
