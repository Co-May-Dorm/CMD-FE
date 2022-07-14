import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button, Col, Form, Modal, Row, Tab, Tabs } from "react-bootstrap"
import { BiPlusMedical, BiTrash } from "react-icons/bi"
import { Formik } from "formik"
import * as Yup from "yup"
import clsx from "clsx"

import { addTask, updateTask } from "~/redux/tasksSlice"
import { employeesSelector, departmentsSelector } from "~/redux/selectors"
import { fetchEmployees } from "~/redux/employeesSlice"
import Option from "~/components/Option"

const FormSubmitTask = ({ visible, setVisible, task = null }) => {
    const employees = useSelector(employeesSelector).data
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [])

    /* Xử lý Form với Formik */
    let initialValues = {
        title: "",
        creatorId: localStorage.getItem("userInfo").id,
        receiverId: null,
        priority: 1,
        description: "",
        startDate: new Date(),
        endDate: new Date()
    }
    if (task?.id) {
        initialValues = {
            title: task.title,
            creatorId: task.creator.id,
            receiverId: task.receiver.id,
            priority: task.priority,
            description: task.description,
            startDate: task.startDate,
            endDate: task.endDate
        }
    }

    const validationSchema = Yup.object({
        title: Yup.string().required("Vui lòng nhập tên công việc."),
        receiverId: Yup.object({
            id: Yup.number().required(),
            name: Yup.string().required()
        }).required("Vui lòng chọn người được giao"),
        priority: Yup.number().required("Vui lòng chọn mức độ ưu tiên"),
        description: Yup.string().required("Vui lòng nhập mô tả công việc"),
        startDate: Yup.date().required("Vui lòng nhập ngày bắt đầu."),
        endDate: Yup.date().required("Vui lòng nhập ngày kết thúc.")
    })

    const handleSubmit = async (values, actions) => {
        console.log(values)
        actions.setSubmitting(true)
        if (task?.id) {
            dispatch(updateTask(values))
        }
        else {
            dispatch(addTask(values))
        }
        setVisible(false)
        actions.setSubmitting(false)
    }
    //

    return (
        <Modal className="modal-fullheight" size="md" scrollable show={visible} onHide={() => setVisible(false)}>
            <Modal.Header closeButton>
                <Modal.Title className="text-white">{task?.id ? "Chỉnh sửa công việc" : "Thêm công việc"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <Form.Label>Tên công việc:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        placeholder="Tên công việc"
                                        className={clsx({
                                            "is-invalid": touched.title && errors.title
                                        })}
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        touched.title && errors.title && <div className="invalid-feedback">{errors.title}</div>
                                    }
                                </div>
                                <div className="mb-3">
                                    <Form.Label>Người nhận:</Form.Label>
                                    <Option
                                        index={null}
                                        placeholder="Chọn người nhận"
                                        className={clsx({
                                            "is-invalid": touched.receiverId && errors.receiverId
                                        })}
                                        value={values.receiverId}
                                        onChange={(e) => {
                                            handleChange()
                                        }}
                                        data={employees?.map(employee => {
                                            return {
                                                ...employee,
                                                label: employee.name
                                            }
                                        })}
                                    />
                                    {
                                        touched.title && errors.title && <div className="invalid-feedback">{errors.title}</div>
                                    }
                                </div>
                                <div className="mb-3">
                                    <Form.Label>Mô tả:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        placeholder="Nhập mô tả công việc"
                                        className={clsx({
                                            "is-invalid": touched.description && errors.description
                                        })}
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {
                                        touched.description && errors.description && <div className="invalid-feedback">{errors.description}</div>
                                    }
                                </div>
                                <Row className="mb-3 justify-content-betwween">
                                    <div className="col-12 mb-3 col-lg-6 mb-lg-0">
                                        <Form.Label>Thời gian bắt đầu:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="startDate"
                                            placeholder="Nhập mô tả công việc"
                                            className={clsx({
                                                "is-invalid": touched.startDate && errors.startDate
                                            })}
                                            value={values.startDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            touched.startDate && errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>
                                        }
                                    </div>
                                    <div className="col-12 col-lg-6">
                                        <Form.Label>Hạn chót:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="endDate"
                                            placeholder="Nhập mô tả công việc"
                                            className={clsx({
                                                "is-invalid": touched.endDate && errors.endDate
                                            })}
                                            value={values.endDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            touched.endDate && errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>
                                        }
                                    </div>
                                </Row>
                                <Button
                                    size="lg"
                                    type="submit"
                                    className="d-table m-auto"
                                    disabled={!(dirty && isValid)}>
                                    {task?.id ? "Cập nhật thông tin" : "Xác nhận tạo mới"}
                                </Button>
                            </Form>
                        )
                    }
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default FormSubmitTask
