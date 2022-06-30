import React, { useState } from 'react'

import { Button } from 'react-bootstrap'

import FormSubmitTask from './SubmitTask/FormSubmitTask'

const AddTask = () => {
    const [visibleFormAddTask, setVisibleFormAddTask] = useState(false)       // State hiển thị Form thêm công việc
    return (
        <>
            <Button
                variant="primary"
                onClick={() => setVisibleFormAddTask(!visibleFormAddTask)}
            >
                <span className="fw-bold">
                    Tạo việc
                </span>
            </Button>
            <FormSubmitTask visible={visibleFormAddTask} setVisible={setVisibleFormAddTask} />

        </>
    )
}

export default AddTask