import {Navigate, Outlet} from "react-router-dom"
import useAuthStore from "../../features/auth/store/authStore.js"

export function RequireAuth({redirectTo = "/login"}) {
    const token = useAuthStore((state) => state.token)
    if (!token) {
        return <Navigate to={redirectTo} replace/>
    }
    return <Outlet/>
}