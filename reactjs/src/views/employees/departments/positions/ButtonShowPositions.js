import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { BsJournalMedical } from 'react-icons/bs'
import Positions from './Positions'

const ButtonShowPositions = ({ department }) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Dropdown.Item onClick={() => setVisible(!visible)}>
                <BsJournalMedical /> Chức vụ
            </Dropdown.Item>
            <Positions visible={visible} setVisible={setVisible} department={department} />
        </>
    )
}

export default ButtonShowPositions