import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Allowlist from '../components/Allowlist';
import { FetchedAllowlist } from '../../../../core/store/allowlist';
import { GET_ALLOWLIST_DETAILS } from '../../../../core/api/calls';
import { StyledPuffLoader } from '../../../../core/presentation/components/Layout/helpers';
import { getDiscordGuildNameByInviteCode, getServerRoleNameByRoleId } from '../../../../core/utilities/ProjectUtils';
import { RootState } from '../../../../core/store';

function AllowlistPage() {

  const { id } = useParams();
  const [allowlist, setAllowlist] = useState<FetchedAllowlist>(null);
  const [loading, setLoading] = useState<boolean>(true)
  const { connectedAddress } = useSelector((state: RootState) => state.userState)

  const contentHandler = useCallback((): JSX.Element => {
    if (loading) {
      return <StyledPuffLoader />
    }
    if (allowlist && Object.keys(allowlist).length) {
      return <Allowlist props={allowlist} />
    }
  }, [loading, allowlist])

  useEffect(() => {
    const setAllowlistDetails = async () => {

      try {
        setLoading(true)
        const res = await GET_ALLOWLIST_DETAILS(id)
        let data = res.data;
        delete data.createdAt;
        delete data.updatedAt;
        if (data.discord_invite_link) {
          data.discord_server_name = await getDiscordGuildNameByInviteCode(data.discord_invite_link)
          if (data.server_role) {
            data.server_role = await getServerRoleNameByRoleId(data.discord_invite_link, data.server_role)
          }
        }
        data = { ...data, end_date: new Date(data.end_date) }
        setAllowlist(data);

      } catch (error) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    setAllowlistDetails()
  }, [connectedAddress]);

  return contentHandler()
}

export default AllowlistPage;