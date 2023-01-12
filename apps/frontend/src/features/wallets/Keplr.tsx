import { isExtensionEnabled, KeplrWallet, SUPPORTED_WALLET } from "cudosjs"
import { CHAIN_DETAILS } from "../../core/utilities/Constants"

export const connectKeplrLedger = async (): Promise<{ address: string; accountName: string; }> => {

    if (!isExtensionEnabled(SUPPORTED_WALLET.Keplr)) {
        throw new Error("Keplr extension not found")
    }

    const network = CHAIN_DETAILS.DEFAULT_NETWORK
    const chainId = CHAIN_DETAILS.CHAIN_ID[network]

    const wallet = new KeplrWallet({
        CHAIN_ID: chainId,
        CHAIN_NAME: CHAIN_DETAILS.CHAIN_NAME[network],
        RPC: CHAIN_DETAILS.RPC_ADDRESS[network],
        API: CHAIN_DETAILS.API_ADDRESS[network],
        STAKING: CHAIN_DETAILS.STAKING_URL[network],
        GAS_PRICE: CHAIN_DETAILS.GAS_PRICE.toString(),
    })

    await wallet.connect()

    const key = await window.keplr.getKey(chainId)

    return { address: key.bech32Address, accountName: key.name }
}
