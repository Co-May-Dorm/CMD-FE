import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import tasksApi from '../api/tasksApi'

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        status: 'idle',
        tasks: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload
                state.status = 'idle'
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                // Tìm kiếm id công việc và thực hiện cập nhật thông tin mới cho công việc đó
                state.tasks.forEach((task, index, array) => {
                    if (task.id === action.payload.id) {
                        array[index] = action.payload
                    }
                })
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                // Thực hiện xóa công việc
                state.tasks.filter(task => task.id !== action.payload)
            })
    }
})
export default tasksSlice

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (filtersParams) => {
    const response = await tasksApi.getAll(filtersParams)
    return response.data.data
})
export const addTask = createAsyncThunk('tasks/addTask', async (taskInfo) => {
    const response = await tasksApi.add(taskInfo)
    return response.data.data
})
export const updateTask = createAsyncThunk('tasks/updateTask', async (taskInfo) => {
    const response = await tasksApi.update(taskInfo)
    return response.data.data
})
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
    const response = await tasksApi.delete(taskId)
    return response.data.data
})