import axiosClient from "./axiosClient"

const queryString = require("query-string")

// API liên quan đến phần công việc
const baseUrl = "/tasks"
const tasksApi = {
    getTaskList: (params) => {
        const requestUrl = `${baseUrl}?${queryString.stringify(params)}`
        return axiosClient.get(requestUrl)
    },
    getTaskListAssignedToMe: (params) => {
        const requestUrl = `${baseUrl}/assignedToMe?${queryString.stringify(params)}`
        return axiosClient.get(requestUrl)
    },
    getTaskDetailById: (taskId) => {
        const requestUrl = `${baseUrl}/${taskId}`
        return axiosClient.get(requestUrl)
    },
    getTaskListByStatusIds: (listStatusIds) => {
        const requestUrl = `${baseUrl}/statuses`
        return axiosClient.post(requestUrl, listStatusIds)
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