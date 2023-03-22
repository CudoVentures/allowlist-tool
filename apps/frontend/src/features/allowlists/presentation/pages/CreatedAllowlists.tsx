import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import React from 'react'

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import AllowListCarousel from '../components/AllowlistsCarousel'

const CreatedAllowlistsPreview = ({ data }: { data: FetchedAllowlist[] }) => {
    return (
        <AllowListCarousel
            text='Created'
            data={data}
            withCreateBox={true}
            expanded={true}
        />
    )
}

export default CreatedAllowlistsPreview
