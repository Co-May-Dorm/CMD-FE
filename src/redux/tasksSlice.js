import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import swal from "sweetalert"

import tasksApi from "~/api/tasksApi"

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        status: "idle",
        tasks: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0,
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTaskList.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getTaskList.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks
                state.pagination = action.payload.pagination
                state.status = "success"
            })
            .addCase(getTaskList.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(getTaskListAssignedToMe.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getTaskListAssignedToMe.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks
                state.pagination = action.payload.pagination
                state.status = "success"
            })
            .addCase(getTaskListAssignedToMe.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(getTaskListByStatusIds.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getTaskListByStatusIds.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks
                state.pagination = action.payload.pagination
                state.status = "success"
            })
            .addCase(getTaskListByStatusIds.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addTask.fulfilled, (state, action) => {
                // Nếu thêm công việc thành công
                if (action.payload.status === "OK") {
                    if (state.pagination.page === 1) {  // Kiểm tra nếu ở trang 1 thì mới hiển thị công việc vừa thêm lên giao diện
                        // Thực hiện thêm công việc đó vào đầu mảng dữ liệu trên redux và xóa công việc ở cuối mảng để số công việc trên 1 trang luôn đúng
                        state.tasks.unshift(action.payload.data)
                        state.tasks.pop()
                    }

                    // Hiển thị thông báo thêm công việc thành công
                    swal({
                        title: "Thêm công việc",
                        text: action.payload.message,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Thêm công việc",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK",
                    })
                }
            })
            .addCase(addTask.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Thêm công việc",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                // Nếu gửi request thêm công việc thành công lên Server
                if (action.payload.status === "OK") {
                    // Tìm kiếm id công việc và thực hiện cập nhật thông tin mới cho công việc đó
                    state.tasks.forEach((task, index, array) => {
                        if (task.id === action.payload.data.id) {
                            array[index] = action.payload.data
                        }
                    })

                    // Hiển thị thông báo chỉnh sửa công việc thành công
                    swal({
                        title: "Chỉnh sửa công việc",
                        text: action.payload.message,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Chỉnh sửa công việc",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK",
                    })
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Chỉnh sửa công việc",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                // Nếu gửi request xoắ công việc thành công lên Server
                if (action.payload.status === "OK") {
                    // Thực hiện lọc ra những công việc có id khác với id công việc cần xóa
                    state.tasks = state.tasks.filter((task) => task.id !== action.payload.data)

                    // Hiển thị thông báo xóa công việc thành công
                    swal({
                        title: "Xóa công việc",
                        text: action.payload.message,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu không thể xóa công việc
                else {
                    // Hiển thị cảnh báo không thể xóa công việc
                    swal({
                        title: "Xóa công việc",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK ",
                    })
                }
            })
            .addCase(deleteTask.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Xóa công việc",
                    text: action.payload.message,
                    icon: "error",
                    button: "OK ",
                })
            })
    },
})
export default tasksSlice

export const getTaskList = createAsyncThunk("tasks/getTaskList", async (params) => {
    const response = await tasksApi.getTaskList(params)
    return response.data.data
})
export const getTaskListAssignedToMe = createAsyncThunk("tasks/getTaskListAssignedToMe", async (params) => {
    const response = await tasksApi.getTaskListAssignedToMe(params)
    return response.data.data
})
export const getTaskListByStatusIds = createAsyncThunk("tasks/getTaskListByStatusIds", async (listStatusIds) => {
    const response = await tasksApi.getTaskListByStatusIds(listStatusIds)
    return response.data.data
})
export const addTask = createAsyncThunk("tasks/addTask", async (taskInfo) => {
    const response = await tasksApi.addTask(taskInfo)
    return response.data
})
export const updateTask = createAsyncThunk("tasks/updateTask", async (taskInfo) => {
    const response = await tasksApi.updateTask(taskInfo)
    return response.data
})
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId) => {
    const response = await tasksApi.deleteTask(taskId)
    return response.data
})
