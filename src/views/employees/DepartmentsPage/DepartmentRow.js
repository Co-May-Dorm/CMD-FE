import React, { useState } from 'react'

import departmentLevelIcon from '../../../assets/icons/department_level.svg'
import moreIcon from '../../../assets/icons/more.svg'
import { Dropdown, ListGroup } from 'react-bootstrap'

import DepartmentDetail from './DepartmentDetail'
import EditDepartment from './DepartmentsFeatures/EditDepartment'
import DeleteDepartment from './DepartmentsFeatures/DeleteDepartment'

const DepartmentRow = ({ department, level }) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <ListGroup.Item
                action
                className="position-relative"
                style={{ paddingLeft: level * 40 }}
                onDoubleClick={() => setVisible(true)}
            >
                <img src={departmentLevelIcon} alt="Panel" />
                <span className="ps-2" />
                {department.name}
                <div
                    className="position-absolute"
                    style={{
                        right: "1rem",
                        bottom: "50%",
                        transform: "translateY(50%)"
                    }}
                >
                    <Dropdown className="col-auto">
                        <Dropdown.Toggle variant="none" className="text-white">
                            <img src={moreIcon} alt="More icon" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                            <EditDepartment department={department} />
                            <DeleteDepartment id={department.id} />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </ListGroup.Item>
            <DepartmentDetail department={department} visible={visible} setVisible={setVisible} />
        </>
    )
}

export default DepartmentRow