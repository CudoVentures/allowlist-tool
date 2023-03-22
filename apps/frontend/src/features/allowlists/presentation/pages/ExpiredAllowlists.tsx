import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import React from 'react';

import { FetchedAllowlist } from "../../../../core/store/allowlist";
import CollapsableCarousel from './CollapsableCarousel'

const ExpiredAllowlists = ({ data }: { data: FetchedAllowlist[] }) => {
    return !data.length ? null :
        <CollapsableCarousel
            text='All Expired'
            data={data}
        />
}

export default ExpiredAllowlists
