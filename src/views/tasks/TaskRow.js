import React from 'react'

import { Dropdown } from 'react-bootstrap'

import moreIcon from "../../assets/icons/more.svg"
import EditTask from './TasksFeatures/EditTask'
import DeleteTask from './TasksFeatures/DeleteTask'

const TaskRow = ({ task }) => {

    // Hàm hiển thị ngày sinh cho hợp lý
    const showDate = () => {
        const dateOfBirth = new Date(task.dateOfBirth)      // Khởi tạo biến dateOfBirth kiểu dữ liệu Date với dữ liệu truyền vào là ngày sinh của công việc được lấy từ database có dạng yyyymmdddd
        return "" + (dateOfBirth.getDate() < 10 ? "0" : "") + dateOfBirth.getDate() + "/" + (dateOfBirth.getMonth() + 1 < 10 ? "0" : "") + (dateOfBirth.getMonth() + 1) + "/" + dateOfBirth.getFullYear()
    }

    let activeStatusElement = <span className="d-inline-block rounded-circle bg-success" style={{ height: "10px", width: "10px" }}/>
    if (task.active === false) {
        activeStatusElement = <span className="d-inline-block rounded-circle bg-secondary" style={{ height: "10px", width: "10px" }}/>
    }

    const mainDepartment = task.departments.reduce((min, department) => min.level < department.level ? min : department)

    return (
        <div
            className="item task list-group-item"
            style={{
                border: "none"
            }}                                                                                                                                                                      
        >
            <div className="item-label" />
            <div className="ms-lg-5" />
            <div className="task-active">
                {activeStatusElement}
            </div>
            <div className="task-name">
                <div className="d-lg-none fw-bold col text-break">
                    Họ và tên:
                </div>
                <div className="col text-break">
                    {task.name}
                </div>
            </div>
            <div className="task-dob">
                <div className="d-lg-none fw-bold col text-break">
                    Ngày sinh:  
                </div>
                <div className="col text-break">
                    {showDate()}
                </div>
            </div>
            <div className="task-email">
                <div className="d-lg-none fw-bold col text-break">
                    Email:
                </div>
                <div className="col text-break">np
                    {task.email}
                </div>
            </div>
            <div className="task-phoneNumber">
                <div className="d-lg-none fw-bold col text-break">
                    Số điện thoại:
                </div>
                <div className="col text-break">
                    {task.phoneNumber}
                </div>
            </div>
            <div className="task-department">
                <div className="d-lg-none fw-bold col text-break">
                    Phòng:
                </div>
                <div className="col text-break">
                    {mainDepartment.name}
                </div>
            </div>
            <div className="task-position">
                <div className="d-lg-none fw-bold col text-break">
                    Chức vụ:
                </div>
                <div className="col text-break">
                    {mainDepartment.position.name}
                </div>
            </div>
            <Dropdown className="task-more">
                <Dropdown.Toggle variant="none">
                    <img src={moreIcon} alt="More Icon" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                    <EditTask task={task} />
                    <DeleteTask task={task} />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default TaskRow