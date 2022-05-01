import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import * as todoListAction from "../../actions/todoListAction";
import * as constants from "../../constants/ActionTask";
import StarRatings from "react-star-ratings";
const Detail = (props) => {
  const dispacth = useDispatch();
  // state local componet
  const [rating, setRating] = useState(4);
  const [search, setSearch] = useState({ title: "" }); // state using search task
  //state component from store
  const dataDetailTask = useSelector(
    (state) => state.TodoListReducer.taskDetail
  );
  const page = useSelector((state) => state.TodoListReducer.pageCurrent); // get number page current
  //function render component*//

  //render footer
  const renderFooter = (nameStatus) => {
    if (nameStatus === "Mới") {
      return (
        <Modal.Footer className="d-flex justify-content-evenly">
          <Button
            className="w-25 bg-danger"
            onClick={() => updateStatus(constants.DENIED)}
          >
            Từ chối
          </Button>
          <Button className="w-25 fst-italic" onClick={() => updateStatus(constants.DOING)}>
            Nhận việc
          </Button>
        </Modal.Footer>
      );
    } else if (nameStatus === "Đang làm") {
      return (
        <Modal.Footer className="d-flex justify-content-evenly">
          <Button className="w-25 bg-success" onClick={() => updateStatus(constants.COMPELETE)}>
            Hoàn thành
          </Button>
        </Modal.Footer>
      );
    } else if (nameStatus === "Hoàn thành") {
      return (
        <Modal.Footer className="d-flex justify-content-evenly">
          <Button className="w-25 bg-primary" onClick={() => updateStatus(constants.FINISH)}>
            Xác nhận
          </Button>
        </Modal.Footer>
      );
    }
    //   if()
  };
  // using render name status of task
  const returnNameStatus = (id) => {
    switch (id) {
      case 1:
        return "Hoàn tất";
      case 2:
        return "Bị từ chối";
      case 3:
        return "Đã hủy";
      case 4:
        return "Mới";
      case 5:
        return "Đang làm";
      case 6:
        return "Chờ xác nhận";
      case 7:
        return "Hoàn thành";
      case 8:
        return "Qúa hạn";
    }
  };
  // this funtion using to render priority of detail task
  const renderPriority = (numberPriority) => {
    switch (numberPriority) {
      case 1:
        return "Bình thường";
      case 2:
        return "Ưu tiên";
      case 3:
        return "Rất ưu tiên";
      default:
        return "Thấp";
    }
  };
  // function logic component
  // thí function using to slice date from yyyyy/mm/ddT/hh/mm/ss to dd/mm/yyyy
  const sliceDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };
  const updateStatus = (statusName) => {
    switch (statusName) {
      case constants.DENIED: {
        updateTask(2);
        break;
      }
      case constants.DOING: {
        updateTask(5);
        break;
      }
      case constants.COMPELETE: {
        updateTask(7);
        break;
      }
      case constants.FINISH: {
        updateTask(1);
        break;
      }
    }
  };
  const updateTask = async (idStatus) => {
    const task = {
      id: dataDetailTask.id,
      description: dataDetailTask.description,
      creatorId: dataDetailTask.creatorId,
      receiverId: dataDetailTask.recieverId,
      title: dataDetailTask.title,
      createDate: dataDetailTask.createDate,
      finishDate: dataDetailTask.finishDate,
      statusId: idStatus,
    };
    dispacth(todoListAction.updateTask(task));
    dispacth(todoListAction.dispatchTaskRequest({ page, search }));
    props.onHide();
  };
  return (
    <Modal
      scrollable
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // onExit={dispatchDateNewTask}
    >
      {Object.keys(dataDetailTask).length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
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
                <span className="fs-5">{dataDetailTask.id}</span>
              </div>
            </div>
            <div className="row ms-4 me-4 mt-1 mb-1">
              <div className="col">
                <span className="fw-bold fs-4">Tên công việc</span>
              </div>
              <div className="col">
                <span className="fs-5">{dataDetailTask.title}</span>
              </div>
            </div>
            <div className="row ms-4 me-4 mt-1 mb-1">
              <div className="col">
                <span className="fw-bold fs-4">Thời hạn</span>
              </div>
              <div className="col">
                {/* <span className="fs-5">{sliceDate(JSON.parse(dataDetailTask.properties).createDate)}</span>
                            -
                            <span className="fs-5">{sliceDate(JSON.parse(dataDetailTask.properties).done_at)}</span> */}
                <span className="fs-5">
                  {dataDetailTask.createDate}
                  {"  "}
                </span>
                <span className="fs-5">{dataDetailTask.finishDate}</span>
              </div>
            </div>
            <div className="row ms-4 me-4 mt-1 mb-1">
              <div className="col">
                <span className="fw-bold fs-4">Mức độ ưu tiên</span>
              </div>
              <div className="col">
                {/* <span className="fs-5">{
                                renderPriority(JSON.parse(dataDetailTask.properties).priority)
                            }</span> */}
              </div>
            </div>
            <div className="row ms-4 me-4 mt-1 mb-1">
              <div className="col">
                <span className="fw-bold fs-4">Người giao</span>
              </div>
              <div className="col d-flex flex-row">
                <div className="avartar-dt">
                  <img
                    src="https://i.pravatar.cc/150?img=3"
                    className="rounded-circle w-100"
                    alt="..."
                  />
                </div>
                <div className="col-8">
                  <div className="row ">
                    <span className="fs-5 text-blue fw-bold">
                      {dataDetailTask.creatorName}
                    </span>
                  </div>
                  <div className="row">
                    <span className="fs-8 fst-italic">
                      {dataDetailTask.departmentName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row ms-4 me-4 mt-1 mb-1">
              <div className="col">
                <span className="fw-bold fs-4 ">Người được giao</span>
              </div>
              <div className="col d-flex flex-row">
                <div className="avartar-dt">
                  <img
                    src="https://i.pravatar.cc/150?img=3"
                    className="rounded-circle w-100"
                    alt="..."
                  />
                </div>
                <div className="col-8">
                  <div className="row ">
                    <span className="fs-5 text-blue fw-bold">
                      {dataDetailTask.recieverName}
                    </span>
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
              <div
                className="fs-5"
                dangerouslySetInnerHTML={{ __html: dataDetailTask.description }}
              ></div>
            </div>
            <div className="row ms-4 me-4 mt-1 mb-1">
              <div className="col">
                <span className="fw-bold fs-4">Trạng thái</span>
              </div>
              <div className="col">
                <span className="fs-5 me-1">{dataDetailTask.statusName}</span>
                <span className="fs-6 ms-1">({dataDetailTask.finishDate})</span>
              </div>
            </div>
            <div className="row ms-4 me-4 mt-1 mb-1">
              <div className="col">
                <span className="fw-bold fs-4">Đánh giá</span>
              </div>
              <div className="col">
                <StarRatings
                  rating={rating}
                  starRatedColor={"#2391F5"}
                  starHoverColor={"#85B6FF"}
                  name={"sao"}
                  starEmptyColor={"#85B6FF"}
                  changeRating={(rate) => setRating(rate)}
                  starDimension="15px"
                  starSpacing="5px"
                  numberOfStars={5}
                />
              </div>
            </div>
            <div className="row ms-4 me-4 mt-1 mb-1 d-flex flex-column">
              <div className="row">
                <span className="fw-bold fs-4">Lịch sử:</span>
              </div>
              <div className="mt-2 p-0">
                <div className="shadow rounded ms-2 mt-2 p-2">
                  <div className="d-flex">
                    <div className="d-flex avartar-dt">
                      <img
                        src="https://i.pravatar.cc/150?img=3"
                        className="rounded-circle w-100"
                        alt="Avartar employee changed assignee"
                      />
                    </div>
                    <div className="d-flex flex-wrap">
                      <div className="d-flex">
                        <p className="ct text-nowrap fs-6 fw-bold text-blue">
                          Nguyễn Văn A
                        </p>
                      </div>
                      <div className="d-flex ms-2">
                        <p className="ct text-nowrap"> đã thay đổi</p>
                      </div>
                      <div className=" me-2 ms-2 d-flex">
                        <span className="ct text-nowrap fs-6 fw-bold text-blue">
                          Quyền
                        </span>
                      </div>
                      <div className="d-flex">
                        <div className="text-nowrap fs-8 ct fst-italic">
                          5 ngày trước
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex ps-4">
                    <div className="d-flex avartar-dt">
                      <img
                        src="https://i.pravatar.cc/150?img=3"
                        className="rounded-circle"
                        alt="Avartar employee assigneed by employee orther"
                      />
                    </div>
                    <div className="d-flex">
                      <p className="text-nowrap fs-6 fw-bold text-blue ct">
                        {"Nguyễn Huyền Trân".length > 10
                          ? "Nguyễn Huyền Trân".slice(0, 10) + "..."
                          : "Nguyễn Huyền Trân"}
                      </p>
                    </div>
                    <div className="d-flex ms-2 me-2">
                      <span className="text-nowrap ct">
                        <BsArrowRight className="text-grayBlue" size={20} />
                      </span>
                    </div>
                    <div className="avartar-dt">
                      <img
                        src="https://i.pravatar.cc/150?img=3"
                        className="rounded-circle w-100"
                        alt="Avartar employee assigneed by employee orther"
                      />
                    </div>
                    <div className="d-flex">
                      <p className="ct text-nowrap fs-6 fw-bold text-blue">
                        Nguyễn Văn A
                      </p>
                    </div>
                  </div>
                </div>
                <div className="shadow rounded ms-2 mt-2 p-2 ">
                  <div className="d-flex">
                    <div className="d-flex avartar-dt">
                      <img
                        src="https://i.pravatar.cc/150?img=3"
                        className="rounded-circle"
                        alt="Avartar employee changed assignee"
                      />
                    </div>
                    <div className="d-flex flex-wrap">
                      <div className="d-flex">
                        {/* <div className="text-nowrap fs-6 fw-bold text-blue h-auto mx-auto ms-0">
                        Nguyễn Văn A
                      </div> */}
                        <p className="ct text-nowrap fs-6 fw-bold text-blue">
                          Nguyễn Văn A
                        </p>
                      </div>
                      <div className="d-flex ms-2">
                        <p className="ct text-nowrap"> đã thay đổi</p>
                      </div>
                      <div className=" me-2 ms-2 d-flex">
                        <span className="ct text-nowrap fs-6 fw-bold text-blue">
                          Trạng thái
                        </span>
                      </div>
                      <div className="d-flex">
                        <div className="text-nowrap fs-8 ct fst-italic">
                          5 ngày trước
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex ms-5 fs-6">
                    <div className="col-auto ms-3">
                      <div className="text-nowrap text-blue">Đang làm</div>
                    </div>
                    <div className="col-auto ms-2 me-2">
                      <BsArrowRight className="text-grayBlue" size={20} />
                    </div>
                    <div className="col-auto">
                      <div className="text-nowrap text-blue">Xong</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <div className="row w-auto">
            <div className="d-flex avartar-dt mx-auto">
              <img
                src="https://i.pravatar.cc/150?img=3"
                className="rounded-circle"
                alt="Avartar employee changed assignee"
              />
            </div>
            <div className="col-9 d-flex mx-auto">
              <input
                placeholder="Nhập nội dung thảo luận"
                className="form-control ct h-65 p-1"
              ></input>
            </div>
            <div className="col-1 mx-auto">
              <IoIosSend size={30} className="text-blue" />
            </div>
          </div>
          {renderFooter(dataDetailTask.statusName)}
        </>
      )}
    </Modal>
  );
};
export default Detail;
