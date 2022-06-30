import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import swal from "sweetalert"
import employeesApi from "../api/employeesApi"

const employeesSlice = createSlice({
    name: "employees",
    initialState: {
        status: "idle",
        employees: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0,
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.employees = action.payload.employees
                state.pagination = action.payload.pagination
                state.status = "idle"
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                // Nếu gửi request thêm nhân viên thành công lên Server
                if (action.payload.status === "OK") {
                    // Thực hiện thêm nhân viên đó vào đầu mảng dữ liệu trên redux và xóa nhân viên ở cuối mảng để số nhân viên trên 1 trang luôn đúng
                    state.employees.unshift(action.payload.data)
                    state.employees.pop()

                    // Hiển thị thông báo thêm nhân viên thành công
                    swal({
                        title: "Thêm nhân viên",
                        text: `Thêm nhân viên thành công!`,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có lỗi khi gửi request hay dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo thêm nhân viên thất bại kèm lỗi
                    swal({
                        title: "Thêm nhân viên",
                        text: `${action.payload.message}`,
                        icon: "error",
                        button: "OK",
                    })
                }
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                // Nếu gửi request thêm nhân viên thành công lên Server
                if (action.payload.status === "OK") {
                    // Tìm kiếm id nhân viên và thực hiện cập nhật thông tin mới cho nhân viên đó
                    state.employees.forEach((employee, index, array) => {
                        if (employee.id === action.payload.id) {
                            array[index] = action.payload
                        }
                    })

                    // Hiển thị thông báo chỉnh sửa nhân viên thành công
                    swal({
                        title: "Chỉnh sửa nhân viên",
                        text: `Chỉnh sửa nhân viên thành công!`,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có lỗi khi gửi request hay dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo chỉnh sửa nhân viên thất bại kèm lỗi
                    swal({
                        title: "Chỉnh sửa nhân viên",
                        text: `${action.payload.message}`,
                        icon: "error",
                        button: "OK",
                    })
                }
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                // Nếu gửi request xoắ nhân viên thành công lên Server
                if (action.payload.status === "OK") {
                    // Thực hiện lọc ra những nhân viên có id khác với id nhân viên cần xóa
                    state.employees = state.employees.filter((employee) => employee.id !== action.payload.id)

                    // Hiển thị thông báo chỉnh sửa nhân viên thành công
                    swal({
                        title: "Xóa nhân viên",
                        text: `Xóa nhân viên thành công!`,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu không thể xóa nhân viên
                else {
                    // Hiển thị thông báo Xóa nhân viên thất bại kèm lỗi
                    swal({
                        title: "Xóa nhân viên",
                        text: `${action.payload.message}`,
                        icon: "error",
                        button: "OK",
                    })
                }
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                // Hiển thị thông báo xóa nhân viên thất bạn
                swal({
                    title: "Xóa nhân viên",
                    text: action.payload.message,
                    icon: "error",
                    button: "OK ",
                })
            })
    },
})
export default employeesSlice

export const fetchEmployees = createAsyncThunk("employees/fetchEmployees", async (params) => {
    const response = await employeesApi.getAll(params)
    return response.data.data
})
export const addEmployee = createAsyncThunk("employees/addEmployee", async (employeeInfo) => {
    const response = await employeesApi.add(employeeInfo)
    return response.data
})
export const updateEmployee = createAsyncThunk("employees/updateEmployee", async (employeeInfo) => {
    const response = await employeesApi.update(employeeInfo)
    return response.data
})
export const deleteEmployee = createAsyncThunk("employees/deleteEmployee", async (employeeId) => {
    await employeesApi.delete(employeeId)
    return employeeId
})
