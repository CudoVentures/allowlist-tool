import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import AppRoutes from "../../../features/app-routes/entities/AppRoutes"
import { updateModalState } from "../../store/modals"

const useNavigateToRoute = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    return useCallback((route?: AppRoutes) => {
        if (location.pathname !== route) {
            dispatch(updateModalState({
                pageTransitionLoading: true
            }))
            setTimeout(() => {
                navigate(route!)
            }, 300)
            setTimeout(() => {
                dispatch(updateModalState({
                    pageTransitionLoading: false,
                    hamburgerMenu: false,
                }))
            }, 600)
        }
    }, [location.pathname])
}

export default useNavigateToRoute
