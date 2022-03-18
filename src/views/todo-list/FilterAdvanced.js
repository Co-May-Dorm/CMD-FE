import { Modal, Button } from "react-bootstrap"
import { IoMdArrowDropdown } from "react-icons/io"
import { BiReset } from "react-icons/bi"
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import DateInput from "./DateInput";
import * as constants from "../../constants/ActionTask"
const nameButtonStatus = ["Mới nhất", "Cũ nhất", "Đang làm", "Hoàn thành", "Ưu tiên", "Chờ xác nhận", "Qúa hạn", "Đã hủy"]
const FilterAdvanced = (props) => {
    const dispacth = useDispatch()
    const days = useRef(null)
    const [showDateStartFilter, setShowDateStartFilter] = useState(false)
    const [showDateEndFilter, setShowDateEndFilter] = useState(false)
    const [showTypeTasks, setShowTypeTasks] = useState(false)
    const [typeTask, setTypeTask] = useState(null)
    const startDateFilter = useSelector(state => state.TodoListReducer.startDateFilterTask)
    const endDateFilter = useSelector(state => state.TodoListReducer.endDateFilterTask)
    // showTypeTask: false, typeTask: null, showPriority: false, typePriority: null
    // , showStatus: false, typeStatus: [], showAssignedPerson: false, employeeCurrent: null, showInvolveEployee: false, involveEployee: []
    // , showCreator: false, creator: null, showDepartment: false, department: null
    // showStartDateInput = () => {
    //     this.props.showDateInputStart()
    // }
    // showEndDateInput = () => {
    //     this.props.showDateInputEnd()
    // }
    // closeForm = () => {
    //     this.props.isShowFilterAdvanced()
    // }
    // showTypeTask = () => this.setState({ showTypeTask: !this.state.showTypeTask })
    // changeTypeTask = (type) => this.setState({ typeTask: type })
    // showPriority = () => this.setState({ showPriority: !this.state.showPriority })
    // changeTypePriority = (status) => this.setState({ typePriority: status })
    // showStatus = () => this.setState({ showStatus: !this.state.showStatus })
    // changeStatus = async (status) => {
    //     await this.props.addItemFilter(status)
    // }
    // showAssignedPerson = () => this.setState({ showAssignedPerson: !this.state.showAssignedPerson })
    // showInvolveEployee = () => this.setState({ showInvolveEployee: !this.state.showInvolveEployee })
    // showCreator = () => this.setState({ showCreator: !this.state.showCreator })
    // showDepartment = () => this.setState({ showDepartment: !this.state.showDepartment })
    // //chọn nhân viên liên quan được chọn
    // selectedInvolveEployee = (item) => this.setState({ involveEployee: this.state.involveEployee.concat(item) })
    // //dung de render danh sach nhan vien khi nhap vao o tim kiem nhan vien
    // renderListEmployee = (callback) => {
    //     if (this.props.status.listEmployeeSearch.length === 0) {
    //         return <li className="vs__no-options">
    //             Gõ tên nhân viên, phòng ban, chức vụ để tìm kiếm.
    //         </li>
    //     }
    //     //vs__dropdown-option--highlight
    //     return this.props.status.listEmployeeSearch.map((item, id) => <li onClick={() => callback(item)} role="option" id={`vs1__option-${id}`} className="vs__dropdown-option"
    //         aria-selected="true">
    //         <div>
    //             <div class="inline-block">
    //                 <i class="nucleo nucleo-single-01-2 mr-1"></i>
    //             </div>
    //             {item.nameEmployee} ({item.id})
    //         </div>
    //     </li>)
    // }
    // //dung de render danh sach nhan vien khi nhap vao o tim kiem nhan vien
    // renderDepartment = (callback) => {
    //     if (this.props.status.department.length === 0) {
    //         return
    //     }
    //     //vs__dropdown-option--highlight
    //     return this.props.status.department.map((item, id) => <li onClick={() => callback(item)} role="option" id={`vs1__option-${id}`} className="vs__dropdown-option"
    //         aria-selected="true">
    //         <div>
    //             <div class="inline-block">
    //                 <i class="nucleo nucleo-single-01-2 mr-1"></i>
    //             </div>
    //             {item.name}
    //         </div>
    //     </li>)
    // }
    // //render employee selected
    // renderEmployeeSelected = (item) => {
    //     if (item !== null) {
    //         return <span className="vs__selected">
    //             <div className="inline-block">
    //                 <i className="nucleo nucleo-single-01-2 mr-1" />
    //             </div>
    //             {
    //                 !Array.isArray(item) ? <p>[{item.nameEmployee}]</p> : item.map(i => <p>[{i.nameEmployee === undefined ? i : i.nameEmployee}]</p>)
    //             }
    //             <button type="button" title="Deselect [Tất cả nhân viên]" aria-label="Deselect [Tất cả nhân viên]" className="vs__deselect">
    //                 <span className="feather-icon select-none relative">
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x w-4 h-4 mt-1">
    //                         <line x1={18} y1={6} x2={6} y2={18} />
    //                         <line x1={6} y1={6} x2={18} y2={18} />
    //                     </svg>
    //                 </span>
    //             </button>
    //         </span>
    //     }
    // }
    // //chọn phần tử được chọn trong danh sách nhân viên
    // selectedItem = (item) => this.setState({ employeeCurrent: item })
    // //chọn phần tử được chọn trong danh sách nhân viên
    // selectedDepartment = (item) => this.setState({ department: item })
    // //chọn phần tử được chọn trong danh sách nhân viên
    // selectedCreator = (item) => this.setState({ creator: item })
    // //dung de lay thong tin tim kiem moi khi noi dung trong input thay doi
    // changeInforSearch = (e) => {
    //     this.props.searchListEmployee({ object: "employees", contain: "nameEmployee_like", key: e.target.value })
    // }
    // //dung de lay thong tin tim kiem moi khi noi dung trong input thay doi
    // changeInforDepartment = (e) => {
    //     this.props.searchDepartment({ object: "departments", contain: "name_like", key: e.target.value })
    // }
    // filter = () => {
    //     let dateStart = "&dateStart" + this.props.status.dateStartFilterAdvanced
    //     let dateEnd = "&dateEnd" + this.props.status.dateEndFilterAdvanced
    //     let typeTask = "&" + this.state.typeTask
    //     let prioritizeTask = "&prioritizeTask=" + this.state.typePriority
    //     let employee = this.state.employeeCurrent
    //     let cretor = "&creator_id=" + this.state.creator.id
    //     let involveEployee = "&" + this.state.involveEployee
    //     let department = "&" + this.state.department
    //     let data = { page: 1, filter: this.props.status.itemNeedFilter, advanced: [cretor, prioritizeTask] }
    //     this.props.getTaskByFilterAdvanced(data)
    //     this.closeForm()
    // }
    const s = (e) => {
        console.log(e)
        console.log(days)
        const d = days.current.scrollHeight
        console.log(d)
    }
    const clickTypeTask=(typeTask)=>{
        setShowTypeTasks()
        setTypeTask(typeTask)
    }
    return (
        <>
            <Modal scrollable show={props.show}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            // onExit={dispatchDateNewTask}
            >
                <Modal.Header closeButton className="text-center">
                    <Modal.Title id="contained-modal-title-vcenter" className="w-100" >
                        <h3 className="fw-bold w-100 mb-0"> BỘ LỌC</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row mt-2 mb-2">
                        <div className="col-sm">
                            <h3>Thời gian bắt đầu:</h3>
                            <div className="form-control d-flex flex-row position-relative">
                                <input readOnly value={startDateFilter} onClick={() => setShowDateStartFilter(!showDateStartFilter)} className="styleInp"></input>
                                <IoMdArrowDropdown className={`${0 ? "rolated-top" : "rolated-bottom"}`} size={25} />
                            </div>
                        </div>
                        <div className="col-sm">
                            <h3>Dự kiến kết thúc:</h3>
                            <div className="form-control d-flex flex-row">
                                <input readOnly onClick={() => setShowDateEndFilter(!showDateEndFilter)} value={endDateFilter} className="styleInp"></input>
                                <IoMdArrowDropdown className={`${0 ? "rolated-top" : "rolated-bottom"}`} size={25} />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col-sm">
                            <h3>Loại công việc:</h3>
                            <div className="form-control d-flex flex-row position-relative">
                                <input value={typeTask} onClick={() => setShowTypeTasks(!showTypeTasks)} readOnly className="styleInp"></input>
                                <IoMdArrowDropdown className={`${0 ? "rolated-top" : "rolated-bottom"}`} size={25} />
                                {showTypeTasks ? <div className="form-control d-flex flex-row position-absolute top-100 start-0 w-100 rounded mt-2" style={{ zIndex: 1 }}>
                                    {/* <div className="col position-relative">
                                        <div className="rounded position-absolute top-50 start-50 translate-middle w-75 h-25 bg-teal" style={{ opacity: 0.6 }}></div>
                                        <ul className="list">
                                            <li>a</li>
                                            <li>s</li>
                                            <li>s</li>
                                            <li>s</li>
                                            <li>s</li>
                                            <li>sachs</li>
                                            <li>s</li>
                                            <li>s</li>
                                            <li>a</li>
                                            <li>s</li>
                                            <li>s</li>
                                            <li>s</li>
                                            <li>s</li>
                                            <li>sachs</li>
                                            <li>s</li>
                                            <li>s</li>
                                        </ul>
                                    </div>
                                    <div className="col position-relative">
                                        <div className="rounded position-absolute top-50 start-50 translate-middle w-75 h-25 bg-teal" style={{ opacity: 0.3 }}></div>
                                        <ul className="list" ref={days} onWheel={s}>
                                            <li>a</li>
                                            <li>s</li>
                                            <li>s</li>
                                            <li>s</li>
                                            <li>s</li>
                                            <li style={{ top: "50px" }}>sachs</li>
                                            <li>s</li>
                                            <li>s</li>
                                        </ul>
                                    </div>
                                    <div className="col position-relative">
                                        <div className="rounded position-absolute top-50 start-50 translate-middle w-75 h-25 bg-teal" style={{ opacity: 0.3 }}></div>
                                        <ul className="list">
                                            <li>a</li>
                                            <li>s</li>
                                            <li>s</li>
                                            <li>s</li>
                                            <li>s</li>
                                            <li>sachs</li>
                                            <li>s</li>
                                            <li>s</li>
                                        </ul>
                                    </div> */}
                                    <div className="col" id="listTypeTask">
                                        <ul className="list">
                                            {nameButtonStatus.map((item, id) => <li key={id} onClick={() => clickTypeTask(item)}>{item}</li>)}
                                        </ul>
                                    </div>
                                </div> : null}
                            </div>
                        </div>
                        <div className="col-sm">
                            <h3>Độ ưu tiên:</h3>
                            <div className="form-control d-flex flex-row">
                                <input readOnly className="styleInp"></input>
                                <IoMdArrowDropdown className={`${0 ? "rolated-top" : "rolated-bottom"}`} size={25} />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col">
                            <h3>Người giao:</h3>
                            <div className="form-control d-flex flex-row">
                                <input readOnly className="styleInp"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col">
                            <h3>Người được giao:</h3>
                            <div className="form-control d-flex flex-row">
                                <input readOnly className="styleInp"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col">
                            <h3>Đối tượng liên quan:</h3>
                            <div className="form-control d-flex flex-row">
                                <input readOnly className="styleInp"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col">
                            <h3>Phòng ban/ Đội nhóm:</h3>
                            <div className="form-control d-flex flex-row">
                                <input readOnly className="styleInp"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col d-flex justify-content-between">
                            <span>
                                <BiReset size={40} />
                            </span>
                            <Button onClick={props.onHide}>Áp dụng</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <DateInput typenamedate={constants.START_DATE_FILTER} show={showDateStartFilter} onHide={() => setShowDateStartFilter(false)} />
            <DateInput typenamedate={constants.END_DATE_FILTER} show={showDateEndFilter} onHide={() => setShowDateEndFilter(false)} />
        </>
    )
}

// showDateInputStart: () => { return dispatch(action.showDateInputOfDateStart()) },
// showDateInputEnd: () => { return dispatch(action.showDateInputOfDateEnd()) },
// isShowFilterAdvanced: () => { dispatch(action.isShowFilterAdvanced()) },
// searchListEmployee: (params) => { dispatch(action.searchByParams(params)) },
// searchDepartment: (params) => { dispatch(action.searchDepartment(params)) },
// getTaskByFilterAdvanced: (page) => { dispatch(action.dispatchFilterAdvanced(page)) },
// addItemFilter: (item) => { return dispatch(action.addItemNeedFilter(item)) },
export default FilterAdvanced;