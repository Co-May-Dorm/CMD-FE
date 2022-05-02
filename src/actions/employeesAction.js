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
export const addEmployeeRequest = (employee) => {
    employeesApi.add(employee)
        .then(() => {
            alert("Thêm sinh viên thành công! Nhấn OK để chuyển hướng...")
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

// Cập nhật thông tin của nhân viên
export const updateEmployeeRequest = (employee) => {
    employeesApi.update(employee)
        .then(response => {
            alert("Chỉnh sửa thông tin sinh viên thành công! Nhấn OK để chuyển hướng...")
            setTimeout(() => {
                window.location.reload()
            }, 0)
        })
        .then(() => {
            alert("Chỉnh sửa thông tin của sinh viên ")
        })
        .catch((error) => {
            alert(error)
            console.log(error)
        })
}
//

// Xóa nhân viên
export const deleteEmployeeRequest = (employeeId) => {
    employeesApi.delete(employeeId)
        .then(() => {
            alert("Xóa sinh viên thành công! Nhấn OK để chuyển hướng...")
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