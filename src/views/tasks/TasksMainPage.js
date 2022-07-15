/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BiSortAlt2 } from 'react-icons/bi'
import { Card, Container } from 'react-bootstrap'

import { getTaskList, getTaskListByStatusIds } from '~/redux/tasksSlice'
import { tasksSelector } from '~/redux/selectors'
import AppPagination from '~/components/AppPagination'
import TaskRow from './TaskRow'
import AddTask from './TasksFeatures/AddTask'
import Loading from '~/components/Loading'
import FiltersByStatusIds from './TasksFeatures/FiltersByStatusIds'
import FiltersAdvanced from './TasksFeatures/FiltersAdvanced'

const queryString = require('query-string')

const TasksMainPage = () => {
    const status = useSelector(tasksSelector).status
    const tasks = useSelector(tasksSelector).tasks
    const pagination = useSelector(tasksSelector).pagination

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

    const [filtersAdvanced, setFiltersAdvanced] = useState({
        page: 1
    })
    const [filterByStatusIds, setFilterByStatusIds] = useState({
        statusIds: [1,2,3,4,5,6,7,8,9]
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
            setFiltersAdvanced(newParams)
        }
    }, [])

    useEffect(() => {
        dispatch(getTaskListByStatusIds(filterByStatusIds))
    }, [filterByStatusIds])
    
    useEffect(() => {
        const requestUrl = location.pathname + "?" + queryString.stringify(filtersAdvanced)
        navigation(requestUrl)
        dispatch(getTaskList(filtersAdvanced))
    }, [filtersAdvanced])

    //  Hàm thay đổi state khi ấn vào trang mới ở phần phân trang
    const handlePageChange = (newPage) => {
        setFiltersAdvanced({
            ...filtersAdvanced,
            page: newPage
        })
    }

    // Hàm thay đổi state khi thực hiện sắp xếp
    const handleSort = (sortBy) => {
        if (filtersAdvanced.order === null || !filtersAdvanced.order) {       // Nếu đang không sắp xếp thì thực hiện sắp xếp tăng dần
            setFiltersAdvanced({
                ...filtersAdvanced,
                sort: sortBy,
                order: "asc"
            })
        }
        else if (filtersAdvanced.order === "asc") {         // Nếu đang sắp xếp tăng dần thì thực hiện sắp xếp giảm dần
            setFiltersAdvanced({
                ...filtersAdvanced,
                sort: sortBy,
                order: "desc"
            })
        }
        else {                              // Nếu đang sắp xếp giảm dần thì thực hiện trở về ban đầu trước khi sắp xếp
            setFiltersAdvanced({
                ...filtersAdvanced,
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
                        <AddTask />
                    </div>
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <FiltersAdvanced filtersAdvanced={filtersAdvanced} setFiltersAdvanced={setFiltersAdvanced} />
                    </div>
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <FiltersByStatusIds filterByStatusIds={filterByStatusIds} setFilterByStatusIds={setFilterByStatusIds} />
                    </div>
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
                                (filtersAdvanced.sort === "title" && filtersAdvanced.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersAdvanced.sort === "title" && filtersAdvanced.order === "desc") ? <AiOutlineSortDescending />
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
                                (filtersAdvanced.sort === "creator.name" && filtersAdvanced.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersAdvanced.sort === "creator.name" && filtersAdvanced.order === "desc") ? <AiOutlineSortDescending />
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
                                (filtersAdvanced.sort === "receiver.name" && filtersAdvanced.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersAdvanced.sort === "receiver.name" && filtersAdvanced.order === "desc") ? <AiOutlineSortDescending />
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
                                (filtersAdvanced.sort === "startDate" && filtersAdvanced.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersAdvanced.sort === "startDate" && filtersAdvanced.order === "desc") ? <AiOutlineSortDescending />
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
                                (filtersAdvanced.sort === "status.name" && filtersAdvanced.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersAdvanced.sort === "status.name" && filtersAdvanced.order === "desc") ? <AiOutlineSortDescending />
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
                                (filtersAdvanced.sort === "priority" && filtersAdvanced.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersAdvanced.sort === "priority" && filtersAdvanced.order === "desc") ? <AiOutlineSortDescending />
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