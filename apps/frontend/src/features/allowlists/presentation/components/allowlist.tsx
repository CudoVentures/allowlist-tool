import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

import UserView from './UserView';
import AdminView from './AdminView';
import SummaryView from './SummaryView';
import { FetchedAllowlist } from '../../../../core/store/allowlist';
import { RootState } from '../../../../core/store';
import { RemainingTimer } from './helpers';
import { useIsScreenLessThan } from '../../../../core/utilities/CustomHooks/screenChecks';

import { allowListStyles } from './styles';

const Allowlist = ({ props }: { props: FetchedAllowlist }) => {

  const isUnder1000px = useIsScreenLessThan('1000px', 'width');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { connectedAddress, connectedWallet } = useSelector((state: RootState) => state.userState);

  const panelContentHandler = useCallback((): JSX.Element => {
    if (expired && !isAdmin) {
      return <Typography variant='h5' margin='50px 70px'>Registration Closed</Typography>
    }

    if (isAdmin) {
      return <AdminView props={props} />
    }

    return <UserView props={props} />
  }, [expired, isAdmin])

  useEffect(() => {
    const now = Date.now()
    const end = props.end_date.valueOf()

    if (now > end) {
      setExpired(true)
      return
    }

    setRemainingTime(Math.abs(now - end))
    setExpired(false)
  }, [])

  useEffect(() => {
    if (remainingTime === null) return

    if (remainingTime > 0) {
      setTimeout(() => {
        setRemainingTime(remainingTime - 1000)
      }, 1000)
      return
    }

    setExpired(true)
  }, [remainingTime])

  useEffect(() => {
    try {
      if (connectedAddress && props.admin && connectedAddress === props.admin) {
        setIsAdmin(true);
        return;
      }
      setIsAdmin(false);

    } finally {
      setLoading(false)
    }
  }, [connectedAddress, props.admin]);

  return loading ? null : (
    <Box id="allowlist" sx={allowListStyles.holder}>
      <Box id="allowlistHolder" gap={4} sx={allowListStyles.contentHolder}>
        <Box sx={
          isUnder1000px ?
            allowListStyles.smallScreenGrid :
            allowListStyles.grid}
        >
          {/* START-CONTENT */}
          {isUnder1000px ? (
            <img style={allowListStyles.smallScreenBanner} src={props.banner_image} />
          ) : (
            <ParallaxBanner style={{ ...allowListStyles.banner }}>
              <ParallaxBannerLayer
                style={{ ...allowListStyles.bannerImg }}
                image={props.banner_image}
                speed={-20}
              />
            </ParallaxBanner>
          )}
          <img
            src={props.image}
            style={
              isUnder1000px ?
                allowListStyles.smallScreenProfile :
                allowListStyles.profile}
          />
          <Box
            sx={
              isUnder1000px ?
                allowListStyles.smallScreenDetails :
                allowListStyles.details}
          >
            <SummaryView
              props={props}
              isAdmin={isAdmin}
            />
          </Box>
          <Box
            gap={4}
            sx={
              isUnder1000px ?
                allowListStyles.smallScreenPanel :
                allowListStyles.panel}
          >
            <RemainingTimer time={remainingTime} />
            {panelContentHandler()}
          </Box>
          {/* END-CONTENT */}
        </Box>
      </Box>
    </Box>
  );
};

export default Allowlist;
