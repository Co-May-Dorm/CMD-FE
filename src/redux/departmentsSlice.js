import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import swal from "sweetalert"

import departmentsApi from "~/api/departmentsApi"

const departmentsSlice = createSlice({
    name: "departments",
    initialState: {
        status: "idle",
        departments: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDepartmentList.pending, (state, action) => {
                if (state.status !== "success") {
                    state.status = "loading"
                } 
            })
            .addCase(getDepartmentList.fulfilled, (state, action) => {
                state.departments = action.payload
                state.status = "success"
            })
            .addCase(getDepartmentList.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addDepartment.fulfilled, (state, action) => {
                // Nếu thêm phòng ban thành công
                if (action.payload.status === "OK") {
                    console.log(action.payload)
                        state.departments.push(action.payload.data)

                    // Hiển thị thông báo thêm phòng ban thành công
                    swal({
                        title: "Thêm phòng ban",
                        text: action.payload.message,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Thêm phòng ban",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK",
                    })
                }
            })
            .addCase(addDepartment.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Thêm phòng ban",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(updateDepartment.fulfilled, (state, action) => {
                // Nếu gửi request thêm phòng ban thành công lên Server
                if (action.payload.status === "OK") {
                    // Tìm kiếm id phòng ban và thực hiện cập nhật thông tin mới cho phòng ban đó
                    state.departments.forEach((department, index, array) => {
                        if (department.id === action.payload.data.id) {
                            array[index] = action.payload.data
                        }
                    })

                    // Hiển thị thông báo chỉnh sửa phòng ban thành công
                    swal({
                        title: "Chỉnh sửa phòng ban",
                        text: action.payload.message,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Chỉnh sửa phòng ban",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK",
                    })
                }
            })
            .addCase(updateDepartment.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Chỉnh sửa phòng ban",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                // Nếu gửi request xoắ phòng ban thành công lên Server
                if (action.payload.status === "OK") {
                    // Thực hiện lọc ra những phòng ban có id khác với id phòng ban cần xóa
                    state.departments = state.departments.filter((department) => department.id !== action.payload.id)

                    // Hiển thị thông báo xóa phòng ban thành công
                    swal({
                        title: "Xóa phòng ban",
                        text: action.payload.message,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu không thể xóa phòng ban
                else {
                    // Hiển thị cảnh báo không thể xóa phòng ban
                    swal({
                        title: "Xóa phòng ban",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK ",
                    })
                }
            })
            .addCase(deleteDepartment.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Xóa phòng ban",
                    text: action.payload.message,
                    icon: "error",
                    button: "OK ",
                })
            })
    },
})
export default departmentsSlice

export const getDepartmentList = createAsyncThunk("departments/getDepartmentList", async (params) => {
    const response = await departmentsApi.getDepartmentList(params)
    return response.data.data
})
export const addDepartment = createAsyncThunk("departments/addDepartment", async (departmentInfo) => {
    const response = await departmentsApi.addDepartment(departmentInfo)
    return response.data
})
export const updateDepartment = createAsyncThunk("departments/updateDepartment", async (departmentInfo) => {
    const response = await departmentsApi.updateDepartment(departmentInfo)
    return response.data
})
export const deleteDepartment = createAsyncThunk("departments/deleteDepartment", async (departmentId) => {
    const response = await departmentsApi.deleteDepartment(departmentId)
    return response.data
})
