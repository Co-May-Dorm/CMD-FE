import axiosClient from "./axiosClient"

const queryString = require("query-string")

// API liên quan đến phần phòng ban
const baseUrl = "/departments"
const departmentsApi = {
    getDepartmentList: (params) => {
        const requestUrl = `${baseUrl}?${queryString.stringify(params)}`
        return axiosClient.get(requestUrl)
    },
    getDepartmentDetailById: (departmentId) => {
        const requestUrl = `${baseUrl}/${departmentId}`
        return axiosClient.get(requestUrl)
    },
    addDepartment: (departmentInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, departmentInfo)
    },
    updateDepartment: (departmentInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, departmentInfo)
    },
    deleteDepartment: (departmentId) => {
        const requestUrl = `${baseUrl}/delete/${departmentId}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default departmentsApi