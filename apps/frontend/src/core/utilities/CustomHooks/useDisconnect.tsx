import AppRoutes from "../../../features/app-routes/entities/AppRoutes"
import { disconnectWalletByType } from "../../../features/wallets/helpers"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { updateModalState } from "../../store/modals"
import { updateUser } from "../../store/user"
import useNavigateToRoute from "./useNavigateToRoute"
import useSocialMedia from "./useSocialMedia"
import { initialState as initialUserState } from "../../store/user"
import { initialState as initialModalState } from "../../store/modals"

const useDisconnectUser = () => {

    const dispatch = useDispatch()
    const navigateToRoute = useNavigateToRoute()
    const { disconnectAllSocialMedias } = useSocialMedia()
    const { connectedWallet } = useSelector((state: RootState) => state.userState)

    const disconnectUser = async () => {
        sessionStorage.clear()
        localStorage.clear()
        await disconnectWalletByType(connectedWallet!)
        await disconnectAllSocialMedias()
        dispatch(updateUser(initialUserState))
        dispatch(updateModalState(initialModalState))
        navigateToRoute(AppRoutes.MAIN)
    }

    return disconnectUser
}

export default useDisconnectUser
