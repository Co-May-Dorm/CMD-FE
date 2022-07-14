/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BiArrowFromTop, BiSortAlt2 } from 'react-icons/bi'
import { Card, Container, Dropdown } from 'react-bootstrap'

import { fetchTasks } from '~/redux/tasksSlice'
import { tasksSelector } from '~/redux/selectors'
import AppPagination from '~/components/AppPagination'
import TaskRow from './TaskRow'
import AddTask from './TasksFeatures/AddTask'
import AppSearch from '~/components/AppSearch'
import Loading from '~/components/Loading'
import FiltersAdvanced from './TasksFeatures/FiltersAdvanced'

const queryString = require('query-string')

const TasksMainPage = () => {
    const status = useSelector(tasksSelector).status
    const tasks = useSelector(tasksSelector).tasks           // Lấy danh sách công việc từ redux
    const pagination = useSelector(tasksSelector).pagination         // Lấy dữ liệu phân trang của danh sách công việc trên

    const dispatch = useDispatch()          // Dùng để dispatch các action
    const location = useLocation()          // Lấy thông tin từ URL của trang hiện tại
    const navigation = useNavigate()        // Thực hiện công việc điều hướng trang

    const [filters, setFilters] = useState({})      // State lưu trữ các params truyền vào API để lấy dữ liệu từ Back End

    useEffect(() => {
        document.title = "Công việc"     // Thiết lập tiêu đề cho trang

        // Kiểm tra nếu load lại trang thì giữ nguyên các filter hiện tại
        if (location.search.length > 0) {
            let params = queryString.parse(location.search)     // Lấy danh sách params từ URL
            let newParams = {}      // Lưu danh sách những param khác null

            // Thực hiện việc loại bỏ những param có giá trị là null hoặc chuỗi rỗng
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
        dispatch(fetchTasks(filters))        // Dispatch action fetchTasks với tham số truyền vào là filters
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
                        DANH SÁCH CÔNG VIỆC
                    </div>
                    <div className="col" />
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <AppSearch value={filters.name} onSearch={handleSearch} />
                    </div>
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <AddTask />
                    </div>
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <FiltersAdvanced filters={filters} />
                    </div>
                    <Dropdown autoClose="outside" className="col-auto d-sm-none">
                        <Dropdown.Toggle>
                            <BiArrowFromTop />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                            <Dropdown.Item className="d-block m-auto">
                                <AppSearch value={filters.name} onSearch={handleSearch} />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <hr />
            </Container>
            <Container fluid>
                <div className="task task-header">
                    <div className="ms-lg-5" />
                    <div className="task-title">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("title")}
                        >
                            TÊN CÔNG VIỆC
                            {
                                (filters.sort === "title" && filters.order === "asc") ? <AiOutlineSortAscending />
                                    : (filters.sort === "title" && filters.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="task-creator">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("creator")}
                        >
                            NGƯỜI GIAO
                            {
                                (filters.sort === "creator" && filters.order === "asc") ? <AiOutlineSortAscending />
                                    : (filters.sort === "creator" && filters.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="task-arrow" />
                    <div className="task-receiver">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("receiver")}
                        >
                            NGƯỜI NHẬN
                            {
                                (filters.sort === "receiver" && filters.order === "asc") ? <AiOutlineSortAscending />
                                    : (filters.sort === "receiver" && filters.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="task-timeline">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("dep.name")}
                        >
                            THỜI GIAN
                            {
                                (filters.sort === "dep.name" && filters.order === "asc") ? <AiOutlineSortAscending />
                                    : (filters.sort === "dep.name" && filters.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="task-status">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("pos.name")}
                        >
                            TÌNH TRẠNG
                            {
                                (filters.sort === "pos.name" && filters.order === "asc") ? <AiOutlineSortAscending />
                                    : (filters.sort === "pos.name" && filters.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="task-rate">
                        <span
                            className="fw-bolder cursor-pointer d-flex justify-content-center"
                            onClick={() => handleSort("pos.name")}
                        >
                            ĐÁNH GIÁ
                            {
                                (filters.sort === "pos.name" && filters.order === "asc") ? <AiOutlineSortAscending />
                                    : (filters.sort === "pos.name" && filters.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="task-more" />
                </div>
                {
                    status === "loading" ? (
                        <Loading />
                    ) : status === "error" ? (
                        <div className="text-center py-3">Có lỗi trong quá trình lấy dữ liệu từ Server</div>
                    ) : (
                        <div className="list-group-horizontal-lg">
                            {
                                tasks?.map((task, index) => (
                                    <TaskRow
                                        key={index}
                                        task={task}
                                    />
                                ))
                            }
                            {
                                tasks?.length === 0 ? (
                                    <Card.Body align="center">
                                        Không có dữ liệu
                                    </Card.Body>
                                ) : null
                            }
                        </div>
                    )
                }
                <AppPagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            </Container>
        </Container>
    )
}

export default TasksMainPage