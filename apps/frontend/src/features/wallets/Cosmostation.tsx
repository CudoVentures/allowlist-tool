import { cosmos, InstallError } from "@cosmostation/extension-client"
import { SUPPORTED_WALLET } from "cudosjs"

import { getAvailableChainIdsByWalletType } from "./helpers"

export const connectCosmostationLedger = async (chainId: string): Promise<{ address: string; accountName: string; }> => {

    let userAccountAddress: string = ''
    let userAccountName: string = ''

    try {
        const provider = await cosmos()
        const availableChains = await getAvailableChainIdsByWalletType(SUPPORTED_WALLET.Cosmostation)

        if (!availableChains[chainId]) {
            throw new Error(`Unable to activate ${chainId}`)
        }

        const acccount = await provider.requestAccount(chainId)
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
