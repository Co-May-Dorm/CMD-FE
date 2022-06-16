import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { BiTrash } from 'react-icons/bi'
import { deleteRoleRequest } from '../../../actions/rolesAction'

const DeleteRole = ({ id }) => {
    const [visible, setVisible] = useState(false)
    const handleDelete = (id) => {
        deleteRoleRequest(id)
        setVisible(false)
    }

    return (
        <>
            <Button
                variant="danger"
                className="col-auto"
                onClick={() => setVisible(true)}
            >
                <BiTrash /> <span className="ps-1">Xóa</span>
            </Button>
            <Modal
                scrollable
                show={visible}
                onHide={() => setVisible(false)}
            >
                <Modal.Header>
                    <Modal.Title>XÓA VAI TRÒ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa vai trò này khỏi công ty?
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

export default DeleteRole