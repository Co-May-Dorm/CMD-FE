import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import swal from "sweetalert"
import { logout } from "~/redux/authSlice"

const queryString = require("query-string")

// Thiết lập cấu hình mặc định cho http request
const axiosClient = axios.create({
    baseURL: "http://222.255.238.159:9090/",
    headers: {
        "content-type": "application/json"
    },
    paramsSerializer: (params) => queryString.stringify(params),
})
axiosClient.interceptors.request.use(async (config) => {
    // Xử lý token
    config.headers.Authorization = localStorage.getItem("accessToken")
    return config
})
axiosClient.interceptors.request.use(
    (response) => {
        return response
    },
    (error) => {
        throw error
    }
)
axiosClient.interceptors.response.use(
    (response) => {
        if (response.status === 403) {
            swal({
                title: "Cảnh báo đăng nhập",
                text: "Phát hiện truy cập không hợp lệ, vui lòng đăng nhập lại!",
                icon: "warning",
                button: "OK"
            })
                .then((response) => {
                    localStorage.removeItem("accessToken")
                    localStorage.removeItem("userInfo")
                    window.location.reload()
                })
        }
        return response
    },
    (error) => {
        swal({
            title: "Cảnh báo đăng nhập",
            text: "Phát hiện truy cập không hợp lệ, vui lòng đăng nhập lại!",
            icon: "warning",
            button: "OK"
        })
            .then((response) => {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("userInfo")
                window.location.reload()
            })
        throw error
    }
)

export default axiosClient
