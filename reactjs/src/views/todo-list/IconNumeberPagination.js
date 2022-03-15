import React from 'react';
import { connect } from 'react-redux';
import * as action from "../../actions/todoListAction"

function IconNumeberPagination(props) {
    // dung de thay doi trang
    const changePage = () => {
        props.setPageCurrent(props.number);
        let data = { page: props.number, filter: props.status.itemNeedFilter, advanced: [] }
        props.getTaskByPage(data)
    }
    return (
        <li onClick={changePage} key={props.key} className="item-pagination vs-pagination--li">
            <span > {props.number} </span>
            <div className="effect" />
        </li>
    )
}
const mapStateToProps = (state) => {
    return {
        status: state.TodoListReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getTaskByPage: (page) => { dispatch(action.dispatchLimitedTaskRequest(page)) },
        isRenderDone: () => { dispatch(action.isRenderDone()) },
        setPageCurrent: (number) => { dispatch(action.numberPageCurrent(number)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IconNumeberPagination);