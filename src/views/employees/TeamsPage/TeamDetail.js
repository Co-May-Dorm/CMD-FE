/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { ListGroup, Modal, Table } from 'react-bootstrap'

import teamsApi from '~/api/teamsApi'

const TeamDetail = ({ visible, setVisible, teamId }) => {
    const [teamInfo, setTeamInfo] = useState({})

    useEffect(() => {
        teamsApi.getTeamDetailById(teamId)
            .then((response) => {
                setTeamInfo(response.data.data)
            })
    }, [])

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
                        Mã đội nhóm: {teamInfo.code}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Tên đội nhóm: {teamInfo.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Mô tả về đội nhóm: {(teamInfo.description === "") ? "Chưa có mô tả" : teamInfo.description}
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
                                    teamInfo.positions?.map((position) => (
                                        <tr key={position.id}>
                                            <td>{position.name}</td>
                                            <td>{position.role?.name}</td>
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