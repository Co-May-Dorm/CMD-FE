import React, { useEffect, useState } from 'react'
import { Button, Form, Offcanvas } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'

import employeesApi from '~/api/employeesApi'
import MultiSelect from '~/components/MultiSelect'
import tasksApi from '~/api/tasksApi'
import departmentsApi from '~/api/departmentsApi'

const FiltersAdvanced = ({ filtersAdvanced, setFiltersAdvanced }) => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [creatorList, setCreatorList] = useState([])
    const [receiverList, setReceiverList] = useState([])
    const [departmentList, setDepartmentList] = useState([])
    const [statusList, setStatusList] = useState([])

    useEffect(() => {
        employeesApi.getEmployeeListByName("")
            .then((response) => {
                setCreatorList(response.data.data.employees)
                setReceiverList(response.data.data.employees)
            })
        tasksApi.getStatusList()
            .then((response) => {
                setStatusList(response.data.data)
            })
        departmentsApi.getDepartmentList()
            .then((response) => {
                setDepartmentList(response.data.data)
            })
    }, [])

    const handleCreatorSearch = (value) => {
        setLoading(true)
        employeesApi.getEmployeeListByName(value)
            .then((response) => {
                setCreatorList(response.data.data.employees)
            })
        setLoading(false)
    }
    const handleReceiverSearch = (value) => {
        setLoading(true)
        employeesApi.getEmployeeListByName(value)
            .then((response) => {
                setReceiverList(response.data.data.employees)
            })
        setLoading(false)
    }
    const handleStatusSearch = (value) => {
        setLoading(true)
        tasksApi.getStatusList()
            .then((response) => {
                const results = response.data.data.filter((status) => status.name.includes(value))
                setStatusList(results)
            })
        setLoading(false)
    }
    const handleDepartmentSearch = (value) => {
        setLoading(true)
        departmentsApi.getDepartmentList()
            .then((response) => {
                const results = response.data.data.filter((department) => department.name.includes(value))
                setDepartmentList(results)
            })
        setLoading(false)
    }

    /* Xử lý Form với Formik */
    let initialValues = filtersAdvanced

    const validationSchema = Yup.object({
        title: Yup.string(),
        creators: Yup.array(),
        receivers: Yup.array(),
        startDate: Yup.date(),
        finishDate: Yup.date(),
        statuses: Yup.array(),
        departments: Yup.array(),
        rate: Yup.number(),
        priority: Yup.number(),
    })

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        const data = {
            ...values,
            creatorIds: values.creators?.map((creator) => creator.id) || [],
            receiverIds: values.receivers?.map((receiver) => receiver.id) || [],
            statusIds: values.statuses?.map((status) => status.id) || [],
            departmentIds: values.departments?.map((department) => department.id) || [],
        }
        setFiltersAdvanced({
            ...filtersAdvanced,
            ...data
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
                                    ({ values, handleChange, handleSubmit, handleReset, setFieldValue }) => (
                                        <Form onSubmit={handleSubmit}>
                                            <div className="mb-4">
                                                <Form.Label>Tên công việc:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="title"
                                                    placeholder="Nhập tên công việc..."
                                                    value={values.title}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Người giao:</Form.Label>
                                                <MultiSelect
                                                    placeholder="Chọn người giao..."
                                                    displayValue="name"
                                                    showCheckbox
                                                    options={creatorList}
                                                    loading={loading}
                                                    onSelect={(selectedList) => {
                                                        setFieldValue("creators", selectedList)
                                                    }}
                                                    onRemove={(selectedList) => {
                                                        setFieldValue("creators", selectedList)
                                                    }}
                                                    onSearch={handleCreatorSearch}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Người nhận:</Form.Label>
                                                <MultiSelect
                                                    placeholder="Chọn người nhận..."
                                                    displayValue="name"
                                                    showCheckbox
                                                    options={receiverList}
                                                    loading={loading}
                                                    onSelect={(selectedList) => {
                                                        setFieldValue("receivers", selectedList)
                                                    }}
                                                    onRemove={(selectedList) => {
                                                        setFieldValue("receivers", selectedList)
                                                    }}
                                                    onSearch={handleReceiverSearch}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Trạng thái:</Form.Label>
                                                <MultiSelect
                                                    placeholder="Chọn trạng thái..."
                                                    displayValue="name"
                                                    showCheckbox
                                                    options={statusList}
                                                    loading={loading}
                                                    onSelect={(selectedList) => {
                                                        setFieldValue("statuses", selectedList)
                                                    }}
                                                    onRemove={(selectedList) => {
                                                        setFieldValue("statuses", selectedList)
                                                    }}
                                                    onSearch={handleStatusSearch}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Phòng ban:</Form.Label>
                                                <MultiSelect
                                                    placeholder="Chọn phòng ban..."
                                                    displayValue="name"
                                                    showCheckbox
                                                    options={departmentList}
                                                    loading={loading}
                                                    onSelect={(selectedList) => {
                                                        setFieldValue("departments", selectedList)
                                                    }}
                                                    onRemove={(selectedList) => {
                                                        setFieldValue("departments", selectedList)
                                                    }}
                                                    onSearch={handleDepartmentSearch}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Ngày tạo từ:</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="startDate"
                                                    value={values.startDate}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Ngày hoàn thành từ:</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="finishDate"
                                                    value={values.finishDate}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <Button variant="primary" onClick={handleReset}>
                                                Đặt lại
                                            </Button>
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