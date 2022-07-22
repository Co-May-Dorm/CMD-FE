import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import { BiTrash } from 'react-icons/bi'

import { deleteTeam } from '~/redux/teamsSlice'


const DeleteTeam = ({ teamId }) => {
    const dispatch = useDispatch()
    const [visibleDeleteTeam, setVisibleDeleteTeam] = useState(false)
    const handleDelete = (teamId) => {
        dispatch(deleteTeam(teamId))
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
                    <Modal.Title>XÓA ĐỘI NHÓM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa Đội nhóm này khỏi KTX?
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
                        onClick={() => handleDelete(teamId)}
                    >
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteTeam