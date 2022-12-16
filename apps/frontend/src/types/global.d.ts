import { Window as KeplrWindow } from '@keplr-wallet/types'

export { }

declare global {
    interface Window extends KeplrWindow {
        cosmostation: any
    }
}

declare module '@mui/material/styles' {

    interface Theme {
        custom: {
            backgrounds: {
                light: string
                primary: string
                dark: string
            }
        }
    }

    interface ThemeOptions {
        custom?: {
            backgrounds?: {
                light?: string
                primary?: string
                dark?: string
            }
        }
    }
}
