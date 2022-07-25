import React from 'react'

import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { deleteEmployee } from '~/redux/employeesSlice'

const DeleteEmployee = ({ visible, setVisible, employeeInfo }) => {
    const dispatch = useDispatch()
    const handleDelete = (employeeId) => {
        dispatch(deleteEmployee(employeeId))
        setVisible(false)
    }

    return (
                    <Modal
                        scrollable
                        show={visible}
                        onHide={() => setVisible(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>XÓA NHÂN VIÊN</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Bạn có chắc chắn muốn xóa nhân viên {" "}
                            <span className="fw-bolder">
                                {employeeInfo.name}
                            </span> khỏi ký túc xá?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setVisible(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(employeeInfo.id)}
                            >
                                Xóa
                            </Button>
                        </Modal.Footer>
                    </Modal>
    )
}

export default DeleteEmployee