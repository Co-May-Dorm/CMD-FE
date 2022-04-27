import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Dropdown, Form, Modal } from 'react-bootstrap'
import { BsShieldLock } from 'react-icons/bs'

import { updateEmployeeRequest } from '../../../actions/employeesAction'

const ResetPassword = ({ employee }) => {
    const dispatch = useDispatch()

    const [visibleResetPassword, setVisibleResetPassword] = useState(false)              // State hiển thị thông báo xác nhận xóa nhân viên
    const [info, setInfo] = useState({
        password: "",
        repassword: ""
    })

    const handleInputChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const handleResetPassword = (employee) => {
        dispatch(updateEmployeeRequest({
            ...employee,
            user: {
                ...info.user,
                password: info.password
            }
        }))
        setVisibleResetPassword(false)
    }

    return (
        <>
            <Dropdown.Item
                component="button"
                onClick={() => setVisibleResetPassword(!visibleResetPassword)}
            >
                <BsShieldLock /> Cấp lại mật khẩu
            </Dropdown.Item>
            <Modal
                scrollable
                centered
                size="lg"
                show={visibleResetPassword}
                onHide={() => setVisibleResetPassword(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Cấp lại mật khẩu - {employee.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="password">Mật khẩu:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Nhập mật khẩu..."
                        value={info.password}
                        onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Vui lòng nhập mật khẩu.
                    </Form.Control.Feedback>
                    <Form.Label htmlFor="repassword">Nhập lại mật khẩu:</Form.Label>
                    <Form.Control
                        type="password"
                        name="repassword"
                        placeholder="Nhập lại mật khẩu..."
                        value={info.repassword}
                        onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Vui lòng nhập mật khẩu.
                    </Form.Control.Feedback>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => handleResetPassword(employee)}
                    >
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ResetPassword