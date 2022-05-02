import teamsApi from '../api/teamsApi'
import * as actions from '../constants/ActionTeam'

// Lấy danh sách CLB/Đội nhóm
export const fetchTeams = (teams) => {
    return {
        type: actions.FETCH_TEAMS,
        payload: teams
    }
}
export const fetchTeamsRequest = (params) => {
    return (dispatch) => {
        teamsApi.getAll(params)
            .then(response => {
                dispatch(fetchTeams(response.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Thêm CLB/Đội nhóm
export const addTeamRequest = (team) => {
    teamsApi.add(team)
        .then(response => {
            alert("Thêm CLB/Đội nhóm thành công! Nhấn OK để chuyển hướng...")
            setTimeout(() => {
                window.location.reload()
            }, 0)
        })
        .catch(error => {
            alert(error)
            console.log(error)
        })
}
//

// Cập nhật thông tin của CLB/Đội nhóm
export const updateTeam = (team) => {
    return {
        type: actions.UPDATE_TEAM,
        payload: team
    }
}
export const updateTeamRequest = (team) => {
    teamsApi.update(team)
        .then(response => {
            alert("Chỉnh sửa thông tin CLB/Đội nhóm thành công! Nhấn OK để chuyển hướng...")
            setTimeout(() => {
                window.location.reload()
            }, 0)
        })
        .catch(error => {
            alert(error)
            console.log(error)
        })
}
//

// Xóa CLB/Đội nhóm
export const deleteTeamRequest = (id) => {
    teamsApi.delete(id)
        .then(() => {
            alert("Xóa CLB/Đội nhóm thành công! Nhấn OK để chuyển hướng...")
            setTimeout(() => {
                window.location.reload()
            }, 0)
        })
        .catch(error => {
            alert(error)
            console.log(error)
        })
}
//