import departmentsApi from '../api/departmentsApi'
import * as actions from '../constants/ActionDepartment'

// Lấy danh sách phòng ban
export const fetchDepartments = (departments) => {
    return {
        type: actions.FETCH_DEPARTMENTS,
        payload: departments
    }
}
export const fetchDepartmentsRequest = (params) => {
    return (dispatch) => {
        departmentsApi.getAll(params)
            .then(response => {
                dispatch(fetchDepartments(response.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Thêm phòng ban
export const addDepartment = (department) => {
    return {
        type: actions.ADD_DEPARTMENT,
        payload: department
    }
}
export const addDepartmentRequest = (department) => {
    return (dispatch) => {
        departmentsApi.add(department)
            .then(response => {
                dispatch(addDepartment(response.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Cập nhật thông tin của phòng ban
export const updateDepartment = (department) => {
    return {
        type: actions.UPDATE_DEPARTMENT,
        payload: department
    }
}
export const updateDepartmentRequest = (department) => {
    return (dispatch) => {
        departmentsApi.update(department)
            .then(response => {
                dispatch(updateDepartment(response.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Xóa phòng ban
export const deleteDepartment = (id) => {
    return {
        type: actions.DELETE_DEPARTMENT,
        payload: id
    }
}
export const deleteDepartmentRequest = (id) => {
    return (dispatch) => {
        departmentsApi.delete(id)
        .then(() => {
            dispatch(deleteDepartment(id))
        })
        .catch(error => {
            alert(error)
            console.log(error)
        })
    }
}
//