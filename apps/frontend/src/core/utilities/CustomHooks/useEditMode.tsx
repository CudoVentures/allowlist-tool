import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { CollectedData, FetchedAllowlist, updateAllowlistObject } from "../../store/allowlist"

const useEditMode = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const editMode = (props: FetchedAllowlist) => {

        //TODO: DB data (FetchedAllowlist) mapping to be reviewed
        const allowlistID = props.url
        const fetchedToCollectedData: CollectedData = {
            editMode: true,
            name: props.name,
            url: props.url,
            cosmos_chain_id: props.cosmos_chain_id,
            end_date: props.end_date,
            end_time: props.end_date,
            end_period: props.end_date,
            image: props.image,
            banner_image: props.banner_image,
            require_email: props.require_email,
            description: props.description,
            checkedFields: {
                tweet_to_like: props.tweet_to_like !== '',
                tweet_to_retweet: props.tweet_to_retweet !== '',
                twitter_account_to_follow: props.twitter_account_to_follow !== '',
                tweet: props.tweet_to_retweet !== '' || props.tweet_to_like !== '',
                twitter_account: props.twitter_account !== '',
                discord_server: false,
                server_role: props.server_role !== ''
            },
            tweet: props.tweet_to_retweet || props.tweet_to_like || '',
            twitter_account_to_follow: props.twitter_account_to_follow,
            website: props.website,
            discord_url: props.discord_url,
            twitter_account: props.twitter_account,
            discord_server: '',
            server_role: props.server_role,
            discord_invite_link: props.discord_invite_link
        }

        dispatch(updateAllowlistObject(fetchedToCollectedData))
        navigate(`/edit/${allowlistID}`)
    }

    return editMode
}

export default useEditMode
