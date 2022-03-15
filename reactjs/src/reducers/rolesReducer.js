import * as actions from "../constants/ActionRole"

// Khởi tạo state
const initialState = {
    data: [],
    pagination: {
        _page: 1,
        _limit: 10,
        _totalItem: 0
    }
}

// Reducer quản lý danh sách vai trò
const rolesReducer = (state = initialState, action) => {
    switch (action.type) {
        // Lấy danh sách vai trò
        case actions.FETCH_ROLES: {
            state = action.payload
            return { ...state }
        }

        // Thêm vai trò
        case actions.ADD_ROLE: {
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        }

        // Cập nhật thông tin vai trò
        case actions.UPDATE_ROLE: {
            const listRolesUpdated = state.data
            listRolesUpdated.forEach((role, index, array) => {
                if (role.id === action.payload.id) {
                    array[index] = action.payload
                }
            })
            return {
                ...state,
                data: [...listRolesUpdated]
            }
        }

        // Xóa vai trò
        case actions.DELETE_ROLE: {
            const listRolesDeleted = state.data.filter(role => role.id !== action.payload)
            return {
                ...state,
                data: [...listRolesDeleted]
            }
        }
        default:
            return { ...state }
    }
}

export default rolesReducer