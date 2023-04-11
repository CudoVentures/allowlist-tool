import React, { Fragment } from 'react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import AllowListGrid from '../components/AllowListGrid';

const CreatedAllowlistsPreview = ({ data }: { data: FetchedAllowlist[] }) => {
    return <Fragment>
        <AllowListGrid
            text='My Allowlists'
            data={data}
            withCreateBox={true}
            withCount={true}
            withSearchBar={!data.length ? false : true}
        />
    </Fragment>
}

export default CreatedAllowlistsPreview
