import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup, Modal, Table } from 'react-bootstrap'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    team: PropTypes.object.isRequired
}

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
                        Chi tiết đội nhóm
                    </Modal.Title>
                </Modal.Header>
            <Modal.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        Mã đội nhóm: {team.code}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Tên đội nhóm: {team.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Mô tả về đội nhóm: {(team.description === "") ? "Chưa có mô tả" : team.description}
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

TeamDetail.propTypes = propTypes

export default TeamDetail