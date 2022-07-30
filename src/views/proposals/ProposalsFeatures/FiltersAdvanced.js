import React, { useEffect, useState } from 'react'
import { Button, Form, Offcanvas, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'

import MultiSelect from '~/components/MultiSelect'
import employeesApi from '~/api/employeesApi'
import proposalsApi from '~/api/proposalsApi'

const FiltersAdvanced = ({ filtersAdvanced, setFiltersAdvanced, type }) => {
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [creatorList, setCreatorList] = useState([])
    const [statusList, setStatusList] = useState([])
    const [proposalTypeList, setProposalTypeList] = useState([])

    useEffect(() => {
        employeesApi.getEmployeeListByName("")
            .then((response) => {
                setCreatorList(response.data.data.employees)
            })
        proposalsApi.getStatusList()
            .then((response) => {
                setStatusList(response.data.data)
            })
        proposalsApi.getProposalTypeList()
            .then((response) => {
                setProposalTypeList(response.data.data)
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
    const handleStatusSearch = (value) => {
        setLoading(true)
        proposalsApi.getStatusList()
            .then((response) => {
                const results = response.data.data.filter((status) => status.name.includes(value))
                setStatusList(results)
            })
        setLoading(false)
    }
    const handleProposalTypeSearch = (value) => {
        proposalsApi.getProposalTypeList()
            .then((response) => {
                const results = response.data.data.filter((status) => status.name.includes(value))
                setProposalTypeList(results)
            })
        setLoading(false)
    }

    /* Xử lý Form với Formik */
    let initialValues = {
        ...filtersAdvanced,
        creators: filtersAdvanced.creators ? filtersAdvanced.creators : [],
        statuses: filtersAdvanced.statuses ? filtersAdvanced.statuses : [],
        proposalTypes: filtersAdvanced.proposalTypes ? filtersAdvanced.proposalTypes : [],
    }

    const validationSchema = Yup.object({
        statuses: Yup.array(),
        creators: Yup.array(),
        createDateFrom: Yup.date(),
        createDateTo: Yup.date(),
        proposalTypes: Yup.array(),
    })

    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        const data = {
            ...values,
            creatorIds: values.creators?.map((creator) => creator.id) || [],
            statusIds: values.statuses?.map((status) => status.id) || []
        }
        setFiltersAdvanced({
            ...filtersAdvanced,
            ...data
        })
        actions.setSubmitting(false)
    }
    //

    const handleResetFilters = () => {
        setFiltersAdvanced({
            statusIds: [],
            creatorIds: "",
            createDateFrom: "",
            createDateTo: "",
            proposalTypeIds: ""
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
                                                <Form.Label>Loại đề xuất:</Form.Label>
                                                <MultiSelect
                                                    placeholder="Chọn loại đề xuất..."
                                                    displayValue="name"
                                                    showCheckbox
                                                    options={proposalTypeList}
                                                    loading={loading}
                                                    selectedValues={filtersAdvanced.proposalTypes}
                                                    onSelect={(selectedList) => {
                                                        setFieldValue("proposalTypes", selectedList)
                                                    }}
                                                    onRemove={(selectedList) => {
                                                        setFieldValue("proposalTypes", selectedList)
                                                    }}
                                                    onSearch={handleProposalTypeSearch}
                                                />
                                            </div>
                                            {
                                                type !== "created-by-me" && (
                                                    <div className="mb-4">
                                                        <Form.Label>Người đề xuất:</Form.Label>
                                                        <MultiSelect
                                                            placeholder="Chọn người đề xuất..."
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
                                                )
                                            }
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