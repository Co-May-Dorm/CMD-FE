import React, { useState } from 'react'
import { Dropdown, Image, ListGroup } from 'react-bootstrap'
import { BiEdit, BiInfoSquare, BiTrash } from 'react-icons/bi'

import departmentLevelIcon from '~/assets/icons/department_level.svg'
import moreIcon from '~/assets/icons/more.svg'
import DepartmentDetail from './DepartmentDetail'
import DeleteDepartment from './DepartmentsFeatures/DeleteDepartment'
import FormSubmitDepartment from './DepartmentsFeatures/FormSubmitDepartment'

const DepartmentRow = ({ departmentInfo }) => {
    const [visibleDepartmentDetailUI, setVisibleDepartmentDetailUI] = useState(false)
    const [visibleEditDepartmentUI, setVisibleEditDepartmentUI] = useState(false)
    const [visibleDeleteDepartmentUI, setVisibleDeleteDepartmentUI] = useState(false)

    return (
        <>
            <ListGroup.Item
                action
                className="position-relative"
                style={{ paddingLeft: departmentInfo.level * 40 }}
            >
                <Image src={departmentLevelIcon} />
                <span className="ps-2" /> {departmentInfo.name}
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
                            <Dropdown.Item onClick={() => setVisibleDepartmentDetailUI(true)}>
                                <BiInfoSquare /> Chi tiết
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setVisibleEditDepartmentUI(true)}>
                                <BiEdit /> Chỉnh sửa
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setVisibleDeleteDepartmentUI(true)}>
                                <BiTrash /> Xóa
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </ListGroup.Item>
            {
                visibleDepartmentDetailUI && <DepartmentDetail visible={visibleDepartmentDetailUI} setVisible={setVisibleDepartmentDetailUI} departmentId={departmentInfo.id} />
            }
            {
                visibleEditDepartmentUI && <FormSubmitDepartment visible={visibleEditDepartmentUI} setVisible={setVisibleEditDepartmentUI} department={departmentInfo} />
            }
            {
                visibleDeleteDepartmentUI && <DeleteDepartment visible={visibleDeleteDepartmentUI} setVisible={setVisibleDeleteDepartmentUI} departmentInfo={departmentInfo} />
            }
        </>
    )
}

export default DepartmentRow