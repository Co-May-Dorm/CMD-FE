import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap"
import { BiPlusMedical, BiTrash } from 'react-icons/bi'
import { addEmployeeRequest, updateEmployeeRequest } from "../../../../actions/employeesAction"
import FormSelectDepartment from "./FormSelectDepartment"
import FormSelectPosition from "./FormSelectPosition"
import FormSelectTeam from "./FormSelectTeam"

const FormSubmitEmployee = ({ visible, setVisible, employee = null }) => {
    const departments = useSelector(state => state.departments.data)

    /* Quản lý các state */
    const [info, setInfo] = useState({
        // State lưu thông tin của sinh viên khi người dùng nhập dữ liệu
        code: "",
        name: "",
        avatar: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phoneNumber: "",
        teams: [],
        departments: [{}],
        user: {
            username: "",
            enableLogin: false
        }
    })
    const [tab, setTab] = useState('departments')       // State chuyển từ điều chỉnh phòng ban - điều chỉnh đội nhóm
    //

    useEffect(() => {
        if (employee?.id) {
            let data = {
                ...employee,
                user: (employee.user.enableLogin !== false) ? employee.user : { username: "" }
            }
            employee.departments.forEach((department, index, array) => {
                array[index].positions = departments.find(dp => dp.id === department.id).positions
            })
            setInfo(data)
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
                    username: "",
                    enableLogin: false
                }
            })
        }
    }
    //

    /* Xử lý khi click vào button Thêm phòng ban */
    const handleShowFormSelectDepartment = () => {
        if (info.departments?.length === 0) {
            setInfo({
                ...info,
                departments: [{}]
            })
        }
        else {
            setInfo({
                ...info,
                departments: [
                    ...info.departments,
                    {}
                ]
            })
        }
    }

    const handleDepartmentChange = (index, department) => {
        const start = info.departments.slice(0, index) || []
        const end = info.departments.slice(index + 1, info.departments.length + 1) || []
        setInfo({
            ...info,
            departments: [
                ...start,
                {
                    ...department,
                    position: {}
                },
                ...end
            ]
        })
    }

    const handlePositionOfDepartmentChange = (index, position) => {
        const start = info.departments.slice(0, index) || []
        const end = info.departments.slice(index + 1, info.departments.length + 1) || []
        const department = info.departments[index]
        setInfo({
            ...info,
            departments: [
                ...start,
                {
                    ...department,
                    position
                },
                ...end
            ]
        })
    }

    const handleDeleteFormSelectDepartment = (index) => {
        const updateDepartments = info.departments.filter((e, idx) => index !== idx)
        setInfo({
            ...info,
            departments: updateDepartments
        })
    }
    //

    /* Xử lý khi click vào button Thêm CLB/Đội nhóm */
    const handleShowFormSelectTeam = () => {
        if (info.teams?.length === 0) {
            setInfo({
                ...info,
                teams: [{}]
            })
        }
        else {
            setInfo({
                ...info,
                teams: [
                    ...info.teams,
                    {}
                ]
            })
        }
    }

    const handleTeamChange = (index, team) => {
        const start = info.teams.slice(0, index) || []
        const end = info.teams.slice(index + 1, info.teams.length + 1) || []
        setInfo({
            ...info,
            teams: [
                ...start,
                {
                    ...team,
                    position: {}
                },
                ...end
            ]
        })
    }

    const handlePositionOfTeamChange = (index, position) => {
        const start = info.teams.slice(0, index) || []
        const end = info.teams.slice(index + 1, info.teams.length + 1) || []
        const team = info.teams[index]
        setInfo({
            ...info,
            teams: [
                ...start,
                {
                    ...team,
                    position
                },
                ...end
            ]
        })
    }

    const handleDeleteFormSelectTeam = (index) => {
        const updateTeams = info.teams.filter((e, idx) => index !== idx)
        setInfo({
            ...info,
            teams: updateTeams
        })
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
                let data = {
                    ...info,
                    modifyBy: 1
                }
                data.departments?.forEach((department, index, array) => {
                    delete array[index].positions
                })
                if (data.hasOwnProperty("team") === false) {
                    data.teams = []
                }
                data.teams?.forEach((team, index, array) => {
                    delete array[index].positions
                })
                updateEmployeeRequest(data)
            }
            else {
                let data = {
                    ...info,
                    createBy: 1
                }
                data.departments?.forEach((department, index, array) => {
                    delete array[index].positions
                })
                data.teams?.forEach((team, index, array) => {
                    delete array[index].positions
                })
                addEmployeeRequest(data)
            }
        }
    }
    //

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
                        <Form.Label>Mã sinh viên:</Form.Label>
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
                        <Form.Label>Họ và tên:</Form.Label>
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
                        <Form.Label>Ngày sinh:</Form.Label>
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
                        <Form.Label>Giới tính:</Form.Label>
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
                        <Form.Label>Email:</Form.Label>
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
                        <Form.Label>Số điện thoại:</Form.Label>
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
                    <div className="card mb-3">
                        <Tabs
                            activeKey={tab}
                            onSelect={(k) => setTab(k)}
                        >
                            <Tab eventKey="departments" title="Phòng ban">
                                <div className="card-body">
                                    {
                                        info.departments.map((department, index) => (
                                            <div key={index} className="list-group-item bg-light mb-3">
                                                <div className="d-flex flex-lg-row flex-column">
                                                    <div className="mb-3 mb-lg-0 col">
                                                        <Form.Label>Phòng ban số {index + 1}:</Form.Label>
                                                        <FormSelectDepartment
                                                            index={index}
                                                            currentDepartment={department}
                                                            departments={departments}
                                                            onDepartmentChange={handleDepartmentChange}
                                                        />
                                                    </div>
                                                    <div className="mb-3 ms-lg-3 col">
                                                        <Form.Label>Chức vụ của phòng ban số {index + 1}:</Form.Label>
                                                        <FormSelectPosition
                                                            index={index}
                                                            currentPosition={info.departments[index]?.position}
                                                            positions={info.departments[index]?.positions}
                                                            onPositionChange={handlePositionOfDepartmentChange}
                                                        />
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline-danger"
                                                    className="d-block m-auto"
                                                    onClick={() => handleDeleteFormSelectDepartment(index)}
                                                >
                                                    <BiTrash /> Xóa
                                                </Button>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="mb-3">
                                    <Button
                                        variant="outline-primary"
                                        className="d-block m-auto"
                                        onClick={handleShowFormSelectDepartment}
                                    >
                                        <BiPlusMedical />{" "} Thêm phòng ban {" "}<BiPlusMedical />
                                    </Button>
                                </div>
                            </Tab>
                            <Tab eventKey="teams" title="CLB/Đội nhóm">
                                <div className="card-body">
                                    {
                                        info.teams?.map((team, index) => (
                                            <div key={index} className="list-group-item bg-light mb-3">
                                                <div className="d-flex flex-lg-row flex-column">
                                                    <div className="mb-3 mb-lg-0 col">
                                                        <Form.Label>CLB/Đội nhóm số {index + 1}:</Form.Label>
                                                        <FormSelectTeam
                                                            index={index}
                                                            currentTeam={team}
                                                            onTeamChange={handleTeamChange}
                                                        />
                                                    </div>
                                                    <div className="mb-3 ms-lg-3 col">
                                                        <Form.Label>Chức vụ của CLB/Đội nhóm số {index + 1}:</Form.Label>
                                                        <FormSelectPosition
                                                            index={index}
                                                            currentPosition={info.teams[index]?.position}
                                                            positions={info.teams[index]?.positions}
                                                            onPositionChange={handlePositionOfTeamChange}
                                                        />
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline-danger"
                                                    className="d-block m-auto"
                                                    onClick={() => handleDeleteFormSelectTeam(index)}
                                                >
                                                    <BiTrash /> Xóa
                                                </Button>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="mb-3">
                                    <Button
                                        variant="outline-primary"
                                        className="d-block m-auto"
                                        onClick={handleShowFormSelectTeam}
                                    >
                                        <BiPlusMedical />{" "} Thêm CLB/Đội nhóm {" "}<BiPlusMedical />
                                    </Button>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                    <hr />
                    <div className="card mb-3">
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
                                    {((employee?.id && employee?.user.username === "" && employee?.user.password === "cmdcmdcmd") || !employee) ? (
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
                <Button
                    size="lg"
                    type="submit"
                    className="d-table m-auto"
                >
                    {(employee?.id) ? "Cập nhật thông tin" : "Xác nhận tạo mới"}
                </Button>
            </Form>
        </Modal>
    )
}

export default FormSubmitEmployee