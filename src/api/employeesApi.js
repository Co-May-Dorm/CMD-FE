import axiosClient from "./axiosClient"

const queryString = require("query-string")

// API liên quan đến phần nhân viên
const baseUrl = "/employees"
const employeesApi = {
    getEmployeeList: (params) => {
        const requestUrl = `${baseUrl}?${queryString.stringify(params)}`
        return axiosClient.get(requestUrl)
    },
    getEmployeeListByName: (employeeName) => {
        const requestUrl = `${baseUrl}/name?name=${employeeName}`
        return axiosClient.get(requestUrl)
    },
    getEmployeeDetailById: (employeeId) => {
        const requestUrl = `${baseUrl}/${employeeId}`
        return axiosClient.get(requestUrl)
    },
    addEmployee: (employeeInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, employeeInfo)
    },
    updateEmployee: (employeeInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, employeeInfo)
    },
    deleteEmployee: (employeeId) => {
        const requestUrl = `${baseUrl}/delete/${employeeId}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default employeesApi