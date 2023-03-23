import React, { Fragment, useEffect, useState } from 'react'
import { Box, Tooltip, Typography, Dialog as MuiDialog } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Puff as PuffLoader } from 'svg-loaders-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  detectUserBrowser,
  getExtensionUrlForBrowser,
  getSupportedBrowsersForWallet,
  getSupportedWallets,
  isExtensionAvailableForBrowser,
  isExtensionEnabled,
  isSupportedBrowser,
  SUPPORTED_BROWSER,
  SUPPORTED_WALLET
} from 'cudosjs'

import { RootState } from '../../../../../store'
import { connectUser, SUPPORTED_WALLET_LOGOS } from '../../../../../../features/wallets/helpers'
import { updateModalState, initialState as initialModalState } from '../../../../../store/modals'
import { updateUser } from '../../../../../store/user'
import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../Layout/helpers'
import { COLORS_DARK_THEME } from '../../../../../../core/theme/colors'

import { CancelRoundedIcon, ModalContainer, styles as defaultStyles } from '../../styles'
import { styles } from './styles'

const WalletSelector = () => {

  const { selectWallet } = useSelector((state: RootState) => state.modalState)
  const [userBrowser, setUserBrowser] = useState<SUPPORTED_BROWSER | undefined>(undefined)
  const [loading, setLoading] = useState(new Map())
  const dispatch = useDispatch()

  const redirectToExtension = (extensionUrl: string | undefined) => {
    if (extensionUrl) {
      window.open(extensionUrl, 'get-wallet-extension')?.focus()
    }
  }

  const connect = async (walletName: SUPPORTED_WALLET) => {

    try {
      setLoading(new Map(loading.set(walletName, true)))
      const connectedUser = await connectUser(walletName)
      dispatch(updateUser(connectedUser))
      handleModalClose()

    } catch (error) {
      // TODO: Failure modal here
      console.error((error as Error).message)

    } finally {
      setLoading(new Map())
    }
  }

  const handleModalClose = () => {
    dispatch(updateModalState(initialModalState))
  }

  const LoadingButtonComponent = (): JSX.Element => {
    return (
      <PuffLoader
        style={{ width: '30px', height: '30px', stroke: COLORS_DARK_THEME.PRIMARY_BLUE }}
      />
    )
  }

  const btnTooltip = (walletName: SUPPORTED_WALLET): string => {
    let tooltipText = ''

    if (!isExtensionAvailableForBrowser(walletName, userBrowser!)) {
      tooltipText = `${walletName} supports: ${getSupportedBrowsersForWallet(walletName).map((browser) => {
        return ` ${browser}`
      })}`
    }

    return tooltipText
  }

  const isDisabledBtn = (walletName: SUPPORTED_WALLET): boolean => {

    // Disabling the Btn if into loading state
    if (loading.get(walletName)) {
      return true
    }

    // Disabling the btn, when other btn is loading
    if (loading.size > 0) {
      return true
    }

    // Disabling the btn if no extension is available for the current user browser
    if (!isExtensionAvailableForBrowser(walletName, userBrowser!)) {
      return true
    }

    return false
  }

  const click = async (walletName: SUPPORTED_WALLET) => {

    if (isExtensionEnabled(walletName)) {
      await connect(walletName)
      return
    }

    const extensionUrl = getExtensionUrlForBrowser(walletName, userBrowser!)
    redirectToExtension(extensionUrl)
  }

  const displayLogo = (walletName: SUPPORTED_WALLET): JSX.Element => {
    if (loading.get(walletName)) {
      return <Fragment></Fragment>
    }
    return SUPPORTED_WALLET_LOGOS[walletName] || <Fragment></Fragment>
  }

  const btnText = (walletName: SUPPORTED_WALLET): string | JSX.Element => {

    if (loading.get(walletName)) {
      return ''
    }

    if (isExtensionEnabled(walletName)) {
      return `Connect ${walletName.toUpperCase()}`
    }

    if (isExtensionAvailableForBrowser(walletName, userBrowser!)) {
      return (
        <Typography variant='subtitle2' sx={{ display: 'flex', alignItems: 'center' }}>
          {`Get ${walletName} plugin`}
          <SvgComponent
            style={{ marginLeft: '5px' }}
            type={LAYOUT_CONTENT_TEXT.LinkIcon}
          />
        </Typography>
      )
    }

    return 'Unsupported browser'
  }

  useEffect(() => {
    const userBrowser = detectUserBrowser()
    if (isSupportedBrowser(userBrowser)) {
      setUserBrowser(userBrowser as SUPPORTED_BROWSER)
      return
    }
    setUserBrowser(undefined)
  }, [])

  return (
    <MuiDialog
      BackdropProps={defaultStyles.defaultBackDrop}
      open={selectWallet!}
      onClose={handleModalClose}
      PaperProps={defaultStyles.defaultPaperProps}
    >
      <ModalContainer sx={{ padding: '25px 25px 20px 30px' }}>
        <CancelRoundedIcon onClick={handleModalClose} />
        <Box sx={styles.contentHolder}>
          <Typography
            style={{ margin: '20px 0 20px 0' }}
            variant="h4"
            fontWeight={900}
            letterSpacing={2}
          >
            Connect Wallet
          </Typography>
          <Typography marginBottom={3} variant="subtitle1" color="text.secondary">
            Connect your wallet in order to create an Allowlist
          </Typography>
          <Box gap={3} style={styles.btnsHolder}>

            {getSupportedWallets().map((wallet, idx) => {
              return (
                <Tooltip key={idx} placement='right' title={btnTooltip(wallet)}>
                  <Box width='100%'>
                    <LoadingButton
                      loadingIndicator={<LoadingButtonComponent />}
                      disabled={isDisabledBtn(wallet)}
                      loading={loading.get(wallet)}
                      variant="contained"
                      color="primary"
                      onClick={() => click(wallet)}
                      sx={styles.connectButton}
                    >
                      {displayLogo(wallet)}
                      {btnText(wallet)}
                    </LoadingButton>
                  </Box>
                </Tooltip>
              )
            })}
            <Box sx={styles.pluginWarning} color="primary.main">
              <SvgComponent
                type={LAYOUT_CONTENT_TEXT.InfoIcon}
                style={styles.infoIcon}
              />
              Make sure you have Keplr and/or Cosmostation plugins enabled.
            </Box>
          </Box>
        </Box>
      </ModalContainer>
    </MuiDialog>
  )
}

export default WalletSelector
