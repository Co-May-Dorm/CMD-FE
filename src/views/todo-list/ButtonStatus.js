import { useCallback, useMemo, useReducer, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as todoListAction from "../../actions/todoListAction"

const ButtonStatus = (props) => {
    const dispacth = useDispatch()
    const statusID = (indexStatus) => {
        switch (indexStatus) {
            case "Hoàn tất":
                return 1
            case "Bị từ chối":
                return 2
            case "Đã hủy":
                return 3
            case "Mới nhất":
                return 4
            case "Đang làm":
                return 5
            case "Chờ xác nhận":
                return 6
            case "Hoàn thành":
                return 7
            case "Qúa hạn":
                return 8
            case "Chờ":
                return 9
            case "Ưu tiên":
                return 10
        }
    }
    const listStatus = useSelector(state => state.TodoListReducer.collectionStatusFilter)
    // add status filter
    const addStatusFilter = async () => {
        const idStatus = statusID(props.nameStatus)
        const params = {
            statusIds: listStatus.includes(idStatus) ? listStatus.filter(item => item !== idStatus) : [...listStatus, idStatus],
        }
        await dispacth(todoListAction.addStatusFilter(idStatus))
        dispacth(todoListAction.dispatchFilter(params))
    }
    return (
        <div className="p-2 mx-auto ">
            <input type="checkbox" className="btn-check" id={props.id} autoComplete="off" />
            <label onClick={addStatusFilter} className="btn btn-outline-darkBlue btn-sm fs-7 fw-bold" htmlFor={props.id}>{props.nameStatus}</label><br />
        </div>
    )
}
export default ButtonStatus