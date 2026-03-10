import {useState} from "react"
import {login as apiLogin, logout as apiLogout, register as apiRegister} from "../api/authApi"
import useAuthStore from "../store/authStore"

export default function useAuth() {
    const {clearToken, token, setToken} = useAuthStore()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const login = async (credentials) => {
        setLoading(true)
        try {
            const data = await apiLogin(credentials)
            setToken(data.token)
            setError(null)
        } catch (e) {
            setError(e.response?.data || e.message)
        } finally {
            setLoading(false)
        }
    }

    const register = async (data) => {
        setLoading(true)
        try {
            await apiRegister(data)
            setError(null)
        } catch (e) {
            setError(e.response?.data || e.message)
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        await apiLogout()
        clearToken()
    }

    return {login, register, logout, loading, error, token}
}