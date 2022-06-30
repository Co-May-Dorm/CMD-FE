import axiosClient from "./axiosClient"

// API liên quan đến phần công việc
const baseUrl = "/tasks"
const tasksApi = {
    getAll: (filtersParams) => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl, { filtersParams })
    },
    get: (taskId) => {
        const requestUrl = `${baseUrl}/${taskId}`
        return axiosClient.get(requestUrl)
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