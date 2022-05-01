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
                dispatch(addEmployee(response.data.data))
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
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
    }
}
//

// Xóa nhân viên
export const deleteEmployee = (employeeId) => {
    return {
        type: actions.DELETE_EMPLOYEE,
        payload: employeeId
    }
}
export const deleteEmployeeRequest = (employeeId) => {
    return (dispatch) => {
        employeesApi.delete(employeeId)
            .then(() => {
                dispatch(deleteEmployee(employeeId))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//