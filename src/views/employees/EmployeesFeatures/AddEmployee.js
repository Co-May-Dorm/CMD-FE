import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import FormSubmitEmployee from './SubmitEmployee/FormSubmitEmployee'

const AddEmployee = () => {
    const [visibleFormAddEmployee, setVisibleFormAddEmployee] = useState(false)       // State hiển thị Form thêm nhân viên
    return (
        <>
            <Button
                variant="primary"
                onClick={() => setVisibleFormAddEmployee(!visibleFormAddEmployee)}
            >
                <span className="fw-bold">
                    Thêm nhân viên
                </span>
            </Button>
            {
                visibleFormAddEmployee && <FormSubmitEmployee visible={visibleFormAddEmployee} setVisible={setVisibleFormAddEmployee} />
            }
        </>
    )
}

export default AddEmployee