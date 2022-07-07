/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import departmentLevelIcon from '~/assets/icons/department_level.svg'
import useOnClickOutside from '~/customHooks/useOnClickOutside'
import { fetchDepartments } from '~/redux/departmentsSlice'
import { departmentsSelector } from '~/redux/selectors'

const FormSelectDepartment = ({ index, current, onChange }) => {
    const departments = useSelector(departmentsSelector).departments
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDepartments())
    }, [])

    const [visible, setVisible] = useState(false)       // State quản lý hiển thị danh sách phòng ban

    const ref = useRef()        // Ref form select department

    useOnClickOutside(ref, () => setVisible(false))     // Hàm xử lý đóng form select department khi click ra ngoài

    // Chuỗi lệnh hiển thị tên phòng ban phân cấp
    const selectDepartmentElement = []
    if (index === null) {
        selectDepartmentElement.push(
            <ListGroup.Item
                action
                style={{
                    borderRadius: "none",
                    textAlign: "center"
                }}
                onClick={() => onChange(index, {
                    id: -1,
                    level: 0,
                    name: "Không có phòng ban cha"
                })}
                active={current.id === null}
            >
                Không có phòng ban cha
            </ListGroup.Item>
        )
    }
    const recursiveDepartmentChild = (department_parent) => {
        departments.forEach((department_child) => {
            if (department_parent.id === department_child.fatherDepartmentId) {
                selectDepartmentElement.push(
                    <ListGroup.Item
                        action
                        key={department_child.id}
                        style={{
                            paddingLeft: department_child.level * 20,
                            borderRadius: "none"
                        }}
                        onClick={() => onChange(index, department_child)}
                        active={current?.id === department_child.id}
                    >
                        <img src={departmentLevelIcon} alt="Panel" />
                        <span className="ps-2" />
                        {department_child.name}
                    </ListGroup.Item>)
                recursiveDepartmentChild(department_child, department_child.level + 1)
            }
        })
    }
    const traverseDepartment = () => {
        departments.forEach((department) => {
            if (department.fatherDepartmentId === -1) {
                selectDepartmentElement.push(
                    <ListGroup.Item
                        action
                        key={department.id}
                        style={{
                            paddingLeft: department.level * 20,
                            borderRadius: "none"
                        }}
                        onClick={() => onChange(index, department)}
                        active={current?.name === department.name}
                    >
                        <img src={departmentLevelIcon} alt="Panel" />
                        <span className="ps-2" />
                        {department.name}
                    </ListGroup.Item>)
                recursiveDepartmentChild(department)
            }
        })
    }
    traverseDepartment();
    //

    return (
        <div
            ref={ref}
            onClick={() => setVisible(!visible)}
            className="form-select"
        >
            <input
                type="text"
                name="department"
                placeholder="Chọn phòng ban"
                value={current?.name || ""}
                onChange={() => {

                }}
                readOnly
                required
                style={{
                    width: "100%",
                    backgroundColor: "none",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    color: "#2f6bb1",
                    padding: "0"
                }}
            />
            <Form.Control.Feedback type="invalid">
                Vui lòng chọn phòng ban
            </Form.Control.Feedback>

            <div className="select">
                {(visible) && selectDepartmentElement}
            </div>
        </div>
    )
}

export default FormSelectDepartment