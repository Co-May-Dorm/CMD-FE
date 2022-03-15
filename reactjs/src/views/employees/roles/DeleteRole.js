import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { BiTrash } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import * as actions from '../../../actions/rolesAction'
import AppToaster from '../../../components/AppToaster'

const DeleteRole = ({ id }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const [notification, setNotification] = useState(false)
    const handleDelete = (id) => {
        dispatch(actions.deleteRoleRequest(id))
        setNotification(true)
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
            <AppToaster visible={notification} setVisible={setNotification} title="Thông báo" content="Xóa vai trò thành công" />
        </>
    )
}

export default DeleteRole