/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'
import { BiSortAlt2 } from 'react-icons/bi'
import { Button, Card, Container } from 'react-bootstrap'
import clsx from 'clsx'

import { getProposalListApproveByMe } from '~/redux/proposalsSlice'
import { proposalsSelector } from '~/redux/selectors'
import AppPagination from '~/components/AppPagination'
import Loading from '~/components/Loading'
import ProposalRow from './ProposalRow'
import AddProposal from './ProposalsFeatures/AddProposal'
import FiltersAdvanced from './ProposalsFeatures/FiltersAdvanced'

const queryString = require('query-string')

const ProposalsApproveByMe = () => {
    const status = useSelector(proposalsSelector).status
    const proposals = useSelector(proposalsSelector).proposals
    const pagination = useSelector(proposalsSelector).pagination

    const dispatch = useDispatch()
    const location = useLocation()
    const navigation = useNavigate()

    const [filtersBase, setFiltersBase] = useState({
        page: 1
    })
    const [filtersAdvanced, setFiltersAdvanced] = useState({
        proposalTypeIds: [],
        creatorIds: [],
        statusIds: [],
        createDateFrom: "",
        createDateTo: "",
    })

    useEffect(() => {
        document.title = "Đề xuất của tôi"

        if (location.search.length > 0) {
            const params = queryString.parse(location.search)
            let newParams = {}

            for (const [key, value] of Object.entries(params)) {
                if (key !== "page") {
                    continue
                }
                newParams[key] = value
            }

            //
            setFiltersBase(newParams)
        }
    }, [])

    useEffect(() => {
        dispatch(getProposalListApproveByMe({
            params: filtersBase,
            filters: filtersAdvanced
        }))
    }, [filtersBase, filtersAdvanced])

    useEffect(() => {
        const requestUrl = location.pathname + "?" + queryString.stringify(filtersBase)
        navigation(requestUrl)
        dispatch(getProposalListApproveByMe({
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
                        DANH SÁCH ĐỀ XUẤT
                    </div>
                    <div className="col" />
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <AddProposal />
                    </div>
                    <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                        <FiltersAdvanced filtersAdvanced={filtersAdvanced} setFiltersAdvanced={setFiltersAdvanced} type="approve-by-me" />
                    </div>
                </div>
                <div className="d-flex justify-content-start align-items-center">
                    <NavLink to="/proposals" end>
                        {
                            ({ isActive }) => <Button className="col-auto m-1" variant={clsx({ "primary": isActive, "outline-primary": !isActive })}>
                                Tất cả
                            </Button>
                        }
                    </NavLink>
                    <NavLink to="/proposals/created-by-me">
                        {
                            ({ isActive }) => <Button className="col-auto m-1" variant={clsx({ "primary": isActive, "outline-primary": !isActive })}>
                                Đề xuất của tôi
                            </Button>
                        }
                    </NavLink>
                    <NavLink to="/proposals/approve-by-me">
                        {
                            ({ isActive }) => <Button className="col-auto m-1" variant={clsx({ "primary": isActive, "outline-primary": !isActive })}>
                                Đề xuất tôi duyệt
                            </Button>
                        }
                    </NavLink>
                </div>
                <hr />
            </Container>
            <Container fluid>
                <div className="proposal proposal-header">
                    <div className="ms-lg-5" />
                    <div className="proposal-creator">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("pro.creator.name")}
                        >
                            NGƯỜI ĐỀ XUẤT
                            {
                                (filtersBase.sort === "pro.creator.name" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "pro.creator.name" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="proposal-type">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("pro.proposalType.id")}
                        >
                            LOẠI ĐỀ XUẤT
                            {
                                (filtersBase.sort === "pro.proposalType.id" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "pro.proposalType.id" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="proposal-content">
                        <span
                            className="fw-bolder"
                            onClick={() => handleSort("receiver.name")}
                        >
                            MỤC ĐÍCH/LÝ DO
                        </span>
                    </div>
                    <div className="proposal-createDate">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("pro.createDate")}
                        >
                            NGÀY TẠO
                            {
                                (filtersBase.sort === "pro.createDate" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "pro.createDate" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
                                        : <BiSortAlt2 />
                            }
                        </span>
                    </div>
                    <div className="proposal-status">
                        <span
                            className="fw-bolder cursor-pointer"
                            onClick={() => handleSort("pro.status.id")}
                        >
                            TRẠNG THÁI
                            {
                                (filtersBase.sort === "pro.status.id" && filtersBase.order === "asc") ? <AiOutlineSortAscending />
                                    : (filtersBase.sort === "pro.status.id" && filtersBase.order === "desc") ? <AiOutlineSortDescending />
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
                                proposals?.map((proposal) => (
                                    <ProposalRow
                                        key={proposal.id}
                                        proposalInfo={proposal}
                                    />
                                ))
                            }
                            {
                                proposals?.length === 0 ? (
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

export default ProposalsApproveByMe