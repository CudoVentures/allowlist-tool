import React, { useCallback, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

import UserView from './UserView';
import AdminView from './AdminView';
import SummaryView from './SummaryView';
import { FetchedAllowlist } from '../../../../core/store/allowlist';
import { RootState } from '../../../../core/store';
import { useIsScreenLessThan } from '../../../../core/utilities/CustomHooks/screenChecks';
import { setBlobToB64Img } from '../../../../core/utilities/ProjectUtils';
import { StyledCircleSpinner } from '../../../../core/presentation/components/Layout/helpers';

import { allowListStyles } from './styles';

const Allowlist = ({ props }: { props: FetchedAllowlist }) => {

  const isUnder1000px = useIsScreenLessThan('1000px', 'width');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [expired, setExpired] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { connectedAddress } = useSelector((state: RootState) => state.userState);
  const [bannerPreview, setBannerPreview] = useState<string>('')
  const [avatarPreview, setAvatarPreview] = useState<string>('')

  useEffect(() => {
    if (props.banner_image) {
      setBlobToB64Img(props.banner_image, setBannerPreview)
      return
    }
    setBannerPreview('')
  }, [props.banner_image])

  useEffect(() => {
    if (props.image) {
      setBlobToB64Img(props.image, setAvatarPreview)
      return
    }
    setAvatarPreview('')
  }, [props.image])

  const panelContentHandler = useCallback((): JSX.Element => {
    if (expired && !isAdmin) {
      return <Typography variant='h5' margin='50px 70px'>Registration Closed</Typography>
    }

    if (isAdmin) {
      return <AdminView props={props} />
    }

    if (isSignedUp) {
      return <Typography variant='h5' margin='50px 70px'>Already Signed Up</Typography>
    }

    return <UserView props={props} />
  }, [expired, isAdmin, isSignedUp])

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
      if (connectedAddress) {
        setIsSignedUp(props.users.includes(connectedAddress))
        if (props.admin && connectedAddress === props.admin) {
          setIsAdmin(true)
        }
        return
      }
      setIsSignedUp(false)
      setIsAdmin(false)

    } finally {
      setLoading(false)
    }
  }, [connectedAddress, props.admin]);

  return loading ? <StyledCircleSpinner /> : (
    <Box id="allowlist" sx={allowListStyles.holder}>
      <Box id="allowlistHolder" gap={4} sx={allowListStyles.contentHolder}>
        <Box sx={
          isUnder1000px ?
            allowListStyles.smallScreenGrid :
            allowListStyles.grid}
        >
          {/* START-CONTENT */}
          {isUnder1000px ? (
            <img style={allowListStyles.smallScreenBanner} src={bannerPreview} />
          ) : (
            <ParallaxBanner style={{ ...allowListStyles.banner }}>
              <ParallaxBannerLayer
                style={{ ...allowListStyles.bannerImg }}
                image={bannerPreview}
                speed={-20}
              />
            </ParallaxBanner>
          )}
          <img
            src={avatarPreview}
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
            {/* <RemainingTimer time={remainingTime} /> */}
            {panelContentHandler()}
          </Box>
          {/* END-CONTENT */}
        </Box>
      </Box>
    </Box>
  );
};

export default Allowlist;
