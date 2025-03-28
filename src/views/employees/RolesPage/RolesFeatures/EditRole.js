import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { BiEdit } from 'react-icons/bi'

import FormSubmitRole from './FormSubmitRole'


const EditRole = ({ roleId }) => {

    const [visibleEdit, setVisibleEdit] = useState(false)

    return (
        <>
            <Button
                variant="warning"
                className="col-auto"
                onClick={() => setVisibleEdit(true)}
            >
                <BiEdit /> <span className="ps-1">Chỉnh sửa</span>
            </Button>
            <FormSubmitRole visible={visibleEdit} setVisible={setVisibleEdit} roleId={roleId} />
        </>
    )
}


export default EditRole