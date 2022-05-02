import React, { useState } from 'react'

import { Button } from 'react-bootstrap'

import Departments from './DepartmentsMainPage'

const ButtonShowDepartments = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Button
                variant="outline-primary"
                onClick={() => setVisible(!visible)}
            >
                <span className="fw-bold">
                Phòng ban
                </span>
            </Button>
            <Departments visible={visible} setVisible={setVisible} />
        </>
    )
}

export default ButtonShowDepartments