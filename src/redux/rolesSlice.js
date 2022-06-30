import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import rolesApi from '../api/rolesApi'

const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        status: 'idle',
        roles: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoles.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.roles = action.payload.roles
                state.pagination = action.payload.pagination
                state.status = 'idle'
            })
            .addCase(addRole.fulfilled, (state, action) => {
                state.roles.push(action.payload)
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                // Tìm kiếm id vai trò và thực hiện cập nhật thông tin mới cho vai trò đó
                state.roles.forEach((role, index, array) => {
                    if (role.id === action.payload.id) {
                        array[index] = action.payload
                    }
                })
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                // Thực hiện xóa vai trò
                state.roles.filter(role => role.id !== action.payload)
            })
    }
})
export default rolesSlice

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (filtersParams) => {
    const response = await rolesApi.getAll(filtersParams)
    return response.data.data
})
export const addRole = createAsyncThunk('roles/addRole', async (roleInfo) => {
    const response = await rolesApi.add(roleInfo)
    return response.data.data
})
export const updateRole = createAsyncThunk('roles/updateRole', async (roleInfo) => {
    const response = await rolesApi.update(roleInfo)
    return response.data.data
})
export const deleteRole = createAsyncThunk('roles/deleteRole', async (roleId) => {
    const response = await rolesApi.delete(roleId)
    return response.data.data
})