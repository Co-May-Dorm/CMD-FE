import axiosClient from "./axiosClient"

// API liên quan đến phần vai trò
const baseUrl = "/roles"
const rolesApi = {
    getAll: (filtersParams) => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl, {filtersParams})
    },
    get: (roleId) => {
        const requestUrl = `${baseUrl}/${roleId}`
        return axiosClient.get(requestUrl)
    },
    add: (roleInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, roleInfo)
    },
    update: (roleInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, roleInfo)
    },
    delete: (roleId) => {
        const requestUrl = `${baseUrl}/delete/${roleId}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default rolesApi