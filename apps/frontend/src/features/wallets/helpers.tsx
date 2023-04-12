import React from "react"
import {
    StdSignature,
    SUPPORTED_WALLET
} from "cudosjs"
import { cosmos } from "@cosmostation/extension-client"

import { userState } from "../../core/store/user"
import { connectCosmostationLedger } from "./Cosmostation"
import { connectKeplrLedger } from "./Keplr"
import { LAYOUT_CONTENT_TEXT, SvgComponent } from "../../core/presentation/components/Layout/helpers"
import { LOG_IN_USER } from "../../core/api/calls"
import { disconnectSocket } from "../../App"

import { styles } from "./styles"

export const getAvailableChainIdsByWalletType = async (walletType: SUPPORTED_WALLET): Promise<Record<string, boolean>> => {
    let availableChains = {}
    if (walletType === SUPPORTED_WALLET.Keplr) {
        availableChains = await window.keplr.getChainInfosWithoutEndpoints()
            .then((chains) => {
                return chains.reduce((obj, chain) => {
                    let chainId = chain.chainId
                    if (chainId.includes('cudos')) {
                        chainId = 'cudos-1'
                    }
                    return { ...obj, [chainId]: true }
                }, {})
            });
    }

    if (walletType === SUPPORTED_WALLET.Cosmostation) {
        const provider = await cosmos()
        const supportedChains = await provider.getSupportedChainIds()
        const activatedChains = await provider.getActivatedChainIds()
        availableChains = activatedChains
            .concat(supportedChains.official, supportedChains.unofficial)
            .reduce((obj, chainId) => {
                let newChainId = chainId
                if (newChainId.includes('cudos')) {
                    newChainId = 'cudos-1'
                }
                return { ...obj, [newChainId]: true };
            }, {});
    }

    return availableChains
}

export const connectWalletByType = async (walletType: SUPPORTED_WALLET, chainId: string) => {

    if (walletType === SUPPORTED_WALLET.Keplr) {
        return connectKeplrLedger(chainId)
    }

    if (walletType === SUPPORTED_WALLET.Cosmostation) {
        return connectCosmostationLedger(chainId)
    }

    return { address: '', accountName: '' }
}

export const connectUser = async (walletType: SUPPORTED_WALLET, chainId: string): Promise<userState> => {

    const { address: connectedAddress, accountName } = await connectWalletByType(walletType, chainId)

    const message = 'Allowlist tool login';
    const { signature } = await signArbitrary(chainId, walletType, connectedAddress, message)

    const reqData = {
        signature,
        connectedAddress,
        message,
    };

    const res = await LOG_IN_USER(reqData)

    const connectedUser: userState = {
        userId: res.data.userId,
        accountName: accountName,
        connectedAddress: connectedAddress,
        connectedWallet: walletType,
    }

    return connectedUser
}

export const disconnectWalletByType = async (walletType: SUPPORTED_WALLET) => {

    disconnectSocket()

    if (walletType === SUPPORTED_WALLET.Keplr) {
        window.keplr.disable()
        return
    }

    if (walletType === SUPPORTED_WALLET.Cosmostation) {
        await window.cosmostation.cosmos.request({
            method: "cos_disconnect",
        });
        return
    }
}

export const signArbitrary = async (
    chainId: string,
    walletType: SUPPORTED_WALLET,
    signingAddress: string,
    message: string
): Promise<{ signature: StdSignature }> => {
    let signature: StdSignature = {
        pub_key: undefined,
        signature: ""
    }
    if (walletType === SUPPORTED_WALLET.Keplr) {
        signature = await window.keplr!.signArbitrary(chainId, signingAddress, message)
    }

    if (walletType === SUPPORTED_WALLET.Cosmostation) {
        signature = await window.cosmostation.providers.keplr.signArbitrary(chainId, signingAddress, message)
    }
    return { signature }
}

export const SUPPORTED_WALLET_LOGOS = {
    [SUPPORTED_WALLET.Keplr]: <SvgComponent type={LAYOUT_CONTENT_TEXT.KeplrLogo} style={styles.keplrLogo} />,
    [SUPPORTED_WALLET.Cosmostation]: <SvgComponent type={LAYOUT_CONTENT_TEXT.CosmostationLogo} style={styles.cosmostationLogo} />
}
