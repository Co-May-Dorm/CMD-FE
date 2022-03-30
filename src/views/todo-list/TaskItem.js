import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import * as todoListAction from "../../actions/todoListAction"
import { MdMoreVert } from "react-icons/md"
import { BsArrowRight } from "react-icons/bs"
import StarRatings from "react-star-ratings"
import DropdownToggle from "react-bootstrap/esm/DropdownToggle"
import { Col, Dropdown, Row } from 'react-bootstrap'
import { BsFileLock, BsThreeDotsVertical } from "react-icons/bs"
const TaskItem = (props) => {
    const dispacth = useDispatch()
    const position = useRef(null);
    const [rating, setRating] = useState(0)
    const [showOption, setShowOption] = useState(false)
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
    const getDetailTask = async () => {
        const getDataDetailTask = todoListAction.getTaskDetailRequest(props.id)
        dispacth(getDataDetailTask)
        const showDetailTask = todoListAction.showDetailTask()
        dispacth(showDetailTask)
    }
    // show more option for every task
    const showMoreOption = (event) => {
        event.stopPropagation();
        //get position button three dot
        const x = position.current.getBoundingClientRect().x
        const y = position.current.getBoundingClientRect().y
        dispacth(todoListAction.getPositionModalTask({ "x": x, "y": y }))
        setShowOption(!showMoreOption)
        console.log(x, y)
    }
    return (
        <div className="item d-flex flex-row"
        // onClick={getDetailTask}
        >
            <div className="item-label"></div>
            {/* <div className="col-4 ms-5 position-relative">
                <span className="small position-absolute top-50 start-0 translate-middle-y fw-normaler fs-8">{props.name}</span>
            </div>
            <div className="col position-relative">
                <img className="rounded-pill position-absolute top-50 end-0 translate-middle-y me-3" style={{ width: "30px", height: "30px" }} src={props.avartarCreater} title={props.nameCreater} alt={props.nameCreater} />
                <img className="rounded-pill position-absolute top-50 end-0 translate-middle-y" style={{ width: "30px", height: "30px" }} src={"https://i.pravatar.cc/300"} />
            </div>
            <div className="col position-relative">
                <img className="rounded-pill position-absolute top-50 start-0 translate-middle-y ms-3" style={{ width: "30px", height: "30px" }} src={props.avartarEmployee} title={props.nameEmployee} alt={props.nameEmployee} />
                <img className="rounded-pill position-absolute top-50 start-50 translate-middle" style={{ width: "30px", height: "30px" }} src={"https://i.pravatar.cc/300"} />
            </div>
            <div className="col position-relative me-5">
                <div className="position-absolute top-50 end-0 translate-middle-y">
                    <span className="fs-10 fw-normaler">10/2/2022-20/2/2024</span>
                    <span className="fs-5">{JSON.parse(props.properties).start_date.split("T")[0]}-{JSON.parse(props.properties).done_at.split("T")[0]}</span>
                </div>
            </div>
            <div className="col d-flex align-items-end flex-column ms-5">
                <span className="space--nowrap fw-bold me-0">{status(JSON.parse(props.properties).status)}</span>
                <span className="space--nowrap fw-bold me-0 fs-5 text-blue" style={{ fontSize: "12px" }}>{props.status}</span>
                <span className="fw-normaler">20/11/2021</span>
            </div>
            <div className="col ms-5 position-relative">
                <div className="position-absolute top-50 start-0 translate-middle-y">
                    <StarRatings rating={rating} starRatedColor={"#2391F5"} starHoverColor={"#85B6FF"} name={"sao"} starEmptyColor={"#85B6FF"} changeRating={(rate) => setRating(rate)} starDimension="15px" starSpacing="5px" numberOfStars={3} />
                </div>
                <span id="dropdown-button-dark-example1" className="position-absolute top-50 end-0 translate-middle-y me-2" ref={position} onClick={showMoreOption}>
                    <MdMoreVert size={25} />
                </span>
                {showMoreOption ? (<ul className="list-group position-absolute w-100">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                </ul>) : null}
            </div> */}
            <div className="col-4 ms-5 ps-3 d-flex" >
                <span className="fs-8 fw-normaler" style={{ margin: "auto", marginLeft: "0" }}>{props.name}</span>
            </div>
            <div className="col-2 p-0 d-flex">
                <img className="rounded-pill mx-auto" style={{ width: "30px", height: "30px" }} src={"https://i.pravatar.cc/300"} />
                <BsArrowRight size={20} className="p-0 h-100" style={{ color: "#85B6FF" }} />
                <img className="rounded-pill mx-auto" style={{ width: "30px", height: "30px" }} src={"https://i.pravatar.cc/300"} />
            </div>
            <div className="col-2 d-flex p-0 m-0">
                <span className="fs-10 fw-normaler text-center" style={{ margin: "auto" }}>{props.createDate !== null ? props.createDate.split(" ")[0] : null} - {props.finishDate !== null ? props.finishDate.split(" ")[0] : null}</span>
            </div>
            <div className="col-1 d-flex flex-column text-end">
                <span className="fw-bolder me-0 text-blue">{props.status}</span>
                <span className="fw-normaler fs-10">20/11/2021</span>
            </div>
            <div className="col-sm d-flex">
                <StarRatings rating={rating} starRatedColor={"#2391F5"} starHoverColor={"#85B6FF"} name={"sao"} starEmptyColor={"#85B6FF"} changeRating={(rate) => setRating(rate)} starDimension="15px" starSpacing="5px" numberOfStars={3} />
                <Dropdown>
                    <Dropdown.Toggle
                        variant="none"
                        className="mx-auto"
                    >
                        <BsThreeDotsVertical />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                        <Dropdown.Item>
                            <BsFileLock /> Cấp lại mật khẩu
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            {/* <div className="col p-0 d-flex">
                <img className="rounded-pill" style={{ width: "30px", height: "30px" }} src={"https://i.pravatar.cc/300"} />
            </div>
            <div className="col-sm d-flex">
                <span className="fs-10 fw-normaler" style={{ margin: "auto" }}>{props.createDate !== null ? props.createDate.split(" ")[0] : null} - {props.finishDate !== null ? props.finishDate.split(" ")[0] : null}</span>
            </div>
            <div className="w-auto d-flex flex-column text-end">
                <span className="fw-bolder me-0 text-blue">{props.status}</span>
                <span className="fw-normaler fs-10">20/11/2021</span>
            </div>
            <div className="col-sm d-flex flex-row">
                <div className="mx-auto">
                    <StarRatings rating={rating} starRatedColor={"#2391F5"} starHoverColor={"#85B6FF"} name={"sao"} starEmptyColor={"#85B6FF"} changeRating={(rate) => setRating(rate)} starDimension="15px" starSpacing="5px" numberOfStars={3} />
                </div>
                <Dropdown>
                    <Dropdown.Toggle
                        variant="none"
                        className="mx-auto"
                    >
                        <BsThreeDotsVertical />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                        <Dropdown.Item>
                            <BsFileLock /> Cấp lại mật khẩu
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div> */}
        </div >
    )
}
export default TaskItem