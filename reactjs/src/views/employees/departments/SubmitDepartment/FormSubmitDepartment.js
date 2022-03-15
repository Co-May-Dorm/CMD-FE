import React, { useEffect, useRef, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { AiOutlineClose } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import * as actions from "../../../../actions/departmentsAction"
import AppToaster from "../../../../components/AppToaster"
import useOnClickOutside from "../../../../customHooks/useOnClickOutside"
import SelectDepartment from "../../SubmitEmployee/SelectDepartment"

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
        positionList: []
    })
    const [visibleDepartment, setVisibleDepartment] = useState(false)
    const [currentParentDepartmentName, setCurrentParentDepartmentName] = useState("")
    const [visibleNotificationAddSuccess, setVisibleNotificationAddSuccess] = useState(false) // State quản lý hiển thị thông báo thêm phòng ban thành công
    const [visibleNotificationUpdateSuccess, setVisibleNotificationUpdateSuccess] = useState(false) // State quản lý hiển thị thông báo cập nhật thông tin phòng ban thành công
    //

    /* Quản lý các ref */
    const refSelectDepartment = useRef()
    //

    /* Hàm xử lý đóng các Dropdown khi click ra ngoài */
    useOnClickOutside(refSelectDepartment, () => setVisibleDepartment(false))
    //

    useEffect(() => {
        dispatch(actions.fetchDepartmentsRequest())
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
        setVisibleDepartment(false)
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
                dispatch(actions.updateDepartmentRequest(info))
                setVisibleNotificationUpdateSuccess(true)
            }
            else {
                dispatch(actions.addDepartmentRequest(info))
                setVisibleNotificationAddSuccess(true)
            }
            setVisible(false)
        }
    }
    //

    const currentDepartment = departments.find(dp => dp.id === info.fatherDepartmentId)
    return (
        <>
            <Modal
                fullscreen
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
                            <div ref={refSelectDepartment}>
                                <Form.Control
                                    type="text"
                                    placeholder="Chọn phòng ban cha..."
                                    value={currentParentDepartmentName}
                                    onChange={handleChangeParrent}
                                    onClick={() => setVisibleDepartment(!visibleDepartment)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng chọn phòng ban cha.
                                </Form.Control.Feedback>
                                <SelectDepartment
                                    visible={visibleDepartment}
                                    currentDepartment={currentDepartment}
                                    departments={departments}
                                    onDepartmentChange={handleDepartmentChange}
                                />
                            </div>
                        </div>
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

            <AppToaster
                visible={visibleNotificationAddSuccess}
                setVisible={setVisibleNotificationAddSuccess}
                title="Phòng ban"
                content="Thêm phòng ban thành công"
            />
            <AppToaster
                visible={visibleNotificationUpdateSuccess}
                setVisible={setVisibleNotificationUpdateSuccess}
                title="Phòng ban"
                content="Cập nhật thông tin phòng ban thành công"
            />
        </>
    )
}

export default FormSubmitDepartment
