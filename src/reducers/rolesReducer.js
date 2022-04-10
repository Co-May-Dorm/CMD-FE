import * as actions from "../constants/ActionRole"

// Khởi tạo state
const initialState = {
    roles: [],
    pagination: {
        page: 1,
        limit: 10,
        totalItem: 0
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
                roles: [...state.roles, action.payload]
            }
        }

        // Cập nhật thông tin vai trò
        case actions.UPDATE_ROLE: {
            const listRolesUpdated = state.roles
            listRolesUpdated.forEach((role, index, array) => {
                if (role.id === action.payload.id) {
                    array[index] = action.payload
                }
            })
            return {
                ...state,
                roles: [...listRolesUpdated]
            }
        }

        // Xóa vai trò
        case actions.DELETE_ROLE: {
            const listRolesDeleted = state.roles.filter(role => role.id !== action.payload)
            return {
                ...state,
                roles: [...listRolesDeleted]
            }
        }
        default:
            return { ...state }
    }
}

export default rolesReducer