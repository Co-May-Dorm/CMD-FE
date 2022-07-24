import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { deleteProposal } from '~/redux/proposalsSlice'

const DeleteProposal = ({ visible, setVisible, proposalInfo }) => {

    const dispatch = useDispatch()

    const handleDelete = (proposalId) => {
        dispatch(deleteProposal(proposalId))
        setVisible(false)
    }

    return (
        <Modal
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>XÓA CÔNG VIỆC</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc chắn muốn xóa công việc {" "}
                <span className="fw-bolder">
                    {proposalInfo.title}
                </span>?
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
                    onClick={() => handleDelete(proposalInfo.id)}
                >
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteProposal