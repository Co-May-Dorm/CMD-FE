import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Dropdown, Modal } from 'react-bootstrap'
import { BiTrash } from 'react-icons/bi'

import { deleteTeamRequest } from '../../../../actions/teamsAction'


const DeleteTeam = ({ id }) => {
    const dispatch = useDispatch()
    const [visibleDeleteTeam, setVisibleDeleteTeam] = useState(false)
    const handleDelete = (id) => {
        dispatch(deleteTeamRequest(id))
        setVisibleDeleteTeam(false)
    }

    return (
        <>
            <Dropdown.Item onClick={() => setVisibleDeleteTeam(!visibleDeleteTeam)}>
                <BiTrash /> Xóa
            </Dropdown.Item>
            <Modal
                scrollable
                show={visibleDeleteTeam}
                onHide={() => setVisibleDeleteTeam(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>XÓA CLB - ĐỘI NHÓM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa clb - đội nhóm này khỏi công ty?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        className="text-white"
                        onClick={() => setVisibleDeleteTeam(false)}
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

export default DeleteTeam