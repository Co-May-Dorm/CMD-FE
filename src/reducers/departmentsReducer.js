import * as actions from "../constants/ActionDepartment"

// Khởi tạo state
const initialState = {
    data: []
}

// Reducer quản lý danh sách phòng ban
const departmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Lấy danh sách phòng ban
        case actions.FETCH_DEPARTMENTS: {
            state = action.payload
            return { ...state }
        }

        // Thêm phòng ban
        case actions.ADD_DEPARTMENT: {
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        }

        // Cập nhật thông tin phòng ban
        case actions.UPDATE_DEPARTMENT: {
            const listDepartmentsUpdated = state.data
            listDepartmentsUpdated.forEach((department, index, array) => {
                if (department.id === action.payload.id) {
                    array[index] = action.payload
                }
            })
            return {
                ...state,
                data: [...listDepartmentsUpdated]
            }
        }

        // Xóa phòng ban
        case actions.DELETE_DEPARTMENT: {
            const listDepartmentsDeleted = state.data.filter(department => department.id !== action.payload)
            return {
                ...state,
                data: [...listDepartmentsDeleted]
            }
        }
        default:
            return { ...state }
    }
}

export default departmentsReducer