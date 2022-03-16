import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { BsFillCircleFill } from 'react-icons/bs'

const SelectDepartment = ({ visible, currentDepartment, departments, onDepartmentChange }) => {
    // Chuỗi lệnh hiển thị tên phòng ban phân cấp
    const selectDepartmentElement = []
    const recursiveDepartmentChild = (department_parent, level) => {
        departments.forEach((department_child) => {
            if (department_parent.id === department_child.parent_id) {
                selectDepartmentElement.push(
                    <ListGroup.Item
                        component="button"
                        key={department_child.id}
                        style={{ paddingLeft: level * 40 }}
                        onClick={() => onDepartmentChange(department_child)}
                        active={currentDepartment?.name === department_child.name}
                    >
                    <BsFillCircleFill size={5} />
                    <span className="ps-2" />
                        {department_child.name}
                    </ListGroup.Item>)
                recursiveDepartmentChild(department_child, level + 1)
            }
        })
    }
    const traverseDepartment = () => {
        departments.forEach((department) => {
            if (!department.parent_id) {
                selectDepartmentElement.push(
                    <ListGroup.Item
                        action
                        key={department.id}
                        onClick={() => onDepartmentChange(department)}
                        active={currentDepartment?.name === department.name}
                    >
                    <BsFillCircleFill size={5} />
                    <span className="ps-2" />
                        {department.name}
                    </ListGroup.Item>)
                recursiveDepartmentChild(department, 1)
            }
        })
    }
    traverseDepartment();
    //

    return (
        <ListGroup>
            {(visible) ? selectDepartmentElement : null}
        </ListGroup>
    )
}

export default SelectDepartment