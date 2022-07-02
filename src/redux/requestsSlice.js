import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import swal from "sweetalert"
import requestsApi from "~/api/requestsApi"

const requestsSlice = createSlice({
    name: "requests",
    initialState: {
        status: "idle",
        requests: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0,
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRequests.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchRequests.fulfilled, (state, action) => {
                state.requests = action.payload.requests
                state.pagination = action.payload.pagination
                state.status = "success"
            })
            .addCase(fetchRequests.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addRequest.fulfilled, (state, action) => {
                // Nếu thêm đề xuất thành công
                if (action.payload.status === "OK") {
                    // Thực hiện thêm đề xuất đó vào đầu mảng dữ liệu trên redux và xóa đề xuất ở cuối mảng để số đề xuất trên 1 trang luôn đúng
                    state.requests.unshift(action.payload.data)
                    state.requests.pop()

                    // Hiển thị thông báo thêm đề xuất thành công
                    swal({
                        title: "Thêm đề xuất",
                        text: `Thêm đề xuất ${action.payload.data.name} thành công!`,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Thêm đề xuất",
                        text: `Thêm đề xuất thất bại. ${action.payload.message}`,
                        icon: "error",
                        button: "OK",
                    })
                }
            })
            .addCase(addRequest.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Thêm đề xuất",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(updateRequest.fulfilled, (state, action) => {
                // Nếu gửi request thêm đề xuất thành công lên Server
                if (action.payload.status === "OK") {
                    // Tìm kiếm id đề xuất và thực hiện cập nhật thông tin mới cho đề xuất đó
                    state.requests.forEach((request, index, array) => {
                        if (request.id === action.payload.id) {
                            array[index] = action.payload
                        }
                    })

                    // Hiển thị thông báo chỉnh sửa đề xuất thành công
                    swal({
                        title: "Chỉnh sửa đề xuất",
                        text: `Chỉnh sửa đề xuất ${action.payload.name} thành công!`,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Chỉnh sửa đề xuất",
                        text: action.payload.message,
                        icon: "error",
                        button: "OK",
                    })
                }
            })
            .addCase(updateRequest.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Chỉnh sửa đề xuất",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(deleteRequest.fulfilled, (state, action) => {
                // Nếu gửi request xoắ đề xuất thành công lên Server
                if (action.payload.status === "OK") {
                    // Thực hiện lọc ra những đề xuất có id khác với id đề xuất cần xóa
                    state.requests = state.requests.filter((request) => request.id !== action.payload.id)

                    // Hiển thị thông báo xóa đề xuất thành công
                    swal({
                        title: "Xóa đề xuất",
                        text: `Xóa đề xuất ${action.payload.name} thành công!`,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu không thể xóa đề xuất
                else {
                    // Hiển thị cảnh báo không thể xóa đề xuất
                    swal({
                        title: "Xóa đề xuất",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK ",
                    })
                }
            })
            .addCase(deleteRequest.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Xóa đề xuất",
                    text: action.payload.message,
                    icon: "error",
                    button: "OK ",
                })
            })
    },
})
export default requestsSlice

export const fetchRequests = createAsyncThunk("requests/fetchRequests", async (params) => {
    const response = await requestsApi.getAll(params)
    return response.data.data
})
export const addRequest = createAsyncThunk("requests/addRequest", async (requestInfo) => {
    const response = await requestsApi.add(requestInfo)
    return response.data
})
export const updateRequest = createAsyncThunk("requests/updateRequest", async (requestInfo) => {
    const response = await requestsApi.update(requestInfo)
    return response.data
})
export const deleteRequest = createAsyncThunk("requests/deleteRequest", async (requestId) => {
    const response = await requestsApi.delete(requestId)
    return response.data
})
