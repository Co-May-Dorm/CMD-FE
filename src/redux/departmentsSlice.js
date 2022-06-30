import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import departmentsApi from '../api/departmentsApi'

const departmentsSlice = createSlice({
    name: 'departments',
    initialState: {
        status: 'idle',
        departments: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDepartments.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchDepartments.fulfilled, (state, action) => {
                state.departments = action.payload
                state.status = 'idle'
            })
            .addCase(addDepartment.fulfilled, (state, action) => {
                state.departments.push(action.payload)
            })
            .addCase(updateDepartment.fulfilled, (state, action) => {
                // Tìm kiếm id phòng ban và thực hiện cập nhật thông tin mới cho phòng ban đó
                state.departments.forEach((department, index, array) => {
                    if (department.id === action.payload.id) {
                        array[index] = action.payload
                    }
                })
            })
            .addCase(deleteDepartment.fulfilled, (state, action) => {
                // Thực hiện xóa phòng ban
                state.departments.filter(department => department.id !== action.payload)
            })
    }
})
export default departmentsSlice

export const fetchDepartments = createAsyncThunk('departments/fetchDepartments', async (filtersParams) => {
    const response = await departmentsApi.getAll(filtersParams)
    return response.data.data
})
export const addDepartment = createAsyncThunk('departments/addDepartment', async (departmentInfo) => {
    const response = await departmentsApi.add(departmentInfo)
    return response.data.data
})
export const updateDepartment = createAsyncThunk('departments/updateDepartment', async (departmentInfo) => {
    const response = await departmentsApi.update(departmentInfo)
    return response.data.data
})
export const deleteDepartment = createAsyncThunk('departments/deleteDepartment', async (departmentId) => {
    const response = await departmentsApi.delete(departmentId)
    return response.data.data
})