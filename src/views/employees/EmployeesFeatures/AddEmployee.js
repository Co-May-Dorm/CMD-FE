import React, { useState } from 'react'

import { Button } from 'react-bootstrap'

import FormSubmitEmployee from './FormSubmitEmployee'

const AddEmployee = () => {
    const [visibleFormAddEmployee, setVisibleFormAddEmployee] = useState(false)       // State hiển thị Form thêm sinh viên
    return (
        <>
            <Button
                variant="primary"
                onClick={() => setVisibleFormAddEmployee(!visibleFormAddEmployee)}
            >
                <span className="fw-bold">
                    Thêm sinh viên
                </span>
            </Button>
            <FormSubmitEmployee visible={visibleFormAddEmployee} setVisible={setVisibleFormAddEmployee} />

        </>
    )
}

export default AddEmployee