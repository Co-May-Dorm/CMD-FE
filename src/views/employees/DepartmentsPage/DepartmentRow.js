import React, { useState } from 'react'
import { Dropdown, Image, ListGroup } from 'react-bootstrap'
import { BiInfoSquare } from 'react-icons/bi'

import departmentLevelIcon from '~/assets/icons/department_level.svg'
import moreIcon from '~/assets/icons/more.svg'
import DepartmentDetail from './DepartmentDetail'
import EditDepartment from './DepartmentsFeatures/EditDepartment'
import DeleteDepartment from './DepartmentsFeatures/DeleteDepartment'

const DepartmentRow = ({ department }) => {
    return (
        <>
            <ListGroup.Item
                action
                className="position-relative"
                style={{ paddingLeft: department.level * 40 }}
            >
                <Image src={departmentLevelIcon} />
                <span className="ps-2" /> {department.name}
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
                            <Image src={moreIcon} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                            <DepartmentDetail department={department} />
                            <EditDepartment department={department} />
                            <DeleteDepartment departmentId={department.id} />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </ListGroup.Item>
        </>
    )
}

export default DepartmentRow