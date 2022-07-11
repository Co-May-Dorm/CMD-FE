import React from 'react'
import { Dropdown } from 'react-bootstrap'

import moreIcon from "~/assets/icons/more.svg"
import EditEmployee from './EmployeesFeatures/EditEmployee'
import DeleteEmployee from './EmployeesFeatures/DeleteEmployee'
import LockEmployee from './EmployeesFeatures/LockEmployee'
import ResetPassword from './EmployeesFeatures/ResetPassword'

const EmployeeRow = ({ employeeInfo }) => {

    // Hàm hiển thị ngày sinh
    const showDate = () => {
        const dateOfBirth = new Date(employeeInfo.dateOfBirth)      // Khởi tạo biến dateOfBirth kiểu dữ liệu Date với dữ liệu truyền vào là ngày sinh của sinh viên được lấy từ database có dạng yyyymmdd
        return "" + (dateOfBirth.getDate() < 10 ? "0" : "") + dateOfBirth.getDate() + "/" + (dateOfBirth.getMonth() + 1 < 10 ? "0" : "") + (dateOfBirth.getMonth() + 1) + "/" + dateOfBirth.getFullYear()
    }

    let activeStatusElement = <span className="d-inline-block rounded-circle bg-success" style={{ height: "10px", width: "10px" }} />
    if (employeeInfo.active === false) {
        activeStatusElement = <span className="d-inline-block rounded-circle bg-secondary" style={{ height: "10px", width: "10px" }} />
    }

    const mainDepartment = employeeInfo.departments.length > 0 && employeeInfo.departments?.reduce((min, department) => min.level < department.level ? min : department)

    return (
        <div
            className="item employee list-group-item"
            style={{
                border: "none"
            }}
        >
            <div className="item-label" />
            <div className="ms-lg-5" />
            <div className="employee-active">
                {activeStatusElement}
            </div>
            <div className="employee-name">
                <div className="d-lg-none fw-bold col text-break">
                    Họ và tên:
                </div>
                <div className="col text-break">
                    {employeeInfo.name}
                </div>
            </div>
            <div className="employee-dob">
                <div className="d-lg-none fw-bold col text-break">
                    Ngày sinh:
                </div>
                <div className="col text-break">
                    {showDate()}
                </div>
            </div>
            <div className="employee-email">
                <div className="d-lg-none fw-bold col text-break">
                    Email:
                </div>
                <div className="col text-break">
                    {employeeInfo.email}
                </div>
            </div>
            <div className="employee-phoneNumber">
                <div className="d-lg-none fw-bold col text-break">
                    Số điện thoại:
                </div>
                <div className="col text-break">
                    {employeeInfo.phoneNumber}
                </div>
            </div>
            <div className="employee-department">
                <div className="d-lg-none fw-bold col text-break">
                    Phòng:
                </div>
                <div className="col text-break">
                    {mainDepartment.name || "Trống"}
                </div>
            </div>
            <div className="employee-position">
                <div className="d-lg-none fw-bold col text-break">
                    Chức vụ:
                </div>
                <div className="col text-break">
                    {mainDepartment.position?.name || "Trống"}
                </div>
            </div>
            <Dropdown className="employee-more">
                <Dropdown.Toggle variant="none">
                    <img src={moreIcon} alt="More Icon" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                    <EditEmployee employee={employeeInfo} />
                    <DeleteEmployee employee={employeeInfo} />
                    <LockEmployee employee={employeeInfo} />
                    <ResetPassword employee={employeeInfo} />
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default EmployeeRow