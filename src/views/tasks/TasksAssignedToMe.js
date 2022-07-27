/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BiSortAlt2 } from 'react-icons/bi'
import { Button, Card, Container } from 'react-bootstrap'
import clsx from 'clsx'

import { getTaskListAssignedToMe } from '~/redux/tasksSlice'
import { tasksSelector } from '~/redux/selectors'
import AppPagination from '~/components/AppPagination'
import TaskRow from './TaskRow'
import AddTask from './TasksFeatures/AddTask'
import Loading from '~/components/Loading'
import FiltersByStatusIds from './TasksFeatures/FiltersByStatusIds'
import FiltersAdvanced from './TasksFeatures/FiltersAdvanced'

const queryString = require('query-string')

const TasksAssignedToMe = () => {
    const status = useSelector(tasksSelector).status
    const tasks = useSelector(tasksSelector).tasks
    const pagination = useSelector(tasksSelector).pagination

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

    const [filtersBase, setFiltersBase] = useState({
        page: 1
    })
    const [filtersAdvanced, setFiltersAdvanced] = useState({
        title: "",
        creatorIds: [],
        receiverIds: [],
        startDate: "",
        finishDate: "",
        statusIds: [],
        departmentIds: [],
        rate: "",
        priority: "",
    })


    useEffect(() => {
        document.title = "Công việc"     // Thiết lập tiêu đề cho trang

        // Kiểm tra nếu load lại trang thì giữ nguyên các filter hiện tại
        if (location.search.length > 0) {
            const params = queryString.parse(location.search)     // Lấy danh sách params từ URL
            let newParams = {}      // Lưu danh sách những param khác null

            // Thực hiện việc loại bỏ những param có giá trị là null
            for (const [key, value] of Object.entries(params)) {
                if (key !== "page") {       // Nếu giá trị của param là null hoặc chuỗi rỗng thì bỏ qua
                    continue
                }
                newParams[key] = value
            }

            //
            setFiltersBase(newParams)
        }
    }, [])

    useEffect(() => {
        dispatch(getTaskListAssignedToMe({
            params: filtersBase,
            filters: filtersAdvanced
        }))
    }, [filtersBase, filtersAdvanced])

    useEffect(() => {
        const requestUrl = location.pathname + "?" + queryString.stringify(filtersBase)
        navigation(requestUrl)
        dispatch(getTaskListAssignedToMe({
            params: filtersBase,
            filters: filtersAdvanced
        }))
    }, [filtersBase, filtersAdvanced])

    //  Hàm thay đổi state khi ấn vào trang mới ở phần phân trang
    const handlePageChange = (newPage) => {
        setFiltersBase({
            ...filtersBase,
            page: newPage
        })
    }

    // Hàm thay đổi state khi thực hiện sắp xếp
    const handleSort = (sortBy) => {
        if (filtersBase.order === null || !filtersBase.order) {       // Nếu đang không sắp xếp thì thực hiện sắp xếp tăng dần
            setFiltersBase({
                ...filtersBase,
                sort: sortBy,
                order: "asc"
            })
        }
        else if (filtersBase.order === "asc") {         // Nếu đang sắp xếp tăng dần thì thực hiện sắp xếp giảm dần
            setFiltersBase({
                ...filtersBase,
                sort: sortBy,
                order: "desc"
            })
        }
        else {                              // Nếu đang sắp xếp giảm dần thì thực hiện trở về ban đầu trước khi sắp xếp
            setFiltersBase({
                ...filtersBase,
                sort: null,
                order: null
            })
        }
    }
    const handleFilterByStatusIds = (statusIds) => {
        setFiltersBase({
            ...filtersBase,
            statusIds: statusIds
        })
    }

    return (
        <Container fluid>
            <Container fluid>
                <div className="row justify-content-xl-between justify-content-end align-items-center">
                    <div className="col-auto fw-bolder fs-5 mb-xl-0 mb-3">
                        TẤT CẢ CÔNG VIỆC
                    </div>
                    <div className="col" />
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <AddTask />
                    </div>
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <FiltersAdvanced filtersAdvanced={filtersAdvanced} setFiltersAdvanced={setFiltersAdvanced} />
                    </div>
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <FiltersByStatusIds filtersByStatusIds={filtersBase.statusIds} setFiltersByStatusIds={handleFilterByStatusIds} />
                    </div>
                </div>
                <div className="d-flex justify-content-start align-items-center">
                    <NavLink to="/tasks" end>
                        {
                            ({ isActive }) => <Button className="col-auto m-1" variant={clsx({ "primary": isActive, "outline-primary": !isActive })}>
                                Tất cả
                            </Button>
                        }
                    </NavLink>
                    <NavLink to="/tasks/assigned-to-me">
                        {
                            ({ isActive }) => <Button className="col-auto m-1" variant={clsx({ "primary": isActive, "outline-primary": !isActive })}>
                                Công việc của tôi
                            </Button>
                        }
                    </NavLink>
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
                                (filtersBase.sort === "title" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "title" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="task-creator">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("creator.name")}
                        >
                            NGƯỜI GIAO
                            {
                                (filtersBase.sort === "creator.name" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "creator.name" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="task-arrow" />
                    <div className="task-receiver">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("receiver.name")}
                        >
                            NGƯỜI NHẬN
                            {
                                (filtersBase.sort === "receiver.name" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "receiver.name" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="task-timeline">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("startDate")}
                        >
                            THỜI GIAN
                            {
                                (filtersBase.sort === "startDate" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "startDate" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="task-status">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("status.name")}
                        >
                            TÌNH TRẠNG
                            {
                                (filtersBase.sort === "status.name" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "status.name" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="task-rate">
                        <span
                            className="fw-bolder cursor-pointer d-flex justify-content-center"
                            onClick={() => handleSort("priority")}
                        >
                            ĐÁNH GIÁ
                            {
                                (filtersBase.sort === "priority" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "priority" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
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
                    pagination={{
                        ...pagination,
                        page: filtersBase.page
                    }}
                    onPageChange={handlePageChange}
                />
            </Container>
        </Container>
    )
}

export default TasksAssignedToMe