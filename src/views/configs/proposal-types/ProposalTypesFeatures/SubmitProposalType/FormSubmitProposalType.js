import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from "react-redux"
import { Button, Form, Modal, Row } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import clsx from "clsx"

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    proposalType: PropTypes.object
}

const FormSubmitProposalType = ({ visible, setVisible, proposalType }) => {
    /* Xử lý Form với Formik */
    let initialValues = {
        name: "",
        subsystem: "",
        creators: [],
        repeat: 1
    }
    if (proposalType?.id) {
        initialValues = proposalType
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Vui lòng nhập tên loại đề xuất."),
        subsystem: Yup.number().required("Vui lòng chọn phân hệ"),
        creators: Yup.array().oneOf({
            id: Yup.number().required()
        }),
        repeat: Yup.number()
    })

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        if (proposalType?.id) {
            
        }
        else {
            
        }
        setVisible(false)
        actions.setSubmitting(false)
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
                    {proposalType?.id ? "Chỉnh sửa loại đề xuất" : "Tạo loại đề xuất"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue, isValid, dirty }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <Form.Label>Tên loại đề xuất:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Nhập tên loại đề xuất"
                                        className={clsx({
                                            "is-invalid": touched.name && errors.name
                                        })}
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>
                                    }
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Phân hệ:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Nhập tên loại đề xuất"
                                        className={clsx({
                                            "is-invalid": touched.name && errors.name
                                        })}
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>
                                    }
                                </div>
                            </Form>
                        )
                    }
                    </Formik>
            </Modal.Body>
        </Modal>
    )
}

FormSubmitProposalType.propTypes = propTypes

export default FormSubmitProposalType