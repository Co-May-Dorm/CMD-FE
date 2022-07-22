import React from 'react'

import { Dropdown, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'

import moreIcon from "~/assets/icons/more.svg"
import rate0 from "~/assets/icons/rate-0.svg"
import rate1 from "~/assets/icons/rate-1.svg"
import EditTask from './TasksFeatures/EditTask'
import DeleteTask from './TasksFeatures/DeleteTask'
import TaskDetail from './TaskDetail'

const TaskRow = ({ task }) => {

    // Hàm hiển thị ngày sinh cho hợp lý
    const showDate = (d) => {
        const date = new Date(d)      // Khởi tạo biến date kiểu dữ liệu Date với dữ liệu truyền vào là ngày sinh của công việc được lấy từ database có dạng yyyymmdddd
        return "" + (date.getDate() < 10 ? "0" : "") + date.getDate() + "/" + (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1) + "/" + date.getFullYear()
    }

    let rateElement = []
    if (task.rate > 0) {
        for (let i = 1; i <= 5; ++i) {
            if (i <= task.rate) {
                rateElement.push(
                    <Image
                        key={i}
                        src={rate1}
                        className="mx-1"
                    />
                )
            }
            else {
                rateElement.push(
                    <Image
                        key={i}
                        src={rate0}
                        className="mx-1"
                    />
                )
            }
        }
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
                    {showDate(task.startDate) + " - " + showDate(task.finishDate)}
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
                                {showDate(task.modifyDate)}
                            </>

                        ) : <strong>{task.status.name}</strong>
                    }
                </div>
            </div>
            <div className="task-rate">
                <div className="d-lg-none fw-bold col text-break">
                    Đánh giá:
                </div>
                <div className="col d-flex justify-content-center">
                    {rateElement}
                </div>
            </div>
            <Dropdown className="task-more">
                <Dropdown.Toggle variant="none">
                    <Image src={moreIcon} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                    <TaskDetail taskId={task.id} />
                    <EditTask task={task} />
                    <DeleteTask task={task} />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default TaskRow