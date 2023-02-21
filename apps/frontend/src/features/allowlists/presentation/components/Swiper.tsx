import React, { Fragment } from 'react'
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { FetchedAllowlist } from "../../../../core/store/allowlist"
import SwiperCardContent from './SwiperCard'
import CreateBox from './CreateBox'

import { generalStyles, swiperBreakpoints } from '../pages/styles'
import './swiper.css';

const SwiperList = ({ data, withCreateBox }: { data: FetchedAllowlist[], withCreateBox?: boolean }) => {
    return (
        <Fragment>
            {withCreateBox ? <CreateBox /> : null}
            <Swiper
                breakpoints={swiperBreakpoints(withCreateBox)}
                modules={[Pagination, Navigation]}
                navigation
                spaceBetween={20}
                style={generalStyles.swiper}
                pagination={{ clickable: true }}
            >
                {data.map((allowlist, idx) => {
                    return (
                        <SwiperSlide key={idx} style={{ display: 'flex', justifyContent: 'center' }}>
                            <SwiperCardContent allowlist={allowlist} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Fragment>

    )
}

export default SwiperList
