import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import requestsApi from '../api/requestsApi'

const requestsSlice = createSlice({
    name: 'requests',
    initialState: {
        status: 'idle',
        requests: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRequests.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRequests.fulfilled, (state, action) => {
                state.requests = action.payload
                state.status = 'idle'
            })
            .addCase(addRequest.fulfilled, (state, action) => {
                state.requests.push(action.payload)
            })
            .addCase(updateRequest.fulfilled, (state, action) => {
                // Tìm kiếm id đề xuất và thực hiện cập nhật thông tin mới cho đề xuất đó
                state.requests.forEach((request, index, array) => {
                    if (request.id === action.payload.id) {
                        array[index] = action.payload
                    }
                })
            })
            .addCase(deleteRequest.fulfilled, (state, action) => {
                // Thực hiện xóa đề xuất
                state.requests.filter(request => request.id !== action.payload)
            })
    }
})
export default requestsSlice

export const fetchRequests = createAsyncThunk('requests/fetchRequests', async (filtersParams) => {
    const response = await requestsApi.getAll(filtersParams)
    return response.data.data
})
export const addRequest = createAsyncThunk('requests/addRequest', async (requestInfo) => {
    const response = await requestsApi.add(requestInfo)
    return response.data.data
})
export const updateRequest = createAsyncThunk('requests/updateRequest', async (requestInfo) => {
    const response = await requestsApi.update(requestInfo)
    return response.data.data
})
export const deleteRequest = createAsyncThunk('requests/deleteRequest', async (requestId) => {
    const response = await requestsApi.delete(requestId)
    return response.data.data
})