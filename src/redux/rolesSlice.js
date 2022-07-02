import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import swal from "sweetalert"
import rolesApi from "~/api/rolesApi"

const rolesSlice = createSlice({
    name: "roles",
    initialState: {
        status: "idle",
        roles: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0,
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.roles = action.payload.roles
                state.pagination = action.payload.pagination
                state.status = "success"
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addRole.fulfilled, (state, action) => {
                // Nếu thêm vai trò thành công
                if (action.payload.status === "OK") {
                    // Thực hiện thêm vai trò đó vào đầu mảng dữ liệu trên redux và xóa vai trò ở cuối mảng để số vai trò trên 1 trang luôn đúng
                    state.roles.unshift(action.payload.data)
                    state.roles.pop()

                    // Hiển thị thông báo thêm vai trò thành công
                    swal({
                        title: "Thêm vai trò",
                        text: `Thêm vai trò ${action.payload.data.name} thành công!`,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Thêm vai trò",
                        text: `Thêm vai trò thất bại. ${action.payload.message}`,
                        icon: "error",
                        button: "OK",
                    })
                }
            })
            .addCase(addRole.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Thêm vai trò",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                // Nếu gửi request thêm vai trò thành công lên Server
                if (action.payload.status === "OK") {
                    // Tìm kiếm id vai trò và thực hiện cập nhật thông tin mới cho vai trò đó
                    state.roles.forEach((role, index, array) => {
                        if (role.id === action.payload.id) {
                            array[index] = action.payload
                        }
                    })

                    // Hiển thị thông báo chỉnh sửa vai trò thành công
                    swal({
                        title: "Chỉnh sửa vai trò",
                        text: `Chỉnh sửa vai trò ${action.payload.name} thành công!`,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Chỉnh sửa vai trò",
                        text: action.payload.message,
                        icon: "error",
                        button: "OK",
                    })
                }
            })
            .addCase(updateRole.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Chỉnh sửa vai trò",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                // Nếu gửi request xoắ vai trò thành công lên Server
                if (action.payload.status === "OK") {
                    // Thực hiện lọc ra những vai trò có id khác với id vai trò cần xóa
                    state.roles = state.roles.filter((role) => role.id !== action.payload.id)

                    // Hiển thị thông báo xóa vai trò thành công
                    swal({
                        title: "Xóa vai trò",
                        text: `Xóa vai trò ${action.payload.name} thành công!`,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu không thể xóa vai trò
                else {
                    // Hiển thị cảnh báo không thể xóa vai trò
                    swal({
                        title: "Xóa vai trò",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK ",
                    })
                }
            })
            .addCase(deleteRole.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Xóa vai trò",
                    text: action.payload.message,
                    icon: "error",
                    button: "OK ",
                })
            })
    },
})
export default rolesSlice

export const fetchRoles = createAsyncThunk("roles/fetchRoles", async (params) => {
    const response = await rolesApi.getAll(params)
    return response.data.data
})
export const addRole = createAsyncThunk("roles/addRole", async (roleInfo) => {
    const response = await rolesApi.add(roleInfo)
    return response.data
})
export const updateRole = createAsyncThunk("roles/updateRole", async (roleInfo) => {
    const response = await rolesApi.update(roleInfo)
    return response.data
})
export const deleteRole = createAsyncThunk("roles/deleteRole", async (roleId) => {
    const response = await rolesApi.delete(roleId)
    return response.data
})
