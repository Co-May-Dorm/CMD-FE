import React, { useEffect, useState } from 'react'
import { Button, Form, ListGroup, Modal } from 'react-bootstrap'
import { AiOutlineClose } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { updateDepartmentRequest } from '../../../../actions/departmentsAction'
import { fetchRolesRequest } from '../../../../actions/rolesAction'
import AppToaster from '../../../../components/AppToaster'

const Positions = ({ visible, setVisible, department }) => {
    const roles = useSelector(state => state.roles.data)
    const dispatch = useDispatch()

    const [info, setInfo] = useState([])
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [notificationUpdateSuccess, setNotificationUpdateSuccess] = useState(false)
    const [notificationDeleteSuccess, setNotificationDeleteSucces] = useState(false)

    useEffect(() => {
        dispatch(fetchRolesRequest())
    }, [])
    useEffect(() => {
        if (department.positions.length > 0) {
            setInfo(department.positions)
        }
    }, [])

    /* Các hàm thay đổi giá trị của state info mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        const index = e.target.tabIndex
        const name = e.target.name
        const value = (e.target.type === "checkbox") ? e.target.checked : e.target.value
        const start = info.slice(0, index) || []
        const end = info.slice(index + 1, info.length + 1) || []
        setInfo([
            ...start,
            {
                ...info[index],
                [name]: value
            },
            ...end
        ])
    }
    const handleRoleChange = (e) => {
        const index = e.target.tabIndex
        const value = e.target.value
        const findName = roles.find(role => role.id === Number(value))?.name
        const start = info.slice(0, index) || []
        const end = info.slice(index + 1, info.length + 1) || []
        setInfo([
            ...start,
            {
                ...info[index],
                role: {
                    id: Number(value),
                    name: findName
                }
            },
            ...end
        ])
    }
    const handleDelete = (index) => {
        const array = info.filter((e, idx) => index !== idx)
        console.log(array)
        setInfo(array)
        setVisibleDelete(false)
        setNotificationDeleteSucces(true)
    }
    //

    // Thêm một form nhập chức vụ mới mỗi khi click vào Button Thêm chức vụ
    const showFormAddPostion = () => {
        if (info.length === 0) {
            setInfo([{
                name: "",
                is_lead: false,
                role: {
                    id: "",
                    name: ""
                }
            }])
        }
        else {
            setInfo([
                ...info,
                {
                    name: "",
                    is_lead: false,
                    role: {
                        id: "",
                        name: ""
                    }
                }
            ])
        }
    }

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
            dispatch(updateDepartmentRequest({
                ...department,
                positions: info
            }))
            setVisible(false)
            setNotificationUpdateSuccess(true)
        }
    }
    //

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
                        CHỨC VỤ
                        <br />
                        {department.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        {
                            info.map((position, index) => (
                                <div key={index}>
                                    <ListGroup.Item className="bg-light text-body">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Tên chức vụ:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                tabIndex={index}
                                                placeholder="Nhập tên chức vụ..."
                                                value={position.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Vui lòng nhập tên chức vụ.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Vai trò:</Form.Label>
                                            <Form.Select
                                                tabIndex={index}
                                                value={position.role?.id}
                                                label={position.role?.name}
                                                onChange={handleRoleChange}
                                            >
                                                {
                                                    roles.map(role => (
                                                        <option key={role.id} value={role.id}>{role.name}</option>
                                                    ))
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                        <div className="row justify-content-center">
                                            <Form.Check
                                                label="Là trưởng phòng"
                                                name="is_lead"
                                                className="col ms-3"
                                                tabIndex={index}
                                                disabled={info.some(e => e.is_lead === true) && position.is_lead === false}
                                                checked={position.is_lead}
                                                onChange={handleInputChange}
                                            />
                                            <Button variant="none" className="col-auto me-3" onClick={() => setVisibleDelete(true)}>
                                                <BiTrash />
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                    <br />
                                    <Modal
                                        backdrop="static"
                                        show={visibleDelete}
                                        onHide={() => setVisibleDelete(false)}
                                    >
                                        <Modal.Header closeButton className="bg-gradient">
                                            <Modal.Title>XÓA CHỨC VỤ</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            Bạn có chắc muốn xóa chức vụ này khỏi phòng ban?
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                                variant="secondary"
                                                onClick={() => setVisibleDelete(false)}
                                            >
                                                Hủy
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDelete(index)}
                                            >
                                                Đồng ý
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </div>
                            ))
                        }
                        <div className="mb-3 mt-3">
                            <Button className="d-table m-auto" onClick={showFormAddPostion}>
                                Thêm chức vụ
                            </Button>
                        </div>
                        <Modal.Footer>
                            <Button
                                className="d-block m-auto"
                                type="submit"
                            >
                                Lưu
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
            {notificationUpdateSuccess ? <AppToaster visible={notificationUpdateSuccess} setVisible={setNotificationUpdateSuccess} title="Chức vụ" content="Cập nhật chức vụ thành công" /> : null}
            {notificationDeleteSuccess ? <AppToaster visible={notificationDeleteSuccess} setVisible={setNotificationDeleteSucces} title="Chức vụ" content="Xóa chức vụ thành công" /> : null}
        </>
    )
}

export default Positions