import React from 'react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import CollapsableGrid from './CollapsableGrid'

const CreatedAllowlistsPreview = ({ data }: { data: FetchedAllowlist[] }) => {
    return !data.length ? null :
        <CollapsableGrid
            text='My Allowlists'
            data={data}
            withCreateBox={true}
        />
}

export default CreatedAllowlistsPreview
