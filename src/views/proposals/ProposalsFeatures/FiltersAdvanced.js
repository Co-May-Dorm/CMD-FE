import React, { useState } from 'react'
import { Button, Form, Offcanvas, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'

const FiltersAdvanced = ({ filtersAdvanced, setFiltersAdvanced }) => {
    const [visible, setVisible] = useState(false)

    /* Xử lý Form với Formik */
    const initialValues = filtersAdvanced

    const validationSchema = Yup.object({
        creator: Yup.string(),
        createDateFrom: Yup.date(),
        createDateTo: Yup.date(),
        proposalTypeId: Yup.number(),
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

    const handleResetFilters = () => {
        setFiltersAdvanced({
            statusIds: [],
            creator: "",
            createDateFrom: "",
            createDateTo: "",
            proposalTypeId: ""
        })
        setVisible(false)
    }

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
                                    ({ values, handleChange, handleSubmit, handleReset, setFieldValue }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <Form.Label>Người giao:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="creator"
                                                    placeholder="Nhập tên người giao..."
                                                    value={values.creator}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <Row className="mb-4 justify-content-betwween">
                                                <div className="col-12 col-lg-6">
                                                    <Form.Label>Ngày tạo từ:</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="createDateFrom"
                                                        value={values.createDateFrom}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-12 col-lg-6">
                                                    <Form.Label>Đến ngày:</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="createDateTo"
                                                        value={values.createDateTo}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </Row>
                                            <div className="mb-4">
                                                <Form.Label>Loại đề xuất:</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="proposalTypeId"
                                                    placeholder="Nhập id loại đề xuất..."
                                                    value={values.title}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-evenly">
                                                <Button
                                                    variant="outline-primary"
                                                    className="col-5 fw-bolder"
                                                    onClick={(e) => {
                                                        handleReset(e)
                                                        handleResetFilters()
                                                    }}
                                                >
                                                    Đặt lại
                                                </Button>
                                                <Button
                                                    className="col-5 fw-bolder"
                                                    type="submit"
                                                >
                                                    Áp dụng
                                                </Button>
                                            </div>
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