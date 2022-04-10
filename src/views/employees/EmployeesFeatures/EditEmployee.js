import React from 'react'
import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'
import FormSubmitEmployee from './FormSubmitEmployee'

const EditEmployee = ({ employee }) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Dropdown.Item as="button">
                <div onClick={() => setVisible(!visible)}>
                    <BiEdit /> Chỉnh sửa
                </div>
            </Dropdown.Item>
            <FormSubmitEmployee visible={visible} setVisible={setVisible} employee={employee} />
        </>
    )
}

export default EditEmployee