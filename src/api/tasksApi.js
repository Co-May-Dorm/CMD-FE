import axiosClient from "./axiosClient"

const queryString = require("query-string")

// API liên quan đến phần công việc
const baseUrl = "/tasks"
const tasksApi = {
    getTaskList: (params, filters) => {
        const requestUrl = `${baseUrl}?${queryString.stringify(params)}`
        return axiosClient.post(requestUrl, filters)
    },
    getTaskListAssignedToMe: (params, filters) => {
        const requestUrl = `${baseUrl}/assige-to-me?${queryString.stringify(params)}`
        return axiosClient.post(requestUrl, filters)
    },
    getTaskDetailById: (taskId) => {
        const requestUrl = `${baseUrl}/${taskId}`
        return axiosClient.get(requestUrl)
    },
    getStatusList: () => {
        const requestUrl = `/status`
        return axiosClient.get(requestUrl)
    },
    addTask: (taskInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, taskInfo)
    },
    updateTask: (taskInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, taskInfo)
    },
    deleteTask: (taskId) => {
        const requestUrl = `${baseUrl}/delete/${taskId}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default tasksApi