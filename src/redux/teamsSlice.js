import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import swal from "sweetalert"
import teamsApi from "~/api/teamsApi"

const teamsSlice = createSlice({
    name: "teams",
    initialState: {
        status: "idle",
        teams: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeams.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.teams = action.payload.data
                state.status = "success"
            })
            .addCase(fetchTeams.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addTeam.fulfilled, (state, action) => {
                // Nếu thêm CLB - Đội nhóm thành công
                if (action.payload.status === "OK") {
                    // Thực hiện thêm CLB - Đội nhóm đó vào đầu mảng dữ liệu trên redux và xóa CLB - Đội nhóm ở cuối mảng để số CLB - Đội nhóm trên 1 trang luôn đúng
                    state.teams.unshift(action.payload.data)
                    state.teams.pop()

                    // Hiển thị thông báo thêm CLB - Đội nhóm thành công
                    swal({
                        title: "Thêm CLB - Đội nhóm",
                        text: `Thêm CLB - Đội nhóm ${action.payload.data.name} thành công!`,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Thêm CLB - Đội nhóm",
                        text: `Thêm CLB - Đội nhóm thất bại. ${action.payload.message}`,
                        icon: "error",
                        button: "OK",
                    })
                }
            })
            .addCase(addTeam.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Thêm CLB - Đội nhóm",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(updateTeam.fulfilled, (state, action) => {
                // Nếu gửi request thêm CLB - Đội nhóm thành công lên Server
                if (action.payload.status === "OK") {
                    // Tìm kiếm id CLB - Đội nhóm và thực hiện cập nhật thông tin mới cho CLB - Đội nhóm đó
                    state.teams.forEach((team, index, array) => {
                        if (team.id === action.payload.id) {
                            array[index] = action.payload
                        }
                    })

                    // Hiển thị thông báo chỉnh sửa CLB - Đội nhóm thành công
                    swal({
                        title: "Chỉnh sửa CLB - Đội nhóm",
                        text: `Chỉnh sửa CLB - Đội nhóm ${action.payload.name} thành công!`,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Chỉnh sửa CLB - Đội nhóm",
                        text: action.payload.message,
                        icon: "error",
                        button: "OK",
                    })
                }
            })
            .addCase(updateTeam.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Chỉnh sửa CLB - Đội nhóm",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(deleteTeam.fulfilled, (state, action) => {
                // Nếu gửi request xoắ CLB - Đội nhóm thành công lên Server
                if (action.payload.status === "OK") {
                    // Thực hiện lọc ra những CLB - Đội nhóm có id khác với id CLB - Đội nhóm cần xóa
                    state.teams = state.teams.filter((team) => team.id !== action.payload.id)

                    // Hiển thị thông báo xóa CLB - Đội nhóm thành công
                    swal({
                        title: "Xóa CLB - Đội nhóm",
                        text: `Xóa CLB - Đội nhóm ${action.payload.name} thành công!`,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu không thể xóa CLB - Đội nhóm
                else {
                    // Hiển thị cảnh báo không thể xóa CLB - Đội nhóm
                    swal({
                        title: "Xóa CLB - Đội nhóm",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK ",
                    })
                }
            })
            .addCase(deleteTeam.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Xóa CLB - Đội nhóm",
                    text: action.payload.message,
                    icon: "error",
                    button: "OK ",
                })
            })
    },
})
export default teamsSlice

export const fetchTeams = createAsyncThunk("teams/fetchTeams", async (params) => {
    const response = await teamsApi.getAll(params)
    return response.data.data
})
export const addTeam = createAsyncThunk("teams/addTeam", async (teamInfo) => {
    const response = await teamsApi.add(teamInfo)
    return response.data
})
export const updateTeam = createAsyncThunk("teams/updateTeam", async (teamInfo) => {
    const response = await teamsApi.update(teamInfo)
    return response.data
})
export const deleteTeam = createAsyncThunk("teams/deleteTeam", async (teamId) => {
    const response = await teamsApi.delete(teamId)
    return response.data
})
