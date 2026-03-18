import axios from "axios"
import useAuthStore from "../features/auth/store/authStore.js";

const api = axios.create({
    baseURL: "https://methodical-space.ru/api"
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token

    if (token) {
        config.headers.Authorization = `Token ${token}`
    }

    return config
})

export default api