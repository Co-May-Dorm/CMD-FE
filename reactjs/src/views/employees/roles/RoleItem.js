import React from 'react'
import { Accordion, ListGroup, Table } from 'react-bootstrap'
import DeleteRole from './DeleteRole'
import EditRole from './SubmitRole/EditRole'

const RoleItem = ({ role }) => {
    return (
        <>
            <Accordion.Header>
                {role.name}
            </Accordion.Header>
            <Accordion.Body>
                <ListGroup.Item>
                    <div className="row justify-content-around">
                        <EditRole role={role} />
                        <DeleteRole id={role.id} />
                    </div>
                </ListGroup.Item>
                {/* {
                    role.positions?.length === 0 ? <div className="list-group-item bg-light">Vai trò này chưa có chức vụ nào nắm giữ</div> : (
                        <Table
                            striped
                            hover
                            responsive
                            borderless
                        >
                            <thead>
                                <tr className="fs-5">
                                    <td>CHỨC VỤ</td>
                                    <td>PHÒNG BAN</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    role.positions?.map(position => (
                                        <tr key={position.id}>
                                            <td>{position.name}</td>
                                            <td>{position.department?.name}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
                } */}
            </Accordion.Body>
        </>
    )
}

export default RoleItem