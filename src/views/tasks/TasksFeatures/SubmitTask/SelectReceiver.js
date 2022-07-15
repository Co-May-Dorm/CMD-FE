import React, { useEffect, useRef, useState } from 'react'

import { Form, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import useOnClickOutside from '~/customHooks/useOnClickOutside'
import { employeesSelector } from '~/redux/selectors'
import { debounce } from 'lodash'

const SelectReiver = ({ current, placeholder, onChange, ...props }) => {
    const receivers = useSelector(employeesSelector).employees
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false)
    const [searcTerm, setSearchTerm] = useState({
        name: ""
    })
    const [employeeList, setEmployeeList] = useState([])

    const refForm = useRef()        // Ref form select current

    useEffect(() => {
        
    }, [])

    const handleInputChange = () => {
        
    }

    useOnClickOutside(refForm, () => setVisible(false))     // Hàm xử lý đóng form khi click ra ngoài

    return (
        <div className="position-relative">
            <Form.Control
                ref={refForm}
                name="receiverId"
                
                placeholder={placeholder}
                onClick={() => setVisible(!visible)}
                value={current.name}
                onChange={(e) => debounce(() => setSearchTerm({
                    name: e.target.value
                }), 1000)}
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