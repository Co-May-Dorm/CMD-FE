import * as actions from "../constants/ActionTeam"

// Khởi tạo state
const initialState = {
    data: []
}

// Reducer quản lý danh sách CLB/Đội nhóm
const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
        // Lấy danh sách CLB/Đội nhóm
        case actions.FETCH_TEAMS: {
            state = action.payload
            return { ...state }
        }

        // Thêm CLB/Đội nhóm
        case actions.ADD_TEAM: {
            return {
                ...state,
                data: [...state.data, action.payload]
            }
        }

        // Cập nhật thông tin CLB/Đội nhóm
        case actions.UPDATE_TEAM: {
            const listteamsUpdated = state.data
            listteamsUpdated.forEach((team, index, array) => {
                if (team.id === action.payload.id) {
                    array[index] = action.payload
                }
            })
            return {
                ...state,
                data: [...listteamsUpdated]
            }
        }

        // Xóa CLB/Đội nhóm
        case actions.DELETE_TEAM: {
            const listteamsDeleted = state.data.filter(team => team.id !== action.payload)
            return {
                ...state,
                data: [...listteamsDeleted]
            }
        }
        default:
            return { ...state }
    }
}

export default teamsReducer