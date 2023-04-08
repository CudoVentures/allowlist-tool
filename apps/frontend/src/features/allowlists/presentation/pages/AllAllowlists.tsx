import React, { Fragment } from 'react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import AllowListGrid from '../components/AllowListGrid';

const AllAllowlistsPreview = ({ data }: { data: FetchedAllowlist[] }) => {
    return (
        <Fragment>
            <AllowListGrid
                text='Explore'
                data={data}
                withCreateBox={!data.length ? true : false}
                expanded={true}
                withCount={true}
                withSearchBar={!data.length ? false : true}
            />
        </Fragment>
    )

}

export default AllAllowlistsPreview
