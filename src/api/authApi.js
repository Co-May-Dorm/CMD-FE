import axiosClient from "./axiosClient"

const baseUrl =  "/api/auth"
const authApi = {
    login: (userInfo) => {
        const requestUrl = `${baseUrl}/signin`
        return axiosClient.post(requestUrl, userInfo)
    },
    changePassword: (data) => {
        const requestUrl = `${baseUrl}/change-password`
        return axiosClient.post(requestUrl, data)
    }
}

export default authApi