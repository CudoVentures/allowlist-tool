import { isExtensionEnabled, SUPPORTED_WALLET } from "cudosjs"
import { getAvailableChainIdsByWalletType } from "./helpers"

export const connectKeplrLedger = async (chainId: string): Promise<{ address: string; accountName: string; }> => {

    if (!isExtensionEnabled(SUPPORTED_WALLET.Keplr)) {
        throw new Error("Keplr extension not found")
    }

    const availableChains = await getAvailableChainIdsByWalletType(SUPPORTED_WALLET.Keplr)
    if (!availableChains[chainId]) {
        throw new Error(`Unable to activate ${chainId}`)
    }

    await window.keplr.enable(chainId)
    const key = await window.keplr.getKey(chainId)
    return { address: key.bech32Address, accountName: key.name }
}
