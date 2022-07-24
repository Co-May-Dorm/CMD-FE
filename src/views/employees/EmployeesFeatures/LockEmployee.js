import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import { updateEmployee } from '~/redux/employeesSlice'


const LockEmployee = ({ visible, setVisible, employee }) => {
    const dispatch = useDispatch()

    // Hàm xử lý khóa tài khoản
    const handleLock = (employee) => {
        dispatch(updateEmployee({
            ...employee,
            active: !employee.active
        }))
        setVisible(false)
    }

    return (
        <Modal
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {
                        employee.active ? <>Khóa tài khoản - {employee.name}</> : <>Mở khóa tài khoản - {employee.name}</>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    employee.active ? <>
                        Bạn có chắc chắn muốn khóa tài khoản {" "}
                        <span className="fw-bolder">
                            {employee.name}
                        </span>?
                    </> : <>
                        Bạn có chắc chắn muốn mở khóa khóa tài khoản {" "}
                        <span className="fw-bolder">
                            {employee.name}
                        </span>?
                    </>
                }

            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => setVisible(false)}
                >
                    Hủy
                </Button>
                <Button
                    variant="primary"
                    onClick={() => handleLock(employee)}
                >
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LockEmployee