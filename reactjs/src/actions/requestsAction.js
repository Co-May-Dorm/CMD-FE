import requestsApi from '../api/requestsApi'
import * as actions from '../constants/ActionRequest'

// Lấy danh sách đề xuất
export const fetchRequests = (requests) => {
    return {
        type: actions.FETCH_REQUESTS,
        payload: requests
    }
}
export const fetchRequestsRequest = (params) => {
    return (dispatch) => {
        requestsApi.getAll(params)
            .then(response => {
                dispatch(fetchRequests(response.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Thêm đề xuất
export const addRequest = (request) => {
    return {
        type: actions.ADD_REQUEST,
        payload: request
    }
}
export const addRequestRequest = (request) => {
    return (dispatch) => {
        requestsApi.add(request)
            .then(response => {
                dispatch(addRequest(response.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Cập nhật thông tin của đề xuất
export const updateRequest = (request) => {
    return {
        type: actions.UPDATE_REQUEST,
        payload: request
    }
}
export const updateRequestRequest = (request) => {
    return (dispatch) => {
        requestsApi.update(request)
            .then(response => {
                dispatch(updateRequest(response.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Xóa đề xuất
export const deleteRequest = (id) => {
    return {
        type: actions.DELETE_REQUEST,
        payload: id
    }
}
export const deleteRequestRequest = (id) => {
    return (dispatch) => {
        requestsApi.delete(id)
        .then(() => {
            dispatch(deleteRequest(id))
        })
        .catch(error => {
            alert(error)
            console.log(error)
        })
    }
}
//