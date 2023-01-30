import isURL, { IsURLOptions } from 'validator/lib/isURL'
import { CollectedData, OptionalAllowlistData } from "../../../core/store/allowlist"
import { FormField } from "../presentation/components/helpers"

let urlOptions: IsURLOptions = {
    protocols: [
        'http',
        'https'
    ],
    require_tld: true,
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true,
    allow_underscores: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false,
    disallow_auth: false
}

export const isZeroLength = (data: string): boolean => data.length === 0

export const isValidLength = (data: string, spec?: { min?: number, max?: number }): boolean => {
    const { min, max } = spec
    return (min ? data.length > min : true) && (max ? data.length < max : true)
}

export const isValidAllowlistName = (name: string): boolean => {
    return isZeroLength(name) || isValidLength(name, { min: 4 })
}

export const isValidAllowlistUrl = (url: string): boolean => {
    return isZeroLength(url) || isValidAllowlistName(url)
}

export const isValidUrl = (url: string): boolean => {
    return isZeroLength(url) || isURL(url, urlOptions)
}

export const isValidTwitterAccount = (account: string): boolean => {
    // TODO: Shall me make Twitter API calls for account verificaiton?
    return isZeroLength(account) || account.match(/^@?[A-Za-z0-9_]{1,15}$/g) !== null
}

export const isValidDiscorServerName = (discordServerName: string): boolean => {
    // TODO: More validation rules to be determined for Discord Servers?
    return true
}

export const isValidTweetUrl = (tweet: string): boolean => {
    return /^https:\/\/twitter\.com\/@?[A-Za-z0-9_]{1,15}\/status\/[\d]+$/gm.test(tweet)
}

export const isValidDescription = (description: string): boolean => {
    return isZeroLength(description) || isValidLength(description, { min: 19, max: 100 })
}

export const getFieldisValid = (fieldType: FormField, value: any): boolean => {
    switch (fieldType) {
        case FormField.name:
            return isValidAllowlistName(value)

        case FormField.url:
            return isValidAllowlistUrl(value)

        case FormField.website:
            return isValidUrl(value)

        case FormField.twitter_account:
        case FormField.twitter_account_to_follow:
            return isValidTwitterAccount(value)

        case FormField.discord_url:
        case FormField.discord_server:
            return isValidDiscorServerName(value)

        case FormField.description:
            return isValidDescription(value)

        case FormField.tweet:
            return isValidTweetUrl(value)

        default:
            return true
    }
}

export const isValidStepOne = (data: CollectedData): boolean => {
    if (
        (data.name && getFieldisValid(FormField.name, data.name)) &&
        (data.url && getFieldisValid(FormField.url, data.url)) &&
        (data.description && getFieldisValid(FormField.description, data.description)) &&
        (data.website && getFieldisValid(FormField.website, data.website)) &&
        (data.twitter_account && getFieldisValid(FormField.twitter_account, data.twitter_account)) &&
        (data.discord_url && getFieldisValid(FormField.discord_url, data.discord_url)) &&
        data.cosmos_chain_id &&
        data.image &&
        data.banner_image &&
        data.end_date
    ) { return true }

    return false
}

export const isValidStepTwo = (data: CollectedData) => {
    if (
        (data.twitter_account_to_follow && isValidTwitterAccount(data.twitter_account_to_follow)) ||
        (data.tweet && isValidTweetUrl(data.tweet) && (data.tweet_to_like || data.tweet_to_retweet)) ||
        (data.discord_server && isValidDiscorServerName(data.discord_server)) ||
        data.server_role ||
        data.require_email
    ) { return true }

    return false
}

export const isValidOptionalData = (data: OptionalAllowlistData): boolean => {

    //TODO: What are the criteria for the optional data?
    return true
}