import React, { useState } from 'react'
import { Dropdown, ListGroup, Modal } from 'react-bootstrap'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsFillCircleFill } from 'react-icons/bs'
import DeleteDepartment from './DeleteDepartment'
import DepartmentDetail from './DepartmentDetail'
import ButtonShowPositions from './positions/ButtonShowPositions'
import EditDepartment from './SubmitDepartment/EditDepartment'

const DepartmentItem = ({ department, level }) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <ListGroup.Item
                action
                className="position-relative"
                style={{ paddingLeft: level * 40 }}
                onClick={() => setVisible(true)}
            >
                <BsFillCircleFill size={5} />
                <span className="ps-2" />
                {department.name}
            </ListGroup.Item>
            <Modal
                fullscreen
                scrollable
                show={visible}
                onHide={() => setVisible(false)}
            >
                <div className="modal-header row justify-content-evenly bg-gradient">
                    <div className="col-auto">
                        <Modal.Title>CHI TIẾT PHÒNG BAN</Modal.Title>
                    </div>
                    <div className="col" />
                    <Dropdown className="col-auto">
                        <Dropdown.Toggle variant="none" className="text-white">
                            <BiDotsHorizontalRounded size={20} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                            <ButtonShowPositions department={department} />
                            <EditDepartment department={department} />
                            <DeleteDepartment id={department.id} />
                        </Dropdown.Menu>
                    </Dropdown>
                    <button className="col-auto btn-close me-3" onClick={() => setVisible(false)} />
                </div>
                <Modal.Body>
                    <DepartmentDetail department={department} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DepartmentItem