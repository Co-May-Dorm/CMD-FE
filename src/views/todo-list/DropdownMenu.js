import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from "../../actions/todoListAction"

class DropdownMenu extends Component {
    selectedDropdownMenu = (item) => this.props.selectedDropdownMenu(item)
    renderIntem = () => {
        return ["Theo giờ", "Theo ngày", "Theo tuần", "Theo tháng", "Theo năm"].map((item) => <li onClick={() => this.selectedDropdownMenu(item)} className="el-select-dropdown__item">
            <span>{item}</span>
        </li>)
    }
    // hover
    render() {
        return (
            <div className="el-select-dropdown el-popper" style={{ minWidth: '187.323px', position: 'fixed', top: '304px', left: '101px', transformOrigin: 'center top', zIndex: 2035 }} x-placement="bottom-start">
                <div className="el-scrollbar" style={{}}>
                    <div className="el-select-dropdown__wrap el-scrollbar__wrap" style={{ marginBottom: '-17px', marginRight: '-17px' }}>
                        <ul className="el-scrollbar__view el-select-dropdown__list">{/**/}
                            {this.renderIntem()}
                        </ul>
                    </div>
                    <div className="el-scrollbar__bar is-horizontal">
                        <div className="el-scrollbar__thumb" style={{ transform: 'translateX(0%)' }} />
                    </div>
                    <div className="el-scrollbar__bar is-vertical">
                        <div className="el-scrollbar__thumb" style={{ transform: 'translateY(0%)' }} />
                    </div>
                </div>{/**/}
                <div x-arrow className="popper__arrow" style={{ left: '35px' }} />
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
        selectedDropdownMenu: (item) => { dispatch(action.selectedDropdownMenu(item)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);