import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import React from 'react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import AllowListCarousel from '../components/AllowlistsCarousel'

const AllAllowlistsPreview = ({ data }: { data: FetchedAllowlist[] }) => {
    return !data.length ? null : (
        <AllowListCarousel
            text='All Allowlists'
            data={data}
            withCreateBox={false}
        />
    )
}

export default AllAllowlistsPreview
