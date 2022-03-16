import React, { Component } from 'react';
import IconEmployee from './IconEmployee';
import { connect } from 'react-redux';
import * as action from "../../actions/todoListAction"


class ItemTask extends Component {
    // render phòng ban theo cong viec neu no khong truyen vao thi se khong render ra 
    renderDepartment = () => {
        if (this.props.nameDepartment !== undefined) {
            return (
                <div set="[object Object]" className="w-1/5">
                    <span title={this.props.nameDepartment} className="ml-2" style={{ backgroundColor: 'rgb(104, 134, 197)', color: 'white', borderRadius: '5px', padding: '5px', maxWidth: '120px', whiteSpace: 'nowrap', display: 'inline-block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {this.props.nameDepartment}
                    </span>
                </div>
            )
        }
    }
    // render màu status công viêc
    renderColorStatusTask = () => {
        switch (this.props.Status) {
            case "Hoàn thành":
                return <span className="text-complete">
                    <span>
                        {this.props.Status}
                    </span>
                </span>
            case "Bị từ chối":
                return <span className="text-reject">
                    <span>
                        {this.props.Status}
                    </span>
                </span>
            case "Đã hủy":
                return <span className="text-cancel">
                    <span>
                        {this.props.Status}
                    </span>
                </span>
            case "Mới":
                return <span className="text-new">
                    <span>
                        {this.props.Status}
                    </span>
                </span>
            case "Đang làm":
                return <span className="text-doing">
                    <span>
                        {this.props.Status}
                    </span>
                </span>
            case "Chờ xác nhận":
                return <span className="text-doing">
                    <span>
                        {this.props.Status}
                    </span>
                </span>
            case "Hoàn tất":
                return <span className="text-done">
                    <span>
                        {this.props.Status}
                    </span>
                </span>
            case "Qúa hạn":
                return <span className="text-over-time">
                    <span>
                        {this.props.Status}
                    </span>
                </span>
            default:
                return;
        }
    }
    showDetailTask = () => {
        this.props.getDetailTask({ id: this.props.id })
        this.props.isShowDetailTask()
    }
    render() {
        return (
            <div key={this.props.key}>
                <div onClick={this.showDetailTask} id="todo-parent-loading106396" className="vs-con-loading__container my-4 todo-parent-container todo-tree-hide-multi-level">
                    <div className="vx-card">
                        <div className="vx-card__header">
                            <div className="vx-card__title w-full">
                                <div>
                                    <div className="flex flex-row items-center w-full px-4 todo-parent-title cursor-pointer">
                                        <button data-v-dcb3565e type="button" className="vs-con-dropdown parent-dropdown cbs-color-picker cursor-pointer">
                                            <i data-v-dcb3565e="" className="text-2xl nucleo nucleo-flag-glyph cbs-color-picker__icon-picker" style={{ color: 'rgb(189, 189, 189)' }} />
                                        </button>
                                        {this.renderDepartment()}
                                        <p className="w-4/5 pl-4 leading-normal font-semibold">{this.props.nameTask}</p>
                                        <p className="font-bold todo-item-status font-medium w-1/5 ">
                                            {this.renderColorStatusTask()}
                                        </p>
                                        <div className="w-2/5">
                                            <span>
                                                {this.props.employees.map((item,id) => <IconEmployee key={id} srcImgEmployee={item.imgEmployee} />)}
                                            </span>
                                        </div>
                                        <div className="w-1/5">
                                            <p className="todo-item-deadline font-medium" />
                                            <p className="todo-item-deadline font-medium ">{
                                                this.props.dateEnd.split('T')[0]
                                            }
                                            </p>
                                            <p className="todo-item-deadline font-medium ">
                                                {this.props.dateEnd.split('T')[1].split('.')[0]}
                                            </p>
                                        </div>
                                        <div className="w-1/5">{/**/}</div>
                                        <button data-v-714e2a96 data-v-2198c4b9 type="vertical" className="vs-con-dropdown parent-dropdown cbs-context-menu cursor-pointer cbs-context-menu--vertical todo-context-menu">
                                            <i data-v-714e2a96 className="nucleo nucleo-dots font-bold cbs-context-menu__btn-trigger" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        status: state.TodoListReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        isShowDetailTask: () => { dispatch(action.showDetailTask()) },
        getDetailTask: (params) => { dispatch(action.getTaskDetailRequest(params)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemTask);