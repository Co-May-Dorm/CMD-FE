import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import * as todoListAction from "../../actions/todoListAction"
import { MdMoreVert } from "react-icons/md"
import StarRatings from "react-star-ratings"
import DropdownToggle from "react-bootstrap/esm/DropdownToggle"
import Dropdown from "react-bootstrap/Dropdown"
const TaskItem = (props) => {
    const dispacth = useDispatch()
    const position = useRef(null);
    const [rating, setRating] = useState(0)
    const [showOption, setShowOption]= useState(false)
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
        // const getDataDetailTask = todoListAction.getTaskDetailRequest(props.id)
        // dispacth(getDataDetailTask)
        // const showDetailTask = todoListAction.showDetailTask()
        // dispacth(showDetailTask)
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
        <div className="row p-2 m-3 item" onClick={getDetailTask}>
            <div className="item-label"></div>
            <div className="col-md-4 ms-5 position-relative">
                <span className="small position-absolute top-50 start-0 translate-middle-y fw-normaler fs-5">{props.name}</span>
            </div>
            <div className="col-md-1 position-relative">
                {/* <img className="rounded-pill position-absolute top-50 end-0 translate-middle-y me-3" style={{ width: "30px", height: "30px" }} src={props.avartarCreater} title={props.nameCreater} alt={props.nameCreater} /> */}
            </div>
            <div className="col-md-1 position-relative">
                {/* <img className="rounded-pill position-absolute top-50 start-0 translate-middle-y ms-3" style={{ width: "30px", height: "30px" }} src={props.avartarEmployee} title={props.nameEmployee} alt={props.nameEmployee} /> */}
            </div>
            <div className="col-md-2 position-relative me-5">
                <div className="position-absolute top-50 end-0 translate-middle-y">
                    {/* <span className="fs-5">{JSON.parse(props.properties).start_date.split("T")[0]}-{JSON.parse(props.properties).done_at.split("T")[0]}</span> */}
                </div>
            </div>
            <div className="col-md-1 d-flex align-items-end flex-column ms-5">
                {/* <span className="space--nowrap fw-bold me-0">{status(JSON.parse(props.properties).status)}</span> */}
                <span className="space--nowrap fw-bold me-0 fs-5 text-blue" style={{ fontSize: "12px" }}>{props.status}</span>
                <span className="fw-normaler">20/11/2021</span>
            </div>
            <div className="col-md-1 ms-5 position-relative">
                <div className="position-absolute top-50 start-0 translate-middle-y">
                    <StarRatings rating={rating} starRatedColor={"#2391F5"} starHoverColor={"#85B6FF"} name={"sao"} starEmptyColor={"#85B6FF"} changeRating={(rate) => setRating(rate)} starDimension="15px" starSpacing="5px" numberOfStars={3} />
                </div>
                <span id="dropdown-button-dark-example1" className="position-absolute top-50 end-0 translate-middle-y me-2" ref={position} onClick={showMoreOption}>
                    <MdMoreVert size={25} />
                </span>
               {/* {showMoreOption?( <ul className="list-group position-absolute w-100">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                </ul>):null} */}
            </div>
        </div >
    )
}
export default TaskItem