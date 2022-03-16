import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../actions/requestsAction'
import AppPagination from '../../components/AppPagination'
import RequestItem from './RequestItem'
import AddRequest from './SubmitRequest/AddRequest'
import AppSearch from '../../components/AppSearch'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonShowAdvancedFilters from './AdvancedFilters/ButtonShowAdvancedFilters'
import { Button, Card, Table } from 'react-bootstrap'

const queryString = require('query-string')

const Requests = () => {
    const requests = useSelector(state => state.requests.data)
    const pagination = useSelector(state => state.requests.pagination)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 10,
        q: "",
        _sort: null,
        _order: null
    })

    useEffect(() => {
        if (location.search.length > 0) {
            const params = queryString.parse(location.search)
            setFilters({
                ...filters,
                ...params
            })
        }
    }, [])
    useEffect(() => {
        document.title = "Đề xuất - Cảnh Báo Sớm"
    }, [])
    useEffect(() => {
        const requestUrl = location.pathname + "?" + queryString.stringify(filters)
        navigation(requestUrl)
        dispatch(actions.fetchRequestsRequest(filters))
    }, [filters])

    const handlePageChange = newPage => {
        setFilters({
            ...filters,
            _page: newPage
        })
    }
    const handleSearchTerm = (searchTerm) => {
        setFilters({
            ...filters,
            _page: 1,
            q: searchTerm
        })
    }
    const handleSort = (sortBy) => {
        if (filters._order === null) {
            setFilters({
                ...filters,
                _sort: sortBy,
                _order: "asc"
            })
        }
        else if (filters._order === "asc") {
            setFilters({
                ...filters,
                _sort: sortBy,
                _order: "desc"
            })
        }
        else {
            setFilters({
                ...filters,
                _sort: null,
                _order: null
            })
        }
    }

    return (
        <>
            <div className="row justify-content-between">
                <div className="col-auto fw-bold fs-5">
                    DANH SÁCH ĐỀ XUẤT
                </div>
                <div className="col" />
                <div className="col-auto">
                    <AppSearch value={filters.q} onSearch={handleSearchTerm} />
                </div>
                <div className="col-auto">
                    <ButtonShowAdvancedFilters />
                </div>
                <div className="col-auto">
                    <AddRequest />
                </div>
            </div>
            <hr />
            <Card>
                <Card.Body>
                    <Table
                        striped
                        hover
                        responsive
                        borderless
                    >
                        <thead>
                            <tr>
                                <th></th>
                                <th>
                                    <Button
                                        variant="none"
                                        onClick={() => handleSort("requester.name")}
                                    >
                                        <span className="fw-bolder">
                                            NGƯỜI ĐỀ XUẤT {filters._sort === "requester.name" && filters._order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters._sort === "requester.name" && filters._order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                                        </span>
                                    </Button>
                                </th>
                                <th>
                                    <Button
                                        variant="none"
                                        onClick={() => handleSort("reqtype.name")}
                                    >
                                        <span className="fw-bolder">
                                            LOẠI ĐỀ XUẤT {filters._sort === "reqtype.name" && filters._order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters._sort === "reqtype.name" && filters._order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                                        </span>
                                    </Button>
                                </th>
                                <th>
                                    <Button
                                        variant="none"
                                        onClick={() => handleSort("request_reason")}
                                    >
                                        <span className="fw-bolder">
                                            MỤC ĐÍCH/LÝ DO {filters._sort === "request_reason" && filters._order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters._sort === "request_reason" && filters._order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                                        </span>
                                    </Button>
                                </th>
                                <th>
                                    <Button
                                        variant="none"
                                        onClick={() => handleSort("created_at")}
                                    >
                                        <span className="fw-bolder">
                                            NGÀY TẠO {filters._sort === "created_at" && filters._order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters._sort === "created_at" && filters._order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                                        </span>
                                    </Button>
                                </th>
                                <th>
                                    <Button
                                        variant="none"
                                        onClick={() => handleSort("reqtype.statuses[0].name")}
                                    >
                                        <span className="fw-bolder">
                                            TRẠNG THÁI {filters._sort === "reqtype.statuses[0].name" && filters._order === "asc" ? <AiOutlineSortAscending size={20} /> : null} {filters._sort === "reqtype.statuses[0].name" && filters._order === "desc" ? <AiOutlineSortDescending size={20} /> : null}
                                        </span>
                                    </Button>
                                </th>
                                <th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                requests.map(request => (
                                    <RequestItem key={request.id} request={request} />
                                ))
                            }
                        </tbody>
                    </Table>
                    {requests.length === 0 ? (
                        <Card.Body align="center">
                            Không có dữ liệu
                        </Card.Body>
                    ) : null}
                    <AppPagination
                        pagination={pagination}
                        onPageChange={handlePageChange}
                    />
                </Card.Body>
            </Card>
        </>
    )
}

export default Requests