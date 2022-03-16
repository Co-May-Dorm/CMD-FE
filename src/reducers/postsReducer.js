import * as actions from "../constants/ActionPost"

// Khởi tạo state
const initialState = {
    data: [],
    pagination: {
        page: 1,
        limit: 10,
        totalItem: 0
    }
}

// Reducer quản lý danh sách bài viết
const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Lấy danh sách bài viết
        case actions.FETCH_POSTS: {
            state = action.payload
            return { ...state }
        }

        // Thêm bài viết
        case actions.ADD_POST: {
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        }

        // Cập nhật thông tin bài viết
        case actions.UPDATE_POST: {
            const listPostsUpdated = state.data
            listPostsUpdated.forEach((post, index, array) => {
                if (post.id === action.payload.id) {
                    array[index] = action.payload
                }
            })
            return {
                ...state,
                data: [...listPostsUpdated]
            }
        }

        // Xóa bài viết
        case actions.DELETE_POST: {
            const listPostsDeleted = state.data.filter(post => post.id !== action.payload)
            return {
                ...state,
                data: [...listPostsDeleted]
            }
        }
        default:
            return { ...state }
    }
}

export default postsReducer