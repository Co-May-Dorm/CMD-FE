import React, { useState } from 'react'

import { Button, Dropdown, Modal } from 'react-bootstrap'
import { BiTrash } from 'react-icons/bi'
import { useDispatch } from 'react-redux'

import { deleteEmployee } from '../../../redux/employeesSlice'

const DeleteEmployee = ({ employee }) => {
    const [visibleDeleteEmployee, setVisibleDeleteEmployee] = useState(false)              // State hiển thị thông báo xác nhận xóa nhân viên
    const dispatch = useDispatch()
    const handleDelete = (employeeId) => {
        dispatch(deleteEmployee(employeeId))
        setVisibleDeleteEmployee(false)
    }

    return (
        <>
            <Dropdown.Item
                component="button"
                onClick={() => setVisibleDeleteEmployee(!visibleDeleteEmployee)}
            >
                <BiTrash /> Xóa
            </Dropdown.Item>
            {
                visibleDeleteEmployee && (
                    <Modal
                        scrollable
                        show={visibleDeleteEmployee}
                        onHide={() => setVisibleDeleteEmployee(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>XÓA NHÂN VIÊN</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Bạn có chắc chắn muốn xóa nhân viên {" "}
                            <span className="fw-bolder">
                                {employee.name}
                            </span> khỏi ký túc xá?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setVisibleDeleteEmployee(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(employee.id)}
                            >
                                Xóa
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        </>
    )
}

export default DeleteEmployee