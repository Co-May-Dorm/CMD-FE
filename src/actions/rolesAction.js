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
export const addRoleRequest = (role) => {
    rolesApi.add(role)
        .then(response => {
            alert("Thêm vai trò thành công! Nhấn OK để chuyển hướng...")
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

// Cập nhật thông tin của vai trò
export const updateRoleRequest = (role) => {
    rolesApi.update(role)
        .then(response => {
            alert("Chỉnh sửa thông tin của vai trò thành công! Nhấn OK để chuyển hướng...")
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

// Xóa vai trò
export const deleteRoleRequest = (id) => {
    rolesApi.delete(id)
        .then(() => {
            alert("Xóa vai trò thành công! Nhấn OK để chuyển hướng...")
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