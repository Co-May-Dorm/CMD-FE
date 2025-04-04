import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

import { deleteTeam } from '~/redux/teamsSlice'


const DeleteTeam = ({ visible, setVisible, teamInfo }) => {
    const dispatch = useDispatch()

    const handleDelete = (teamId) => {
        dispatch(deleteTeam(teamId))
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
                    XÓA ĐỘI NHÓM
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc muốn xóa Đội nhóm <span className="fw-bolder">{teamInfo.name}</span> khỏi KTX?
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
                    onClick={() => handleDelete(teamInfo.id)}
                >
                    Đồng ý
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteTeam