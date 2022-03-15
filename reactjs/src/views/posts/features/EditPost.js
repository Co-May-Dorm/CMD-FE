import React, { useState } from 'react'
import FormSubmitPost from './FormSubmitPost'

const EditPost = ({ data }) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <span
                className="cursor-pointer"
                onClick={() => setVisible(true)}
            >
                Chỉnh sửa
            </span>
            <FormSubmitPost
                data={data}
                visible={visible}
                setVisible={setVisible}
            />

        </>
    )
}

export default EditPost