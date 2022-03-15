import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'
import FormSubmitDepartment from './FormSubmitDepartment'

const EditDepartment = ({ department }) => {
    const [visibleEdit, setVisibleEdit] = useState(false)
    return (
        <>
            <Dropdown.Item
                onClick={() => setVisibleEdit(!visibleEdit)}
            >
                <BiEdit /> Chỉnh sửa
            </Dropdown.Item>
            <FormSubmitDepartment visible={visibleEdit} setVisible={setVisibleEdit} department={department} />
        </>
    )
}

export default EditDepartment