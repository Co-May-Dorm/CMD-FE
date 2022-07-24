import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import { updateEmployee } from '~/redux/employeesSlice'


const LockEmployee = ({ visible, setVisible, employeeInfo }) => {
    const dispatch = useDispatch()

    // Hàm xử lý khóa tài khoản
    const handleLock = (employeeInfo) => {
        dispatch(updateEmployee({
            ...employeeInfo,
            active: !employeeInfo.active
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
                        employeeInfo.active ? <>Khóa tài khoản - {employeeInfo.name}</> : <>Mở khóa tài khoản - {employeeInfo.name}</>
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    employeeInfo.active ? <>
                        Bạn có chắc chắn muốn khóa tài khoản {" "}
                        <span className="fw-bolder">
                            {employeeInfo.name}
                        </span>?
                    </> : <>
                        Bạn có chắc chắn muốn mở khóa khóa tài khoản {" "}
                        <span className="fw-bolder">
                            {employeeInfo.name}
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
                    onClick={() => handleLock(employeeInfo)}
                >
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LockEmployee