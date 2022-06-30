import axiosClient from "./axiosClient"

// API liên quan đến phần CLB - Đội nhóm
const baseUrl = "/teams"
const teamsApi = {
    getAll: (filtersParams) => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl, {filtersParams})
    },
    get: (teamId) => {
        const requestUrl = `${baseUrl}/${teamId}`
        return axiosClient.get(requestUrl)
    },
    add: (teamInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, teamInfo)
    },
    update: (teamInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, teamInfo)
    },
    delete: (teamId) => {
        const requestUrl = `${baseUrl}/delete/${teamId}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default teamsApi