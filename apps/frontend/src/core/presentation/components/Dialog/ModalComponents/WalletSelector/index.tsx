import React, { Fragment, useEffect, useState } from 'react'
import { Box, Tooltip, Typography, Dialog as MuiDialog, MenuItem, Select } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { ThreeDots as ThreeDotsLoading } from 'svg-loaders-react'
import { useDispatch, useSelector } from 'react-redux'
import { Oval as OvalLoader } from 'svg-loaders-react'
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
import { connectUser, getAvailableChainIdsByWalletType, SUPPORTED_WALLET_LOGOS } from '../../../../../../features/wallets/helpers'
import { updateModalState, initialState as initialModalState } from '../../../../../store/modals'
import { updateUser } from '../../../../../store/user'
import { LAYOUT_CONTENT_TEXT, SvgComponent } from '../../../Layout/helpers'
import { updateAllowlistObject } from '../../../../../../core/store/allowlist'

import { CancelRoundedIcon, BackRoundedIcon, ModalContainer, styles as defaultStyles } from '../../styles'
import { styles } from './styles'
import { allowlistDetailsStyles } from '../../../../../../features/allowlists/presentation/components/styles'
import { COLORS } from '../../../../../../core/theme/colors'

const WalletSelector = () => {

  const { selectWallet } = useSelector((state: RootState) => state.modalState)
  const { chosenChainId } = useSelector((state: RootState) => state.userState)
  const [userBrowser, setUserBrowser] = useState<SUPPORTED_BROWSER | undefined>(undefined)
  const [selectChainId, setSelectChainId] = useState<SUPPORTED_WALLET | undefined>(undefined)
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false)
  const [loadSelectChainId, setLoadSelectChainId] = useState<boolean>(false)
  const [availableChainIDs, setAvailableChainIDs] = useState<string[]>([])
  const [loading, setLoading] = useState(new Map())
  const dispatch = useDispatch()

  const redirectToExtension = (extensionUrl: string | undefined) => {
    if (extensionUrl) {
      window.open(extensionUrl, 'get-wallet-extension')?.focus()
    }
  }

  const connect = async (walletName: SUPPORTED_WALLET, chainId: string) => {

    try {
      setLoading(new Map(loading.set(walletName, true)))
      const connectedUser = await connectUser(walletName, chainId)
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
    setSelectChainId(undefined)
  }

  const LoadingButtonComponent = (): JSX.Element => {
    return (
      <ThreeDotsLoading
        style={{
          width: '30px',
          height: '30px',
          fill: COLORS.STEEL_GRAY[20],
          stroke: COLORS.STEEL_GRAY[20],
          color: COLORS.STEEL_GRAY[20]
        }}
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

  const click = async (walletName: SUPPORTED_WALLET, chainId: string) => {

    if (isExtensionEnabled(walletName)) {
      if (selectChainId) {
        await connect(walletName, chainId)
      } else {
        setLoadSelectChainId(true)
        setSelectChainId(walletName)
      }
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

  const handleBack = () => {
    setLoadSelectChainId(true)
    setSelectChainId(undefined)
  }

  const handleChosenChainIdChange = (value: string) => {
    dispatch(updateUser({ chosenChainId: value }))
    dispatch(updateAllowlistObject({ cosmos_chain_id: value }))
  }

  useEffect(() => {
    const userBrowser = detectUserBrowser()
    if (isSupportedBrowser(userBrowser)) {
      setUserBrowser(userBrowser as SUPPORTED_BROWSER)
      return
    }
    setUserBrowser(undefined)
  }, [])

  useEffect(() => {
    (async () => {
      try {
        if (selectChainId) {
          const availableChains = await getAvailableChainIdsByWalletType(selectChainId)
          const cosmosChainIDs = Object.keys(availableChains)
          const sortedChainIDs = cosmosChainIDs
            .sort((a, b) => a
              .localeCompare(b, undefined, { sensitivity: 'base' }))
          setAvailableChainIDs(sortedChainIDs)
          return
        }
        dispatch(updateUser({ chosenChainId: chosenChainId }))
        dispatch(updateAllowlistObject({ cosmos_chain_id: '' }))
        setAvailableChainIDs([])

      } finally {
        setTimeout(() => {
          setLoadSelectChainId(false)
        }, 300)
      }
    })()
  }, [selectChainId])

  return (
    <MuiDialog
      BackdropProps={defaultStyles.defaultBackDrop}
      open={selectWallet!}
      onClose={handleModalClose}
      PaperProps={defaultStyles.defaultPaperProps}
    >
      <ModalContainer sx={{ padding: '25px 25px 20px 30px' }}>
        {selectChainId ? <BackRoundedIcon onClick={handleBack} /> : null}
        <CancelRoundedIcon onClick={handleModalClose} />
        <Box id='modalContentHolder' sx={styles.contentHolder}>
          <Typography
            style={{ margin: '20px 0 20px 0' }}
            variant="h4"
            fontWeight={900}
            letterSpacing={2}
          >
            Connect Wallet
          </Typography>
          <Typography marginBottom={3} variant="subtitle1" color="text.secondary">
            Connect your wallet in order to proceed
          </Typography>
          {selectChainId ?
            <Box gap={3} style={styles.btnsHolder}>
              {loadSelectChainId ? <OvalLoader style={{ width: '50px', height: '50px', margin: '37px 0px', stroke: COLORS.LIGHT_BLUE[90] }} /> :
                <Fragment>
                  <Select
                    disableUnderline
                    displayEmpty
                    variant='standard'
                    open={dropDownOpen}
                    onOpen={() => setDropDownOpen(true)}
                    onClose={() => setDropDownOpen(false)}
                    renderValue={() =>
                      !!chosenChainId ?
                        chosenChainId :
                        <Typography sx={allowlistDetailsStyles.dropDownPlaceholder}>Select a chain</Typography>
                    }
                    sx={allowlistDetailsStyles.chainIdSelector}
                    value={chosenChainId}
                    onChange={(e) => handleChosenChainIdChange(e.target.value)}
                    IconComponent={() => <Box
                      sx={{ transform: dropDownOpen ? 'rotate(180deg)' : 'none' }}
                      onClick={() => setDropDownOpen(true)}
                    >
                      <SvgComponent
                        type={LAYOUT_CONTENT_TEXT.ArrowIcon}
                        style={allowlistDetailsStyles.dropdownIcon}
                      />
                    </Box>
                    }
                  >
                    {availableChainIDs.map((CHAIN_ID, idx) => {
                      return <MenuItem key={idx} value={CHAIN_ID}>{CHAIN_ID}</MenuItem>
                    })}
                  </Select>
                  <Tooltip placement='right' title={btnTooltip(selectChainId)}>
                    <Box width='100%'>
                      <LoadingButton
                        loadingIndicator={<LoadingButtonComponent />}
                        disabled={!chosenChainId || isDisabledBtn(selectChainId)}
                        loading={loading.get(selectChainId)}
                        variant="contained"
                        color="primary"
                        onClick={() => click(selectChainId, chosenChainId)}
                        sx={styles.connectButton}
                      >
                        {displayLogo(selectChainId)}
                        {btnText(selectChainId)}
                      </LoadingButton>
                    </Box>
                  </Tooltip>
                </Fragment>}
              <Box sx={styles.pluginWarning} color="primary.main">
                <SvgComponent
                  type={LAYOUT_CONTENT_TEXT.InfoIcon}
                  style={styles.infoIcon}
                />
                Make sure you have Keplr and/or Cosmostation plugins enabled.
              </Box>
            </Box>
            :
            <Box gap={3} style={styles.btnsHolder}>
              {loadSelectChainId ? <OvalLoader style={{ width: '50px', height: '50px', margin: '37px 0px', stroke: COLORS.LIGHT_BLUE[90] }} /> :
                <Fragment>
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
                            onClick={() => click(wallet, chosenChainId)}
                            sx={styles.connectButton}
                          >
                            {displayLogo(wallet)}
                            {btnText(wallet)}
                          </LoadingButton>
                        </Box>
                      </Tooltip>
                    )
                  })}
                </Fragment>}
              <Box sx={styles.pluginWarning} color="primary.main">
                <SvgComponent
                  type={LAYOUT_CONTENT_TEXT.InfoIcon}
                  style={styles.infoIcon}
                />
                Make sure you have Keplr and/or Cosmostation plugins enabled.
              </Box>
            </Box>}
        </Box>
      </ModalContainer>
    </MuiDialog >
  )
}

export default WalletSelector
