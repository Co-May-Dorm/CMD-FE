import axiosClient from "./axiosClient"

// API vai trò
const baseUrl = "/roles"
const rolesApi = {
    getAll: (params) => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl, {params})
    },
    get: (id) => {
        const requestUrl = `${baseUrl}/${id}`
        return axiosClient.get(requestUrl)
    },
    add: (data) => {
        const requestUrl = `${baseUrl}`
        return axiosClient.post(requestUrl, data)
    },
    update: (data) => {
        const requestUrl = `${baseUrl}/${data.id}`
        return axiosClient.patch(requestUrl, data)
    },
    delete: (id) => {
        const requestUrl = `${baseUrl}/${id}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default rolesApi