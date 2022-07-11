import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import swal from 'sweetalert'

import authApi from '~/api/authApi'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: "idle",
        userInfo: null,
        accessToken: null
    },
    reducers: {
        logout: (state, action) => {
            state.status = "idle"
            state.userInfo = null
            state.accessToken = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload.status === "OK") {
                    state.status = "success"
                    state.userInfo = action.payload.data.userInfo
                    state.accessToken = action.payload.data.accessToken
                    localStorage.setItem("accessToken", "Bearer " + action.payload.data.accessToken)
                    localStorage.setItem("userInfo", JSON.stringify(action.payload.data.userInfo))
                    window.location.reload()
                }
                else {
                    state.status = "error"
                    swal({
                        title: "Đăng nhập",
                        text: action.payload.message,
                        icon: "error",
                        button: "OK"
                    })
                }
            })
    }
})

export const { logout } = authSlice.actions
export const login = createAsyncThunk("auth/login", async (userInfo) => {
    const response = await authApi.login(userInfo)
    return response.data
})

export default authSlice