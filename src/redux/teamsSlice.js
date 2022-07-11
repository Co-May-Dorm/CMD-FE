import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import swal from "sweetalert"
import teamsApi from "~/api/teamsApi"

const teamsSlice = createSlice({
    name: "teams",
    initialState: {
        status: "idle",
        teams: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeams.pending, (state, action) => {
                if (state.status !== "success") {
                    state.status = "loading"
                } 
            })
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.teams = action.payload
                state.status = "success"
            })
            .addCase(fetchTeams.rejected, (state, action) => {
                state.status = "error"
            })
            .addCase(addTeam.fulfilled, (state, action) => {
                // Nếu thêm đội nhóm thành công
                if (action.payload.status === "OK") {
                        state.teams.push(action.payload.data)

                    // Hiển thị thông báo thêm đội nhóm thành công
                    swal({
                        title: "Thêm đội nhóm",
                        text: action.payload.message,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Thêm đội nhóm",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK",
                    })
                }
            })
            .addCase(addTeam.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Thêm đội nhóm",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(updateTeam.fulfilled, (state, action) => {
                // Nếu gửi request thêm đội nhóm thành công lên Server
                if (action.payload.status === "OK") {
                    // Tìm kiếm id đội nhóm và thực hiện cập nhật thông tin mới cho đội nhóm đó
                    state.teams.forEach((team, index, array) => {
                        if (team.id === action.payload.id) {
                            array[index] = action.payload
                        }
                    })

                    // Hiển thị thông báo chỉnh sửa đội nhóm thành công
                    swal({
                        title: "Chỉnh sửa đội nhóm",
                        text: action.payload.message,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu có dữ liệu không hợp lệ
                else {
                    // Hiển thị thông báo dữ liệu thông hợp lệ
                    swal({
                        title: "Chỉnh sửa đội nhóm",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK",
                    })
                }
            })
            .addCase(updateTeam.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Chỉnh sửa đội nhóm",
                    text: action.error.message,
                    icon: "error",
                    button: "OK",
                })
            })
            .addCase(deleteTeam.fulfilled, (state, action) => {
                // Nếu gửi request xoắ đội nhóm thành công lên Server
                if (action.payload.status === "OK") {
                    // Thực hiện lọc ra những đội nhóm có id khác với id đội nhóm cần xóa
                    state.teams = state.teams.filter((team) => team.id !== action.payload.id)

                    // Hiển thị thông báo xóa đội nhóm thành công
                    swal({
                        title: "Xóa đội nhóm",
                        text: action.payload.message,
                        icon: "success",
                        button: "OK",
                    })
                }

                // Nếu không thể xóa đội nhóm
                else {
                    // Hiển thị cảnh báo không thể xóa đội nhóm
                    swal({
                        title: "Xóa đội nhóm",
                        text: action.payload.message,
                        icon: "warning",
                        button: "OK ",
                    })
                }
            })
            .addCase(deleteTeam.rejected, (state, action) => {
                // Hiển thị thông báo nếu gửi request thất bại
                swal({
                    title: "Xóa đội nhóm",
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
