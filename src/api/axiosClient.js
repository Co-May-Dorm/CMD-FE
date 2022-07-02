import axios from "axios"

const queryString = require("query-string")

// Thiết lập cấu hình mặc định cho http request
const accessToken = localStorage.getItem("accessToken") || ""

const axiosClient = axios.create({
    baseURL: "http://222.255.238.159:9090/",
    headers: {
        "content-type": "application/json",
        "Authorization": accessToken,
    },
    paramsSerializer: (params) => queryString.stringify(params),
})
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here...
    return config
})
axiosClient.interceptors.request.use(
    (response) => {
        return response
    },
    (error) => {
        // Handle errors
        throw error
    }
)

export default axiosClient
