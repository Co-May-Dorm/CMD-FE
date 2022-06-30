import React, { useState } from 'react'

import { Dropdown } from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'

import FormSubmitEmployee from './SubmitEmployee/FormSubmitEmployee'

const EditEmployee = ({ employee }) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Dropdown.Item as="button">
                <div onClick={() => setVisible(!visible)}>
                    <BiEdit /> Chỉnh sửa
                </div>
            </Dropdown.Item>
            {
                visible && <FormSubmitEmployee visible={visible} setVisible={setVisible} employee={employee} />
            }
            
        </>
    )
}

export default EditEmployee