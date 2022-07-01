import React, { useState } from 'react'

import { Dropdown } from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'

import FormSubmitDepartment from './FormSubmitDepartment'

const EditDepartment = ({ department }) => {
    const [visibleEditDepartment, setVisibleEditDepartment] = useState(false)
    return (
        <>
            <Dropdown.Item
                onClick={() => setVisibleEditDepartment(!visibleEditDepartment)}
            >
                <BiEdit /> Chỉnh sửa
            </Dropdown.Item>
            {
                visibleEditDepartment && <FormSubmitDepartment visible={visibleEditDepartment} setVisible={setVisibleEditDepartment} department={department} />
            }
        </>
    )
}

export default EditDepartment