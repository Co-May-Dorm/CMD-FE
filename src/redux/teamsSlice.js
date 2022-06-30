import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import teamsApi from '../api/teamsApi'

const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        status: 'idle',
        teams: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeams.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTeams.fulfilled, (state, action) => {
                state.teams = action.payload
                state.status = 'idle'
            })
            .addCase(addTeam.fulfilled, (state, action) => {
                state.teams.push(action.payload)
            })
            .addCase(updateTeam.fulfilled, (state, action) => {
                // Tìm kiếm id CLB - Đội nhóm và thực hiện cập nhật thông tin mới cho CLB - Đội nhóm đó
                state.teams.forEach((team, index, array) => {
                    if (team.id === action.payload.id) {
                        array[index] = action.payload
                    }
                })
            })
            .addCase(deleteTeam.fulfilled, (state, action) => {
                // Thực hiện xóa CLB - Đội nhóm
                state.teams.filter(team => team.id !== action.payload)
            })
    }
})
export default teamsSlice

export const fetchTeams = createAsyncThunk('teams/fetchTeams', async () => {
    const response = await teamsApi.getAll()
    return response.data.data
})
export const addTeam = createAsyncThunk('teams/addTeam', async (teamInfo) => {
    const response = await teamsApi.add(teamInfo)
    return response.data.data
})
export const updateTeam = createAsyncThunk('teams/updateTeam', async (teamInfo) => {
    const response = await teamsApi.update(teamInfo)
    return response.data.data
})
export const deleteTeam = createAsyncThunk('teams/deleteTeam', async (teamId) => {
    const response = await teamsApi.delete(teamId)
    return response.data.data
})