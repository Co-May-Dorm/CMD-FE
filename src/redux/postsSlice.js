import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postsApi from '../api/postsApi'

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        status: 'idle',
        posts: [],
        pagination: {
            page: 1,
            limit: 10,
            totalItem: 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.status = 'idle'
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                // Tìm kiếm id bài viết và thực hiện cập nhật thông tin mới cho bài viết đó
                state.posts.forEach((post, index, array) => {
                    if (post.id === action.payload.id) {
                        array[index] = action.payload
                    }
                })
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                // Thực hiện xóa bài viết
                state.posts.filter(post => post.id !== action.payload)
            })
    }
})
export default postsSlice

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (filtersParams) => {
    const response = await postsApi.getAll(filtersParams)
    return response.data.data
})
export const addPost = createAsyncThunk('posts/addPost', async (postInfo) => {
    const response = await postsApi.add(postInfo)
    return response.data.data
})
export const updatePost = createAsyncThunk('posts/updatePost', async (postInfo) => {
    const response = await postsApi.update(postInfo)
    return response.data.data
})
export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
    const response = await postsApi.delete(postId)
    return response.data.data
})