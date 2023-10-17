import { StdSignature, decodeSignature } from 'cudosjs';
import { verifyADR36Amino } from '@keplr-wallet/cosmos';
import { bech32 } from 'bech32'

export const NOT_EXISTS_INT = -2147483648;

export const isValidSignature = (signature: StdSignature, signer: string, data: string | Uint8Array): boolean => {
    const { prefix: decodedPrefix } = bech32.decode(signer)
    const { pubkey: decodedPubKey, signature: decodedSignature } = decodeSignature(signature)
    return verifyADR36Amino(
        decodedPrefix,
        signer,
        data,
        decodedPubKey,
        decodedSignature,
    )
}
