import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Roles from './Roles'

const ButtonShowRoles = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Button
                variant="outline-primary"
                onClick={() => setVisible(!visible)}
            >
                <span className="fw-bold">
                    Vai trò
                </span>
            </Button>
            <Roles visible={visible} setVisible={setVisible} />
        </>
    )
}

export default ButtonShowRoles