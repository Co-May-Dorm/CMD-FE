import React, { useState } from 'react'

import { Dropdown } from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'

import FormSubmitTask from './SubmitTask/FormSubmitTask'

const EditTask = ({ task }) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Dropdown.Item as="button">
                <div onClick={() => setVisible(!visible)}>
                    <BiEdit /> Chỉnh sửa
                </div>
            </Dropdown.Item>
            <FormSubmitTask visible={visible} setVisible={setVisible} task={task} />
        </>
    )
}

export default EditTask