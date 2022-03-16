import React, { useState } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import { BiTrash } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import * as actions from '../../actions/employeesAction'

const DeleteEmployee = ({ id }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const handleDelete = (id) => {
        dispatch(actions.deleteEmployeeRequest(id))
        setVisible(false)
    }

    return (
        <>
            <Dropdown.Item
                component="button"
                onClick={() => setVisible(!visible)}
            >
                <BiTrash /> Xóa
            </Dropdown.Item>
            <Modal
                scrollable
                show={visible}
                onHide={() => setVisible(false)}
            >
                <Modal.Header closeButton className="bg-gradient">
                    <Modal.Title>XÓA NHÂN VIÊN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa nhân viên này khỏi công ty?
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
                        onClick={() => handleDelete(id)}
                    >
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteEmployee