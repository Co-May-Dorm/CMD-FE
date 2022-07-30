/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Form, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

import proposalsApi from '~/api/proposalsApi'
import { addProposal, updateProposal } from '~/redux/proposalsSlice'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    proposal: PropTypes.object
}

const FormSubmitProposal = ({ visible, setVisible, proposal }) => {
    const dispatch = useDispatch()
    const [formElement, setFormElement] = useState([])
    const [values, setValues] = useState({})
    console.log(values)
    const dataTypes = [{ id: 1, name: "Text" }, { id: 2, name: "Number" }, { id: 3, name: "Date" }, { id: 4, name: "Select" }, { id: 5, name: "Email" }, { id: 6, name: "Password" }, { id: 7, name: "MultiSelect" }, { id: 8, name: "Checkbox" }, { id: 9, name: "Radio" }, { id: 10, name: "Radio" }, { id: 10, name: "Switch" }, { id: 11, name: "Textarea" }, { id: 12, name: "HTML" }, { id: 13, name: "Range" }]

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        proposalsApi.getProposalTypeDetail(1)
            .then((response) => {
                let tempElement = []
                const data = response.data.data
                data.fields.forEach((field) => {
                    switch (field.dataType.name) {
                        case "Text":
                            tempElement.push(
                                <div className="mb-4" >
                                    <Form.Label>
                                        {field.label}:
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={values[field.name]}
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                    {
                                        field.required && <Form.Control.Feedback type="invalid">
                                            {field.feedBack}
                                        </Form.Control.Feedback>
                                    }
                                    <div className="mt-1">
                                        {field.description}
                                    </div>
                                </div>
                            )
                            break
                        case "Number":
                            tempElement.push(
                                <div className="mb-4">
                                    <Form.Label>
                                        {field.label}:
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={values[field.name]}
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                    {
                                        field.required && <Form.Control.Feedback type="invalid">
                                            {field.feedBack}
                                        </Form.Control.Feedback>
                                    }
                                    <div className="mt-1">
                                        {field.description}
                                    </div>
                                </div>
                            )
                            break
                        case "Textarea":
                            tempElement.push(
                                <div className="mb-4">
                                    <Form.Label>
                                        {field.label}:
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={values[field.name]}
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                    {
                                        field.required && <Form.Control.Feedback type="invalid">
                                            {field.feedBack}
                                        </Form.Control.Feedback>
                                    }
                                    <div className="mt-1">
                                        {field.description}
                                    </div>
                                </div>
                            )
                            break
                        case "HTML":
                            tempElement.push(
                                <div className="mb-4">
                                    <Form.Label>
                                        {field.label}:
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        value={values[field.name]}
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                    {
                                        field.required && <Form.Control.Feedback type="invalid">
                                            {field.feedBack}
                                        </Form.Control.Feedback>
                                    }
                                    <div className="mt-1">
                                        {field.description}
                                    </div>
                                </div>
                            )
                            break
                        default:
                            break
                    }
                })
                setFormElement(tempElement)
            })
    }, [])


    /* Xử lý Submit Form */
    const [validated, setValidated] = useState(false)
    const handleSubmit = (e) => {
        console.log(values)
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        setValidated(true)
        if (form.checkValidity() === true) {
            e.preventDefault()
            e.stopPropagation()
            // if (proposal.id) {
            //     setVisible(false)
            //     dispatch(updateProposal(values))
            // }
            // else {
            //     setVisible(false)
            //     dispatch(addProposal(values))
            // }
        }
    }
    //

    return (
        <Modal
            className="modal-fullheight"
            size="md"
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {proposal?.id ? "Chỉnh sửa đề xuất" : "Thêm đề xuất"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    {formElement.map((element, index) => (
                        <React.Fragment key={index}>
                            {element}
                        </React.Fragment>
                    ))}
                    <Button
                        size="lg"
                        type="submit"
                        className="d-table m-auto"
                    >
                        {(proposal?.id) ? "Cập nhật thông tin" : "Xác nhận tạo mới"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

FormSubmitProposal.propTypes = propTypes

export default FormSubmitProposal