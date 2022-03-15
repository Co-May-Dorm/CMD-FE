import axios from 'axios'
import queryString from 'query-string'

// Thiết lập cấu hình mặc định cho http request
const axiosClient = axios.create({
    baseURL: "http://27.74.244.150:9090/",
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params)
})
axiosClient.interceptors.request.use(async (config) => {
    // Handle token here...
    return config
})
axiosClient.interceptors.request.use((response) => {
    return response
}, (error) => {
    // Handle errors
    throw error
})

export default axiosClient