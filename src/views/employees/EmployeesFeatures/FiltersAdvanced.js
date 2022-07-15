import React, { useState } from 'react'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'

const FiltersAdvanced = ({ filters, setFilters }) => {
    const [visible, setVisible] = useState(false)

    /* Xử lý Form với Formik */
    let initialValues = filters

    const validationSchema = Yup.object({
        name: Yup.string(),
        dob: Yup.date(),
        email: Yup.string(),
        phone: Yup.string(),
        dep: Yup.string(),
        pos: Yup.string()
    })

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        setFilters({
            ...filters,
            ...values
        })
        actions.setSubmitting(false)
    }
    //

    return (
        <>
            <Button
                variant="outline-primary"
                onClick={() => setVisible(!visible)}
            >
                <div className="fw-bolder">
                    Lọc nâng cao
                </div>
            </Button>
            {
                visible && (
                    <Offcanvas
                        show={visible}
                        onHide={() => setVisible(false)}
                        scroll={true}
                        backdrop
                        placement="end"
                        responsive="lg"
                    >
                        <Offcanvas.Header className="bg-gradient text-white" closeButton>
                            <Offcanvas.Title>
                                <div className="fw-bolder">
                                    Lọc nâng cao
                                </div>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {
                                    ({ values, handleChange, handleBlur, handleSubmit, setFieldValue, isValid, dirty }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <Form.Label>Họ và tên:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    placeholder="Nhập họ và tên..."
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Ngày sinh:</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="dob"
                                                    value={values.dob}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Email:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="email"
                                                    placeholder="Nhập email..."
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Số điện thoại:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phone"
                                                    placeholder="Nhập số điện thoại..."
                                                    value={values.phone}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Phòng ban:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="dep"
                                                    placeholder="Nhập tên phòng ban..."
                                                    value={values.dep}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Chức vụ:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="pos"
                                                    placeholder="Nhập tên chức vụ..."
                                                    value={values.pos}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                className="d-table m-auto"
                                            >
                                                Áp dụng
                                            </Button>
                                        </Form>
                                    )
                                }
                            </Formik>
                        </Offcanvas.Body>
                    </Offcanvas>
                )
            }
        </>
    )
}

export default FiltersAdvanced