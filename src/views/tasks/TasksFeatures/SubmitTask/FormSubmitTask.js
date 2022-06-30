// import React, { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"

// import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap"
// import { BiPlusMedical, BiTrash } from "react-icons/bi"

// import { addTask, updateTask } from "~/redux/tasksSlice"
// import { dataEmployeesSelector, departmentsSelector } from "~/redux/selectors"
// import FormSelectDepartment from "./FormSelectDepartment"
// import FormSelectPosition from "./FormSelectPosition"
// import FormSelectTeam from "./FormSelectTeam"

// const FormSubmitTask = ({ visible, setVisible, task = null }) => {
//     const employees = useSelector(dataEmployeesSelector)
//     const departments = useSelector(departmentsSelector)
//     const dispatch = useDispatch()

//     /* Quản lý các state */
//     const [taskInfo, setTaskInfo] = useState({
//         // State lưu thông tin của công việc khi người dùng nhập dữ liệu
//         code: "",
//         title: "",
//         creatorId: JSON.parse(localStorage.getItem("userInfo")).id,
//         receiverId: null,
//         dateOfBirth: "",
//         gender: "",
//         email: "",
//         phoneNumber: "",
//         teams: [],
//         departments: [{}],
//         user: {
//             username: "",
//             enableLogin: false,
//         },
//     })
//     //

//     /* Xử lý Submit Form */
//     const [validated, setValidated] = useState(false)
//     const handleSubmit = (e) => {
//         const form = e.currentTarget
//         if (form.checkValidity() === false) {
//             e.preventDefault()
//             e.stopPropagation()
//         }
//         setValidated(true)
//         if (form.checkValidity() === true) {
//             e.preventDefault()
//             e.stopPropagation()
//             if (taskInfo.id) {
//                 let data = {
//                     ...taskInfo,
//                     modifyBy: 1,
//                 }
//                 data.departments?.forEach((department, index, array) => {
//                     delete array[index].positions
//                 })
//                 if (data.hasOwnProperty("team") === false) {
//                     data.teams = []
//                 }
//                 data.teams?.forEach((team, index, array) => {
//                     delete array[index].positions
//                 })
//                 dispatch(updateTask(data))
//             } else {
//                 let data = {
//                     ...taskInfo,
//                     createBy: 1,
//                 }
//                 data.departments?.forEach((department, index, array) => {
//                     delete array[index].positions
//                 })
//                 data.teams?.forEach((team, index, array) => {
//                     delete array[index].positions
//                 })
//                 dispatch(addTask(data))
//             }
//         }
//     }
//     //

//     return (
//         <Modal className="modal-fullheight" size="lg" scrollable show={visible} onHide={() => setVisible(false)}>
//             <Modal.Header closeButton>
//                 <Modal.Title className="text-white">{task?.id ? "Chỉnh sửa công việc" : "Thêm công việc"}</Modal.Title>
//             </Modal.Header>
//             <Form className="modal-body" noValidate validated={validated} onSubmit={handleSubmit}>
//                 <div className="modal-body-content">
//                     <div className="mb-3">
//                         <Form.Label>Mã công việc:</Form.Label>
//                         <Form.Control type="text" name="code" placeholder="Nhập mã công việc..." value={taskInfo.code} onChange={handleInputChange} required />
//                         <Form.Control.Feedback type="invalid">Vui lòng nhập mã công việc.</Form.Control.Feedback>
//                     </div>
//                     <hr />
//                     <div className="mb-3">
//                         <Form.Label>Họ và tên:</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="name"
//                             placeholder="Nhập họ và tên công việc..."
//                             value={taskInfo.name}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <Form.Control.Feedback type="invalid">Vui lòng nhập họ và tên công việc.</Form.Control.Feedback>
//                     </div>
//                     <hr />
//                     <div className="mb-3">
//                         <Form.Label>Ngày sinh:</Form.Label>
//                         <Form.Control
//                             type="date"
//                             name="dateOfBirth"
//                             placeholder="Nhập ngày sinh..."
//                             value={taskInfo.dateOfBirth || ""}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <Form.Control.Feedback type="invalid">Vui lòng nhập ngày sinh.</Form.Control.Feedback>
//                     </div>
//                     <hr />
//                     <div className="mb-3">
//                         <Form.Label>Giới tính:</Form.Label>
//                         <Form.Select type="date" name="gender" value={taskInfo.gender} onChange={handleInputChange} required>
//                             <option value="0">Nữ</option>
//                             <option value="1">Nam</option>
//                         </Form.Select>
//                         <Form.Control.Feedback type="invalid">Vui lòng nhập ngày sinh.</Form.Control.Feedback>
//                     </div>
//                     <hr />
//                     <div className="mb-3">
//                         <Form.Label>Email:</Form.Label>
//                         <Form.Control
//                             type="email"
//                             name="email"
//                             placeholder="Nhập email công việc..."
//                             value={taskInfo.email}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <Form.Control.Feedback type="invalid">Vui lòng nhập email.</Form.Control.Feedback>
//                     </div>
//                     <hr />
//                     <div className="mb-3">
//                         <Form.Label>Số điện thoại:</Form.Label>
//                         <Form.Control
//                             type="number"
//                             name="phoneNumber"
//                             placeholder="Nhập số điện thoại của công việc..."
//                             value={taskInfo.phoneNumber}
//                             onChange={handleInputChange}
//                             required
//                         />
//                         <Form.Control.Feedback type="invalid">Vui lòng nhập số điện thoại.</Form.Control.Feedback>
//                     </div>
//                     <hr />
//                     <div className="card mb-3">
//                         <Tabs activeKey={tab} onSelect={(k) => setTab(k)}>
//                             <Tab eventKey="departments" title="Phòng ban">
//                                 <div className="card-body">
//                                     {taskInfo.departments.map((department, index) => (
//                                         <div key={index} className="list-group-item bg-light mb-3">
//                                             <div className="d-flex flex-lg-row flex-column">
//                                                 <div className="mb-3 mb-lg-0 col">
//                                                     <Form.Label>Phòng ban số {index + 1}:</Form.Label>
//                                                     <FormSelectDepartment
//                                                         index={index}
//                                                         currentDepartment={department}
//                                                         departments={departments}
//                                                         onDepartmentChange={handleDepartmentChange}
//                                                     />
//                                                 </div>
//                                                 <div className="mb-3 ms-lg-3 col">
//                                                     <Form.Label>Chức vụ của phòng ban số {index + 1}:</Form.Label>
//                                                     <FormSelectPosition
//                                                         index={index}
//                                                         currentPosition={taskInfo.departments[index]?.position}
//                                                         positions={taskInfo.departments[index]?.positions}
//                                                         onPositionChange={handlePositionOfDepartmentChange}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <Button variant="outline-danger" className="d-block m-auto" onClick={() => handleDeleteFormSelectDepartment(index)}>
//                                                 <BiTrash /> Xóa
//                                             </Button>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="mb-3">
//                                     <Button variant="outline-primary" className="d-block m-auto" onClick={handleShowFormSelectDepartment}>
//                                         <BiPlusMedical /> Thêm phòng ban <BiPlusMedical />
//                                     </Button>
//                                 </div>
//                             </Tab>
//                             <Tab eventKey="teams" title="CLB/Đội nhóm">
//                                 <div className="card-body">
//                                     {taskInfo.teams?.map((team, index) => (
//                                         <div key={index} className="list-group-item bg-light mb-3">
//                                             <div className="d-flex flex-lg-row flex-column">
//                                                 <div className="mb-3 mb-lg-0 col">
//                                                     <Form.Label>CLB/Đội nhóm số {index + 1}:</Form.Label>
//                                                     <FormSelectTeam index={index} currentTeam={team} onTeamChange={handleTeamChange} />
//                                                 </div>
//                                                 <div className="mb-3 ms-lg-3 col">
//                                                     <Form.Label>Chức vụ của CLB/Đội nhóm số {index + 1}:</Form.Label>
//                                                     <FormSelectPosition
//                                                         index={index}
//                                                         currentPosition={taskInfo.teams[index]?.position}
//                                                         positions={taskInfo.teams[index]?.positions}
//                                                         onPositionChange={handlePositionOfTeamChange}
//                                                     />
//                                                 </div>
//                                             </div>
//                                             <Button variant="outline-danger" className="d-block m-auto" onClick={() => handleDeleteFormSelectTeam(index)}>
//                                                 <BiTrash /> Xóa
//                                             </Button>
//                                         </div>
//                                     ))}
//                                 </div>
//                                 <div className="mb-3">
//                                     <Button variant="outline-primary" className="d-block m-auto" onClick={handleShowFormSelectTeam}>
//                                         <BiPlusMedical /> Thêm CLB/Đội nhóm <BiPlusMedical />
//                                     </Button>
//                                 </div>
//                             </Tab>
//                         </Tabs>
//                     </div>
//                     <hr />
//                     <div className="card mb-3">
//                         <div className="card-header">
//                             <Form.Check type="switch" label="Cho phép đăng nhập" checked={taskInfo.user.enableLogin} onChange={handleToggleLogin} />
//                         </div>
//                         <div className="card-body">
//                             {taskInfo.user.enableLogin ? (
//                                 <>
//                                     <div className="mb-3">
//                                         <Form.Label htmlFor="username" className="mt-3">
//                                             Tên đăng nhập:
//                                         </Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             name="username"
//                                             placeholder="Nhập tên đăng nhập..."
//                                             value={taskInfo.user?.username || taskInfo.email}
//                                             onChange={handleUserChange}
//                                             required
//                                         />
//                                         <Form.Control.Feedback type="invalid">Vui lòng nhập tên đăng nhập.</Form.Control.Feedback>
//                                     </div>
//                                     {(task?.id && task?.user.username === "" && task?.user.password === "cmdcmdcmd") || !task ? (
//                                         <>
//                                             <hr />
//                                             <div className="mb-3">
//                                                 <Form.Label htmlFor="password">Mật khẩu:</Form.Label>
//                                                 <Form.Control type="text" name="password" placeholder="Nhập mật khẩu..." value={"cmacmacma"} readOnly />
//                                                 <Form.Control.Feedback type="invalid">Vui lòng nhập mật khẩu.</Form.Control.Feedback>
//                                             </div>
//                                         </>
//                                     ) : null}
//                                 </>
//                             ) : null}
//                         </div>
//                     </div>
//                 </div>
//                 <Button size="lg" type="submit" className="d-table m-auto">
//                     {task?.id ? "Cập nhật thông tin" : "Xác nhận tạo mới"}
//                 </Button>
//             </Form>
//         </Modal>
//     )
// }

// export default FormSubmitTask
