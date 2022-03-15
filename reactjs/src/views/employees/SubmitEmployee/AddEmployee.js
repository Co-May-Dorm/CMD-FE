import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import FormSubmitEmployee from './FormSubmitEmployee'

const AddEmployee = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Button
                variant="primary"
                onClick={() => setVisible(!visible)}
            >
                <span className="fw-bold">
                    Tạo mới nhân viên
                </span>
            </Button>
            <FormSubmitEmployee visible={visible} setVisible={setVisible} />

        </>
    )
}

export default AddEmployee