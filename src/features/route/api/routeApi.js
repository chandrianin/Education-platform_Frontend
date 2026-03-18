import api from "../../../api/client"

export const getModules = (params) =>
    api.get("/route/modules/", {params})

export const getModule = (id) =>
    api.get(`/route/modules/${id}/`)

export const getCompletedModules = (params) =>
    api.get("/route/modules/completed/", {params})

export const completeModule = (id) =>
    api.post(`/route/modules/${id}/completion/`)

export const unCompleteModule = (id) =>
    api.delete(`/route/modules/${id}/completion/`)