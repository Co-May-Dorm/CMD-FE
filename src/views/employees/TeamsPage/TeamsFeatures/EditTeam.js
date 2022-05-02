import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'
import FormSubmitTeam from './FormSubmitTeam'

const EditTeam = ({ team }) => {
    const [visibleEditTeam, setVisibleEditTeam] = useState(false)
    return (
        <>
            <Dropdown.Item
                onClick={() => setVisibleEditTeam(!visibleEditTeam)}
            >
                <BiEdit /> Chỉnh sửa
            </Dropdown.Item>
            <FormSubmitTeam visible={visibleEditTeam} setVisible={setVisibleEditTeam} team={team} />
        </>
    )
}

export default EditTeam