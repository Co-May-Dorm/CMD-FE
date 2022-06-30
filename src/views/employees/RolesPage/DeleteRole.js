import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { BiTrash } from 'react-icons/bi'

import { deleteRole } from '~/redux/rolesSlice'


const DeleteRole = ({ roleId }) => {
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false)

    const handleDelete = (roleId) => {
        dispatch(deleteRole(roleId))
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
            {
                visible && (
                    <Modal
                        scrollable
                        show={visible}
                        onHide={() => setVisible(false)}
                    >
                        <Modal.Header>
                            <Modal.Title>XÓA VAI TRÒ</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Bạn có chắc muốn xóa vai trò này khỏi KTX?
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
                                onClick={() => handleDelete(roleId)}
                            >
                                Đồng ý
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        </>
    )
}

export default DeleteRole