import React, { useState } from 'react'
import { Dropdown, Image, ListGroup } from 'react-bootstrap'
import { BiInfoSquare } from 'react-icons/bi'

import departmentLevelIcon from '~/assets/icons/department_level.svg'
import moreIcon from '~/assets/icons/more.svg'
import DepartmentDetail from './DepartmentDetail'
import EditDepartment from './DepartmentsFeatures/EditDepartment'
import DeleteDepartment from './DepartmentsFeatures/DeleteDepartment'

const DepartmentRow = ({ department }) => {
    const [visible, setVisible] = useState(false)
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
                            <Dropdown.Item onClick={() => setVisible(!visible)}>
                                <BiInfoSquare /> Chi tiết
                            </Dropdown.Item>
                            <EditDepartment department={department} />
                            <DeleteDepartment departmentId={department.id} />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </ListGroup.Item>
            {
                visible && <DepartmentDetail department={department} visible={visible} setVisible={setVisible} />
            }
        </>
    )
}

export default DepartmentRow