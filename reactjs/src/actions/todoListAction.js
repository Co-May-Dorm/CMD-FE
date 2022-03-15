import * as types from "../constants/ActionTask"
import todoListApi from '../api/todoListApi';
// Lấy danh sách công việc theo chỉ mục (lấy luôn dữ liệu trong action , không gọi api trong component)
export const dispatchLimitedTaskRequest = (data) => {
    // return (dispatch) => {
    //     const fetchTasksList = async () => {
    //         try {
    //             const response = await todoListApi.getTaskLimited(data)
    //             dispatch(dispatchTaskByFilterStatus(response))
    //         } catch (error) {
    //             console.log("Can not load...!", error)
    //         }
    //     }
    //     fetchTasksList()
    // }
}
// // // lấy luôn dữ liệu trong action , không gọi api trong component 
// export const getAllTaskRequest = () => {
//     return (dispatch) => {
//         const fetchTasksList = async () => {
//             try {
//                 const response = await todoListApi.getAllTask()//getTaskLimited() function using to load data task with data limited a page is 10 task
//                 dispatch(dispatchAllTask(response))
//             } catch (error) {
//                 console.log("Can not load...!", error)
//             }
//         }
//         fetchTasksList()
//     }
// }
// // luu danh sách các công việc vào store
// export const dispatchTaskByFilterStatus = (tasks) => { return { type: types.DISPATCH_TASK_BY_STATUS, tasks } }
// // // luu tat cac cac cong viec vao trong store
// export const dispatchAllTask = (tasks) => { return { type: types.DISPATCH_ALL_TASK, tasks } }
// // kiem tra da duoc render xong chua
// export const isRenderDone = () => { return { type: types.IS_RENDER_DONE } }//sua ngay 11/11/2021 tyqe sang type
// //them item vao mang cac item can loc
export const addItemNeedFilter = (item) => {
    //  return { type: types.ADD_ITEM_NEED_FILTER, item }
}
// // set so trang hien tai 
// export const numberPageCurrent = (numberPage) => { return { type: types.NUMBER_PAGE_CURRENT, numberPage } }
// // se thay doi trang thai đóng mở của form filter advanced
// export const isShowFilterAdvanced = () => { return { type: types.IS_SHOW_FILTER_ADVANCED } }
// // se thay doi trang thai đóng mở form tạo việc hay không
// export const isShowCreateTask = () => { return { type: types.IS_SHOW_CREATE_TASK } }
// //thay đổi trạng thái đóng mở của datepicker ngày bắt đầu lọc nâng cao
// export const showDateInputOfDateStart = () => { return { type: types.SHOW_DATE_INPUT_START_DATE } }
// //thay đổi trạng thái đóng mở của date picker của ngày kết thức lọc nâng cao
// export const showDateInputOfDateEnd = () => { return { type: types.SHOW_DATE_INPUT_END_DATE } }
// //cap nhat ngay bat dau cong viec cua bo loc nang cao
// export const updateDateStartFilterAdvanced = (date) => { return { type: types.UPDATE_DATE_START_FILTER_ADVANCED, date } }
// //cap nhat ngay ket thuc cong viec cua bo loc nang cao
// export const updateDateEndFilterAdvanced = (date) => { return { type: types.UPDATE_DATE_END_FILTER_ADVANCED, date } }
// //thay đôi trạng thái đóng mở cua ngay bat đau trong bộ lọc nâng cao
// export const showDetailTask = () => { return { type: types.IS_SHOW_DETAIL_TASK } }
// //lây chi tiết công việc
// export const getTaskDetailRequest = (params) => {
//     return (dispatch) => {
//         const fetchTasksDetail = async () => {
//             try {
//                 const response = await todoListApi.getDetailTask(params)
//                 dispatch(dispatchTaskDetail(response))
//             } catch (error) {
//                 console.log("Can not load...!", error)
//             }
//         }
//         fetchTasksDetail()
//     }
// }
// // luu chi tiet cong viec vua duoc goi vao store
// export const dispatchTaskDetail = (task) => { return { type: types.DISPATCH_TASK_DETAIL, task } }

// //hiển thị drop down menu
// export const showDropdownMenu = () => { return { type: types.SHOW_DROP_DOWN_MENU } }
// //select item dropdown menu
// export const selectedDropdownMenu = (item) => { return { type: types.SELECTED_DROP_DOWN_MENU, item } }
// //thoi điểm bắt đầu của một công việc mới khi tạo công việc
// export const timeStartNewTask = (date) => { return { type: types.TIME_START_NEW_TASK, date } }
// //thới điểm hoàn thành công việc của một công việc mới được tạo
// export const timeStartCompleteTask = (date) => { return { type: types.TIME_COMPLETE_NEW_START, date } }
// //thay đổi trạng thái đóng mở của datepicker của ngày bắt đầu của form tạo công việc mới
// export const showTimeStartNewTask = () => { return { type: types.SHOW_DATE_PICKER_START_NEW_TASK } }
// //thay đổi trạng thái đóng mở của datepicker của ngày kết thúc của một công việc mới
// export const showTimeCompleteNewTask = () => { return { type: types.SHOW_DATE_PICKER_COMPLETES_NEW_TASK } }
// // tao cong viec moi
// export const creatNewTask = (param) => {
//     return () => {
//         const newTask = async () => {
//             try {
//                 await todoListApi.newtTask(param)//newtTask() function using to load data task with data limited a page is 10 task
//             } catch (error) {
//                 console.log("Can not load...!", error)
//             }
//         }
//         newTask()
//     }
// }
// //tìm kiềm phòng ban
// export const searchDepartment = (params) => {
//     return (dispatch) => {
//         const fetchSearchByParams = async () => {
//             try {
//                 const response = await todoListApi.searchByParams(params)//getDetailTask() function using to load data task with data limited a page is 10 task
//                 dispatch(dispatchDepartmentSearch(response.data.data))
//             } catch (error) {
//                 console.log("Can not load...!", error)
//             }
//         }
//         fetchSearchByParams()
//     }
// }
// // luu nhung thong tin nhan vien theo search
// export const dispatchDepartmentSearch = (data) => { return { type: types.DISPATCH_DEPARTMENT_SEARCH, data } }
// // lấy luôn dữ liệu trong action , không gọi api trong component 
// export const dispatchFilterAdvanced = (data) => {
//     return (dispatch) => {
//         const fetchTasksList = async () => {
//             try {
//                 const response = await todoListApi.getTaskLimited(data)//getTaskLimited() function using to load data task with data limited a page is 10 task
//                 dispatch(dispatchTaskByFilterAdvanced(response))
//             } catch (error) {
//                 console.log("Can not load...!", error)
//             }
//         }
//         fetchTasksList()
//     }
// }
// // luu du lieu duoc loc vao store
// export const dispatchTaskByFilterAdvanced = (tasks) => { return { type: types.DISPATCH_TASK_BY_FILTER_ADVANCED, tasks } }
// //công cụ search theo params
// export const searchTask = (params) => {
//     return (dispatch) => {
//         const fetchSearchByParams = async () => {
//             try {
//                 const response = await todoListApi.searchByParams(params)//getDetailTask() function using to load data task with data limited a page is 10 task)
//                 dispatch(dispatchSearchTask(response.data))
//             } catch (error) {
//                 console.log("Can not load...!", error)
//             }
//         }
//         fetchSearchByParams()
//     }
// }
// // luu nhung cong viec duoc tim kiem
// export const dispatchSearchTask = (data) => { return { type: types.DISPATCH_TASK_SEARCH, data } }
// // thay đổi tên công việc ở ô tìm kiếm 
// export const changeNameTaskSearch = (nameTask) => { return { type: types.CHANGE_NAME_TASK_SEARCH, nameTask } }


//renew

//get request tasks
export const dispatchTaskRequest = (data) => {
    return (dispatch) => {
        const fetchTasksList = async () => {
            try {
                const response = await todoListApi.getTasks(data)
                dispatch(dispatchTasks(response))
            } catch (error) {
                console.log("Can not load...!", error)
            }
        }
        fetchTasksList()
    }
}
//dispatch tasks to todolist reducer
export const dispatchTasks = (tasks) => { return { type: types.DISPATCH_TASKS, tasks } }
//Date and time start when you create a new task
export const startDateNewTask = (date) => { return { type: types.START_DATE_NEW_TASK, date } }
//Date and time end task when you create a new task
export const endDateNewTask = (date) => { return { type: types.END_DATE_NEW_TASK, date } }
//tool search by params
export const search = (params) => {
    return dispatch => {
        const fetchSearchByParams = async () => {
            try {
                const response = await todoListApi.searchByParams(params[1])
                switch (params[0]) {
                    case "SEARCH_EMPLOYEES": {
                        dispatch(saveEmployeeSearch(response))
                        break;
                    }
                }
            } catch (error) {
                console.log("Can not load...!", error)
            }
        }
        fetchSearchByParams()
    }
}
// save data employees searched to store redux
export const saveEmployeeSearch = (data) => { return { type: types.SAVE_LIST_EMPLOYEE_SEARCH, data } }
// is show detail task
export const showDetailTask = () => { return { type: types.IS_SHOW_DETAIL_TASK } }
//get data detail a task
export const getTaskDetailRequest = (params) => {
    return (dispatch) => {
        const fetchTasksDetail = async () => {
            try {
                const response = await todoListApi.getDetailTask(params)
                await dispatch(dispatchTaskDetail(response))
            } catch (error) {
                console.log("Can not load...!", error)
            }
        }
        fetchTasksDetail()
    }
}
// dispatch detail task
export const dispatchTaskDetail = (task) => { return { type: types.DISPATCH_TASK_DETAIL, task } }
//get position modal option task
export const getPositionModalTask =(position)=>{return {type: types.GET_POSITION_MODAL_OPTION_TASK, position}}
// set so trang hien tai 
export const pageCurrent = (page) => { return { type: types.PAGE_CURRENT, page } }
