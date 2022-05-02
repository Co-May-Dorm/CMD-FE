import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BiArrowFromTop } from 'react-icons/bi'
import { Card, Container, Dropdown } from 'react-bootstrap'

import * as actions from '../../actions/employeesAction'
import AppPagination from '../../components/AppPagination'
import EmployeeRow from './EmployeeRow'
import AddEmployee from './EmployeesFeatures/AddEmployee'
import ButtonShowDepartments from './DepartmentsPage/ButtonShowDepartments'
import ButtonShowTeams from './TeamsPage/ButtonShowTeams'
import AppSearch from '../../components/AppSearch'
import ButtonShowRoles from './RolesPage/ButtonShowRoles'
import ExportDataToCSV from './EmployeesFeatures/ExportDataToCSV'

const queryString = require('query-string')

const EmployeesMainPage = () => {
    const employees = useSelector(state => state.employees.employees)           // Lấy danh sách sinh viên từ redux
    const pagination = useSelector(state => state.employees.pagination)         // Lấy dữ liệu phân trang của danh sách sinh viên trên

    const dispatch = useDispatch()          // Dùng để dispatch các action
    const location = useLocation()          // Lấy thông tin từ URL của trang hiện tại
    const navigation = useNavigate()        // Thực hiện công việc điều hướng trang

    const [filters, setFilters] = useState({})      // State lưu trữ các params truyền vào API để lấy dữ liệu từ Back End

    useEffect(() => {
        document.title = "Sinh viên - Cảnh Báo Sớm"     // Thiết lập tiêu đề cho trang

        // Kiểm tra nếu load lại trang thì giữ nguyên các filter hiện tại
        if (location.search.length > 0) {
            let params = queryString.parse(location.search)     // Lấy danh sách params từ URL
            let newParams = {}      // Lưu danh sách những param khác null

            // Thực hiện việc loại bỏ những param có giá trị là null
            for (let param in params) {
                if (params[param] === null || params[param] === "") {       // Nếu giá trị của param là null hoặc chuỗi rỗng thì bỏ qua
                    continue
                }
                newParams[param] = params[param]
            }

            // 
            setFilters({
                ...filters,
                ...newParams
            })
        }
    }, [])

    useEffect(() => {
        const requestUrl = location.pathname + "?" + queryString.stringify(filters)         // Lấy RequestURL đã gửi API tới Back End
        navigation(requestUrl)          // Thực hiện điều hướng rới RequestURL đã lấy ở trên
        dispatch(actions.fetchEmployeesRequest(filters))        // Dispatch action fetchEmployeesRequest với tham số truyền vào là filters
    }, [filters])

    //  Hàm thay đổi state khi ấn vào trang mới ở phần phân trang
    const handlePageChange = (newPage) => {
        setFilters({
            ...filters,
            page: newPage
        })
    }

    // Hàm thay đổi state khi thực hiện tìm kiếm
    const handleSearch = (searchTerm) => {
        setFilters({
            ...filters,
            page: 1,
            name: searchTerm
        })
    }

    // const handleFilter = (e) => {
    //     setFilters({
    //         ...filters,
    //         [e.target.name]: e.target.value
    //     })
    // }

    // Hàm thay đổi state khi thực hiện sắp xếp
    const handleSort = (sortBy) => {
        if (filters.order === null || !filters.order) {       // Nếu đang không sắp xếp thì thực hiện sắp xếp tăng dần
            setFilters({
                ...filters,
                sort: sortBy,
                order: "asc"
            })
        }
        else if (filters.order === "asc") {         // Nếu đang sắp xếp tăng dần thì thực hiện sắp xếp giảm dần
            setFilters({
                ...filters,
                sort: sortBy,
                order: "desc"
            })
        }
        else {                              // Nếu đang sắp xếp giảm dần thì thực hiện trở về ban đầu trước khi sắp xếp
            setFilters({
                ...filters,
                sort: null,
                order: null
            })
        }
    }

    return (
        <Container fluid>
            <Container fluid>
                <div className="row justify-content-xl-between justify-content-end align-items-center">
                    <div className="col-auto fw-bolder fs-5 mb-xl-0 mb-3">
                        DANH SÁCH SINH VIÊN
                    </div>
                    <div className="col" />
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <AppSearch value={filters.name} onSearch={handleSearch} />
                    </div>
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <ButtonShowDepartments />
                    </div>
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <ButtonShowTeams />
                    </div>
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <ButtonShowRoles />
                    </div>
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <AddEmployee />
                    </div>
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <ExportDataToCSV data={employees} />
                    </div>
                    <Dropdown autoClose="outside" className="col-auto d-sm-none">
                        <Dropdown.Toggle>
                            <BiArrowFromTop />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                            <Dropdown.Item className="d-block m-auto">
                                <AppSearch value={filters.name} onSearch={handleSearch} />
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
                            <Dropdown.Item className="d-block m-auto">
                                <ExportDataToCSV data={employees} />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <hr />
            </Container>
            <Container fluid>
                <div className="employee employee-title">
                    <div className="ms-lg-5" />
                    <div className="employee-active" />
                    <div className="employee-name">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("emp.name")}
                        >
                            HỌ VÀ TÊN {filters.sort === "emp.name" && filters.order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters.sort === "emp.name" && filters.order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                        </span>
                        {/* <Form.Control type="text" name="name" placeholder="Lọc theo họ và tên..." value={filters.name} onChange={handleFilter} /> */}
                    </div>
                    <div className="employee-dob">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("emp.dateOfBirth")}
                        >
                            NGÀY SINH {filters.sort === "emp.dateOfBirth" && filters.order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters.sort === "emp.dateOfBirth" && filters.order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                        </span>
                        {/* <Form.Control type="text" name="dob" placeholder="Lọc theo ngày sinh..." value={filters.dob} onChange={handleFilter} /> */}
                    </div>
                    <div className="employee-email">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("emp.email")}
                        >
                            EMAIL {filters.sort === "emp.email" && filters.order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters.sort === "emp.email" && filters.order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                        </span>
                        {/* <Form.Control type="text" name="email" placeholder="Lọc theo email..." value={filters.email} onChange={handleFilter} /> */}
                    </div>
                    <div className="employee-phoneNumber">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("emp.phoneNumber")}
                        >
                            SĐT {filters.sort === "emp.phoneNumber" && filters.order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters.sort === "emp.phoneNumber" && filters.order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                        </span>
                        {/* <Form.Control type="text" name="phone" placeholder="Lọc theo số điện spanoại..." value={filters.phone} onChange={handleFilter} /> */}
                    </div>
                    <div className="employee-department">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("dep.name")}
                        >
                            PHÒNG BAN {filters.sort === "dep.name" && filters.order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters.sort === "dep.name" && filters.order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                        </span>
                        {/* <Form.Control type="text" name="dep.name" placeholder="Lọc theo tên phòng ban..." value={filters.department} onChange={handleFilter} /> */}
                    </div>
                    <div className="employee-position">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("pos.name")}
                        >
                            CHỨC VỤ {filters.sort === "pos.name" && filters.order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters.sort === "pos.name" && filters.order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                        </span>
                        {/* <Form.Control type="text" name="pos.name" placeholder="Lọc theo tên chức vụ..." value={filters.position} onChange={handleFilter} /> */}
                    </div>
                    <div className="employee-more" />
                </div>
                <div className="list-group-horizontal-lg">
                    {
                        employees.map(employee => (
                            <EmployeeRow
                                key={employee.id}
                                employee={employee}
                            />
                        ))
                    }
                    {
                        employees.length === 0 ? (
                            <Card.Body align="center">
                                Không có dữ liệu
                            </Card.Body>
                        ) : null
                    }
                </div>
                <AppPagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            </Container>
        </Container>
    )
}

export default EmployeesMainPage