import React, { Fragment } from 'react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import AllowListGrid from '../components/AllowListGrid';

const AllAllowlistsPreview = ({ data }: { data: FetchedAllowlist[] }) => {
    return !data.length ? null : (
        <Fragment>
            <AllowListGrid
                text='Explore'
                data={data}
                withCreateBox={false}
                expanded={true}
                withSearchBar={true}
            />
        </Fragment>
    )

}

export default AllAllowlistsPreview
