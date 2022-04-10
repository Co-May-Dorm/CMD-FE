import React, { useState } from 'react'

import { Button, Dropdown, Modal } from 'react-bootstrap'
import { BiTrash } from 'react-icons/bi'
import { useDispatch } from 'react-redux'

import { deleteEmployeeRequest } from '../../../actions/employeesAction'

const DeleteEmployee = ({ employee }) => {
    const dispatch = useDispatch()
    const [visibleDeleteEmployee, setVisibleDeleteEmployee] = useState(false)              // State hiển thị thông báo xác nhận xóa sinh viên
    const handleDelete = (employeeId) => {
        dispatch(deleteEmployeeRequest(employeeId))
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
            <Modal
                scrollable
                show={visibleDeleteEmployee}
                onHide={() => setVisibleDeleteEmployee(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>XÓA SINH VIÊN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa sinh viên {" "}
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
        </>
    )
}

export default DeleteEmployee