import api from "../../../api/client"

export const getFiles = (params) =>
    api.get("/library/files/", {params})

export const getFile = (slug) =>
    api.get(`/library/files/${slug}/`)

export const uploadFile = (data) =>
    api.post("/library/files/", data)

export const deleteFile = (slug) =>
    api.delete(`/library/files/${slug}/`)