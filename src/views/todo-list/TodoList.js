import { BiSearchAlt } from "react-icons/bi";
import { BsFillBagPlusFill, BsFillFileEarmarkPostFill } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io"
import { AiFillFilter, AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import ButtonStatus from "./assigned-to-me/ButtonStatus";
import * as todoListAction from "../../actions/todoListAction"
import TaskItem from "./TaskItem";
import { useState, useEffect, useLayoutEffect } from "react";
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
    const [sizeWindown, setSizeWindown] = useState([0, 0])//size windown
    let [counterName, setCounterName] = useState(0);
    // get task
    const tasks = useSelector(state => state.TodoListReducer.tasks)
    // const positionModalOption = useSelector(state => state.TodoListReducer.posionModalOption)
    // is show detail task
    const isShowDetailTask = useSelector(state => state.TodoListReducer.isShowDetailTask)
    useEffect(() => {
        dispacth(todoListAction.dispatchTaskRequest({ page, filter }))
    }, [page, filter])
    const closeDetailTask = () => {
        const request = todoListAction.showDetailTask()
        dispacth(request)
    }
    // active when layout effected
    useLayoutEffect(() => {
        const updateSize = () => {
            setSizeWindown([window.innerWidth, window.innerHeight])
        }
        window.addEventListener("resize", updateSize)
        updateSize()
        return () => window.removeEventListener("resize", updateSize)
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex justify-content-between ps-4 pe-4">
                    <div className="col-sm">
                        <h3 className="fw-bigBold mx-auto">DANH SÁCH CÔNG VIỆC</h3>
                    </div>
                    <div className="col-sm">
                        <div className="d-flex justify-content-center">
                            <div className="d-inline-flex form-control" style={{ borderRadius: "4px" }}>
                                <BiSearchAlt className="mx-auto h-100" size={20} />
                                <input className="w-100" type="search" style={{ border: "none", outline: "none", color: "#2F6BB1", fontSize: "14px" }} placeholder="" />
                            </div>
                            <button type="button" className="btn btn-primary btn-sm fw-bigBold ms-2" style={{ whiteSpace: "nowrap" }}>Tìm kiếm</button>
                        </div>
                    </div>
                    <div className="col-sm">
                        {sizeWindown[0] < 1060 ? <div className="d-flex justify-content-evenly"> <button className=" btn btn-outline-primary fw-bold shadow-button">Tùy chọn <IoIosArrowDropdown size={25} /></button></div> :
                            <div className="d-flex justify-content-evenly">
                                <button type="button" className="btn btn-sm fs-5 fw-bold d-flex" onClick={() => showModalNewTask(true)} data-mdb-ripple-color="dark"><BsFillBagPlusFill size={20} /> Tạo việc</button>
                                <button type="button" className="btn btn-sm fs-5 fw-bold" data-mdb-ripple-color="dark"><BsFillFileEarmarkPostFill size={20} />Báo cáo</button>
                                <button type="button" className="btn btn-sm fs-5 fw-bold" onClick={() => showModalFilterTask(true)} data-mdb-ripple-color="dark"><AiFillFilter size={20} /> Bộ lọc</button>
                            </div>
                        }
                    </div>
                </div>
                <div className="d-flex flex-wrap mb-3">
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
                {sizeWindown[0] > 1000 ?
                    <div className="row mx-auto">
                        <div className="col-4 ms-5 ps-3">
                            <span onClick={() => setCounterName(
                                counterName === 1 ? 0 : counterName++
                            )} className="fw-bigBold fs-9">TÊN CÔNG VIỆC</span>
                            {/* {counterName === 0 ? <AiOutlineSortAscending size={20} /> : <AiOutlineSortDescending size={20} />} */}
                        </div>
                        <div className="col-1 fw-bigBold fs-9 p-0 m-0 text-center">NGƯỜI GIAO</div>
                        <div className="col-1 fw-bigBold fs-9 p-0 m-0 text-center">NGƯỜI LÀM</div>
                        <div className="col-sm-2 fw-bigBold fs-9 text-center">THỜI GIAN</div>
                        <div className="col-sm-1 fw-bigBold fs-9 text-end p-0">TÌNH TRẠNG</div>
                        <div className="col-sm-2 fw-bigBold fs-9">ĐÁNH GIÁ</div>
                    </div>
                    : null}
                <div className="d-flex flex-column">
                    {tasks.map((item, key) => <TaskItem key={key} name={item.title} id={item.id}
                        //  avartarCreater={item.employees.avatar} avartarEmployee={item.employees.avatar}
                        nameCreater={item.creatorName} nameEmployee={item.recieverName} status={item.statusName}
                    createDate={item.createDate} finishDate={item.finishDate}
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