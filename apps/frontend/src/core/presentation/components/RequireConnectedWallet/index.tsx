import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { SUPPORTED_WALLET, isValidCosmosAddress } from 'cudosjs'

import AppRoutes from '../../../../features/app-routes/entities/AppRoutes'
import { RootState } from '../../../store'

const RequireConnectedWallet = () => {
  const { connectedAddress, connectedWallet } = useSelector((state: RootState) => state.userState)
  const validLedgers = [SUPPORTED_WALLET.Keplr, SUPPORTED_WALLET.Cosmostation]
  const location = useLocation()

  return isValidCosmosAddress(connectedAddress!) && validLedgers.includes(connectedWallet!) ? (
    <Outlet />
  ) : (
    <Navigate to={AppRoutes.ALLOWLISTS} state={{ from: location }} replace />
  )
}

export default RequireConnectedWallet
