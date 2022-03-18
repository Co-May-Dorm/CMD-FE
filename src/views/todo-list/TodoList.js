import { BiSearchAlt } from "react-icons/bi";
import { BsFillBagPlusFill, BsFillFileEarmarkPostFill } from "react-icons/bs";
import { AiFillFilter } from "react-icons/ai";
import ButtonStatus from "./assigned-to-me/ButtonStatus";
import * as todoListAction from "../../actions/todoListAction"
import TaskItem from "./TaskItem";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import FilterAdvanced from "./FilterAdvanced"
import PaginationCustomize from "./PaginationCustomize";
import NewTask from "./NewTask";
import Detail from "./Detail";
const nameButtonStatus = ["Mới nhất", "Cũ nhất", "Đang làm", "Hoàn thành", "Ưu tiên", "Chờ xác nhận", "Qúa hạn", "Đã hủy"]
const TodoList = () => {
    const dispacth = useDispatch()
    const page = useSelector(state => state.TodoListReducer.pageCurrent)
    const filter = useSelector(state => state.TodoListReducer.filter)
    const [modalNewTask, showModalNewTask] = useState(false)
    const [modalFilterTask, showModalFilterTask] = useState(false)
    // get task
    const tasks = useSelector(state => state.TodoListReducer.tasks)
    const positionModalOption = useSelector(state => state.TodoListReducer.posionModalOption)
    // is show detail task
    const isShowDetailTask = useSelector(state => state.TodoListReducer.isShowDetailTask)
    useEffect(() => {
        dispacth(todoListAction.dispatchTaskRequest({ page, filter }))
    }, [page, filter])
    const closeDetailTask = () => {
        const request = todoListAction.showDetailTask()
        dispacth(request)
    }
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex justify-content-between ps-4 pe-4">
                    <div className="col">
                        <h3 className="fw-bigBold">DANH SÁCH CÔNG VIỆC</h3>
                    </div>
                    <div className="col">
                        <div className="d-flex justify-content-center h-80">
                            <div className="d-inline-flex form-control" style={{ borderRadius: "4px" }}>
                                <BiSearchAlt className="mx-auto h-100" size={20} />
                                <input className="w-100" type="search" style={{ border: "none", outline: "none", color: "#2F6BB1", fontSize: "14px" }} placeholder="" />
                            </div>
                            <button type="button" className="btn btn-primary btn-sm fw-bigBold ms-2" style={{ whiteSpace: "nowrap" }}>Tìm kiếm</button>
                        </div>
                    </div>
                    <div className="col">
                        <div className="d-flex justify-content-evenly">
                            <div className="mx-1">
                                <button type="button" className="btn btn-sm fs-5 fw-bold" onClick={() => showModalNewTask(true)} data-mdb-ripple-color="dark"><BsFillBagPlusFill size={20} /> Tạo việc</button>
                            </div>
                            <div className="mx-1">
                                <button type="button" className="btn btn-sm fs-5 fw-bold" onClick={() => showModalFilterTask(true)} data-mdb-ripple-color="dark"><BsFillFileEarmarkPostFill size={20} />Báo cáo</button>
                            </div>
                            <div className="mx-1">
                                <button type="button" className="btn btn-sm fs-5 fw-bold" data-mdb-ripple-color="dark"><AiFillFilter size={20} /> Bộ lọc</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row p-4 d-flex flex-row">
                    <div className="d-flex flex-row mb-3" >
                        <div className="p-2 mx-auto">
                            <input type="radio" className="btn-check" name="options-outlined" id="all-outline" autoComplete="off" defaultChecked />
                            <label className="btn btn-outline-primary btn-sm fs-7 fw-bold" htmlFor="all-outline">Tất cả</label>
                        </div>
                        <div className="p-2 mx-auto">
                            <input type="radio" className="btn-check" name="options-outlined" id="mine-outlined" autoComplete="off" />
                            <label className="btn btn-outline-primary btn-sm fs-7 fw-bold" htmlFor="mine-outlined">Của tôi</label>
                        </div>
                        {
                            //render button status
                            nameButtonStatus.map((item, id) => <ButtonStatus key={id} id={id} nameStatus={item} />)
                        }
                        <div className="p-2 mx-auto">
                            <label style={{ whiteSpace: "nowrap" }} className="fs-5 fw-bold">Tổng : 145</label>
                        </div>
                    </div>
                </div>
                <div className="row ms-4 me-4">
                    <div className="col-4 space--nowrap ms-5">
                        <span style={{ fontSize: "11px" }} className="fw-bigBold fs-7">TÊN CÔNG VIỆC</span>
                    </div>
                    <div className="col-1"><span className="fw-bigBold fs-7 space--nowrap" style={{ fontSize: "11px" }}>NGƯỜI GIAO</span></div>
                    <div className="col-1"><span className="fw-bigBold fs-7 space--nowrap" style={{ fontSize: "11px" }}>NGƯỜI LÀM</span></div>
                    <div className="col-2 position-relative me-5"><span className="fw-bigBold fs-7 position-absolute top-50 end-0 translate-middle-y" style={{ fontSize: "11px" }}>THỜI GIAN</span></div>
                    <div className="col-1 position-relative ms-5"><span className="fw-bigBold fs-7 position-absolute top-50 end-0 translate-middle-y" style={{ fontSize: "11px" }}>TÌNH TRẠNG</span></div>
                    <div className="col-1 position-relative ms-2"><span className="fw-bigBold fs-7 position-absolute top-50 end-0 translate-middle-y" style={{ fontSize: "11px" }}>ĐÁNH GIÁ</span></div>
                </div>
                <div className="d-flex flex-column">
                    {tasks.map((item, key) => <TaskItem key={key} name={item.title} id={item.taskId}
                        //  avartarCreater={item.employees.avatar} avartarEmployee={item.employees.avatar}
                        nameCreater={item.creatorName} nameEmployee={item.recieverName} status={item.statusName}
                    // properties={item.properties} 
                    />
                    )
                    }
                </div>
                <div className="row">
                    <PaginationCustomize />
                </div>
            </div>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <NewTask show={modalNewTask} onHide={() => showModalNewTask(false)} />
                {/* {renderDetailTask()} */}
                <Detail show={isShowDetailTask} onHide={closeDetailTask} />
                <FilterAdvanced show={modalFilterTask} onHide={() => showModalFilterTask(false)} />
            </div>
        </>
    );
}
export default TodoList