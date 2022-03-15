import React, { useState } from 'react'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import { BiTrash } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import * as actions from '../../../actions/departmentsAction'
import AppToaster from '../../../components/AppToaster'

const DeleteDepartment = ({ id }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const [visibleNotificationDeleteSuccess, setVisibleNotificationDeleteSuccess] = useState(false)
    const handleDelete = (id) => {
        dispatch(actions.deleteDepartmentRequest(id))
        setVisibleNotificationDeleteSuccess(true)
        setVisible(false)
    }

    return (
        <>
            <Dropdown.Item onClick={() => setVisible(!visible)}>
                <BiTrash /> Xóa
            </Dropdown.Item>
            <Modal
                scrollable
                show={visible}
                onHide={() => setVisible(false)}
            >
                <Modal.Header closeButton className="bg-gradient">
                    <Modal.Title>XÓA PHÒNG BAN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa phòng ban này khỏi công ty?
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
                        onClick={() => handleDelete(id)}
                    >
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
            
            <AppToaster visible={visibleNotificationDeleteSuccess} setVisible={setVisibleNotificationDeleteSuccess} title="Phòng ban" content="Xóa phòng ban thành công" />
        </>
    )
}

export default DeleteDepartment