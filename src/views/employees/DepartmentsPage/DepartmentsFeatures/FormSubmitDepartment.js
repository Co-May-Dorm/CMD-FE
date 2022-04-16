import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Button, Form, Modal } from "react-bootstrap"

import { addDepartmentRequest, fetchDepartmentsRequest, updateDepartmentRequest } from "../../../../actions/departmentsAction"
import useOnClickOutside from "../../../../customHooks/useOnClickOutside"
import SelectDepartment from "../../EmployeesFeatures/SelectDepartment"
import Positions from "./Positions"

const FormSubmitDepartment = ({ visible, setVisible, department = null }) => {
    const departments = useSelector(state => state.departments.data)
    const dispatch = useDispatch()

    /* Quản lý các state */
    const [info, setInfo] = useState({
        // State lưu thông tin của phòng ban khi người dùng nhập dữ liệu
        code: "",
        name: "",
        description: "",
        fatherDepartmentId: null,
        positions: []
    })
    const [visibleSelectDepartment, setVisibleSelectDepartment] = useState(false)
    const [currentParentDepartmentName, setCurrentParentDepartmentName] = useState("")
    //

    /* Quản lý các ref */
    const refSelectDepartment = useRef()
    //

    /* Hàm xử lý đóng các Dropdown khi click ra ngoài */
    useOnClickOutside(refSelectDepartment, () => setVisibleSelectDepartment(false))
    //

    useEffect(() => {
        dispatch(fetchDepartmentsRequest())
    }, [])
    useEffect(() => {
        if (department?.id) {
            setInfo(department)
            setCurrentParentDepartmentName(departments.find(dp => dp.id === department.fatherDepartmentId)?.name || "")
        }
    }, [department])

    /* Các hàm thay đổi giá trị của state info mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }
    const handleDepartmentChange = (department) => {
        setVisibleSelectDepartment(false)
        setCurrentParentDepartmentName(department.name)
        setInfo({
            ...info,
            fatherDepartmentId: department.id
        })
    }
    const handleChangeParrent = (e) => {
        setCurrentParentDepartmentName(e.target.value)
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
            if (info.fatherDepartmentId === "") {
                setInfo({
                    ...info,
                    fatherDepartmentId: null
                })
            }
            if (info.id) {
                dispatch(updateDepartmentRequest(info))
            }
            else {
                dispatch(addDepartmentRequest(info))
            }
            setVisible(false)
        }
    }
    //

    const currentDepartment = departments.find(dp => dp.id === info.fatherDepartmentId)
    return (
        <>
            <Modal
                className="modal-fullheight"
                size="md"
                scrollable
                show={visible}
                onHide={() => setVisible(false)}
            >
                <Modal.Header
                    closeButton
                    className="bg-gradient"
                >
                    <Modal.Title>
                        {department?.id ? "CHỈNH SỬA PHÒNG BAN" : "THÊM PHÒNG BAN MỚI"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-3">
                            <Form.Label htmlFor="code">Mã phòng ban:</Form.Label>
                            <Form.Control
                                type="text"
                                name="code"
                                placeholder="Nhập mã phòng ban..."
                                value={info.code}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập mã phòng ban.
                            </Form.Control.Feedback>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <Form.Label htmlFor="name">Tên phòng ban:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Nhập tên phòng ban..."
                                value={info.name}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tên phòng ban.
                            </Form.Control.Feedback>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <Form.Label htmlFor="email">Mô tả:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                name="description"
                                placeholder="Nhập mô tả phòng ban..."
                                value={info.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <hr />
                        <div className="mb-3">
                            <Form.Label htmlFor="department">Phòng ban cha:</Form.Label>
                        <div
                            ref={refSelectDepartment}
                            className="position-relative form-select"
                        >
                            <div onClick={() => setVisibleSelectDepartment(!visibleSelectDepartment)}>
                                {info.department?.name || "Chọn phòng của sinh viên"}
                            </div>
                            <SelectDepartment
                                visible={visibleSelectDepartment}
                                currentDepartment={info.department}
                                departments={departments}
                                onDepartmentChange={handleDepartmentChange}
                            />
                        </div>
                        </div>
                        <Positions info={info} setInfo={setInfo} />
                        <Modal.Footer>
                            <Button
                                className="d-table m-auto"
                                size="lg"
                                type="submit"
                            >
                                {(department?.id) ? "Cập nhật thông tin" : "Xác nhận tạo mới"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default FormSubmitDepartment
