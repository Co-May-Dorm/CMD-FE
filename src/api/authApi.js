import axiosClient from "./axiosClient"

const baseURL =  "/api/auth/signin"
const authApi = {
    login: (userInfo) => {
        return axiosClient.post(baseURL, userInfo)
    }
}

export default authApi