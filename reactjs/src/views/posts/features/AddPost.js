import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import FormSubmitPost from './FormSubmitPost'

const AddPost = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <Button
                variant="primary"
                onClick={() => setVisible(!visible)}
            >
                <span className="fw-bold">
                    Đăng bài viết mới
                </span>
            </Button>
            <FormSubmitPost visible={visible} setVisible={setVisible} />

        </>
    )
}

export default AddPost