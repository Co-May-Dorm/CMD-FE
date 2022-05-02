import React, { useState } from 'react'

import { Button } from 'react-bootstrap'

import Teams from './TeamsMainPage'

const ButtonShowTeams = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Button
                variant="outline-primary"
                onClick={() => setVisible(!visible)}
            >
                <span className="fw-bold">
                CLB/Đội nhóm
                </span>
            </Button>
            <Teams visible={visible} setVisible={setVisible} />
        </>
    )
}

export default ButtonShowTeams