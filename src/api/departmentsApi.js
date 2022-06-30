import axiosClient from "./axiosClient"

// API liên quan đến phần phòng ban
const baseUrl = "/departments"
const departmentsApi = {
    getAll: (filtersParams) => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl, {filtersParams})
    },
    get: (departmentId) => {
        const requestUrl = `${baseUrl}/${departmentId}`
        return axiosClient.get(requestUrl)
    },
    add: (departmentInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, departmentInfo)
    },
    update: (departmentInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, departmentInfo)
    },
    delete: (departmentId) => {
        const requestUrl = `${baseUrl}/delete/${departmentId}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default departmentsApi