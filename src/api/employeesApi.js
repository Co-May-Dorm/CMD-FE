import axiosClient from "./axiosClient"

// API nhân viên
const baseUrl = "/employees"
const employeesApi = {
    getAll: (params) => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl, {params})
    },
    get: (id) => {
        const requestUrl = `${baseUrl}/${id}`
        return axiosClient.get(requestUrl)
    },
    add: (data) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, data)
    },
    update: (data) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, data)
    },
    delete: (id) => {
        const requestUrl = `${baseUrl}/delete/${id}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default employeesApi