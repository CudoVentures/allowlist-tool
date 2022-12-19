import { cosmos, InstallError } from "@cosmostation/extension-client"
import { AddChainParams } from "@cosmostation/extension-client/types/message"
import { CHAIN_DETAILS } from "../../core/utilities/Constants"

export const connectCosmostationLedger = async (): Promise<{ address: string; accountName: string; }> => {

    let userAccountAddress: string = ''
    let userAccountName: string = ''

    try {
        const provider = await cosmos()
        const activatedChains = await provider.getActivatedChainIds()

        const network = CHAIN_DETAILS.DEFAULT_NETWORK
        const chainId = CHAIN_DETAILS.CHAIN_ID[network]

        if (!activatedChains.includes(chainId.toLowerCase())) {

            const chainToAdd: AddChainParams = {
                chainId: CHAIN_DETAILS.CHAIN_ID[network],
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

        // Although the method suggests CHAIN_NAME as parameter only, it can work with CHAIN_ID too!
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
