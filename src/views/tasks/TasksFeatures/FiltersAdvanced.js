import React, { useEffect, useState } from 'react'
import { Button, Form, Image, Offcanvas } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'

import employeesApi from '~/api/employeesApi'
import MultiSelect from '~/components/MultiSelect'
import tasksApi from '~/api/tasksApi'
import departmentsApi from '~/api/departmentsApi'
import Select from '~/components/Select'

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

    const handleResetFilters = () => {
        setFiltersAdvanced({
            title: "",
            creatorIds: [],
            receiverIds: [],
            startDate: "",
            finishDate: "",
            statusIds: [],
            departmentIds: [],
            rate: "",
            priority: "",
            rateObject: {},
            priorityObject: {}
        })
        setVisible(false)
    }

    /* Xử lý Form với Formik */
    let initialValues = {
        ...filtersAdvanced,
        creators: filtersAdvanced.creators ? filtersAdvanced.creators : [],
        receivers: filtersAdvanced.receivers ? filtersAdvanced.receivers : [],
        statuses: filtersAdvanced.statuses ? filtersAdvanced.statuses : [],
        departments: filtersAdvanced.departments ? filtersAdvanced.departments : [],
        rateObject: filtersAdvanced.rateObject ? filtersAdvanced.rateObject : {},
        priorityObject: filtersAdvanced.priorityObject ? filtersAdvanced.priorityObject : {},
    }

    const validationSchema = Yup.object({
        title: Yup.string(),
        creators: Yup.array(),
        receivers: Yup.array(),
        startDate: Yup.date(),
        finishDate: Yup.date(),
        statuses: Yup.array(),
        departments: Yup.array(),
        rateObject: Yup.object(),
        priorityObject: Yup.object(),
    })

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        const data = {
            ...values,
            creatorIds: values.creators?.map((creator) => creator.id) || [],
            receiverIds: values.receivers?.map((receiver) => receiver.id) || [],
            statusIds: values.statuses?.map((status) => status.id) || [],
            departmentIds: values.departments?.map((department) => department.id) || [],
            rate: values.rateObject?.value || "",
            priority: values.priorityObject?.value || ""
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
                                                    selectedValues={filtersAdvanced.creators}
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
                                                    selectedValues={filtersAdvanced.receivers}
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
                                                    selectedValues={filtersAdvanced.statuses}
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
                                                    selectedValues={filtersAdvanced.departments}
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
                                                <Form.Label>Đánh giá:</Form.Label>
                                                <Select
                                                    index={null}
                                                    placeholder="Chọn đánh giá"
                                                    displayValue="label"
                                                    value={values.rateObject}
                                                    options={[
                                                        {
                                                            label: "1 sao",
                                                            value: 1
                                                        },
                                                        {
                                                            label: "2 sao",
                                                            value: 2
                                                        },
                                                        {
                                                            label: "3 sao",
                                                            value: 3
                                                        },
                                                        {
                                                            label: "4 sao",
                                                            value: 4
                                                        },
                                                        {
                                                            label: "5 sao",
                                                            value: 5
                                                        },
                                                    ]}
                                                    onSelect={(index, selectedItem) => {
                                                        setFieldValue("rateObject", selectedItem)
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Form.Label>Mức độ ưu tiên:</Form.Label>
                                                <Select
                                                    index={null}
                                                    placeholder="Chọn mức độ ưu tiên"
                                                    displayValue="label"
                                                    value={values.priorityObject}
                                                    options={[
                                                        {
                                                            label: "Thấp",
                                                            value: 1
                                                        },
                                                        {
                                                            label: "Trung bình",
                                                            value: 2
                                                        },
                                                        {
                                                            label: "Cao",
                                                            value: 3
                                                        },
                                                        {
                                                            label: "Rất cao",
                                                            value: 4
                                                        }
                                                    ]}
                                                    onSelect={(index, selectedItem) => {
                                                        setFieldValue("priorityObject", selectedItem)
                                                    }}
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