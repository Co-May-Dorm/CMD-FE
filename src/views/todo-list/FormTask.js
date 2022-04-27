import React, { useRef, useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, Button } from "react-bootstrap"
import { IoMdArrowDropdown } from "react-icons/io"
import { FaUserAlt } from "react-icons/fa";
import { CgAttachment } from "react-icons/cg"
import * as constant from "../../constants/ActionTask"
import DateInput from "./DateInput";
import * as todoListAction from "../../actions/todoListAction"
// import "../../../node_modules/@ckeditor/ckeditor5-editor-classic/theme/classiceditor.css"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const initialEmployee = { id: undefined, name: undefined }
const editorConfiguration = {
    heading: {
        options: [
            { model: 'paragraph', title: 'Normal', class: 'ck-heading_paragraph' },
            { model: 'heading3', view: 'h3', title: 'Heading 1', class: 'ck-heading_heading3' },
            { model: 'heading2', view: 'h1', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading1', view: 'h2', title: 'Heading 3', class: 'ck-heading_heading1' },
            // {
            // 	model: 'headingFancy',
            // 	view: {
            // 		name: 'h2',
            // 		classes: 'fancy'
            // 	},
            // 	title: 'Heading 2 (fancy)',
            // 	class: 'ck-heading_heading2_fancy',
            // 	converterPriority: 'high'
            // }
        ]
    }
}
const NewTask = React.memo((props) => {
    const dispacth = useDispatch()
    //state local component
    const [showListEmployees, setShowListEmployees] = useState(false)
    const [showListEmployeesInvolve, setShowListEmployeesInvolve] = useState(false)
    const [showDateStart, setShowDateStart] = useState(false)
    const [showDateEnd, setShowDateEnd] = useState(false)
    const [title, setTitle] = useState("")
    const [employee, setEmployee] = useState({ id: 0, name: "fdsfdfsd" })
    const [levelPrioritize, setLevelPrioritize] = useState(0)
    const [description, setDescription] = useState('')
    const [repeatUnit, setRepeatUnit] = useState("Ngày")
    const [showRepeatUnit, setShowRepeatUnit] = useState(false)
    const [search, setSearch] = useState({ title: "" })// state using search task
    //end

    //state store
    const listEmployeeSearch = useSelector(state => state.TodoListReducer.listEmployeeSearch)
    const startNewDateTask = useSelector(state => state.TodoListReducer.startDateNewTask)
    const endNewDateTask = useSelector(state => state.TodoListReducer.endDateNewTask)
    const detailTask = useSelector(state => state.TodoListReducer.taskDetail)
    const page = useSelector(state => state.TodoListReducer.pageCurrent)// get number page current
    //end

    //reference local component
    const wrapperRef = useRef(null)
    const repeatRef = useRef(null)
    const exit = useRef(false)
    //end

    //methods local component
    //search employees
    const searchEmployee = (event, type) => {
        const e = event.target.value
        // check what type search and set state employee of type that search
        switch (type) {
            case constant.DISPATCH_EMPLOYEE_SEARCH: {
                setEmployee(e)
                break
            }
            case constant.DISPATCH_RELATED_OBJECT: {
                // setRelatedObject(e)
                // break;
            }
        }
        //Searching for employees by key such as searching for employees, related employees,...
        const req = {
            "object": "employees",
            "mapSearch": [
                {
                    "key": "name",
                    "value": e
                }
            ],
            "page": 1
        }
        // each search will be delayed by 1 second
        const delaySearch = (setTimeout(() => {
            dispacth(todoListAction.searchEmployee({ "typeSearch": type, "request": req }))
        }, 1000))
        return () => clearTimeout(delaySearch)
    }
    // click chose employee of list employee
    const choseEmployee = (employee) => {
        setEmployee(employee)
        setShowListEmployees(!showListEmployees)
    }
    // click chose repeat unit
    const choseRepeatUnit = unit => {
        setRepeatUnit(unit)
        setShowRepeatUnit(false)
    }
    //render footer by name form
    const renderFooter = () => {
        if (props.name_form === constant.CREATE_TASK) {
            return <Modal.Footer>
                {/* <Button onClick={addNewTask}>Lưu và tạo mới</Button> */}
                <Button >Lưu và tạo mới</Button>
                <Button onClick={props.onHide}>Lưu</Button>
            </Modal.Footer>
        } else {
            return <Modal.Footer>
                <Button onClick={updateTask}>Lưu</Button>
            </Modal.Footer>
        }
    }
    useEffect(() => {
        const handleClickOutside = event => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                setShowListEmployees(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef])
    useEffect(() => {
        const handleClickOutside = event => {
            if (repeatRef.current && !repeatRef.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                setShowRepeatUnit(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [repeatRef])
    //set color prioritize level 
    const setColorPrioritizeLevel = (index) => {
        const arrayColor = ["#75FFD6", "#3CEBC1", "#0DD2DE", "#2F6BB1"]
        const nameLev = ["Thấp", "Bình thường", "Ưu tiên", "Rất ưu tiên"]
        let els = []
        for (let i = 0; i <= index; i++) {
            els.push(<div key={i} className="col-sm-3 d-flex flex-column w-25">
                <button style={{ backgroundColor: i <= levelPrioritize ? arrayColor[i] : null, borderColor: i <= levelPrioritize ? arrayColor[i] : null }} onClick={() => setLevelPrioritize(i)} className="btn btn-outline-primary w-100"></button>
                <span className="text-center fs-5">{nameLev[i]}</span>
            </div>)
        }
        if (index < arrayColor.length) {
            for (let i = index + 1; i < arrayColor.length; i++) {
                els.push(<div key={i} className="col-sm-3 d-flex flex-column w-25">
                    <button style={{ backgroundColor: i <= levelPrioritize ? arrayColor[i] : null }} onClick={() => setLevelPrioritize(i)} className="btn btn-outline-primary w-100"></button>
                    <span className="text-center fs-5">{nameLev[i]}</span>
                </div>)
            }
        }
        return els.map((item) => item)
    }
    // function update task
    const updateTask = async () => {
        const task = {
            id: detailTask.id,
            description: "Chua co description nen day la default",
            creatorId: 97,
            recieverId: employee.id,
            title: title,
            createDate: startNewDateTask,
            finishDate: endNewDateTask,
            statusId: 1
        }
        dispacth(todoListAction.updateTask(task))
        dispacth(todoListAction.dispatchTaskRequest({ page, search }))
        props.onHide()
    }
    // channge state of title, employee
    useEffect(() => {
        setEmployee({ id: detailTask.recieverId, name: detailTask.recieverName })
        setTitle(detailTask.title)
    }, [detailTask])
    // refresh state employee and title to initial state
    useEffect(() => {
        if (props.name_form) {
            setEmployee(initialEmployee)
            setTitle("")
        }
    }, [props.name_form])
    //end
    return (
        <>
            <Modal scrollable ref={exit}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                contentClassName="big-hight"
                className="modalNonTop"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" >
                        <h3 className="text-center fw-bold">{props.name_form === "NewTask" ? "TẠO MỚI CÔNG VIỆC" : "CHỈNH SỬA CÔNG VIỆC"}</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div >
                        <div className="row ms-5 me-5 mb-2">
                            <span className="fw-bold pe-0 ps-0 fs-4">Tên công việc</span>
                            <div className="d-flex form-control">
                                <input type="text"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    style={{ border: "none", outline: "none" }}
                                    className={"ps-2 w-100 text-blue"}></input>
                            </div>
                        </div>
                        <div className="row ms-5 me-5 mb-2 position-relative" ref={wrapperRef}>
                            <span className="fw-bold pe-0 ps-0 fs-4" onClick={() => setShowListEmployees(false)}>Người được giao</span>
                            <div className="d-flex form-control rounded-top" onClick={() => setShowListEmployees(!showListEmployees)} >
                                <input
                                    value={employee === null ? "" : employee.name}
                                    type={"search"} onChange={(event) => searchEmployee(event, constant.DISPATCH_EMPLOYEE_SEARCH)} style={{ border: "none", outline: "none" }} className={"ps-2 w-100 text-blue"} />
                                <IoMdArrowDropdown size={20} />
                                {/* <Spinner size="sm"
                                        animation="border"
                                        variant="primary"
                                    /> */}
                            </div>
                            {
                                showListEmployees ?

                                    <ul className="list-group pe-0 position-absolute position-absolute top-100 start-0 bg-white"
                                        role={"listbox"}
                                        style={{ overflowY: "auto", maxHeight: listEmployeeSearch.length === 0 ? "40px" : "200px", cursor: "pointer", zIndex: "2" }}>
                                        {listEmployeeSearch.length === 0 ?
                                            <li role={"option"} className="list-group-item list-group-item-action disabled">
                                                Hãy nhập tên nhân viên của bạn
                                            </li>
                                            :
                                            listEmployeeSearch.map((item, id) => <li onClick={() => choseEmployee(item)} key={id} role={"option"} className="list-group-item list-group-item-action">
                                                <span className="mx-auto text-blue"> <FaUserAlt size={15} className="me-2" /> </span> {item.name}
                                            </li>)}
                                    </ul>
                                    : null
                            }
                        </div>
                        <div className="row ms-5 me-5 justify-content-md-center">
                            <span className="fw-bold pe-0 ps-0 fs-4">Mức độ ưu tiên</span>
                            <div className="row d-flex flex-wrap p-0">
                                {setColorPrioritizeLevel(levelPrioritize)}
                            </div>
                        </div>
                        <div className="row ms-5 me-5 mb-2">
                            <span className="fw-bold pe-0 ps-0 fs-4">Mô tả</span>
                            <div className="p-0" >
                                <div id="editor" >
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={description}
                                        config={editorConfiguration}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            // console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setDescription(data)
                                            // console.log({ event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            // console.log('Blur.', editor);
                                        }}
                                        onFocus={(event, editor) => {
                                            // console.log('Focus.', editor);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row ms-5 me-5 mb-2">
                            <div className="col-sm p-2">
                                <span className="col-5 fw-bold p0 mb-2 fs-4">Thời gian từ ngày</span>
                                <div className="col d-flex form-control" onClick={() => setShowDateStart(!showDateStart)}>
                                    <input readOnly type={"text"} value={startNewDateTask == null ? "" : startNewDateTask} style={{ border: "none", outline: "none" }} className={"w-100 p-0 text-blue"} />
                                </div>
                            </div>
                            <div className="col-sm p-2" >
                                <span className="fw-bold pe-0 ps-0 mb-2 fs-4">Đến ngày</span>
                                <div className="col d-flex form-control" onClick={() => setShowDateEnd(!showDateEnd)}>
                                    <input type="text"
                                        readOnly
                                        value={endNewDateTask === null ? "" : endNewDateTask}
                                        style={{ border: "none", outline: "none" }} className={"w-100 p-0 text-blue"}></input>
                                </div>
                            </div>
                        </div>
                        <div className="row ms-5 me-5 mb-2">
                            <div className="row d-flex flex-col">
                                <div className="col-sm d-flex flex-col me-2">
                                    <div className="d-flex flex-row me-2">
                                        <input value={undefined} style={{ width: "15px", height: "15px", margin: "auto" }} className="mx-auto" type={"radio"}></input>
                                        <label style={{ whiteSpace: "nowrap", margin: "auto" }} className="fw-bold ps-1 fs-4">Lặp lại</label>
                                    </div>
                                    <span className="ms-2 w-100">
                                        <input className="form-control w-100 p-1" placeholder="Nhập số lần" type={"text"} />
                                    </span>
                                </div>
                                <div className="col-sm d-flex flex-col ms-2 w-100">
                                    <label className="fw-bold me-2 fs-4">trên</label>
                                    <div className="d-flex flex-column">
                                        <div className="d-flex flex-row form-control w-100 p-1" onClick={() => setShowRepeatUnit(!showRepeatUnit)}>
                                            <input value={repeatUnit} onChange={setRepeatUnit} style={{ border: "none", outline: "none" }} className={"ps-2 w-100 text-blue"}></input>
                                            <IoMdArrowDropdown className={`${showRepeatUnit ? "rolated-top" : "rolated-bottom"}`} size={25} />
                                        </div>
                                        {showRepeatUnit ?
                                            <div className="position-relative bg-white">
                                                <div ref={repeatRef} className="d-flex flex-row position-absolute top-0 start-0 w-100 border border-primary translation">
                                                    <ul className="list-group w-100" style={{ border: "none" }}>
                                                        <li className="list-group-item list-group-item-action" onClick={() => choseRepeatUnit("Giờ")}>Giờ</li>
                                                        <li className="list-group-item list-group-item-action" onClick={() => choseRepeatUnit("Ngày")}>Ngày</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ms-5 me-5 mb-2 mt-3">
                            <div className="col-sm p-2 position-relative">
                                <span className="col-5 fw-bold p0 mb-2 fs-4">Đối tượng liên quan</span>
                                <div className="col d-flex form-control" onClick={() => setShowListEmployeesInvolve(!showListEmployeesInvolve)}>
                                    <input type={"search"} onChange={searchEmployee} style={{ border: "none", outline: "none", color: "#2F6BB1" }} className={"w-100"}></input>
                                </div>
                                {
                                    showListEmployeesInvolve ?

                                        <ul ref={wrapperRef} className="list-group pe-0 position-absolute position-absolute top-100 start-0 bg-white" role={"listbox"} style={{ overflowY: "scroll", maxHeight: listEmployeeSearch.length === 0 ? "40px" : "200px" }}>
                                            {listEmployeeSearch.length === 0 ? <li role={"option"} className="list-group-item list-group-item-action disabled">
                                                Hãy nhập tên nhân viên của bạn
                                            </li> : listEmployeeSearch.map((item, id) => <li key={id} role={"option"} className="list-group-item list-group-item-action">
                                                <span className="mx-auto"> <FaUserAlt size={15} className="me-2" /> </span> {item.name}
                                            </li>)}
                                        </ul>
                                        : null
                                }
                                <ul className="p-3">
                                    <li>Có thể nhập mã hoặc tên của đề xuất /thiết bị/ công việc/ nhân viên/ chức vụ/ phòng ban</li>
                                    <li>Có thể chọn nhiều đối tượng</li>
                                </ul>
                            </div>
                            <div className="col-sm p-2" >
                                <span className="fw-bold pe-0 ps-0 mb-2 fs-4">Mẫu báo cáo</span>
                                <div className="col d-flex form-control" >
                                    <input type="search" style={{ border: "none", outline: "none" }} className={"w-100 "}></input>
                                </div>
                                <div className="pt-3 d-flex flex-row">
                                    <h3 className="fw-bold">Đính kèm: </h3>
                                    <span style={{ width: "20px", height: "30px" }} className="border border-warning">
                                        <label htmlFor="file-input">
                                            <CgAttachment size={30} />
                                        </label>
                                        <input onChange={(e) => console.log(e.target.files[0])} style={{ display: "none" }} id="file-input" type="file" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                {
                    renderFooter()
                }

            </Modal>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <DateInput typenamedate={"START_DATE_NEW_TASK"} show={showDateStart} onHide={() => setShowDateStart(false)} />
                <DateInput typenamedate={"END_DATE_NEW_TASK"} show={showDateEnd} onHide={() => setShowDateEnd(false)} />
            </div>
        </>
    )

}
)
export default NewTask