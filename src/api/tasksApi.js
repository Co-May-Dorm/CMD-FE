import axiosClient from "./axiosClient"

// API liên quan đến phần công việc
const baseUrl = "/tasks"
const tasksApi = {
    getTaskList: (params) => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl, {params})
    },
    getTaskById: (taskId) => {
        const requestUrl = `${baseUrl}/${taskId}`
        return axiosClient.get(requestUrl)
    },
    getTaskListByStatusIds: (listStatusIds) => {
        const requestUrl = `${baseUrl}/statuses`
        return axiosClient.post(requestUrl, listStatusIds)
    },
    add: (taskInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, taskInfo)
    },
    update: (taskInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, taskInfo)
    },
    delete: (taskId) => {
        const requestUrl = `${baseUrl}/delete/${taskId}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default tasksApi