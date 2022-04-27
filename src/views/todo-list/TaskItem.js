import React, { useState, useRef, useLayoutEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import * as todoListAction from "../../actions/todoListAction"
import { BsArrowRight } from "react-icons/bs"
import StarRatings from "react-star-ratings"
import { Dropdown } from 'react-bootstrap'
import { BsThreeDotsVertical } from "react-icons/bs"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"

const TaskItem = (props) => {
    const dispacth = useDispatch()
    const position = useRef(null);
    const [rating, setRating] = useState(0)
    const [showOption, setShowOption] = useState(false)
    const [sizeWindown, setSizeWindown] = useState([0, 0])//size windown
    const status = (indexStatus) => {
        switch (indexStatus) {
            case 1:
                return "Hoàn tất"

            case 2:
                return "Bị từ chối"

            case 3:
                return "Đã hủy"

            case 4:
                return "Mới"

            case 5:
                return "Đang làm"
            case 6:
                return "Chờ xác nhận"
            case 7:
                return "Hoàn thành"
            case 8:
                return "Qúa hạn"
        }
    }
    // get detail task when user click every item
    const getDetailTask = async () => {
        const getDataDetailTask = todoListAction.getTaskDetailRequest(props.task.id)
        dispacth(getDataDetailTask)
        const showDetailTask = todoListAction.showDetailTask()
        dispacth(showDetailTask)
    }
    // show more option for every task
    const showMoreOption = (event) => {
        event.stopPropagation();
        //get position button three dot
        // const x = position.current.getBoundingClientRect().x
        // const y = position.current.getBoundingClientRect().y
        // dispacth(todoListAction.getPositionModalTask({ "x": x, "y": y }))
        // setShowOption(!showMoreOption)
        // console.log(x, y)
    }
    // show form t
    const showEdit = async () => {
        await dispacth(todoListAction.showFormTask())
        await dispacth(todoListAction.changeNameForm("Edit"))
        const getDataDetailTask = todoListAction.getTaskDetailRequest(props.task.id)
        dispacth(getDataDetailTask)
    }
    useLayoutEffect(() => {
        const updateSize = () => {
            setSizeWindown([window.innerWidth, window.innerHeight])
        }
        window.addEventListener("resize", updateSize)
        updateSize()
        return () => window.removeEventListener("resize", updateSize)
    }, [])
    const moreOption = (event) => {
        event.stopPropagation()
    }
    const showConfirm = () => {
        dispacth(todoListAction.showConfirm(props.task.id))
        // dispacth(todoListAction.idDelete(props.task.id))
    }
    return (
        <div className="item d-flex flex-row p-2"
            onClick={getDetailTask}
        >
            <div className="item-label"></div>
            <div className="col-sm-4 ms-5 d-flex" >
                <span className="fs-8 fw-normaler" style={{ margin: "auto", marginLeft: "0" }}>{props.task.title}</span>
            </div>
            <div className="col-sm-3 d-flex">
                <img title={props.task.creatorName} className="rounded-pill" style={{ width: "30px", height: "30px", margin: "auto" }} src={"https://i.pravatar.cc/300"} />
                <BsArrowRight size={20} className="p-0 h-100" style={{ color: "#85B6FF" }} />
                <img title={props.task.recieverName} className="rounded-pill" style={{ width: "30px", height: "30px", margin: "auto" }} src={"https://i.pravatar.cc/300"} />
            </div>
            <div className="col-sm d-flex">
                <span className="fs-10 fw-normaler text-center" style={{ margin: "auto" }}>{props.task.createDate !== null ? props.task.createDate.split(" ")[0] : null} - {props.task.finishDate !== null ? props.task.finishDate.split(" ")[0] : null}</span>
            </div>
            {sizeWindown[0] < 500 ? null : <div className="col-sm w-auto d-flex flex-column text-end" style={{ margin: "auto" }}>
                <span className="fw-bolder me-0 text-blue">{props.task.statusName}</span>
                <span className="fw-normaler fs-10">20/11/2021</span>
            </div>}
            <div className="col-sm d-flex">
                <div className="me-0" style={{ margin: "auto" }} >
                    <StarRatings rating={rating} starRatedColor={"#2391F5"} starHoverColor={"#85B6FF"} name={"sao"} starEmptyColor={"#85B6FF"} starSpacing={"5px"} changeRating={(rate) => setRating(rate)} starDimension="15px" numberOfStars={3} />
                </div>
                <Dropdown onClick={moreOption} className="d-flex">
                    <Dropdown.Toggle
                        variant="none"
                        className="mx-auto"
                    >
                        <BsThreeDotsVertical />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                        <Dropdown.Item onClick={showEdit} className="moreOption">
                            <AiFillEdit className="me-1" />Chỉnh sửa
                        </Dropdown.Item>
                        <Dropdown.Item onClick={showConfirm} className="moreOption">
                            <AiFillDelete className="me-1" />Xóa
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div >
    )
}
export default TaskItem