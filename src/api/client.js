import axios from "axios"

const api = axios.create({
    baseURL: "https://methodical-space.ru/api"
})

export default api