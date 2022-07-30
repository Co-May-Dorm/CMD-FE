/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BiSortAlt2 } from 'react-icons/bi'
import { Button, Card, Container } from 'react-bootstrap'
import clsx from 'clsx'

import { getTaskListCreatedByMe } from '~/redux/tasksSlice'
import { tasksSelector } from '~/redux/selectors'
import AppPagination from '~/components/AppPagination'
import TaskRow from './TaskRow'
import AddTask from './TasksFeatures/AddTask'
import Loading from '~/components/Loading'
import FiltersAdvanced from './TasksFeatures/FiltersAdvanced'

const queryString = require('query-string')

const TasksCreatedByMe = () => {
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
        document.title = "Công việc tôi giao"

        if (location.search.length > 0) {
            const params = queryString.parse(location.search)
            let newParams = {}

            for (const [key, value] of Object.entries(params)) {
                if (key !== "page") {
                    continue
                }
                newParams[key] = value
            }

            setFiltersBase(newParams)
        }
    }, [])

    useEffect(() => {
        const requestUrl = location.pathname + "?" + queryString.stringify(filtersBase)
        navigation(requestUrl)
        dispatch(getTaskListCreatedByMe({
            params: filtersBase,
            filters: filtersAdvanced
        }))
    }, [filtersBase, filtersAdvanced])

    const handlePageChange = (newPage) => {
        setFiltersBase({
            ...filtersBase,
            page: newPage
        })
    }

    const handleSort = (sortBy) => {
        if (filtersBase.order === null || !filtersBase.order) {
            setFiltersBase({
                ...filtersBase,
                sort: sortBy,
                order: "asc"
            })
        }
        else if (filtersBase.order === "asc") {
            setFiltersBase({
                ...filtersBase,
                sort: sortBy,
                order: "desc"
            })
        }
        else {
            setFiltersBase({
                ...filtersBase,
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
                        CÔNG VIỆC TÔI GIAO
                    </div>
                    <div className="col" />
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <AddTask />
                    </div>
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <FiltersAdvanced filtersAdvanced={filtersAdvanced} setFiltersAdvanced={setFiltersAdvanced} />
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
                    <NavLink to="/tasks/created-by-me">
                        {
                            ({ isActive }) => <Button className="col-auto m-1" variant={clsx({ "primary": isActive, "outline-primary": !isActive })}>
                                Công việc tôi giao
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

export default TasksCreatedByMe