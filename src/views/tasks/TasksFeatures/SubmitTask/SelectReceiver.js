/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { Col, Form, Image, ListGroup, Row } from 'react-bootstrap'

import employeesApi from '~/api/employeesApi'
import useOnClickOutside from '~/customHooks/useOnClickOutside'

const SelectReiver = ({ current, placeholder, onChange, onBlur }) => {

    const [visible, setVisible] = useState(false)
    const [name, setName] = useState("")
    const [receivers, setReceivers] = useState([])

    const refForm = useRef()        // Ref form select current

    useEffect(() => {
        if (current.id !== -1) {
            setName(current.name)
        }
    }, [])

    useEffect(() => {
        employeesApi.getEmployeeListByName(name)
            .then((response) => {
                setReceivers(response.data.data.employees)
            })
    }, [name])

    useOnClickOutside(refForm, () => setVisible(false))     // Hàm xử lý đóng form khi click ra ngoài

    return (
        <div
            className="position-relative"
            ref={refForm}
        >
            <Form.Control
                type="search"
                name="receiver"
                placeholder={placeholder}
                onClick={() => setVisible(!visible)}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={onBlur}
            />
            <div className="select">
                {
                    visible && receivers.map((receiver) => (
                        <ListGroup.Item
                            className="list-group-item-action d-flex cursor-pointer"
                            key={receiver.id}
                            onClick={() => {
                                onChange(receiver)
                                setName(receiver.name)
                                setVisible(false)
                            }}
                            active={current.id === receiver.id}
                        >
                            <Image
                                src={receiver.avatar}
                                width={40}
                                height={40}
                                className="rounded-circle col-auto me-3"
                            />
                            <Row className="flex-column col">
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