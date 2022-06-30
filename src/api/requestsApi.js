import axiosClient from "./axiosClient"

// API liên quan đến phần đề xuất
const baseUrl = "/requests"
const requestsApi = {
    getAll: (filtersParams) => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl, {filtersParams})
    },
    get: (requestId) => {
        const requestUrl = `${baseUrl}/${requestId}`
        return axiosClient.get(requestUrl)
    },
    add: (requestInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, requestInfo)
    },
    update: (requestInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, requestInfo)
    },
    delete: (requestId) => {
        const requestUrl = `${baseUrl}/delete/${requestId}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default requestsApi