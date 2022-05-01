import { BiSearchAlt } from "react-icons/bi";
import ButtonStatus from "./ButtonStatus";
import * as todoListAction from "../../actions/todoListAction";
import TaskItem from "./TaskItem";
import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterAdvanced from "./FilterAdvanced";
import PaginationCustomize from "./PaginationCustomize";
import NewTask from "./NewTask";
import FormTask from "./FormTask";
import Detail from "./Detail";
import Confirm from "./Confirm";
import { ToastContainer, toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import { IoIosArrowDropdown } from "react-icons/io";
import * as constant from "../../constants/ActionTask";
const nameButtonStatus = [
  "Mới nhất",
  "Cũ nhất",
  "Đang làm",
  "Hoàn thành",
  "Ưu tiên",
  "Chờ xác nhận",
  "Qúa hạn",
  "Đã hủy",
];
const TodoList = () => {
  const dispacth = useDispatch();
  const page = useSelector((state) => state.TodoListReducer.pageCurrent); // get number page current
  const [modalFilterTask, showModalFilterTask] = useState(false); // state is show filter task
  const [sizeWindown, setSizeWindown] = useState([0, 0]); //size windown
  let [counterName, setCounterName] = useState(0);
  const [search, setSearch] = useState({ title: "" }); // state using search task
  const [showToast, setShowToast] = useState(true);
  // get task
  const tasks = useSelector((state) => state.TodoListReducer.tasks);
  // const positionModalOption = useSelector(state => state.TodoListReducer.posionModalOption)
  // is show detail task
  const isShowDetailTask = useSelector(
    (state) => state.TodoListReducer.isShowDetailTask
  );
  // length of array status
  const num = useSelector(
    (state) => state.TodoListReducer.collectionStatusFilter
  );
  // get name form
  const nameForm = useSelector((state) => state.TodoListReducer.nameForm);
  // status show form task
  const statusFormTask = useSelector(
    (state) => state.TodoListReducer.showFormTask
  );
  const statusReq = useSelector((state) => state.TodoListReducer.statusRequest);
  const isLoading = useSelector((state) => state.TodoListReducer.isLoading);
  const showConfirm = useSelector((state) => state.TodoListReducer.showConfirm);
  useEffect(() => {
    // delay search 0.5 seconds
    const delaySearch = setTimeout(() => {
      dispacth(todoListAction.dispatchTaskRequest({ page, search }));
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [page, search]);
  // close show detail task
  const closeDetailTask = () => {
    const request = todoListAction.showDetailTask();
    dispacth(request);
  };
  const closeConfirm = () => {
    const req = todoListAction.showConfirm(0);
    dispacth(req);
  };
  // active when layout effected
  useLayoutEffect(() => {
    const updateSize = () => {
      setSizeWindown([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  //show form task: this case is new task
  const showFromTask = async (nameForm) => {
    await dispacth(todoListAction.changeNameForm(nameForm));
    await dispacth(todoListAction.refreshDateNewTask());
    dispacth(todoListAction.showFormTask());
  };
  //render task item
  const renderTaskItem = () =>
    tasks.map((item, key) => <TaskItem key={key} task={item} />);
  const renderToast = useMemo(() => {
    // if (statusReq === "OK") {
    //     return toast.success("Cập nhật công việc thành công", {position: toast.POSITION.BOTTOM_RIGHT,
    //     autoClose: 5000,
    //    });
    // }
  }, [statusReq]);
  const notify = () =>
    toast("Wow so easy !", { autoClose: 15000 });
  return (
    <>
      {/* <ToastContainer position="top-right"
      autoClose={4000}/> */}
      <div className="container-fluid">
        {/* <button onClick={notify}>Notify !</button> */}
        <div className="d-flex justify-content-between ps-4 pe-4">
          <div className="col-sm d-flex">
            <h5 className="fw-bigBold margin-center-non-left">
              DANH SÁCH CÔNG VIỆC
            </h5>
          </div>
          <div className="col-sm">
            <div className="d-flex justify-content-center">
              <div
                className="d-inline-flex form-control p-0 ps-1"
                style={{ borderRadius: "4px" }}
              >
                <BiSearchAlt className="mx-auto h-100" size={20} />
                <input
                  onChange={(event) =>
                    setSearch({ ...search, title: event.target.value })
                  }
                  className="w-100"
                  type="search"
                  style={{
                    border: "none",
                    outline: "none",
                    color: "#2F6BB1",
                    fontSize: "14px",
                  }}
                  placeholder=""
                />
              </div>
              {/* <button type="button" className="btn btn-primary btn-sm fw-bigBold ms-2" style={{ whiteSpace: "nowrap" }}>Tìm kiếm</button> */}
            </div>
          </div>
          <div className="col-sm">
            {sizeWindown[0] < 1060 ? (
              <div className="d-flex justify-content-evenly">
                {" "}
                <button className=" btn btn-outline-primary fw-bold shadow-button">
                  Tùy chọn <IoIosArrowDropdown size={25} />
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-evenly">
                <button
                  type="button"
                  className="btn btn-outline-darkBlue btn-sm fw-bigBold fs-8"
                  onClick={() => showFromTask(constant.CREATE_TASK)}
                  data-mdb-ripple-color="dark"
                >
                  Tạo việc
                </button>
                <button
                  type="button"
                  className="btn btn-outline-darkBlue btn-sm fw-bigBold fs-8"
                  data-mdb-ripple-color="dark"
                >
                  Báo cáo
                </button>
                <button
                  type="button"
                  className="btn btn-outline-darkBlue btn-sm fw-bigBold fs-8"
                  onClick={() => showModalFilterTask(true)}
                  data-mdb-ripple-color="dark"
                >
                  {" "}
                  Bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex flex-wrap mb-3">
          <div className="p-2 mx-auto">
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="all-outline"
              autoComplete="off"
              defaultChecked
            />
            <label
              className="btn btn-outline-darkBlue btn-sm fs-7 fw-bold"
              htmlFor="all-outline"
            >
              Tất cả
            </label>
          </div>
          <div className="p-2 mx-auto">
            <input
              type="radio"
              className="btn-check"
              name="options-outlined"
              id="mine-outlined"
              autoComplete="off"
            />
            <label
              className="btn btn-outline-darkBlue btn-sm fs-7 fw-bold"
              htmlFor="mine-outlined"
            >
              Của tôi
            </label>
          </div>
          {
            //render button status
            nameButtonStatus.map((item, id) => (
              <ButtonStatus key={id + "a"} id={id} nameStatus={item} />
            ))
          }
          <div className="p-2 d-flex">
            <label className="fs-5 fw-bold margin-center">Tổng : 145</label>
          </div>
        </div>
        {sizeWindown[0] > 800 ? (
          <div className="d-flex flex-row p-2">
            <div className="col-sm-4 ms-5 d-flex">
              <span className="fw-bigBold fs-9">TÊN CÔNG VIỆC</span>
            </div>
            <div className="col-sm fw-bigBold fs-9 text-center">NGƯỜI GIAO</div>
            <div className="col-sm fw-bigBold fs-9 text-center">NGƯỜI LÀM</div>
            <div className="col-sm fw-bigBold fs-9 text-center">THỜI GIAN</div>
            <div className="col-sm fw-bigBold fs-9 text-end">TÌNH TRẠNG</div>
            <div className="col-sm fw-bigBold fs-9 text-center">ĐÁNH GIÁ</div>
          </div>
        ) : null}
        <div className="d-flex flex-column">{renderTaskItem()}</div>
        <div className="row">
          <PaginationCustomize />
        </div>
      </div>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        {/* <NewTask show={statusFormTask} nameForm={nameForm} onHide={() => showFromTask("")} /> */}
        <FormTask
          show={statusFormTask}
          name_form={nameForm}
          onHide={() => showFromTask("")}
        />
        <Detail show={isShowDetailTask} onHide={closeDetailTask} />
        <FilterAdvanced
          show={modalFilterTask}
          onHide={() => showModalFilterTask(false)}
        />
        <Confirm show={showConfirm} onHide={closeConfirm}></Confirm>
      </div>
    </>
  );
};
export default TodoList;
