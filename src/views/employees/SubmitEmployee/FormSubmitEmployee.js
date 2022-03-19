import React, { useEffect, useRef, useState } from "react"
import { Button, Card, Form, ListGroup, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addEmployeeRequest, updateEmployeeRequest } from "../../../actions/employeesAction"
import useOnClickOutside from "../../../customHooks/useOnClickOutside"
import SelectDepartment from "./SelectDepartment"
import SelectPosition from "./SelectPosition"

const FormSubmitEmployee = ({ visible, setVisible, employee = null }) => {
    /* Quản lý các state */
    const [info, setInfo] = useState({
        // State lưu thông tin của nhân viên khi người dùng nhập dữ liệu
        code: "",
        name: "",
        dateOfBirth: "",
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

    const [visibleDepartment, setVisibleDepartment] = useState(false) // State quản lý hiển thị danh sách phòng ban để người dùng chọn
    const [visiblePosition, setVisiblePosition] = useState(false) // State quản lý hiển thị danh sách chức vụ để người dùng chọn
    const [visibleLogin, setVisibleLogin] = useState(false) // State quản lý hiển thị nhập tên đăng và mật khẩu nếu cho phép đăng nhập
    //

    /* Quản lý các ref */
    const refSelectDepartment = useRef()
    const refSelectPosition = useRef()
    //

    /* Hàm xử lý đóng các Dropdown khi click ra ngoài */
    useOnClickOutside(refSelectDepartment, () => setVisibleDepartment(false))
    useOnClickOutside(refSelectPosition, () => setVisiblePosition(false))
    //

    useEffect(() => {
        if (employee?.id) {
            setInfo({
                ...employee,
                user: (employee.user.enableLogin !== false) ? employee.user : { username: "" }
            })
            if (employee?.user?.username) {
                setVisibleLogin(true)
            }
        }
    }, [employee])

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
            setVisibleLogin(e.target.checked)
        }
        else {
            setInfo({
                ...info,
                [e.target.name]: e.target.value
            })
        }
    }
    const handleDepartmentChange = (department) => {
        setVisibleDepartment(false);
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
        setVisiblePosition(false);
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
                dispatch(updateEmployeeRequest(info))
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
        }
    }
    //

    //
    let SelectPositionElement = null
    if (visiblePosition) {
        if (info.department?.id && !info.department?.positions.length) {
            SelectPositionElement = <ListGroup.Item className="bg-light" align="center">Phòng ban hiện chưa có chức vụ nào!</ListGroup.Item>
        }
        else if (!info.department.id) {
            SelectPositionElement = <ListGroup.Item className="bg-light" align="center">Chưa chọn phòng ban!</ListGroup.Item>
        }
        else {
            SelectPositionElement = <SelectPosition
                visible={visiblePosition}
                currentPosition={info.positions}
                data={info.department.positions}
                onPositionChange={handlePositionChange}
            />
        }
    }

    return (
            <Modal
                size="xl"
                scrollable
                show={visible}
                onHide={() => setVisible(false)}
            >
                <Modal.Header
                    closeButton
                    className="bg-gradient"
                >
                    <Modal.Title className="text-white">
                        {employee?.id ? "CHỈNH SỬA NHÂN VIÊN" : "THÊM NHÂN VIÊN MỚI"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-3">
                            <Form.Label htmlFor="code">Mã nhân viên:</Form.Label>
                            <Form.Control
                                type="text"
                                name="code"
                                placeholder="Nhập mã nhân viên..."
                                value={info.code}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập mã nhân viên.
                            </Form.Control.Feedback>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <Form.Label htmlFor="name">Họ và tên:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Nhập họ và tên nhân viên..."
                                value={info.name}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập họ và tên nhân viên.
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
                            <Form.Label htmlFor="email">Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Nhập email nhân viên..."
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
                                placeholder="Nhập số điện thoại của nhân viên..."
                                value={info.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập số điện thoại.
                            </Form.Control.Feedback>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <Form.Label htmlFor="department">Phòng ban:</Form.Label>
                            <div ref={refSelectDepartment}>
                                <Form.Control
                                    type="text"
                                    name="department"
                                    placeholder="Chọn phòng ban của nhân viên..."
                                    value={info.department?.name}
                                    onChange={handleInputChange}
                                    onClick={() => setVisibleDepartment(!visibleDepartment)}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng chọn phòng ban.
                                </Form.Control.Feedback>
                                <SelectDepartment
                                    visible={visibleDepartment}
                                    currentDepartment={info.department}
                                    departments={departments}
                                    onDepartmentChange={handleDepartmentChange}
                                />
                            </div>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <Form.Label htmlFor="positions">Chức vụ:</Form.Label>
                            <div ref={refSelectPosition}>
                                <Form.Control
                                    type="text"
                                    name="positions"
                                    placeholder="Chọn chức vụ của nhân viên..."
                                    value={info.positions?.name}
                                    onChange={handleInputChange}
                                    onClick={() => setVisiblePosition(!visiblePosition)}
                                    required
                                />
                                {SelectPositionElement}
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng chọn chức vụ.
                                </Form.Control.Feedback>
                            </div>
                        </div>
                        <hr />
                        <Card>
                            <Card.Body>
                                <Card.Header>
                                    <Form.Check
                                        type="switch"
                                        label="Cho phép đăng nhập"
                                        checked={info.user.enableLogin}
                                        onChange={handleToggleLogin}
                                    />
                                </Card.Header>
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
                            </Card.Body>
                        </Card>
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
                </Modal.Body>
            </Modal>
    )
}

export default FormSubmitEmployee