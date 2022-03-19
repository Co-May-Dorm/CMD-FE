import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, Col, Container, Dropdown, Row } from 'react-bootstrap'
import * as actions from '../../actions/employeesAction'
import AppPagination from '../../components/AppPagination'
import EmployeeItem from './EmployeeItem'
import AddEmployee from './SubmitEmployee/AddEmployee'
import ButtonShowDepartments from './departments/ButtonShowDepartments'
import AppSearch from '../../components/AppSearch'
import ButtonShowRoles from './roles/ButtonShowRoles'
import { BiArrowFromTop } from 'react-icons/bi'

const queryString = require('query-string')

const Employees = () => {
    const employees = useSelector(state => state.employees.employees)
    const pagination = useSelector(state => state.employees.pagination)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

    const [filters, setFilters] = useState({
        sort: null,
        order: null,
    })

    useEffect(() => {
        document.title = "Nhân viên - Cảnh Báo Sớm"
        if (location.search.length > 0) {
            const params = queryString.parse(location.search)
            setFilters({
                ...filters,
                ...params
            })
        }
    }, [])
    useEffect(() => {
        const requestUrl = location.pathname + "?" + queryString.stringify(filters)
        navigation(requestUrl)
        dispatch(actions.fetchEmployeesRequest(filters))
    }, [filters])

    const handlePageChange = newPage => {
        setFilters({
            ...filters,
            page: newPage
        })
    }
    const handleSearchTerm = (searchTerm) => {
        setFilters({
            ...filters,
            page: 1,
            name: searchTerm
        })
    }
    const handleFilter = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }
    const handleSort = (sortBy) => {
        if (filters.order === null) {
            setFilters({
                ...filters,
                sort: sortBy,
                order: "asc"
            })
        }
        else if (filters.order === "asc") {
            setFilters({
                ...filters,
                sort: sortBy,
                order: "desc"
            })
        }
        else {
            setFilters({
                ...filters,
                sort: null,
                order: null
            })
        }
    }

    return (
        <>
            <div className="row justify-content-xl-between justify-content-end align-items-center">
                <div className="col-auto fw-bold fs-5 mb-xl-0 mb-3">
                    DANH SÁCH NHÂN VIÊN
                </div>
                <div className="col" />
                <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                    <AppSearch value={filters.q} onSearch={handleSearchTerm} />
                </div>
                <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                    <ButtonShowDepartments />
                </div>
                <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                    <ButtonShowRoles />
                </div>
                <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                    <AddEmployee />
                </div>
                <Dropdown autoClose="outside" className="col-auto d-sm-none">
                    <Dropdown.Toggle>
                        <BiArrowFromTop />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                        <Dropdown.Item className="d-block m-auto">
                            <AppSearch value={filters.name} onSearch={handleSearchTerm} />
                        </Dropdown.Item>
                        <Dropdown.Item className="d-block m-auto">
                            <ButtonShowDepartments />
                        </Dropdown.Item>
                        <Dropdown.Item className="d-block m-auto">
                            <ButtonShowRoles />
                        </Dropdown.Item>
                        <Dropdown.Item className="d-block m-auto">
                            <AddEmployee />
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <hr />
            <Container fluid>
                <div className="d-lg-flex d-none">
                    <Row className="col mb-3 justify-content-evenly align-items-center">
                        <div className="col-4" style={{ paddingLeft: "3rem" }}>
                            <span
                                className="fw-bolder cursor-pointer"
                                onClick={() => handleSort("emp.name")}
                            >
                                HỌ VÀ TÊN {filters.sort === "emp.name" && filters.order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters.sort === "emp.name" && filters.order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                            </span>
                            {/* <Form.Control type="text" name="name" placeholder="Lọc theo họ và tên..." value={filters.name} onChange={handleFilter} /> */}
                        </div>
                        <div className="col-1 ps-1">
                            <span
                                className="fw-bolder cursor-pointer"
                                onClick={() => handleSort("emp.dateOfBirth")}
                            >
                                NGÀY SINH {filters.sort === "emp.dateOfBirth" && filters.order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters.sort === "emp.dateOfBirth" && filters.order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                            </span>
                            {/* <Form.Control type="text" name="dob" placeholder="Lọc theo ngày sinh..." value={filters.dob} onChange={handleFilter} /> */}
                        </div>
                        <div className="col-3 ps-1">
                            <span
                                className="fw-bolder cursor-pointer"
                                onClick={() => handleSort("emp.email")}
                            >
                                EMAIL {filters.sort === "emp.email" && filters.order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters.sort === "emp.email" && filters.order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                            </span>
                            {/* <Form.Control type="text" name="email" placeholder="Lọc theo email..." value={filters.email} onChange={handleFilter} /> */}
                        </div>
                        <div className="col-1 ps-1">
                            <span
                                className="fw-bolder cursor-pointer"
                                onClick={() => handleSort("emp.phoneNumber")}
                            >
                                SĐT {filters.sort === "emp.phoneNumber" && filters.order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters.sort === "emp.phoneNumber" && filters.order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                            </span>
                            {/* <Form.Control type="text" name="phone" placeholder="Lọc theo số điện spanoại..." value={filters.phone} onChange={handleFilter} /> */}
                        </div>
                        <div className="col-2 ps-1">
                            <span
                                className="fw-bolder cursor-pointer"
                                onClick={() => handleSort("dep.name")}
                            >
                                PHÒNG BAN {filters.sort === "dep.name" && filters.order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters.sort === "dep.name" && filters.order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                            </span>
                            {/* <Form.Control type="text" name="dep.name" placeholder="Lọc theo tên phòng ban..." value={filters.department} onChange={handleFilter} /> */}
                        </div>
                        <div className="col-2 ps-1">
                            <span
                                className="fw-bolder cursor-pointer"
                                onClick={() => handleSort("pos.name")}
                            >
                                CHỨC VỤ {filters.sort === "pos.name" && filters.order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters.sort === "pos.name" && filters.order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                            </span>
                            {/* <Form.Control type="text" name="pos.name" placeholder="Lọc theo tên chức vụ..." value={filters.position} onChange={handleFilter} /> */}
                        </div>
                        <div className="col-auto" />
                    </Row>
                </div>
                <div id="main-table-employee">
                    <div className="d-lg-block d-none">
                        <Row>
                            {
                                employees.map(employee => (
                                    <EmployeeItem key={employee.id} employee={employee} />
                                ))
                            }
                            {
                                employees.length === 0 ? (
                                    <Card.Body align="center">
                                        Không có dữ liệu
                                    </Card.Body>
                                ) : null
                            }
                        </Row>
                    </div>
                </div>
                <div className="d-lg-none">
                    <Row className="mb-3 justify-content-evenly align-items-center">
                        {
                            employees.map(employee => (
                                <EmployeeItem key={employee.id} employee={employee} />
                            ))
                        }
                        {
                            employees.length === 0 ? (
                                <Card.Body align="center">
                                    Không có dữ liệu
                                </Card.Body>
                            ) : null
                        }
                    </Row>
                </div>
                <AppPagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            </Container>
        </>
    )
}

export default Employees