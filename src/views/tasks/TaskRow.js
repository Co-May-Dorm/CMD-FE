import React from 'react'

import { Dropdown, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'

import moreIcon from "../../assets/icons/more.svg"
import EditTask from './TasksFeatures/EditTask'
import DeleteTask from './TasksFeatures/DeleteTask'

const TaskRow = ({ task }) => {

    // Hàm hiển thị ngày sinh cho hợp lý
    const showDate = (d) => {
        const date = new Date(d)      // Khởi tạo biến date kiểu dữ liệu Date với dữ liệu truyền vào là ngày sinh của công việc được lấy từ database có dạng yyyymmdddd
        return "" + (date.getDate() < 10 ? "0" : "") + date.getDate() + "/" + (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1) + "/" + date.getFullYear()
    }

    return (
        <div
            className="item task list-group-item"
            style={{
                border: "none"
            }}
        >
            <div className="item-label" />
            <div className="ms-lg-5" />
            <div className="task-title">
                <div className="d-lg-none fw-bold col text-break">
                    Tên công việc:
                </div>
                <div className="col text-break">
                    {task.title}
                </div>
            </div>
            <div className="task-creator">
                <div className="d-lg-none fw-bold col text-break">
                    Người giao:
                </div>
                <div className="col text-break">
                    <OverlayTrigger
                        placement="top-start"
                        overlay={
                            <Tooltip>
                                {task.creator.name}
                            </Tooltip>
                        }
                    >
                        <Image
                            src={task.creator.avatar}
                            className="rounded-circle float-end"
                            width="40"
                            height="40"
                        />
                    </OverlayTrigger>
                </div>
            </div>
            <div className="task-arrow" />
            <div className="task-receiver">
                <div className="d-lg-none fw-bold col text-break">
                    Người nhận:
                </div>
                <div className="col text-break">
                    <OverlayTrigger
                        placement="top-start"
                        overlay={
                            <Tooltip>
                                {task.receiver.name}
                            </Tooltip>
                        }
                    >
                        <Image
                            src={task.receiver.avatar}
                            className="rounded-circle float-start"
                            width="40"
                            height="40"
                        />
                    </OverlayTrigger>
                </div>
            </div>
            <div className="task-timeline">
                <div className="d-lg-none fw-bold col text-break">
                    Thời gian:
                </div>
                <div className="col text-break">
                    {"" + showDate(task.createDate) + " - " + showDate(task.finishDate)}
                </div>
            </div>
            <div className="task-status">
                <div className="d-lg-none fw-bold col text-break">
                    Tình trạng:
                </div>
                <div className="col text-break">
                    {
                        task.status.id === 1 ? (
                            <>
                                <strong>{task.status.name}</strong><br />
                                {showDate(task.finishDate)}
                            </>

                        ) : <strong>{task.status.name}</strong>
                    }
                </div>
            </div>
            <div className="task-rate">
                <div className="d-lg-none fw-bold col text-break">
                    Đánh giá:
                </div>
                <div className="col text-break">
                    3
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