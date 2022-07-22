/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { useDispatch } from "react-redux"
import { Button, Form, Modal, Row } from "react-bootstrap"
import { Formik } from "formik"
import * as Yup from "yup"
import clsx from "clsx"

import { addTask, updateTask } from "~/redux/tasksSlice"
import SelectReiver from "./SelectReceiver"

const userInfo = JSON.parse(localStorage.getItem("userInfo"))

const FormSubmitTask = ({ visible, setVisible, task = null }) => {
    const dispatch = useDispatch()

    const prioritySelectElement = (priority, handlePriorityChange) => {
        const colors = ["#75FFD6", "#3CEBC1", "#0DD2DE", "#4BA6FB"]
        const names = ["Thấp", "Bình thường", "Ưu tiên", "Rất ưu tiên"]
        let els = []
        for (let i = 1; i <= priority; i++) {
            els.push(
                <div key={i} className="col-sm-3 d-flex flex-column w-25">
                    <Button variant="outline-primary" style={{ backgroundColor: i <= priority ? colors[i - 1] : null, borderColor: i <= priority ? colors[i] : null }} onClick={() => handlePriorityChange(i)} />
                    <span className="text-center">{names[i - 1]}</span>
                </div>
            )
        }
        if (priority < colors.length) {
            for (let i = priority + 1; i <= colors.length; i++) {
                els.push(
                    <div key={i} className="col-sm-3 d-flex flex-column w-25">
                        <Button variant="outline-primary" style={{ backgroundColor: i <= priority ? colors[i - 1] : null }} onClick={() => handlePriorityChange(i)} />
                        <span className="text-center">{names[i - 1]}</span>
                    </div>
                )
            }
        }
        return els.map((item) => item)
    }

    /* Xử lý Form với Formik */
    let initialValues = {
        title: "",
        creatorId: userInfo.id,
        receiver: {
            id: -1,
            name: "Chọn nhân viên"
        },
        priority: 1,
        description: "",
        startDate: "",
        finishDate: "",
        statusId: 1
    }
    if (task?.id) {
        initialValues = task
    }

    const validationSchema = Yup.object({
        title: Yup.string().required("Vui lòng nhập tên công việc."),
        receiver: Yup.object({
            id: Yup.number().required("Vui lòng chọn người được giao"),
            name: Yup.string().required()
        }),
        priority: Yup.number().required("Vui lòng chọn mức độ ưu tiên"),
        description: Yup.string().required("Vui lòng nhập mô tả công việc"),
        startDate: Yup.date().required("Vui lòng nhập ngày bắt đầu."),
        finishDate: Yup.date().required("Vui lòng nhập ngày kết thúc.")
    })

    const handleSubmit = async (values, actions) => {
        console.log(values)
        actions.setSubmitting(true)
        if (task?.id) {
            dispatch(updateTask({
                ...values,
                creatorId: userInfo.id,
                receiverId: values.receiver.id,
                statusId: values.status.id
            }))
        }
        else {
            dispatch(addTask({
                ...values,
                creatorId: userInfo.id,
                receiverId: values.receiver.id
            }))
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
                        ({ values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue, isValid, dirty }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="mb-4">
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
                                <div className="mb-4">
                                    <Form.Label>Người nhận:</Form.Label>
                                    <SelectReiver
                                        placeholder="Chọn người nhận"
                                        current={values.receiver}
                                        onChange={(receiver) => {
                                            setFieldValue("receiver", receiver)
                                        }}
                                    />
                                    {
                                        touched.receiver?.id && errors.receiver?.id && <div className="invalid-feedback">{errors.receiver?.id}</div>
                                    }
                                </div>
                                <div className="mb-4">
                                    <Form.Label>Mức độ ưu tiên:</Form.Label>
                                    <Row>
                                        {prioritySelectElement(values.priority, (priority) => {
                                            setFieldValue("priority", priority)
                                        })}
                                    </Row>
                                </div>
                                <div className="mb-4">
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
                                <Row className="mb-4 justify-content-betwween">
                                    <div className="col-12 mb-4 col-lg-6 mb-lg-0">
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
                                            name="finishDate"
                                            placeholder="Nhập mô tả công việc"
                                            className={clsx({
                                                "is-invalid": touched.finishDate && errors.finishDate
                                            })}
                                            value={values.finishDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            touched.finishDate && errors.finishDate && <div className="invalid-feedback">{errors.finishDate}</div>
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
