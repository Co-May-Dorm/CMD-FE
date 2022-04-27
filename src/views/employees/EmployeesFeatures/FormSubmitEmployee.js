import React, { useEffect, useRef, useState } from "react"
import { Button, Form, ListGroup, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addEmployeeRequest, updateEmployeeRequest } from "../../../actions/employeesAction"
import useOnClickOutside from "../../../customHooks/useOnClickOutside"
import FormSelectDepartment from "./FormSelectDepartment"
import SelectPosition from "./SelectPosition"

const FormSubmitEmployee = ({ visible, setVisible, employee = null }) => {
    /* Quản lý các state */
    const [info, setInfo] = useState({
        // State lưu thông tin của sinh viên khi người dùng nhập dữ liệu
        code: "",
        name: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phoneNumber: "",
        department: {
            id: "",
            name: "",
            code: ""
        },
        positions: {
            id: "",
            name: ""
        },
        user: {
            username: null,
            enableLogin: false
        }
    })
    const departments = useSelector(state => state.departments.data)
    const dispatch = useDispatch()

    const [visibleSelectPosition, setVisibleSelectPosition] = useState(false) // State quản lý hiển thị danh sách chức vụ để người dùng chọn
    //

    /* Quản lý các ref */
    const refSelectPosition = useRef()
    //

    /* Hàm xử lý đóng các Dropdown khi click ra ngoài */
    useOnClickOutside(refSelectPosition, () => setVisibleSelectPosition(false))
    //

    useEffect(() => {
        if (employee?.id) {
            setInfo({
                ...employee,
                departments: employee.departments,
                positions: employee.positions,
                user: (employee.user.enableLogin !== false) ? employee.user : { username: "" }
            })
        }
    }, [employee, departments])

    /* Các hàm thay đổi giá trị của state info mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        if (e.target.type === "checkbox") {
            if (e.target.checked) {
                setInfo({
                    ...info,
                    user: {
                        username: null,
                        enableLogin: false
                    }
                })
            }
            else {
                setInfo({
                    ...info,
                    user: {
                        username: info.email,
                        enableLogin: true
                    }
                })
            }
        }
        else {
            setInfo({
                ...info,
                [e.target.name]: e.target.value
            })
        }
    }
    const handleDepartmentChange = (department) => {
        setInfo({
            ...info,
            department,
            positions: {
                id: "",
                name: ""
            },
        })
    }
    const handlePositionChange = (positions) => {
        setVisibleSelectPosition(false);
        setInfo({
            ...info,
            positions
        })
    }
    const handleUserChange = (e) => {
        setInfo({
            ...info,
            user: {
                ...info.user,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleToggleLogin = (e) => {
        if (e.target.checked) {
            setInfo({
                ...info,
                user: {
                    username: info.user.username || info.email,
                    enableLogin: true
                }
            })
        }
        else {
            setInfo({
                ...info,
                user: {
                    username: null,
                    enableLogin: false
                }
            })
        }
    }
    //

    /* Xử lý Submit Form */
    const [validated, setValidated] = useState(false)
    const handleSubmit = (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        setValidated(true)
        if (form.checkValidity() === true) {
            e.preventDefault()
            e.stopPropagation()
            if (info.id) {
                const data = {
                    ...info,
                    department: info.department.id,
                    positions: [info.positions.id]
                }
                console.log(data)
                dispatch(updateEmployeeRequest(data))
            }
            else {
                const data = {
                    ...info,
                    department: info.department.id,
                    positions: [info.positions.id]
                }
                console.log(data)
                dispatch(addEmployeeRequest(data))
            }
            setVisible(false)
            window.location.reload()
        }
    }
    //

    //
    let SelectPositionElement = null
    if (visibleSelectPosition) {
        if (info.department?.id && !info.department?.positions.length) {
            SelectPositionElement = <ListGroup.Item className="bg-light" align="center">Phòng ban hiện chưa có chức vụ nào!</ListGroup.Item>
        }
        else if (!info.department.id) {
            SelectPositionElement = <ListGroup.Item className="bg-light" align="center">Chưa chọn phòng ban!</ListGroup.Item>
        }
        else {
            SelectPositionElement = <SelectPosition
                visible={visibleSelectPosition}
                currentPosition={info.positions}
                data={info.department.positions}
                onPositionChange={handlePositionChange}
            />
        }
    }

    return (
        <Modal
            className="modal-fullheight"
            size="lg"
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title className="text-white">
                    {employee?.id ? "Chỉnh sửa sinh viên" : "Thêm sinh viên"}
                </Modal.Title>
            </Modal.Header>
            <Form
                className="modal-body"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <div className="modal-body-content">
                    <div className="mb-3">
                        <Form.Label htmlFor="code">Mã sinh viên:</Form.Label>
                        <Form.Control
                            type="text"
                            name="code"
                            placeholder="Nhập mã sinh viên..."
                            value={info.code}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập mã sinh viên.
                        </Form.Control.Feedback>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <Form.Label htmlFor="name">Họ và tên:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nhập họ và tên sinh viên..."
                            value={info.name}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập họ và tên sinh viên.
                        </Form.Control.Feedback>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <Form.Label htmlFor="dateOfBirth">Ngày sinh:</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateOfBirth"
                            placeholder="Nhập ngày sinh..."
                            value={info.dateOfBirth || ""}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập ngày sinh.
                        </Form.Control.Feedback>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <Form.Label htmlFor="gender">Giới tính:</Form.Label>
                        <Form.Select
                            type="date"
                            name="gender"
                            value={info.gender}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="0">Nữ</option>
                            <option value="1">Nam</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập ngày sinh.
                        </Form.Control.Feedback>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <Form.Label htmlFor="email">Email:</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Nhập email sinh viên..."
                            value={info.email}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập email.
                        </Form.Control.Feedback>
                    </div>
                    <hr />
                    <div className="mb-3">
                        <Form.Label htmlFor="phoneNumber">Số điện thoại:</Form.Label>
                        <Form.Control
                            type="number"
                            name="phoneNumber"
                            placeholder="Nhập số điện thoại của sinh viên..."
                            value={info.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập số điện thoại.
                        </Form.Control.Feedback>
                    </div>
                    <hr />
                    <div className="card">
                        <div className="card-header fw-bolder fs-3">
                            Phòng ban
                        </div>
                        <div className="card-body d-flex flex-lg-row flex-column">
                            <div className="mb-3 mb-lg-0 col">
                                <Form.Label htmlFor="department">Phòng ban:</Form.Label>
                                <FormSelectDepartment
                                    currentDepartment={info.department}
                                    departments={departments}
                                    onDepartmentChange={handleDepartmentChange}
                                />
                            </div>
                            <div className="mb-3 ms-lg-3 col">
                                <Form.Label htmlFor="positions">Chức vụ:</Form.Label>
                                <div ref={refSelectPosition}>
                                    <Form.Control
                                        type="text"
                                        name="positions"
                                        placeholder="Chọn chức vụ của sinh viên..."
                                        value={info.positions?.name}
                                        onChange={handleInputChange}
                                        onClick={() => setVisibleSelectPosition(!visibleSelectPosition)}
                                        required
                                    />
                                    {SelectPositionElement}
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng chọn chức vụ.
                                    </Form.Control.Feedback>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="card">
                        <div className="card-header">
                            <Form.Check
                                type="switch"
                                label="Cho phép đăng nhập"
                                checked={info.user.enableLogin}
                                onChange={handleToggleLogin}
                            />
                        </div>
                        <div className="card-body">
                            {(info.user.enableLogin) ? (
                                <>
                                    <div className="mb-3">
                                        <Form.Label htmlFor="username" className="mt-3">Tên đăng nhập:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            placeholder="Nhập tên đăng nhập..."
                                            value={info.user?.username || info.email}
                                            onChange={handleUserChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Vui lòng nhập tên đăng nhập.
                                        </Form.Control.Feedback>
                                    </div>
                                    {((employee?.id && employee?.user.username === "" && employee?.user.password === "cmacmacma") || !employee) ? (
                                        <>
                                            <hr />
                                            <div className="mb-3">
                                                <Form.Label htmlFor="password">Mật khẩu:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="password"
                                                    placeholder="Nhập mật khẩu..."
                                                    value={"cmacmacma"}
                                                    readOnly
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Vui lòng nhập mật khẩu.
                                                </Form.Control.Feedback>
                                            </div>
                                        </>
                                    ) : null}
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
                <Modal.Footer>
                    <Button
                        className="d-table m-auto"
                        size="lg"
                        type="submit"
                    >
                        {(employee?.id) ? "Cập nhật thông tin" : "Xác nhận tạo mới"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default FormSubmitEmployee