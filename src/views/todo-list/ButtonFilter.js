import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from "../../actions/todoListAction"
import classNames from 'classnames';
class ButtonFilter extends Component {
    constructor() {
        super()
        this.state = ({ active: false })
    }
    componentDidMount(){
        this.props.status.itemNeedFilter.forEach(item=>{
            if(item===this.props.nameButtonFilter){
                this.setState({active:!this.state.active})
            }
        })
    }
    // button duoc kich hoat chua
    active = async () => {
        this.setState({ active: !this.state.active })
        await this.props.addItemFilter(this.props.nameButtonFilter)
        let data
        if (this.state.active) {
            /*
            Neu no duoc click thi lay nhung item can loc co trng store sau do them cai item hien tai
            */
            let filter = this.props.status.itemNeedFilter.concat(this.props.nameButtonFilter)
            // data = { page: this.props.status.numberCurrent, filter }
            data = { page: 1, filter, advanced:[] }
        } else {
            let filter = this.props.status.itemNeedFilter.filter(item => item !== this.props.nameButtonFilter)
            // data = { page: this.props.status.numberCurrent, filter }
            data = { page: 1, filter, advanced:[] }
        }
        this.props.getTaskByPage(data)
    }
    // lay so cong viec theo muc cua rieng no
    getNumberFilterOwner = () => {
        let listAllWork
        if (this.props.status.allTask.data !== undefined) {
            listAllWork = this.props.status.allTask.data.data
        }
        switch (this.props.nameButtonFilter) {
            case "Đã hủy":
                return this.getNumberTaskByStatus(listAllWork, 3)
            case "Mới":
                return this.getNumberTaskByStatus(listAllWork, 4)
            case "Đang làm":
                return this.getNumberTaskByStatus(listAllWork, 5)
            case "Chờ xác nhận":
                return this.getNumberTaskByStatus(listAllWork, 6)
            case "Hoàn thành":
                return this.getNumberTaskByStatus(listAllWork, 7)
            case "Qúa hạn":
                return this.getNumberTaskByStatus(listAllWork, 8)
        }
    }
    //lay so cong viec theo trang thai
    getNumberTaskByStatus = (listTask, status) => {
        let count = 0;
        if(listTask !== undefined){
            listTask.forEach(element => {
                if (element.status === status) {
                    count++;
                }
            });
        }
        return count;
    }
    render() {
        if (this.state.active) {
            return (
                <button onClick={this.active} type="button" name="button" className="vs-component vs-button vs-button-null vs-button-border mr-3 border-2 font-bold" style={{ border: '1px solid rgb(43, 89, 178)', background: 'transparent', color: 'rgb(43, 89, 178)' }}>
                    <span className="vs-button-backgroundx vs-button--background" style={{ background: 'rgb(43, 89, 178)', opacity: 0, left: '28px', top: '33px', width: '0px', height: '0px', transition: 'width 0.51049s ease 0s, height 0.51049s ease 0s, opacity 0.15s ease 0s' }} />{/**/}
                    <span className="vs-button-text vs-button--text">
                        <p className="whitespace-no-wrap text-primary">{this.props.nameButtonFilter} ({this.getNumberFilterOwner()})</p>
                    </span>
                    <span className="vs-button-linex" style={{ top: 'auto', bottom: '-2px', background: 'rgb(43, 89, 178)', left: '50%', transform: 'translate(-50%)' }} />
                </button>
            )
        }
        return (
            <button onClick={this.active} type="button" name="button" className="vs-component vs-button vs-button-null vs-button-border mr-3 border-2 notActive" style={{ border: '1px solid rgb(130, 130, 130)', background: 'transparent', color: 'rgb(130, 130, 130)' }}>
                <span className="vs-button-backgroundx vs-button--background" style={{ background: 'rgb(130, 130, 130)', opacity: 1, left: '20px', top: '20px', width: '0px', height: '0px', transition: 'width 0.3s ease 0s, height 0.3s ease 0s, opacity 0.3s ease 0s' }} />
                <span className="vs-button-text vs-button--text">
                    <p className={classNames("whitespace-no-wrap", { "text-primary": this.state.active })}>{this.props.nameButtonFilter} ({this.getNumberFilterOwner()})</p>
                </span>
                <span className="vs-button-linex" style={{ top: 'auto', bottom: '-2px', background: 'rgb(130, 130, 130)', left: '50%', transform: 'translate(-50%)' }} />
            </button>
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
        addItemFilter: (item) => { return dispatch(action.addItemNeedFilter(item)) },
        getTaskByPage: (page) => { return dispatch(action.dispatchLimitedTaskRequest(page)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonFilter);