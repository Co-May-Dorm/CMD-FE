import React, { useRef, useState } from 'react'

import { ListGroup } from 'react-bootstrap'
import departmentLevelIcon from '../../../assets/icons/department_level.svg'

import useOnClickOutside from '../../../customHooks/useOnClickOutside'

const FormSelectDepartment = ({ currentDepartment, departments, onDepartmentChange }) => {

    const [visible, setVisible] = useState(false)

    //
    const ref = useRef()

    /* Hàm xử lý đóng các Dropdown khi click ra ngoài */
    useOnClickOutside(ref, () => setVisible(false))
    //

    // Chuỗi lệnh hiển thị tên phòng ban phân cấp
    const selectDepartmentElement = []
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
                        onClick={() => onDepartmentChange(department_child)}
                        active={currentDepartment?.name === department_child.name}
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
                        onClick={() => onDepartmentChange(department)}
                        active={currentDepartment?.name === department.name}
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
            {currentDepartment?.name || "Chọn phòng của sinh viên"}
            <div className="select">
                {(visible) ? selectDepartmentElement : null}
            </div>
        </div>
    )
}

export default FormSelectDepartment