import * as actions from "../constants/ActionRequest"

// Khởi tạo state
const initialState = {
    data: [],
    pagination: {
        page: 1,
        limit: 10,
        totalItem: 0
    }
}

// Reducer quản lý danh sách đề xuất
const requestsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Lấy danh sách đề xuất
        case actions.FETCH_REQUESTS: {
            state = action.payload
            return { ...state }
        }

        // Thêm đề xuất
        case actions.ADD_REQUEST: {
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        }

        // Cập nhật thông tin đề xuất
        case actions.UPDATE_REQUEST: {
            const listRequestsUpdated = state.data
            listRequestsUpdated.forEach((request, index, array) => {
                if (request.id === action.payload.id) {
                    array[index] = action.payload
                }
            })
            return {
                ...state,
                data: [...listRequestsUpdated]
            }
        }

        // Xóa đề xuất
        case actions.DELETE_REQUEST: {
            const listRequestsDeleted = state.data.filter(request => request.id !== action.payload)
            return {
                ...state,
                data: [...listRequestsDeleted]
            }
        }
        default:
            return { ...state }
    }
}

export default requestsReducer