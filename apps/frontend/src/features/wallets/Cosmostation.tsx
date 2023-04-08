import { cosmos, InstallError } from "@cosmostation/extension-client"
import { AddChainParams } from "@cosmostation/extension-client/types/message"
import { SUPPORTED_WALLET } from "cudosjs"
import { CHAIN_DETAILS } from "../../core/utilities/Constants"
import { getAvailableChainIdsByWalletType } from "./helpers"

export const connectCosmostationLedger = async (chainId: string): Promise<{ address: string; accountName: string; }> => {

    let userAccountAddress: string = ''
    let userAccountName: string = ''

    try {
        let chainIdToConnectTo = chainId
        const provider = await cosmos()
        const availableChains = await getAvailableChainIdsByWalletType(SUPPORTED_WALLET.Cosmostation)

        if (!availableChains[chainIdToConnectTo]) {
            const network = CHAIN_DETAILS.DEFAULT_NETWORK
            chainIdToConnectTo = CHAIN_DETAILS.CHAIN_ID[network]
            const chainToAdd: AddChainParams = {
                chainId: chainIdToConnectTo,
                chainName: CHAIN_DETAILS.CHAIN_NAME[network],
                restURL: CHAIN_DETAILS.API_ADDRESS[network],
                addressPrefix: CHAIN_DETAILS.CURRENCY_DISPLAY_NAME.toLowerCase(),
                baseDenom: CHAIN_DETAILS.NATIVE_TOKEN_DENOM,
                displayDenom: CHAIN_DETAILS.CURRENCY_DISPLAY_NAME,
                decimals: 18,
                coinGeckoId: CHAIN_DETAILS.CURRENCY_DISPLAY_NAME.toLowerCase(),
                gasRate: {
                    average: (Number(CHAIN_DETAILS.GAS_PRICE) * 2).toString(),
                    low: (Number(CHAIN_DETAILS.GAS_PRICE) * 2).toString(),
                    tiny: CHAIN_DETAILS.GAS_PRICE.toString(),
                }
            }

            await provider.addChain(chainToAdd)
        }

        const acccount = await provider.requestAccount(chainIdToConnectTo)
        userAccountAddress = acccount.address
        userAccountName = acccount.name

    } catch (error) {

        if (error instanceof InstallError) {
            throw new Error("Cosmostation extension not found")
        }

        if ((error as { code: number }).code === 4001) {
            throw new Error("user rejected request")
        }

    }

    return { address: userAccountAddress, accountName: userAccountName }
}
