import {Navigate, Outlet} from "react-router-dom"
import useAuthStore from "../../features/auth/store/authStore.js"

export function RequireAuth({redirectTo = "/auth"}) {
    const token = useAuthStore((state) => state.token)
    if (!token) {
        return <Navigate to={redirectTo} replace/>
    }
    return <Outlet/>
}

export function RedirectIfAuth({redirectTo = "/main"}) {
    const token = useAuthStore((state) => state.token)

    if (token) {
        return <Navigate to={redirectTo} replace/>
    }

    return <Outlet/>
}