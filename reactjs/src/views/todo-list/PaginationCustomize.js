import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import Pagination from 'react-bootstrap/Pagination'
import * as todoListAction from "../../actions/todoListAction"

const PaginationCustomize = (props) => {
    const dispacth = useDispatch()
    const totalTask = useSelector(state => state.TodoListReducer.totalTask)
    const pages = Math.ceil(totalTask / 15)
    const [pageCurrent, setPageCurrent] = useState(1)
    const [statePagination, setStatePagination] = useState(0)
    // function used to render pagination numbers 
    const renderNumberPagination = () => {
        var listPaginationItem = []
        var x
        if (pages <= 10) {
            for (x = 1; x <= pages; x++) {
                listPaginationItem.push(<Pagination.Item active={pageCurrent === x} data-key={x} onClick={(e) => clickPaginationItem(e)} key={x}>{x}</Pagination.Item>)
            }
        } else if (pages > 10) {
            if (statePagination === 0 && pageCurrent >= pages - 3) {
                listPaginationItem.push(<Pagination.Item active={pageCurrent === 1} data-key={1} onClick={(e) => clickPaginationItem(e)} key={1}>{1}</Pagination.Item>)
                listPaginationItem.push(<Pagination.Ellipsis key={"Ellipsis"} />)
                for (x = pages - 3; x <= pages; x++) {
                    listPaginationItem.push(<Pagination.Item active={pageCurrent === x} data-key={x} onClick={(e) => clickPaginationItem(e)} key={x}>{x}</Pagination.Item>)
                }
            } else if (statePagination ===0 && pageCurrent <= 3) {
                for (x = 1; x <= 4; x++) {
                    listPaginationItem.push(<Pagination.Item active={pageCurrent === x} data-key={x} onClick={(e) => clickPaginationItem(e)} key={x}>{x}</Pagination.Item>)
                }
                listPaginationItem.push(<Pagination.Ellipsis key={"Ellipsis"} />)
                listPaginationItem.push(<Pagination.Item active={pageCurrent === pages} data-key={pages} onClick={(e) => clickPaginationItem(e)} key={pages}>{pages}</Pagination.Item>)
            } else {
                listPaginationItem.push(<Pagination.Item active={pageCurrent === 1} data-key={1} onClick={(e) => clickPaginationItem(e)} key={1}>{1}</Pagination.Item>)
                listPaginationItem.push(<Pagination.Ellipsis key={"Ellipsis1"} />)
                for (x = pageCurrent - 1; x <= pageCurrent + 1; x++) {
                    listPaginationItem.push(<Pagination.Item active={pageCurrent === x} data-key={x} onClick={(e) => clickPaginationItem(e)} key={x}>{x}</Pagination.Item>)
                }
                listPaginationItem.push(<Pagination.Ellipsis key={"Ellipsis2"} />)
                listPaginationItem.push(<Pagination.Item active={pageCurrent === pages} data-key={pages} onClick={(e) => clickPaginationItem(e)} key={pages}>{pages}</Pagination.Item>)
            }
        }
        return listPaginationItem.map(item => item)
    }
    //click item pagination 
    const clickPaginationItem = event => {
        const selectedIndex = parseInt(event.target.getAttribute("data-key"));
        if (selectedIndex <= 3 || selectedIndex > (pages - 3)) {
            setStatePagination(0)
            setPageCurrent(selectedIndex)
            dispacth(todoListAction.pageCurrent(selectedIndex))
        } else {
            setStatePagination(1)
            setPageCurrent(selectedIndex)
            dispacth(todoListAction.pageCurrent(selectedIndex))
        }
    }
    // next page
    const nextPage = () => {
        let index = pageCurrent + 1
        if (index <= pages) {
            setPageCurrent(index)
            dispacth(todoListAction.pageCurrent(index))
        }
    }
    //previous page
    const prePage = () => {
        let index = pageCurrent - 1
        if (index > 0) {
            setPageCurrent(index)
            dispacth(todoListAction.pageCurrent(index))
        }
    }
    return (
        <>
            {pages === 0 ? <div className='text-center fw-bold mt-5'>Không có dữ liệu</div> :
                <Pagination size="sm" className='w-auto mx-auto rounded-pill'>
                    <Pagination.First onClick={prePage} />
                    {renderNumberPagination()}
                    <Pagination.Last onClick={nextPage} />
                </Pagination>}
        </>
    )
}
export default PaginationCustomize;