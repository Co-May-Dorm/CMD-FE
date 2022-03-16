import rolesApi from '../api/rolesApi'
import * as actions from '../constants/ActionRole'

// Lấy danh sách vai trò
export const fetchRoles = (roles) => {
    return {
        type: actions.FETCH_ROLES,
        payload: roles
    }
}
export const fetchRolesRequest = (params) => {
    return (dispatch) => {
        rolesApi.getAll(params)
            .then(response => {
                dispatch(fetchRoles(response.data.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Thêm vai trò
export const addRole = (role) => {
    return {
        type: actions.ADD_ROLE,
        payload: role
    }
}
export const addRoleRequest = (role) => {
    return (dispatch) => {
        rolesApi.add(role)
            .then(response => {
                dispatch(addRole(response.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Cập nhật thông tin của vai trò
export const updateRole = (role) => {
    return {
        type: actions.UPDATE_ROLE,
        payload: role
    }
}
export const updateRoleRequest = (role) => {
    return (dispatch) => {
        rolesApi.update(role)
            .then(response => {
                dispatch(updateRole(response.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Xóa vai trò
export const deleteRole = (id) => {
    return {
        type: actions.DELETE_ROLE,
        payload: id
    }
}
export const deleteRoleRequest = (id) => {
    return (dispatch) => {
        rolesApi.delete(id)
        .then(() => {
            dispatch(deleteRole(id))
        })
        .catch(error => {
            alert(error)
            console.log(error)
        })
    }
}
//