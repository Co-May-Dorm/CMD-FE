import React, { useEffect, useRef, useState } from 'react'
import { Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'

import useOnClickOutside from '~/customHooks/useOnClickOutside'
import { employeesSelector } from '~/redux/selectors'

const SelectReiver = ({ current, placeholder, onChange, onBlur }) => {
    const receivers = useSelector(employeesSelector).employees

    const [visible, setVisible] = useState(false)
    const [name, setName] = useState("")
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
                onChange={(e) => setName(e.target.value)}
                onBlur={onBlur}
            />
            <div className="select">
                {
                    visible && receivers.map((receiver) => (
                        <ListGroup.Item
                            className="list-group-item-action"
                            key={receiver.id}
                            onClick={() => onChange(receiver)}
                            active={current.id === receiver.id}
                        >
                                            <Image
                                                src={receiver.avatar}
                                                width={40}
                                                height={40}
                                                className="rounded-circle col-auto me-2"
                                            />
                                            <Row className="flex-column">
                                                <Col className="fw-bolder">
                                                    {receiver.name}
                                                </Col>
                                                <Col>
                                                    {receiver.code}
                                                </Col>
                                            </Row>
                        </ListGroup.Item>
                    ))
                }
            </div>
        </div>
    )
}

export default SelectReiver