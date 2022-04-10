import React from 'react'

import { useSelector } from 'react-redux'
import { Dropdown, ListGroup, Modal, Table } from 'react-bootstrap'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

import EditDepartment from './DepartmentsFeatures/EditDepartment'
import DeleteDepartment from './DepartmentsFeatures/DeleteDepartment'

const DepartmentDetail = ({
    department,
    visible,
    setVisible
}) => {
    const departments = useSelector(state => state.departments.data)    // Lấy danh sách phòng ban từ redux

    let parentName = ""     // Khởi tạo tên phòng ban cha mặc định là rỗng

    // Duyệt qua danh sách phòng ban để tìm ra tên phòng ban cha
    departments.forEach(dp => {
        if (dp.id === department.fatherDepartmentId) {
            parentName = dp.name
        }
    })

    return (
        <Modal
            className="modal-fullheight"
            size="md"
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
            <div className="modal-header row justify-content-evenly">
                <div className="col-auto">
                    <Modal.Title>CHI TIẾT PHÒNG BAN</Modal.Title>
                </div>
                <div className="col" />
                <Dropdown className="col-auto">
                    <Dropdown.Toggle variant="none" className="text-white">
                        <BiDotsHorizontalRounded size={20} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                        <EditDepartment department={department} />
                        <DeleteDepartment id={department.id} />
                    </Dropdown.Menu>
                </Dropdown>
                <button className="col-auto btn-close me-3" onClick={() => setVisible(false)} />
            </div>
            <Modal.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        Mã phòng ban: {department.code}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Tên phòng ban: {department.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Thuộc sự quản lý của phòng ban: {parentName || department.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Mô tả về phòng ban: {(department.description === "") ? "Chưa có mô tả" : department.description}
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
                                    department.positions.map((position, index) => (
                                        <tr key={index}>
                                            <td>{position.name}</td>
                                            <td>{position?.role.name}</td>
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

export default DepartmentDetail