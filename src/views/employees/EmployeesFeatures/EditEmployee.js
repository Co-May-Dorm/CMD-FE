import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'
import { useDispatch } from 'react-redux'

import { getDepartmentList } from '~/redux/departmentsSlice'
import { getTeamList } from '~/redux/teamsSlice'
import FormSubmitEmployee from './SubmitEmployee/FormSubmitEmployee'

const EditEmployee = ({ employee }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    dispatch(getDepartmentList())
    dispatch(getTeamList())
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