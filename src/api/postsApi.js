import axiosClient from "./axiosClient"

// API liên quan đến phần bảng tin
const baseUrl = "/posts"
const postsApi = {
    getAll: (filtersParams) => {
        const requestUrl = `${baseUrl}`
        return axiosClient.get(requestUrl, {filtersParams})
    },
    get: (postId) => {
        const requestUrl = `${baseUrl}/${postId}`
        return axiosClient.get(requestUrl)
    },
    add: (postInfo) => {
        const requestUrl = `${baseUrl}/add`
        return axiosClient.post(requestUrl, postInfo)
    },
    update: (postInfo) => {
        const requestUrl = `${baseUrl}/edit`
        return axiosClient.put(requestUrl, postInfo)
    },
    delete: (postId) => {
        const requestUrl = `${baseUrl}/delete/${postId}`
        return axiosClient.delete(requestUrl)
    }
}
//

export default postsApi