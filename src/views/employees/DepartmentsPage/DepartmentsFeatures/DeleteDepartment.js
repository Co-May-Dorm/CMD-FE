import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import { deleteDepartment } from '~/redux/departmentsSlice'


const DeleteDepartment = ({ visible, setVisible, departmentInfo }) => {
    const dispatch = useDispatch()

    const handleDelete = (departmentId) => {
        dispatch(deleteDepartment(departmentId))
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
                    XÓA PHÒNG BAN
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc muốn xóa Phòng ban <span className="fw-bolder">{departmentInfo.name}</span> khỏi KTX?
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    className="text-white"
                    onClick={() => setVisible(false)}
                >
                    Hủy
                </Button>
                <Button
                    variant="danger"
                    className="text-white"
                    onClick={() => handleDelete(departmentInfo.id)}
                >
                    Đồng ý
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteDepartment