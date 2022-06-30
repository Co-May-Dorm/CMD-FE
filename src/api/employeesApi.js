import axiosClient from "./axiosClient"

// API liên quan đến phần nhân viên
const baseUrl = "/employees"
const employeesApi = {
    getAll: (params) => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl, {params})
    },
    get: (employeeId) => {
        const requestUrl = `${baseUrl}/${employeeId}`
        return axiosClient.get(requestUrl)
    },
    add: (employeeInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, employeeInfo)
    },
    update: (employeeInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, employeeInfo)
    },
    delete: (employeeId) => {
        const requestUrl = `${baseUrl}/delete/${employeeId}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default employeesApi