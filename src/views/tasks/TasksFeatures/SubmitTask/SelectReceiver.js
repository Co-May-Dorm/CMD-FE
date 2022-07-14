import React, { useEffect, useRef, useState } from 'react'

import { Form, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { fetchEmployees } from '~/redux/employeesSlice'
import useOnClickOutside from '~/customHooks/useOnClickOutside'
import { employeesSelector } from '~/redux/selectors'

const SelectReiver = ({ current, placeholder, onChange, ...props }) => {
    const receivers = useSelector(employeesSelector).employees
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false)
    const [searcTerm, setSearchTerm] = useState({
        name: ""
    })

    const refForm = useRef()        // Ref form select current

    dispatch(fetchEmployees(searcTerm))

    useOnClickOutside(refForm, () => setVisible(false))     // Hàm xử lý đóng form khi click ra ngoài

    return (
        <div className="position-relative">
            <Form.Control
                ref={refForm}
                name="receiverId"
                
                placeholder={placeholder}
                onClick={() => setVisible(!visible)}
                value={current.name}
                onChange={(e) => setSearchTerm({
                    name: e.target.value
                })}
                {...props}
            />
            <div className="select">
                {
                    visible && receivers.map((receiver, key) => (
                        <ListGroup.Item
                            action
                            key={key}
                            onClick={() => onChange(receiver)}
                            active={current.name === receiver.name}
                        >
                            {receiver.name}
                        </ListGroup.Item>
                    ))
                }
            </div>
        </div>
    )
}

export default SelectReiver