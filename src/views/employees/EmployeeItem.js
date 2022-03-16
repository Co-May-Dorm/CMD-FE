import React from 'react'
import { Col, Dropdown, Row } from 'react-bootstrap'
import { BsFileLock, BsThreeDotsVertical } from "react-icons/bs"
import DeleteEmployee from './DeleteEmployee'
import EditEmployee from './SubmitEmployee/EditEmployee'

const EmployeeItem = ({ employee }) => {
    const standardizingName = (str) => {
        const convertToArray = str.toLowerCase().split(' ')
        const result = convertToArray.map(val => val.replace(val.charAt(0), val.charAt(0).toUpperCase()))
        return result.join(' ');
    }
    const showDate = () => {
        const dateOfBirth = new Date(employee.dateOfBirth)
        return "" + (dateOfBirth.getDate() < 10 ? "0" : "") + dateOfBirth.getDate() + "/" + (dateOfBirth.getMonth() + 1 < 10 ? "0" : "") + (dateOfBirth.getMonth() + 1) + "/" + dateOfBirth.getFullYear()
    }
    return (
        <>

            {/* Giao diện hiển thị khi >= xl */}
            <div className="d-lg-flex d-none item justify-content-evenly align-items-center mb-3">
                <div className="item-label" />
                <div className="col-2 text-break" style={{ paddingLeft: "3rem" }}>{standardizingName(employee.name)}</div>
                <div className="col-1 text-break">{showDate()}</div>
                <div className="col-3 text-break">{employee.email}</div>
                <div className="col-1 text-break">{employee.phoneNumber}</div>
                <div className="col-2 text-break">{employee.department?.name}</div>
                <div className="col-2 text-break">{employee.positionList[0].name}</div>
                <Dropdown>
                    <Dropdown.Toggle
                        variant="none"
                        className="more col-auto p-0"
                    >
                        <BsThreeDotsVertical />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                        <Dropdown.Item>
                            <BsFileLock /> Cấp lại mật khẩu
                        </Dropdown.Item>
                        <EditEmployee employee={employee} />
                        <DeleteEmployee id={employee.id} />
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* Giao diện hiển thị khi < xl */}
            <div className="d-lg-none list-group-item row justify-content-evenly align-items-center">
                <Row className="mb-3 mt-3">
                    <Col className="fw-bold text-break">
                        Họ và tên:
                    </Col>
                    <Col className="text-break">
                        {standardizingName(employee.name)}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col className="fw-bold text-break">
                        Ngày sinh:
                    </Col>
                    <Col className="text-break">
                        {showDate()}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col className="fw-bold text-break">
                        Email:
                    </Col>
                    <Col className="text-break">
                        {employee.email}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col className="fw-bold text-break">
                        Số điện thoại:
                    </Col>
                    <Col className="text-break">
                        {employee.phoneNumber}
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col className="fw-bold text-break">
                        Phòng ban:
                    </Col>
                    <Col className="text-break">
                        {employee.department?.name}
                    </Col>
                </Row>
                <Row className="mb-0">
                    <Col className="fw-bold text-break">
                        Chức vụ:
                    </Col>
                    <Col className="text-break">
                        {employee.position?.name}
                    </Col>
                </Row>
                <Row className="justify-content-between">
                    <div className="col" />
                    <Dropdown className="col-auto p-0">
                        <Dropdown.Toggle variant="none">
                            <BsThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                            <Dropdown.Item>
                                <BsFileLock /> Cấp lại mật khẩu
                            </Dropdown.Item>
                            <EditEmployee employee={employee} />
                            <DeleteEmployee id={employee.id} />
                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
            </div>

        </>
    )
}

export default EmployeeItem