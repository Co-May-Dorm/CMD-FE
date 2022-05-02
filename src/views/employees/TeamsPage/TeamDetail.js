import React from 'react'

import { ListGroup, Modal, Table } from 'react-bootstrap'

const TeamDetail = ({ team, visible, setVisible }) => {
    return (
        <Modal
            className="modal-fullheight"
            size="md"
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Chi tiết CLB/Đội nhóm
                    </Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        Mã CLB/Đội nhóm: {team.code}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Tên CLB/Đội nhóm: {team.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Mô tả về CLB/Đội nhóm: {(team.description === "") ? "Chưa có mô tả" : team.description}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Table
                            striped
                            hover
                            responsive
                            borderless
                        >
                            <thead>
                                <tr>
                                    <td>
                                        <span className="fw-bolder">
                                            CHỨC VỤ
                                        </span>
                                    </td>
                                    <td>
                                        <span className="fw-bolder">
                                            VAI TRÒ
                                        </span>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    team.positions?.map((position, index) => (
                                        <tr key={index}>
                                            <td>{position.name}</td>
                                            <td>{position.role.name}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
        </Modal>

    )
}

export default TeamDetail