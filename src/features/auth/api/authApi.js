import api from "../../../api/client"

export const login = async (credentials) => {
    const response = await api.post("/users/login/", credentials)
    return response.data
}

export const register = async (data) => {
    const response = await api.post("/users/register/", data)
    return response.data
}

export const logout = async () => {
    const response = await api.post("/users/logout/")
    return response.data
}