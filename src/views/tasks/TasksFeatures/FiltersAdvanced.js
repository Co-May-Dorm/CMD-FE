import React, { useState } from 'react'
import { Button, Form, Modal, Offcanvas, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'

const FiltersAdvanced = ({ filtersAdvanced, setFiltersAdvanced }) => {
    const [visible, setVisible] = useState(false)

    /* Xử lý Form với Formik */
    let initialValues = filtersAdvanced

    const validationSchema = Yup.object({
        title: Yup.string(),
        creator: Yup.string(),
        receiver: Yup.string(),
        createFrom: Yup.date(),
        createTo: Yup.date(),
        finishFrom: Yup.date(),
        finishTo: Yup.date()
    })

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        setFiltersAdvanced({
            ...filtersAdvanced,
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
                                    ({ values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue, isValid, dirty }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <Form.Label>Tên công việc:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="title"
                                                    placeholder="Nhập tên công việc..."
                                                    value={values.title}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Người giao:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="creator"
                                                    placeholder="Nhập tên người giao..."
                                                    value={values.creator}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Người nhận:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="receiver"
                                                    placeholder="Nhập tên người nhận..."
                                                    value={values.receiver}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            </div>
                                            <Row className="mb-4 justify-content-betwween">
                                                <div className="col-12 col-lg-6">
                                                    <Form.Label>Ngày tạo từ:</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="createFrom"
                                                        value={values.createFrom}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                                <div className="col-12 col-lg-6">
                                                    <Form.Label>Đến ngày:</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="createTo"
                                                        value={values.createTo}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                            </Row>
                                            <Row className="mb-4 justify-content-betwween">
                                                <div className="col-12 col-lg-6">
                                                    <Form.Label>Ngày hoàn thành từ:</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="finishFrom"
                                                        value={values.finishFrom}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                                <div className="col-12 col-lg-6">
                                                    <Form.Label>Đến ngày:</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="finishTo"
                                                        value={values.finishTo}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                            </Row>
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