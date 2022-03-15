import employeesApi from '../api/employeesApi'
import * as actions from '../constants/ActionEmployee'

// Lấy danh sách nhân viên
export const fetchEmployees = (employees) => {
    return {
        type: actions.FETCH_EMPLOYEES,
        payload: employees
    }
}
export const fetchEmployeesRequest = (params) => {
    return (dispatch) => {
        employeesApi.getAll(params)
            .then(response => {
                dispatch(fetchEmployees(response.data.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Thêm nhân viên
export const addEmployee = (employee) => {
    return {
        type: actions.ADD_EMPLOYEE,
        payload: employee
    }
}
export const addEmployeeRequest = (employee) => {
    return (dispatch) => {
        employeesApi.add(employee)
            .then(response => {
                dispatch(addEmployee(response.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Cập nhật thông tin của nhân viên
export const updateEmployee = (employee) => {
    return {
        type: actions.UPDATE_EMPLOYEE,
        payload: employee
    }
}
export const updateEmployeeRequest = (employee) => {
    return (dispatch) => {
        employeesApi.update(employee)
            .then(response => {
                dispatch(updateEmployee(response.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Xóa nhân viên
export const deleteEmployee = (id) => {
    return {
        type: actions.DELETE_EMPLOYEE,
        payload: id
    }
}
export const deleteEmployeeRequest = (id) => {
    return (dispatch) => {
        employeesApi.delete(id)
        .then(() => {
            dispatch(deleteEmployee(id))
        })
        .catch(error => {
            alert(error)
            console.log(error)
        })
    }
}
//