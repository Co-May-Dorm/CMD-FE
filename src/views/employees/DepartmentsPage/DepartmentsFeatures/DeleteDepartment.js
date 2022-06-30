import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Dropdown, Modal } from 'react-bootstrap'
import { BiTrash } from 'react-icons/bi'

import { deleteDepartment } from '../../../../redux/departmentsSlice'


const DeleteDepartment = ({ id }) => {
    const dispatch = useDispatch()
    const [visibleDeleteDepartment, setVisibleDeleteDepartment] = useState(false)
    const handleDelete = (id) => {
        dispatch(deleteDepartment(id))
        setVisibleDeleteDepartment(false)
    }

    return (
        <>
            <Dropdown.Item onClick={() => setVisibleDeleteDepartment(!visibleDeleteDepartment)}>
                <BiTrash /> Xóa
            </Dropdown.Item>
            <Modal
                scrollable
                show={visibleDeleteDepartment}
                onHide={() => setVisibleDeleteDepartment(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>XÓA PHÒNG BAN</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa phòng ban này khỏi KTX?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        className="text-white"
                        onClick={() => setVisibleDeleteDepartment(false)}
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
        </>
    )
}

export default DeleteDepartment