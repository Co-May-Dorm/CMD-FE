/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap"
import { BiPlusMedical, BiTrash } from 'react-icons/bi'
import PropTypes from 'prop-types'

import { addEmployee, updateEmployee } from "~/redux/employeesSlice"
import { departmentsSelector, teamsSelector } from "~/redux/selectors"
import FormSelectDepartment from "./FormSelectDepartment"
import FormSelectPosition from "./FormSelectPosition"
import FormSelectTeam from "./FormSelectTeam"
import { getDepartmentList } from "~/redux/departmentsSlice"
import { getTeamList } from "~/redux/teamsSlice"

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    employee: PropTypes.object
}

const FormSubmitEmployee = ({ visible, setVisible, employee = null }) => {
    const departments = useSelector(departmentsSelector).departments
    const teams = useSelector(teamsSelector).teams
    const dispatch = useDispatch()

    /* Quản lý các state */
    const [employeeInfo, setEmployeeInfo] = useState({
        code: "",
        name: "",
        avatar: "",
        dateOfBirth: "",
        gender: "",
        email: "",
        phoneNumber: "",
        teams: [],
        departments: [],
        user: {
            username: "",
            enableLogin: false
        }
    })
    const [tab, setTab] = useState('departments')       // State chuyển từ điều chỉnh phòng ban <=> điều chỉnh đội nhóm
    //

    useEffect(() => {
        dispatch(getDepartmentList())
        dispatch(getTeamList())
    }, [])

    useEffect(() => {
        if (employee?.id) {
            let data = {
                ...employee,
                user: (employee.user.enableLogin !== false) ? employee.user : { username: "" },
                departments: employee.departments.map((department, index) => {
                    return {
                        ...employee.departments[index],
                        positions: departments.find(dp => dp.id === department.id)?.positions
                    }
                }),
                teams: employee.teams.map((team, index) => {
                    return {
                        ...employee.teams[index],
                        positions: teams.find(tm => tm.id === team.id)?.positions
                    }
                })
            }
            setEmployeeInfo(data)
        }
    }, [])

    /* Các hàm thay đổi giá trị của state employeeInfo mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        if (e.target.type === "checkbox") {
            if (e.target.checked) {
                setEmployeeInfo({
                    ...employeeInfo,
                    user: {
                        username: null,
                        enableLogin: false
                    }
                })
            }
            else {
                setEmployeeInfo({
                    ...employeeInfo,
                    user: {
                        username: employeeInfo.email,
                        enableLogin: true
                    }
                })
            }
        }
        else {
            setEmployeeInfo({
                ...employeeInfo,
                [e.target.name]: e.target.value
            })
        }
    }
    const handleUserChange = (e) => {
        setEmployeeInfo({
            ...employeeInfo,
            user: {
                ...employeeInfo.user,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleToggleLogin = (e) => {
        if (e.target.checked) {
            setEmployeeInfo({
                ...employeeInfo,
                user: {
                    username: employeeInfo.user.username || employeeInfo.email,
                    enableLogin: true
                }
            })
        }
        else {
            setEmployeeInfo({
                ...employeeInfo,
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
        if (employeeInfo.departments?.length === 0) {
            setEmployeeInfo({
                ...employeeInfo,
                departments: [{}]
            })
        }
        else {
            setEmployeeInfo({
                ...employeeInfo,
                departments: [
                    ...employeeInfo.departments,
                    {}
                ]
            })
        }
    }

    const handleDepartmentChange = (index, newDepartment) => {
        let newDepartments = employeeInfo.departments.map((department, key) => {
            if (key === index) {
                return {
                    ...newDepartment,
                    position: {}
                }
            }
            return department
        })
        setEmployeeInfo({
            ...employeeInfo,
            departments: newDepartments
        })
    }

    const handlePositionOfDepartmentChange = (index, position) => {
        let newDepartments = employeeInfo.departments.map((department, key) => {
            if (key === index) {
                return {
                    ...department,
                    position
                }
            }
            return department
        })
        setEmployeeInfo({
            ...employeeInfo,
            departments: newDepartments
        })
    }

    const handleDeleteFormSelectDepartment = (index) => {
        const newDepartments = employeeInfo.departments.filter((e, idx) => index !== idx)
        setEmployeeInfo({
            ...employeeInfo,
            departments: newDepartments
        })
    }
    //

    /* Xử lý khi click vào button Thêm Đội nhóm */
    const handleShowFormSelectTeam = () => {
        if (employeeInfo.teams?.length === 0) {
            setEmployeeInfo({
                ...employeeInfo,
                teams: [{}]
            })
        }
        else {
            setEmployeeInfo({
                ...employeeInfo,
                teams: [
                    ...employeeInfo.teams,
                    {}
                ]
            })
        }
    }

    const handleTeamChange = (index, newTeam) => {
        let newTeams = employeeInfo.teams.map((team, key) => {
            if (key === index) {
                return {
                    ...newTeam,
                    position: {}
                }
            }
            return team
        })
        setEmployeeInfo({
            ...employeeInfo,
            teams: newTeams
        })
    }

    const handlePositionOfTeamChange = (index, position) => {
        let newTeams = employeeInfo.teams.map((team, key) => {
            if (key === index) {
                return {
                    ...team,
                    position
                }
            }
            return team
        })
        setEmployeeInfo({
            ...employeeInfo,
            teams: newTeams
        })
    }

    const handleDeleteFormSelectTeam = (index) => {
        const newTeams = employeeInfo.teams.filter((e, idx) => index !== idx)
        setEmployeeInfo({
            ...employeeInfo,
            teams: newTeams
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
            if (employeeInfo.id) {
                let data = {
                    ...employeeInfo,
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
                setVisible(false)
                dispatch(updateEmployee(data))
            }
            else {
                let data = {
                    ...employeeInfo,
                    createBy: 1
                }
                data.departments?.forEach((department, index, array) => {
                    delete array[index].positions
                })
                data.teams?.forEach((team, index, array) => {
                    delete array[index].positions
                })
                setVisible(false)
                dispatch(addEmployee(data))
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
                    {employee?.id ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <div className="modal-body-content">
                        <div className="mb-3">
                            <Form.Label>Mã nhân viên:</Form.Label>
                            <Form.Control
                                type="text"
                                name="code"
                                placeholder="Nhập mã nhân viên..."
                                value={employeeInfo.code}
                                onChange={handleInputChange}
                                isInvalid={employeeInfo.code?.length > 10}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Mã nhân viên không hợp lệ.
                            </Form.Control.Feedback>
                            Mã nhân viên không được vượt quá 10 ký tự.
                        </div>
                        <hr />
                        <div className="mb-3">
                            <Form.Label>Họ và tên:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Nhập họ và tên nhân viên..."
                                value={employeeInfo.name}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập họ và tên nhân viên.
                            </Form.Control.Feedback>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <Form.Label>Ngày sinh:</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateOfBirth"
                                placeholder="Nhập ngày sinh..."
                                value={employeeInfo.dateOfBirth || ""}
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
                                name="gender"
                                value={employeeInfo.gender}
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
                                placeholder="Nhập email nhân viên..."
                                value={employeeInfo.email}
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
                                placeholder="Nhập số điện thoại của nhân viên..."
                                value={employeeInfo.phoneNumber}
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
                                            employeeInfo.departments.map((department, index) => (
                                                <div key={index} className="list-group-item bg-light mb-3">
                                                    <div className="d-flex flex-lg-row flex-column">
                                                        <div className="mb-3 mb-lg-0 col">
                                                            <Form.Label>Phòng ban số {index + 1}:</Form.Label>
                                                            <FormSelectDepartment
                                                                index={index}
                                                                currentDepartment={department}
                                                                onDepartmentChange={handleDepartmentChange}
                                                                departments={departments}
                                                            />
                                                        </div>
                                                        <div className="mb-3 ms-lg-3 col">
                                                            <Form.Label>Chức vụ của phòng ban số {index + 1}:</Form.Label>
                                                            <FormSelectPosition
                                                                index={index}
                                                                current={employeeInfo.departments[index]?.position}
                                                                positions={employeeInfo.departments[index]?.positions}
                                                                onChange={handlePositionOfDepartmentChange}
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
                                <Tab eventKey="teams" title="Đội nhóm">
                                    <div className="card-body">
                                        {
                                            employeeInfo.teams?.map((team, index) => (
                                                <div key={index} className="list-group-item bg-light mb-3">
                                                    <div className="d-flex flex-lg-row flex-column">
                                                        <div className="mb-3 mb-lg-0 col">
                                                            <Form.Label>Đội nhóm số {index + 1}:</Form.Label>
                                                            <FormSelectTeam
                                                                index={index}
                                                                currentTeam={team}
                                                                onTeamChange={handleTeamChange}
                                                                teams={teams}
                                                            />
                                                        </div>
                                                        <div className="mb-3 ms-lg-3 col">
                                                            <Form.Label>Chức vụ của đội nhóm số {index + 1}:</Form.Label>
                                                            <FormSelectPosition
                                                                index={index}
                                                                current={employeeInfo.teams[index]?.position}
                                                                positions={employeeInfo.teams[index]?.positions}
                                                                onChange={handlePositionOfTeamChange}
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
                                            <BiPlusMedical />{" "} Thêm đội nhóm {" "}<BiPlusMedical />
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
                                    checked={employeeInfo.user.enableLogin}
                                    onChange={handleToggleLogin}
                                />
                            </div>
                            <div className="card-body">
                                {(employeeInfo.user.enableLogin) ? (
                                    <>
                                        <div className="mb-3">
                                            <Form.Label htmlFor="username" className="mt-3">Tên đăng nhập:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                placeholder="Nhập tên đăng nhập..."
                                                value={employeeInfo.user?.username || employeeInfo.email}
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
            </Modal.Body>
        </Modal>
    )
}

FormSubmitEmployee.propTypes = propTypes

export default FormSubmitEmployee