
import * as types from "../constants/ActionTask"

let initialState = {
    // listTaskFilter: undefined, isRenderDone: false, itemNeedFilter: [], numberCurrent: 1, allTask: 0
    // , isShowFilterAdvanced: false, isShowDetailTask: false, isShowCreateTask: false, dateStartDateInput: false,
    // dateEndDateInput: false, dateStartFilterAdvanced: null,
    // dateEndFilterAdvanced: null, taskDetail: null, listEmployeeSearch: [], showDropDownMenu: false,
    // selectedDropdown: null, timeStartNewStart: null, timeCompleteNewStask: null
    // , showDatePickerStartNewTask: false, showDatePickerCompleteNewTask: false, department: [], itemNeedFilterAdvanced: []
    // , nameTaskSearch:null
    tasks: [], totalTask: 0, startDateNewTask: null, endDateNewTask: null, listEmployeeSearch: [],
    taskDetail: {}, posionModalOption: {}, pageCurrent: 1, filter: {}, startDateFilterTask: null, endDateFilterTask: null
};
// const todoListReducer = (state = initialState, action) => {
//     switch (action.type) {
//         // dispatch tat ca cac cong viec
//         case types.DISPATCH_TASK_BY_STATUS:{
//             return { ...state, listTaskFilter: action.tasks.data.data, allTask: action.tasks.data.pagination._totalItem };
//         }
//         case types.DISPATCH_ALL_TASK:
//             return { ...state, allTask: action.tasks };
//         // dung de kiem tra da render xong chưa
//         case types.IS_RENDER_DONE:
//             return { ...state, isRenderDone: !state.isRenderDone };
//         // them mot item vao bo loc cac trang thai
//         case types.ADD_ITEM_NEED_FILTER:
//             let isContant = false;
//             state.itemNeedFilter.forEach(element => {
//                 if (element === action.item) {
//                     isContant = true;
//                 }
//             });
//             //neu no chua thi xoa no di
//             if (isContant) {
//                 let arrayAfterRemove = [];
//                 state.itemNeedFilter.forEach(element => {
//                     if (element !== action.item) {
//                         arrayAfterRemove.push(element)
//                     }
//                 });
//                 return { ...state, itemNeedFilter: arrayAfterRemove }
//             }//neu no khong chua thi them no vao
//             else {
//                 return { ...state, itemNeedFilter: state.itemNeedFilter.concat(action.item) }
//             }
//         // set lai so trang hien tai
//         case types.NUMBER_PAGE_CURRENT:
//             return { ...state, numberCurrent: action.numberPage }
//         //co show bo loc nang cao khong
//         case types.IS_SHOW_FILTER_ADVANCED:
//             return { ...state, isShowFilterAdvanced: !state.isShowFilterAdvanced }
//         //co show bo loc nang cao khong
//         case types.IS_SHOW_DETAIL_TASK:
//             return { ...state, isShowDetailTask: !state.isShowDetailTask }
//         //co show form tao viec hay khong
//         case types.IS_SHOW_CREATE_TASK:
//             return { ...state, isShowCreateTask: !state.isShowCreateTask }
//         //show input start state (advanced filter)
//         case types.SHOW_DATE_INPUT_START_DATE:
//             return { ...state, dateStartDateInput: !state.dateStartDateInput }
//         //show input end state (advanced filter)
//         case types.SHOW_DATE_INPUT_END_DATE:
//             return { ...state, dateEndDateInput: !state.dateEndDateInput }
//         //cap nhat ngay bat dau cong viec cua bo loc nang cao
//         case types.UPDATE_DATE_START_FILTER_ADVANCED:
//             // console.log(action.date)
//             return { ...state, dateStartFilterAdvanced: action.date }
//         //cap nhat ngay ket thuc cong viec cua bo loc nang cao
//         case types.UPDATE_DATE_END_FILTER_ADVANCED:
//             return { ...state, dateEndFilterAdvanced: action.date }
//         // dispatch chi tiet 1 cong viec
//         case types.DISPATCH_TASK_DETAIL:
//             return { ...state, taskDetail: action.task };
//         // dispatch danh sach nhan vien duoc tim kiem
//         case types.DISPATCH_LIST_EMPLOYEE_SEARCH:
//             return { ...state, listEmployeeSearch: action.data.data };
//         //hiển thị dropdown menu
//         case types.SHOW_DROP_DOWN_MENU:
//             return { ...state, showDropDownMenu: !state.showDropDownMenu }
//         //selected dropdown menu
//         case types.SELECTED_DROP_DOWN_MENU:
//             return { ...state, selectedDropdown: action.item }
//         //thoi gain bat dau cua mot cong viec moi
//         case types.TIME_START_NEW_TASK:
//             return { ...state, timeStartNewStart: action.date }
//         //thoi gian hoan thanh mot cong viec moi
//         case types.TIME_COMPLETE_NEW_START:
//             return { ...state, timeCompleteNewStask: action.date }
//         //show date picker thoi gian bat dau mot cong viec moi
//         case types.SHOW_DATE_PICKER_START_NEW_TASK:
//             return { ...state, showDatePickerStartNewTask: !state.showDatePickerStartNewTask }
//         //show date picker thoi gian hoan thanh mot cong viec moi
//         case types.SHOW_DATE_PICKER_COMPLETES_NEW_TASK:
//             return { ...state, showDatePickerCompleteNewTask: !state.showDatePickerCompleteNewTask }
//         // dispatch danh sach nhan vien duoc tim kiem
//         case types.DISPATCH_DEPARTMENT_SEARCH:
//             return { ...state, department: action.data };
//         // dispatch cong viec tiem kiem
//         case types.DISPATCH_TASK_SEARCH: {
//             return { ...state, listTaskFilter: action.data.data , allTask: action.data.pagination._totalItem };
//         }
//         // dispatch tat ca cac cong viec
//         case types.DISPATCH_TASK_BY_FILTER_ADVANCED:
//             return { ...state, listTaskFilter: action.tasks.data.data, allTask: action.tasks.data.pagination._totalItem  };
//             case types.CHANGE_NAME_TASK_SEARCH:
//                 return { ...state, } 
//         default:
//             return state;

//     }
// }



const todoListReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.DISPATCH_TASKS: {
            return {
                ...state, tasks: action.tasks.data.data.tasks,
                totalTask: action.tasks.data.data.pagination.totalItem
            };
        }
        case types.START_DATE_NEW_TASK: {
            var date = action.date.slice(0, 10)
            var moment = action.date.slice(11)
            var d = new Date(moment), hour = d.getHours(), min = d.getMinutes();
            return { ...state, startDateNewTask: date + " " + [hour, min].join(":") }
        }
        case types.END_DATE_NEW_TASK: {
            var date = action.date.slice(0, 10)
            var moment = action.date.slice(11)
            var d = new Date(moment), hour = d.getHours(), min = d.getMinutes();
            return { ...state, endDateNewTask: date + " " + [hour, min].join(":") }
        }
        case types.SAVE_LIST_EMPLOYEE_SEARCH: {
            return { ...state, listEmployeeSearch: action.data.data.data }
        }
        case types.IS_SHOW_DETAIL_TASK: {
            return { ...state, isShowDetailTask: !state.isShowDetailTask }
        }
        case types.DISPATCH_TASK_DETAIL: {
            return { ...state, taskDetail: action.task.data.data[0] }
        }
        case types.GET_POSITION_MODAL_OPTION_TASK: {
            return { ...state, posionModalOption: action.position }
        }
        //  set lai so trang hien tai
        case types.PAGE_CURRENT:{
            return { ...state, pageCurrent: action.page }
        }
        case types.START_DATE_FILTER:{
            var date = action.date.slice(0, 10)
            var moment = action.date.slice(11)
            var d = new Date(moment), hour = d.getHours(), min = d.getMinutes();
            return { ...state , startDateFilterTask: date + " " + [hour, min].join(":") }
        }
        case types.END_DATE_FILTER:{
            var date = action.date.slice(0, 10)
            var moment = action.date.slice(11)
            var d = new Date(moment), hour = d.getHours(), min = d.getMinutes();
            return { ...state , endDateFilterTask: date + " " + [hour, min].join(":") }
        }
        default:
            return state;
    }

}

export default todoListReducer;