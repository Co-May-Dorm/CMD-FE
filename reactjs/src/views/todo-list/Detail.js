import { useEffect, useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Spinner } from 'react-bootstrap'
import { BsArrowRight } from "react-icons/bs"
import { IoIosSend } from "react-icons/io"
import * as todoListAction from "../../actions/todoListAction"
import StarRatings from "react-star-ratings"
const Detail = (props) => {
    const dispacth = useDispatch()
    const [rating, setRating] = useState(4)
    //get data detail task from reducer
    const dataDetailTask = useSelector(state => state.TodoListReducer.taskDetail)
    //dung de lay du lieu chi tiet san pham
    // getDetailData = () => {
    //     let detailData;
    //     if (typeof this.props.statuss.taskDetail !== "undefined") {
    //         detailData = this.props.statuss.taskDetail
    //     }
    //     return detailData;
    // }
    // using render name status of task 
    const returnNameStatus = (id) => {
        switch (id) {
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
    // this funtion using to render priority of detail task
    const renderPriority = (numberPriority) => {
        switch (numberPriority) {
            case 1:
                return "Bình thường"
            case 2:
                return "Ưu tiên"
            case 3:
                return "Rất ưu tiên"
            default:
                return "Thấp"
        }
    }
    // thí function using to slice date from yyyyy/mm/ddT/hh/mm/ss to dd/mm/yyyy
    const sliceDate = (date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
    return (
        <Modal scrollable show={true}
            {...props}
            // size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        // onExit={dispatchDateNewTask}
        >
            {Object.keys(dataDetailTask).length === 0 ? <Spinner /> : <>
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter" >
                        <div className="text-center">
                            <h5 className="fw-bigBold fs-3">CHI TIẾT CÔNG VIỆC</h5>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row ms-4 me-4 mt-2 mb-1">
                        <div className="col">
                            <span className="fw-bold fs-4">Mã công việc</span>
                        </div>
                        <div className="col">
                            <span className="fs-5">{dataDetailTask.code}</span>
                        </div>
                    </div>
                    <div className="row ms-4 me-4 mt-1 mb-1">
                        <div className="col">
                            <span className="fw-bold fs-4">Tên công việc</span>
                        </div>
                        <div className="col">
                            <span className="fs-5">{dataDetailTask.name}</span>
                        </div>
                    </div>
                    <div className="row ms-4 me-4 mt-1 mb-1">
                        <div className="col">
                            <span className="fw-bold fs-4">Thời hạn</span>
                        </div>
                        <div className="col">
                            <span className="fs-5">{sliceDate(JSON.parse(dataDetailTask.properties).start_date)}</span>
                            -
                            <span className="fs-5">{sliceDate(JSON.parse(dataDetailTask.properties).done_at)}</span>
                        </div>
                    </div>
                    <div className="row ms-4 me-4 mt-1 mb-1">
                        <div className="col">
                            <span className="fw-bold fs-4">Mức độ ưu tiên</span>
                        </div>
                        <div className="col">
                            <span className="fs-5">{
                                renderPriority(JSON.parse(dataDetailTask.properties).priority)
                            }</span>
                        </div>
                    </div>
                    <div className="row ms-4 me-4 mt-1 mb-1">
                        <div className="col">
                            <span className="fw-bold fs-4">Người giao</span>
                        </div>
                        <div className="col d-flex flex-row">
                            <div className="col-4">
                                <img src="https://i.pravatar.cc/150?img=3" className="rounded-circle w-75 h-auto" alt="..." />
                            </div>
                            <div className="col-8">
                                <div className="row ">
                                    <span className="fs-5 text-blue fw-bold">Nguyễn Văn A</span>
                                </div>
                                <div className="row">
                                    <span className="fs-8 fst-italic">Phòng điều hành</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row ms-4 me-4 mt-1 mb-1">
                        <div className="col">
                            <span className="fw-bold fs-4 ">Người được giao</span>
                        </div>
                        <div className="col d-flex flex-row">
                            <div className="col-4">
                                <img src="https://i.pravatar.cc/150?img=3" className="rounded-circle w-75 h-auto" alt="..." />
                            </div>
                            <div className="col-8">
                                <div className="row ">
                                    <span className="fs-5 text-blue fw-bold">Nguyễn Văn Mười</span>
                                </div>
                                <div className="row">
                                    <span className="fs-8 fst-italic">Phòng nhân viên</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row ms-4 me-4 mt-1 mb-1">
                        <div className="">
                            <span className="fw-bold fs-4">Mô tả:</span>
                        </div>
                        <div className="fs-5" dangerouslySetInnerHTML={{ __html: dataDetailTask.description }}>
                        </div>
                    </div>
                    <div className="row ms-4 me-4 mt-1 mb-1">
                        <div className="col">
                            <span className="fw-bold fs-4">Trạng thái</span>
                        </div>
                        <div className="col">
                            <span className="fs-5 me-1">{returnNameStatus(JSON.parse(dataDetailTask.properties).status)}</span>
                            <span className="fs-6 ms-1">({sliceDate(JSON.parse(dataDetailTask.properties).done_at)})</span>
                        </div>
                    </div>
                    <div className="row ms-4 me-4 mt-1 mb-1">
                        <div className="col">
                            <span className="fw-bold fs-4">Đánh giá</span>
                        </div>
                        <div className="col">
                            <StarRatings rating={rating} starRatedColor={"#2391F5"} starHoverColor={"#85B6FF"} name={"sao"} starEmptyColor={"#85B6FF"} changeRating={(rate) => setRating(rate)} starDimension="15px" starSpacing="5px" numberOfStars={5} />
                        </div>
                    </div>
                    <div className="row ms-4 me-4 mt-1 mb-1">
                        <div className="row">
                            <span className="fw-bold fs-4">Lịch sử:</span>
                        </div>
                        <div className="mt-2 p-0">
                            <div className="shadow rounded ms-2 mt-2 p-2">
                                <div className="d-flex">
                                    <div className="w-10 me-1">
                                        <img src="https://i.pravatar.cc/150?img=3" className="rounded-circle w-100 h-auto" alt="Avartar employee changed assignee" />
                                    </div>
                                    <div className="w-25 position-relative  me-1 ms-2">
                                        <span className="text-nowrap position-absolute top-50 start-50 translate-middle fs-6 fw-bold text-blue">Nguyễn Văn A</span>
                                    </div>
                                    <div className="w-18 position-relative  me-1 ms-1">
                                        <span className="text-nowrap position-absolute top-50 start-50 translate-middle fs-8 text-grayBlue">đã thay đổi</span>
                                    </div>
                                    <div className="w-10 position-relative me-1 ms-1">
                                        <span className="position-absolute top-50 start-50 translate-middle fs-6 fw-bold text-blue" >Quyền</span>
                                    </div>
                                    <div className="w-25 position-relative me-1"><div className="text-nowrap fs-8 position-absolute top-50 end-0 translate-middle-y fst-italic">5 ngày trước</div></div>
                                </div>
                                <div className="d-flex flex-row ps-4">
                                    <div className="w-15">
                                        <img src="https://i.pravatar.cc/150?img=3" className="rounded-circle w-64 h-auto" alt="Avartar employee assigneed by employee orther" />
                                    </div>
                                    <div className="w-25 position-relative">
                                        <span className="text-nowrap position-absolute top-50 start-50 translate-middle fs-6 fw-bold text-blue">{"Nguyễn Huyền Trân".length > 10 ? "Nguyễn Huyền Trân".slice(0, 10) + "..." : "Nguyễn Huyền Trân"}</span>
                                    </div>
                                    <div className="w-15 position-relative">
                                        <span className="text-nowrap position-absolute top-50 start-50 translate-middle"><BsArrowRight className="text-grayBlue" size={20} /></span>
                                    </div>
                                    <div className="w-15">
                                        <img src="https://i.pravatar.cc/150?img=3" className="rounded-circle w-64 h-auto" alt="Avartar employee assigneed by employee orther" />
                                    </div>
                                    <div className="w-25 position-relative">
                                        <span className="text-nowrap position-absolute top-50 start-50 translate-middle fs-6 fw-bold text-blue">Nguyễn Văn A</span>
                                    </div>
                                </div>
                            </div>
                            <div className="shadow rounded ms-2 mt-2 p-2">
                                <div className="d-flex">
                                    <div className="w-10 me-1">
                                        <img src="https://i.pravatar.cc/150?img=3" className="rounded-circle w-100 h-auto" alt="Avartar employee changed assignee" />
                                    </div>
                                    <div className="w-25 position-relative  me-1 ms-2">
                                        <span className="text-nowrap position-absolute top-50 start-50 translate-middle fs-6 fw-bold text-blue">Nguyễn Văn A</span>
                                    </div>
                                    <div className="w-18 position-relative  me-1 ms-1">
                                        <span className="text-nowrap position-absolute top-50 start-50 translate-middle fs-8 text-grayBlue">đã thay đổi</span>
                                    </div>
                                    <div className="w-18 position-relative  me-1 ms-1">
                                        <span className="text-nowrap position-absolute top-50 start-50 translate-middle fs-6 fw-bold text-blue" >Trạng thái</span>
                                    </div>
                                    <div className="w-25 position-relative me-1"><div className="text-nowrap fs-8 position-absolute top-50 end-0 translate-middle-y fst-italic">5 ngày trước</div></div>
                                </div>
                                <div className="d-flex flex-row ms-5 pt-3 pb-3">
                                    <div className="col-3 text-center">
                                        <div className="text-nowrap fs-6 text-blue">Đang làm</div>
                                    </div>
                                    <div className="col-2 position-relative">
                                        <BsArrowRight className="text-grayBlue position-absolute top-50 start-50 translate-middle" size={20} />
                                    </div>
                                    <div className="col-3 text-center">
                                        <div className="text-nowrap fs-6 text-blue">Xong</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row ms-1 mt-2">
                            <div className="col-2">
                                <img src="https://i.pravatar.cc/150?img=3" className="rounded-circle w-75 h-auto" alt="Avartar employee changed assignee" />
                            </div>
                            <div className="col-9 position-relative">
                                <input placeholder="Nhập nội dung thảo luận" className="form-control rounded position-absolute top-50 start-50 translate-middle h-65 p-1"></input>
                            </div>
                            <div className="col-1 position-relative">
                                <IoIosSend size={30} className="text-blue position-absolute top-50 start-50 translate-middle" />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                {/* <div className="row ms-1">
                    <div className="col-2">
                        <img src="https://i.pravatar.cc/150?img=3" className="rounded-circle w-75 h-auto" alt="Avartar employee changed assignee" />
                    </div>
                    <div className="col-9 position-relative">
                        <input placeholder="Nhập nội dung thảo luận" className="form-control rounded position-absolute top-50 start-50 translate-middle h-65 p-1"></input>
                    </div>
                    <div className="col-1 position-relative">
                        <IoIosSend size={30} className="text-blue position-absolute top-50 start-50 translate-middle" />
                    </div>
                </div> */}
                <Modal.Footer className="d-flex justify-content-evenly">
                    <Button className="w-25 bg-danger" onClick={props.onHide}>Từ chối</Button>
                    <Button className="w-25 fst-italic" onClick={props.onHide}>Nhận việc</Button>
                </Modal.Footer>
            </>}
        </Modal >
    )
}
export default Detail;