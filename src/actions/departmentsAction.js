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
export const addDepartmentRequest = (department) => {
    departmentsApi.add(department)
        .then(() => {
            alert("Thêm phòng ban thành công! Nhấn OK để chuyển hướng...")
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

// Cập nhật thông tin của phòng ban
export const updateDepartmentRequest = (department) => {
    departmentsApi.update(department)
        .then(() => {
            alert("Chỉnh sửa thông tin phòng ban thành công! Nhấn OK để chuyển hướng...")
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

// Xóa phòng ban
export const deleteDepartmentRequest = (id) => {
    departmentsApi.delete(id)
        .then(() => {
            alert("Xóa phòng ban thành công! Nhấn OK để chuyển hướng...")
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