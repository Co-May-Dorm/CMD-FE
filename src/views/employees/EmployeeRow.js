import React, { useState } from 'react'
import { Dropdown, Image } from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'
import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs'

import moreIcon from "~/assets/icons/more.svg"
import DeleteEmployee from './EmployeesFeatures/DeleteEmployee'
import LockEmployee from './EmployeesFeatures/LockEmployee'
import ResetPassword from './EmployeesFeatures/ResetPassword'
import FormSubmitEmployee from './EmployeesFeatures/SubmitEmployee/FormSubmitEmployee'

const EmployeeRow = ({ employeeInfo }) => {
    const [visibleEditEmployeeUI, setVisibleEditEmployeeUI] = useState(false)
    const [visibleLockEmployeeUI, setVisibleLockEmployeeUI] = useState(false)
    const [visibleDeleteEmployeeUI, setVisibleDeleteEmployeeUI] = useState(false)

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
                    <Image src={employeeInfo.avatar} width={40} className="rounded-circle me-2" />
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
            <Dropdown className="employee-more more">
                <Dropdown.Toggle variant="none">
                    <Image src={moreIcon} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                    <Dropdown.Item onClick={() => setVisibleEditEmployeeUI(true)}>
                        <BiEdit /> Chỉnh sửa
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setVisibleLockEmployeeUI(true)}>
                        {
                            employeeInfo.active ? <><BsFillLockFill /> Khóa tài khoản</> : <><BsFillUnlockFill /> Mở khóa tài khoản</>
                        }
                    </Dropdown.Item>
                    <DeleteEmployee employee={employeeInfo} />
                    <ResetPassword employee={employeeInfo} />
                </Dropdown.Menu>
            </Dropdown>
            {
                visibleEditEmployeeUI && <FormSubmitEmployee visible={visibleEditEmployeeUI} setVisible={setVisibleEditEmployeeUI} employee={employeeInfo} />
            }
            {
                visibleLockEmployeeUI && <LockEmployee visible={visibleLockEmployeeUI} setVisible={setVisibleLockEmployeeUI} employee={employeeInfo} />
            }
        </div>
    )
}

export default EmployeeRow