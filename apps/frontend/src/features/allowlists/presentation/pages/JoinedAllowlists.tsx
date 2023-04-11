import React, { Fragment } from 'react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import AllowListGrid from '../components/AllowListGrid';

const JoinedAllowlistsPreview = ({ data }: { data: FetchedAllowlist[] }) => {
    //TODO: return no result if no data
    return !data.length ? null :
        <Fragment>
            <AllowListGrid
                text='Joined Allowlists'
                data={data}
                withCreateBox={false}
                withCount={true}
                withSearchBar={!data.length ? false : true}
            />
        </Fragment>
}

export default JoinedAllowlistsPreview
