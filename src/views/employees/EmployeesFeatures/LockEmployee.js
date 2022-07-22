import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Dropdown, Modal } from 'react-bootstrap'
import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs'

import { updateEmployee } from '~/redux/employeesSlice'


const LockEmployee = ({ employee }) => {
    const dispatch = useDispatch()
    const [visibleLockEmployee, setVisibleLockEmployee] = useState(false)              // State hiển thị thông báo xác nhận khóa tài khoản nhân viên

    // Hàm xử lý khóa tài khoản
    const handleLock = (employee) => {
        dispatch(updateEmployee({
            ...employee,
            active: !employee.active
        }))
    }

    return (
        <>
            <Dropdown.Item
                component="button"
                onClick={() => setVisibleLockEmployee(!visibleLockEmployee)}
            >
                {
                    employee.active ? <><BsFillLockFill /> Khóa tài khoản</> : <><BsFillUnlockFill /> Mở khóa tài khoản</>
                }
            </Dropdown.Item>
            {
                visibleLockEmployee && (
                    <Modal
                        scrollable
                        show={visibleLockEmployee}
                        onHide={() => setVisibleLockEmployee(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                {
                                    employee.active ? <>Khóa tài khoản - {employee.name}</> : <>Mở khóa tài khoản - {employee.name}</>
                                }
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                employee.active ? <>
                                    Bạn có chắc chắn muốn khóa tài khoản {" "}
                                    <span className="fw-bolder">
                                        {employee.name}
                                    </span>?
                                </> : <>
                                    Bạn có chắc chắn muốn mở khóa khóa tài khoản {" "}
                                    <span className="fw-bolder">
                                        {employee.name}
                                    </span>?
                                </>
                            }

                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setVisibleLockEmployee(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => handleLock(employee)}
                            >
                                Xác nhận
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        </>
    )
}

export default LockEmployee