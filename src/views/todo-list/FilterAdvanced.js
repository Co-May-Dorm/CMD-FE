import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from "../../actions/todoListAction"
import classNames from "classnames"
let styleX = { left: '0px', bottom: '0px' }
let styleY = { top: "0px", height: `477px`, right: "0px" }
let styleYMini = { top: "0px", height: `${277 / 2.8}px` }
class FilterAdvanced extends Component {
    constructor() {
        super()
        this.state = ({
            s: false, yPosition: 0, sw: window.innerWidth, showTypeTask: false, typeTask: null, showPriority: false, typePriority: null
            , showStatus: false, typeStatus: [], showAssignedPerson: false, employeeCurrent: null, showInvolveEployee: false, involveEployee: []
            , showCreator: false, creator: null, showDepartment: false, department: null
        })
    }
    getHeight = async () => await document.getElementById('myDiv1').clientHeight
    printS = (e) => {
        let chieuDai = document.getElementById('myDiv1').clientHeight//bao gồm phần đệm
        // let chieuDai = document.getElementById('myDiv').offsetHeight//bao gồm phần đệm , scrollbar và viền
        // console.log(document.getElementById('myDiv').clientHeight)
        let tam = document.getElementById('myDiv1').scrollTop
        let pos = this.state.yPosition;
        if (e.deltaY > 0 && tam < chieuDai) {
            pos += 20
            this.setState({ yPosition: pos });
            styleX = { ...styleX, bottom: `${-pos}px` }
            styleY = { ...styleY, top: `${pos}px`, height: `${chieuDai}px` }
            styleYMini = { ...styleYMini, top: `${pos / 2}px`, height: `${chieuDai / 2.8}px` }
            document.getElementById("myDiv1").scrollTo(0, pos)
        }
        else if (e.deltaY < 0 && tam > 0) {
            pos -= 20
            this.setState({ yPosition: pos });
            styleX = { ...styleX, bottom: `${-pos}px` }
            styleY = { ...styleY, top: `${pos}px`, height: `${chieuDai}px` }
            styleYMini = { ...styleYMini, top: `${pos / 2}px`, height: `${chieuDai / 2.8}px` }
            document.getElementById("myDiv1").scrollTo(0, pos)
        }
    }
    showStartDateInput = () => {
        this.props.showDateInputStart()
    }
    showEndDateInput = () => {
        this.props.showDateInputEnd()
    }
    closeForm = () => {
        this.props.isShowFilterAdvanced()
    }
    showTypeTask = () => this.setState({ showTypeTask: !this.state.showTypeTask })
    changeTypeTask = (type) => this.setState({ typeTask: type })
    showPriority = () => this.setState({ showPriority: !this.state.showPriority })
    changeTypePriority = (status) => this.setState({ typePriority: status })
    showStatus = () => this.setState({ showStatus: !this.state.showStatus })
    changeStatus = async (status) => {
        await this.props.addItemFilter(status)
    }
    showAssignedPerson = () => this.setState({ showAssignedPerson: !this.state.showAssignedPerson })
    showInvolveEployee = () => this.setState({ showInvolveEployee: !this.state.showInvolveEployee })
    showCreator = () => this.setState({ showCreator: !this.state.showCreator })
    showDepartment = () => this.setState({ showDepartment: !this.state.showDepartment })
    //chọn nhân viên liên quan được chọn
    selectedInvolveEployee = (item) => this.setState({ involveEployee: this.state.involveEployee.concat(item) })
    //dung de render danh sach nhan vien khi nhap vao o tim kiem nhan vien
    renderListEmployee = (callback) => {
        if (this.props.status.listEmployeeSearch.length === 0) {
            return <li className="vs__no-options">
                Gõ tên nhân viên, phòng ban, chức vụ để tìm kiếm.
            </li>
        }
        //vs__dropdown-option--highlight
        return this.props.status.listEmployeeSearch.map((item, id) => <li onClick={() => callback(item)} role="option" id={`vs1__option-${id}`} className="vs__dropdown-option"
            aria-selected="true">
            <div>
                <div class="inline-block">
                    <i class="nucleo nucleo-single-01-2 mr-1"></i>
                </div>
                {item.nameEmployee} ({item.id})
            </div>
        </li>)
    }
    //dung de render danh sach nhan vien khi nhap vao o tim kiem nhan vien
    renderDepartment = (callback) => {
        if (this.props.status.department.length === 0) {
            return <li className="vs__no-options">
                Gõ tên nhân viên, phòng ban, chức vụ để tìm kiếm.
            </li>
        }
        //vs__dropdown-option--highlight
        return this.props.status.department.map((item, id) => <li onClick={() => callback(item)} role="option" id={`vs1__option-${id}`} className="vs__dropdown-option"
            aria-selected="true">
            <div>
                <div class="inline-block">
                    <i class="nucleo nucleo-single-01-2 mr-1"></i>
                </div>
                {item.name}
            </div>
        </li>)
    }
    //render employee selected
    renderEmployeeSelected = (item) => {
        if (item !== null) {
            return <span className="vs__selected">
                <div className="inline-block">
                    <i className="nucleo nucleo-single-01-2 mr-1" />
                </div>
                {
                    !Array.isArray(item) ? <p>[{item.nameEmployee}]</p> : item.map(i => <p>[{i.nameEmployee === undefined ? i : i.nameEmployee}]</p>)
                }
                <button type="button" title="Deselect [Tất cả nhân viên]" aria-label="Deselect [Tất cả nhân viên]" className="vs__deselect">
                    <span className="feather-icon select-none relative">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x w-4 h-4 mt-1">
                            <line x1={18} y1={6} x2={6} y2={18} />
                            <line x1={6} y1={6} x2={18} y2={18} />
                        </svg>
                    </span>
                </button>
            </span>
        }
    }
    //chọn phần tử được chọn trong danh sách nhân viên
    selectedItem = (item) => this.setState({ employeeCurrent: item })
    //chọn phần tử được chọn trong danh sách nhân viên
    selectedDepartment = (item) => this.setState({ department: item })
    //chọn phần tử được chọn trong danh sách nhân viên
    selectedCreator = (item) => this.setState({ creator: item })
    //dung de lay thong tin tim kiem moi khi noi dung trong input thay doi
    changeInforSearch = (e) => {
        this.props.searchListEmployee({ object: "employees", contain: "nameEmployee_like", key: e.target.value })
    }
    //dung de lay thong tin tim kiem moi khi noi dung trong input thay doi
    changeInforDepartment = (e) => {
        this.props.searchDepartment({ object: "departments", contain: "name_like", key: e.target.value })
    }
    filter = () => {
        let dateStart = "&dateStart" + this.props.status.dateStartFilterAdvanced
        let dateEnd = "&dateEnd" + this.props.status.dateEndFilterAdvanced
        let typeTask = "&" + this.state.typeTask
        let prioritizeTask = "&prioritizeTask=" + this.state.typePriority
        let employee = this.state.employeeCurrent
        let cretor = "&creator_id=" + this.state.creator.id
        let involveEployee = "&" + this.state.involveEployee
        let department = "&" + this.state.department
        let data = { page: 1, filter: this.props.status.itemNeedFilter, advanced: [cretor,prioritizeTask] }
        this.props.getTaskByFilterAdvanced(data)
        this.closeForm()
    }
    render() {
        // console.log(this.props.status.dateEndFilterAdvanced)
        return (
            <div data-v-44ededa3 className="el-dialog__wrapper custom-dialog filter-dialog" style={{ zIndex: 2055 }} >
                <div onresize role="dialog" id="filterAdvanced" aria-modal="true" aria-label="Bộ lọc" className="el-dialog" style={{ marginTop: '15vh' }}>
                    <div className="el-dialog__header">
                        <span className="el-dialog__title">Bộ lọc</span>
                        <button onClick={this.closeForm} type="button" aria-label="Close" className="el-dialog__headerbtn">
                            <i className="el-dialog__close el-icon el-icon-close" />
                        </button>
                    </div>
                    <div onWheel={this.printS} className="el-dialog__body" id="cuon">
                        <div data-v-44ededa3 id="myDiv1" className={classNames("scroll-area--data-list p-6 ps ps--active-y", { "ps--scrolling-y": this.state.s })} settings="[object Object]">
                            <div data-v-44ededa3 className="request-filter__item">
                                <legend data-v-44ededa3 className="uppercase-first-letter text-solid-gray-1">
                                    Ngày bắt đầu:
                                </legend>
                                <div data-v-d69cc7fe data-v-44ededa3 className="cbs-date-range-picker flex flex-wrap">
                                    <div data-v-d69cc7fe className="w-full sm:flex-1 sm:mr-3 mb-3 sm:mb-0">
                                        <legend data-v-d69cc7fe />
                                        <div data-v-d69cc7fe className="vx-input-group flex">
                                            {/**/}
                                            <div data-v-d69cc7fe className="vx-input-group-default flex-grow">
                                                <div data-v-d69cc7fe className="el-date-editor w-full el-input el-input--prefix el-input--suffix el-date-editor--datetime" placeholder="Từ" pickeroptions="[object Object]" prefix-icon="''" format="dd/MM/yyyy HH:mm" value-format="yyyy-MM-dd HH:mm">{/**/}
                                                    <input type="text" autoComplete="off" value={this.props.status.dateStartFilterAdvanced} name placeholder="Từ" className="el-input__inner" />
                                                    <span className="el-input__prefix">
                                                        <i className="el-input__icon ''" />{/**/}
                                                    </span>
                                                    <span className="el-input__suffix">
                                                        <span className="el-input__suffix-inner">
                                                            <i className="el-input__icon" />
                                                            {/**/}{/**/}{/**/}{/**/}
                                                        </span>{/**/}
                                                    </span>
                                                    {/**/}{/**/}
                                                </div>
                                            </div>

                                            <div data-v-d69cc7fe className="vx-input-group-append flex">
                                                <div data-v-d69cc7fe className="append-text">
                                                    <i onClick={this.showStartDateInput} data-v-d69cc7fe className="nucleo nucleo-calendar-date" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-v-d69cc7fe className="w-full sm:flex-1">
                                        <legend data-v-d69cc7fe />
                                        <div data-v-d69cc7fe className="vx-input-group flex">
                                            {/**/}
                                            <div data-v-d69cc7fe className="vx-input-group-default flex-grow">
                                                <div data-v-d69cc7fe className="el-date-editor w-full el-input el-input--prefix el-input--suffix el-date-editor--datetime" placeholder="Đến" pickeroptions="[object Object]" prefix-icon="''" format="dd/MM/yyyy HH:mm" value-format="yyyy-MM-dd HH:mm">{/**/}
                                                    <input value={this.props.status.dateEndFilterAdvanced} type="text" autoComplete="off" name placeholder="Đến" className="el-input__inner" />
                                                    <span className="el-input__prefix">
                                                        <i className="el-input__icon ''" />{/**/}
                                                    </span>
                                                    <span className="el-input__suffix">
                                                        <span className="el-input__suffix-inner">
                                                            <i className="el-input__icon" />
                                                            {/**/}{/**/}{/**/}{/**/}
                                                        </span>
                                                        {/**/}
                                                    </span>
                                                    {/**/}{/**/}
                                                </div>
                                            </div>
                                            <div data-v-d69cc7fe className="vx-input-group-append flex">
                                                <div data-v-d69cc7fe className="append-text">
                                                    <i onClick={this.showEndDateInput} data-v-d69cc7fe className="nucleo nucleo-calendar-date" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-v-44ededa3 className="request-filter__item mt-6">
                                <legend data-v-44ededa3 className="uppercase-first-letter text-solid-gray-1">
                                    Dự kiến kết thúc:</legend>
                                <div data-v-d69cc7fe data-v-44ededa3 className="cbs-date-range-picker flex flex-wrap">
                                    <div data-v-d69cc7fe className="w-full sm:flex-1 sm:mr-3 mb-3 sm:mb-0"><legend data-v-d69cc7fe />
                                        <div data-v-d69cc7fe className="vx-input-group flex">
                                            {/**/}
                                            <div data-v-d69cc7fe className="vx-input-group-default flex-grow">
                                                <div data-v-d69cc7fe className="el-date-editor w-full el-input el-input--prefix el-input--suffix el-date-editor--datetime" placeholder="Từ" pickeroptions="[object Object]" prefix-icon="''" format="dd/MM/yyyy HH:mm" value-format="yyyy-MM-dd HH:mm">{/**/}
                                                    <input type="text" autoComplete="off" name placeholder="Từ" className="el-input__inner" />
                                                    <span className="el-input__prefix">
                                                        <i className="el-input__icon ''" />{/**/}
                                                    </span>
                                                    <span className="el-input__suffix">
                                                        <span className="el-input__suffix-inner">
                                                            <i className="el-input__icon" />{/**/}{/**/}{/**/}{/**/}
                                                        </span>{/**/}
                                                    </span>{/**/}{/**/}
                                                </div>
                                            </div>
                                            <div data-v-d69cc7fe className="vx-input-group-append flex">
                                                <div data-v-d69cc7fe className="append-text">
                                                    <i data-v-d69cc7fe className="nucleo nucleo-calendar-date" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-v-d69cc7fe className="w-full sm:flex-1">
                                        <legend data-v-d69cc7fe />
                                        <div data-v-d69cc7fe className="vx-input-group flex">{/**/}
                                            <div data-v-d69cc7fe className="vx-input-group-default flex-grow">
                                                <div data-v-d69cc7fe className="el-date-editor w-full el-input el-input--prefix el-input--suffix el-date-editor--datetime" placeholder="Đến" pickeroptions="[object Object]" prefix-icon="''" format="dd/MM/yyyy HH:mm" value-format="yyyy-MM-dd HH:mm">{/**/}
                                                    <input type="text" autoComplete="off" name placeholder="Đến" className="el-input__inner" />
                                                    <span className="el-input__prefix">
                                                        <i className="el-input__icon ''" />{/**/}
                                                    </span>
                                                    <span className="el-input__suffix">
                                                        <span className="el-input__suffix-inner">
                                                            <i className="el-input__icon" />{/**/}{/**/}{/**/}{/**/}</span>
                                                        {/**/}</span>{/**/}{/**/}</div>
                                            </div>
                                            <div data-v-d69cc7fe className="vx-input-group-append flex">
                                                <div data-v-d69cc7fe className="append-text">
                                                    <i data-v-d69cc7fe className="nucleo nucleo-calendar-date" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-v-44ededa3 className="mt-6">
                                <legend data-v-44ededa3 className="uppercase-first-letter text-solid-gray-1">Loại công việc:</legend>
                                <div data-v-44ededa3 dir="auto" className="v-select border-none w-full vs--single vs--searchable" data-vv-as="Loại công việc" name="type">
                                    <div id="vs9__combobox" role="combobox" aria-expanded="false" aria-owns="vs9__listbox" aria-label="Search for option" className="vs__dropdown-toggle">
                                        <div className="vs__selected-options">
                                            {/* <span className="vs__selected">
                                                Tất cả
                                                </span> */}
                                            <input onClick={this.showTypeTask} value={this.state.typeTask} aria-autocomplete="list" aria-labelledby="vs9__combobox" aria-controls="vs9__listbox" type="search" autoComplete="off" className="vs__search" />
                                        </div>
                                        <div className="vs__actions">
                                            <button type="button" title="Clear Selected" aria-label="Clear Selected" className="vs__clear" style={{ display: 'none' }}>
                                                <span className="feather-icon select-none relative">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x w-4 h-4 mt-1"><line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} /></svg>
                                                </span>
                                            </button>
                                            <span className="feather-icon select-none relative vs__open-indicator" role="presentation">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down w-5 h-5">
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </span>
                                            <div className="vs__spinner" style={{ display: 'none' }}>Loading...
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.showTypeTask ?
                                            <ul id="vs1__listbox" role="listbox" className="vs__dropdown-menu" >
                                                < li role="option" onClick={() => this.changeTypeTask("Tất cả")} id="vs1__option-0" className="vs__dropdown-option">
                                                    Tất cả
                                                </li>
                                                <li role="option" onClick={() => this.changeTypeTask("Bình thường")} id="vs1__option-1" className="vs__dropdown-option">
                                                    Bình thường
                                                </li>

                                                <li role="option" onClick={() => this.changeTypeTask("Định kỳ")} id="vs1__option-2" aria-selected="true" className="vs__dropdown-option ">
                                                    Định kỳ
                                                </li>
                                            </ul> :
                                            <ul id="vs1__listbox" role="listbox" style={{ display: 'flex', visibility: 'auto' }}></ul>
                                    }
                                </div>
                            </div>
                            <div data-v-44ededa3 className="mt-6">
                                <legend data-v-44ededa3 className="uppercase-first-letter text-solid-gray-1">Ưu tiên:</legend>
                                <div data-v-44ededa3 dir="auto" className="v-select border-none w-full vs--single vs--searchable" name="type">
                                    <div id="vs10__combobox" role="combobox" aria-expanded="false" aria-owns="vs10__listbox" aria-label="Search for option" className="vs__dropdown-toggle">
                                        <div className="vs__selected-options">
                                            <input onClick={this.showPriority} value={this.state.typePriority} placeholder="Chọn ưu tiên" aria-autocomplete="list" aria-labelledby="vs10__combobox" aria-controls="vs10__listbox" type="search" autoComplete="off" className="vs__search" />
                                        </div>
                                        <div className="vs__actions">
                                            <button type="button" title="Clear Selected" aria-label="Clear Selected" className="vs__clear" style={{ display: 'none' }}>
                                                <span className="feather-icon select-none relative">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x w-4 h-4 mt-1">
                                                        <line x1={18} y1={6} x2={6} y2={18} />
                                                        <line x1={6} y1={6} x2={18} y2={18} />
                                                    </svg>
                                                </span>
                                            </button>
                                            <span className="feather-icon select-none relative vs__open-indicator" role="presentation"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down w-5 h-5">
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                            </span>
                                            <div className="vs__spinner" style={{ display: 'none' }}>
                                                Loading...</div>
                                        </div>
                                    </div>
                                    {
                                        this.state.showPriority ?
                                            <ul id="vs10__listbox" role="listbox" className="vs__dropdown-menu" >
                                                < li role="option" onClick={() => this.changeTypePriority("Thấp")} id="vs1__option-0" className="vs__dropdown-option">
                                                    Thấp
                                                </li>
                                                <li role="option" onClick={() => this.changeTypePriority("Bình thường")} id="vs1__option-1" className="vs__dropdown-option">
                                                    Bình thường
                                                </li>

                                                <li role="option" onClick={() => this.changeTypePriority("Ưu tiên")} id="vs1__option-2" aria-selected="true" className="vs__dropdown-option ">
                                                    Ưu tiên
                                                </li>
                                                < li role="option" onClick={() => this.changeTypePriority("Rất ưu tiên")} id="vs1__option-0" className="vs__dropdown-option">
                                                    Rất ưu tiên
                                                </li>

                                            </ul> :
                                            <ul id="vs10__listbox" role="listbox" style={{ display: 'none', visibility: 'hidden' }} />
                                    }
                                </div>
                            </div>
                            <div data-v-44ededa3 className="mt-6">
                                <legend data-v-44ededa3 className="uppercase-first-letter text-solid-gray-1">Trạng thái:
                                </legend>
                                <div data-v-44ededa3 dir="auto" className="v-select border-none w-full select-multiple vs--searchable" name="type">
                                    <div id="vs11__combobox" role="combobox" aria-expanded="false" aria-owns="vs11__listbox" aria-label="Search for option" className="vs__dropdown-toggle">
                                        <div className="vs__selected-options">
                                            {this.renderEmployeeSelected(this.props.status.itemNeedFilter)}
                                            <input onClick={this.showStatus} placeholder="Chọn trạng thái" aria-autocomplete="list" aria-labelledby="vs11__combobox" aria-controls="vs11__listbox" type="search" autoComplete="off" className="vs__search" />
                                        </div>
                                        <div className="vs__actions">
                                            <button type="button" title="Clear Selected" aria-label="Clear Selected" className="vs__clear" style={{ display: 'none' }}>
                                                <span className="feather-icon select-none relative">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x w-4 h-4 mt-1">
                                                        <line x1={18} y1={6} x2={6} y2={18} />
                                                        <line x1={6} y1={6} x2={18} y2={18} />
                                                    </svg>
                                                </span>
                                            </button>
                                            <span className="feather-icon select-none relative vs__open-indicator" role="presentation">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down w-5 h-5">
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </span>
                                            <div className="vs__spinner" style={{ display: 'none' }}>Loading...</div>
                                        </div>
                                    </div>
                                    {
                                        this.state.showStatus ?
                                            <ul id="vs11__listbox" role="listbox" className="vs__dropdown-menu" >
                                                < li role="option" onClick={() => this.changeStatus("Mới")} id="vs1__option-0" className="vs__dropdown-option">
                                                    Mới
                                                </li>
                                                <li role="option" onClick={() => this.changeStatus("Đang làm")} id="vs1__option-1" className="vs__dropdown-option">
                                                    Đang làm
                                                </li>

                                                <li role="option" onClick={() => this.changeStatus("Chờ xác nhận")} id="vs1__option-2" aria-selected="true" className="vs__dropdown-option ">
                                                    Chờ xác nhận
                                                </li>
                                                < li role="option" onClick={() => this.changeStatus("Hoàn thành")} id="vs1__option-0" className="vs__dropdown-option">
                                                    Hoàn thành
                                                </li>
                                                <li role="option" onClick={() => this.changeStatus("Đã hủy")} id="vs1__option-2" aria-selected="true" className="vs__dropdown-option ">
                                                    Đã hủy
                                                </li>
                                                < li role="option" onClick={() => this.changeStatus("Qúa hạn")} id="vs1__option-0" className="vs__dropdown-option">
                                                    Qúa hạn
                                                </li>
                                            </ul> :
                                            <ul id="vs11__listbox" role="listbox" style={{ display: 'none', visibility: 'hidden' }} />
                                    }
                                </div>
                            </div>
                            <div data-v-44ededa3 className="mt-6">
                                <legend data-v-44ededa3 className="uppercase-first-letter text-solid-gray-1">
                                    Người được giao:
                                </legend>
                                <div data-v-44ededa3>
                                    <div className="container-watcher--block-item">{/**/}
                                        <div dir="auto" className="v-select bg-white select-multiple vs--searchable" data-vv-as="Người được giao" name="assignees">
                                            <div id="vs12__combobox" role="combobox" aria-expanded="false" aria-owns="vs12__listbox" aria-label="Search for option" className="vs__dropdown-toggle"><div className="vs__selected-options">
                                                {this.renderEmployeeSelected(this.state.employeeCurrent)}
                                                <input onClick={this.showAssignedPerson} onChange={this.changeInforSearch} placeholder="Chọn người được giao" aria-autocomplete="list" aria-labelledby="vs12__combobox" aria-controls="vs12__listbox" type="search" autoComplete="off" className="vs__search" />
                                            </div>
                                                <div className="vs__actions">
                                                    <button type="button" title="Clear Selected" aria-label="Clear Selected" className="vs__clear" style={{ display: 'none' }}>
                                                        <span className="feather-icon select-none relative">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x w-4 h-4 mt-1">
                                                                <line x1={18} y1={6} x2={6} y2={18} /><line x1={6} y1={6} x2={18} y2={18} />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <span className="feather-icon select-none relative vs__open-indicator" role="presentation">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down w-5 h-5">
                                                            <polyline points="6 9 12 15 18 9" /></svg></span> <div className="vs__spinner" style={{ display: 'none' }}>
                                                        Loading...
                                                    </div>
                                                </div>
                                            </div>
                                            <ul id="vs12__listbox" role="listbox" style={this.state.showAssignedPerson ? null : { display: 'none', visibility: 'hidden' }} className={this.state.showAssignedPerson ? "vs__dropdown-menu" : null}>
                                                {this.renderListEmployee(this.selectedItem)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-v-44ededa3 className="mt-6">
                                <legend data-v-44ededa3 className="uppercase-first-letter text-solid-gray-1">
                                    Đối tượng liên quan:
                                </legend>
                                <div data-v-44ededa3>
                                    <div className="container-watcher--block-item">{/**/}
                                        <div dir="auto" className="v-select bg-white select-multiple vs--searchable" data-vv-as="Đối tượng liên quan" name="relations">
                                            <div id="vs13__combobox" role="combobox" aria-expanded="false" aria-owns="vs13__listbox" aria-label="Search for option" className="vs__dropdown-toggle">
                                                <div className="vs__selected-options">
                                                    {this.renderEmployeeSelected(this.state.involveEployee)}
                                                    <input onClick={this.showInvolveEployee} onChange={this.changeInforSearch} placeholder="Chọn đối tượng liên quan" aria-autocomplete="list" aria-labelledby="vs13__combobox" aria-controls="vs13__listbox" type="search" autoComplete="off" className="vs__search" />
                                                </div>
                                                <div className="vs__actions">
                                                    <button type="button" title="Clear Selected" aria-label="Clear Selected" className="vs__clear" style={{ display: 'none' }}>
                                                        <span className="feather-icon select-none relative">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x w-4 h-4 mt-1"><line x1={18} y1={6} x2={6} y2={18} />
                                                                <line x1={6} y1={6} x2={18} y2={18} />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <span className="feather-icon select-none relative vs__open-indicator" role="presentation">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down w-5 h-5">
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    </span>
                                                    <div className="vs__spinner" style={{ display: 'none' }}>Loading...
                                                    </div>
                                                </div>
                                            </div>
                                            <ul id="vs13__listbox" role="listbox" style={this.state.showInvolveEployee ? null : { display: 'none', visibility: 'hidden' }} className={this.state.showInvolveEployee ? "vs__dropdown-menu" : null}>
                                                {this.renderListEmployee(this.selectedInvolveEployee)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-v-44ededa3 className="mt-6">
                                <legend data-v-44ededa3 className="uppercase-first-letter text-solid-gray-1">Người giao:</legend>
                                <div data-v-44ededa3>
                                    <div className="container-watcher--block-item">{/**/}
                                        <div dir="auto" className="v-select bg-white select-multiple vs--single vs--searchable" data-vv-as="Người giao" name="assignor">
                                            <div id="vs14__combobox" role="combobox" aria-expanded="false" aria-owns="vs14__listbox" aria-label="Search for option" className="vs__dropdown-toggle">
                                                <div className="vs__selected-options">
                                                    {this.renderEmployeeSelected(this.state.creator)}
                                                    <input onClick={this.showCreator} onChange={this.changeInforSearch} placeholder="Chọn người giao" aria-autocomplete="list" aria-labelledby="vs14__combobox" aria-controls="vs14__listbox" type="search" autoComplete="off" className="vs__search" />
                                                </div>
                                                <div className="vs__actions">
                                                    <button type="button" title="Clear Selected" aria-label="Clear Selected" className="vs__clear" style={{ display: 'none' }}>
                                                        <span className="feather-icon select-none relative">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x w-4 h-4 mt-1">
                                                                <line x1={18} y1={6} x2={6} y2={18} />
                                                                <line x1={6} y1={6} x2={18} y2={18} />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <span className="feather-icon select-none relative vs__open-indicator" role="presentation">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down w-5 h-5">
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    </span>
                                                    <div className="vs__spinner" style={{ display: 'none' }}>Loading...
                                                    </div>
                                                </div>
                                            </div>
                                            <ul id="vs14__listbox" role="listbox" style={this.state.showCreator ? null : { display: 'none', visibility: 'hidden' }} className={this.state.showCreator ? "vs__dropdown-menu" : null}>
                                                {this.renderListEmployee(this.selectedCreator)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-v-44ededa3 className="mt-6">
                                <legend data-v-44ededa3 className="uppercase-first-letter text-solid-gray-1">Phòng ban:
                                </legend>
                                <div data-v-44ededa3 dir="auto" className="v-select border-none w-full select-multiple vs--searchable" name="type">
                                    <div id="vs15__combobox" role="combobox" aria-expanded="false" aria-owns="vs15__listbox" aria-label="Search for option" className="vs__dropdown-toggle">
                                        <div className="vs__selected-options">
                                            {this.renderEmployeeSelected(this.state.department)}
                                            <input onClick={this.showDepartment} onChange={this.changeInforDepartment} placeholder="Chọn phòng ban" aria-autocomplete="list" aria-labelledby="vs15__combobox" aria-controls="vs15__listbox" type="search" autoComplete="off" className="vs__search" />
                                        </div>
                                        <div className="vs__actions">
                                            <button type="button" title="Clear Selected" aria-label="Clear Selected" className="vs__clear" style={{ display: 'none' }}>
                                                <span className="feather-icon select-none relative">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x w-4 h-4 mt-1">
                                                        <line x1={18} y1={6} x2={6} y2={18} />
                                                        <line x1={6} y1={6} x2={18} y2={18} />
                                                    </svg>
                                                </span>
                                            </button>
                                            <span className="feather-icon select-none relative vs__open-indicator" role="presentation">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down w-5 h-5">
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </span>
                                            <div className="vs__spinner" style={{ display: 'none' }}>Loading...
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="vs14__listbox" role="listbox" style={this.state.showDepartment ? null : { display: 'none', visibility: 'hidden' }} className={this.state.department ? "vs__dropdown-menu" : null}>
                                        {this.renderDepartment(this.selectedDepartment)}
                                    </ul>
                                    <ul id="vs15__listbox" role="listbox" style={{ display: 'none', visibility: 'hidden' }} />
                                </div>
                            </div>
                            {/* <div className="ps__rail-x" style={{ left: '0px', bottom: '0px' }}> */}
                            <div className="ps__rail-x" style={styleX}>
                                <div className="ps__thumb-x" tabIndex={0} style={{ left: '0px', width: '0px' }} />
                            </div>
                            <div className="ps__rail-y" style={styleY}>
                                {/* <div className="ps__rail-y" style={style}> */}
                                <div className="ps__thumb-y" tabIndex={0} style={styleYMini} />
                            </div>
                        </div>
                    </div>
                    <div className="el-dialog__footer">
                        <div data-v-44ededa3 className="flex items-center justify-center">
                            <button data-v-44ededa3 type="button" name="button" className="vs-component vs-button w-full sm:w-2/5 mr-6 last:mr-0 font-bold vs-button-primary vs-button-border" style={{ background: 'transparent' }}>
                                <span className="vs-button-backgroundx vs-button--background" style={{ opacity: 1, left: '20px', top: '20px', width: '0px', height: '0px', transition: 'width 0.3s ease 0s, height 0.3s ease 0s, opacity 0.3s ease 0s' }} />{/**/}
                                <span className="vs-button-text vs-button--text">Đặt lại
                                </span>
                                <span className="vs-button-linex" style={{ top: 'auto', bottom: '-2px', left: '50%', transform: 'translate(-50%)' }} />
                            </button>
                            <button onClick={this.filter} data-v-44ededa3 type="button" name="button" className="vs-component vs-button w-full sm:w-2/5 mr-6 last:mr-0 font-bold vs-button-primary vs-button-filled">
                                <span className="vs-button-backgroundx vs-button--background" style={{ opacity: 1, left: '20px', top: '20px', width: '0px', height: '0px', transition: 'width 0.3s ease 0s, height 0.3s ease 0s, opacity 0.3s ease 0s' }} />{/**/}
                                <span className="vs-button-text vs-button--text">Áp dụng</span>
                                <span className="vs-button-linex" style={{ top: 'auto', bottom: '-2px', left: '50%', transform: 'translate(-50%)' }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div >
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
        showDateInputStart: () => { return dispatch(action.showDateInputOfDateStart()) },
        showDateInputEnd: () => { return dispatch(action.showDateInputOfDateEnd()) },
        isShowFilterAdvanced: () => { dispatch(action.isShowFilterAdvanced()) },
        searchListEmployee: (params) => { dispatch(action.searchByParams(params)) },
        searchDepartment: (params) => { dispatch(action.searchDepartment(params)) },
        getTaskByFilterAdvanced: (page) => { dispatch(action.dispatchFilterAdvanced(page)) },
        addItemFilter: (item) => { return dispatch(action.addItemNeedFilter(item)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FilterAdvanced);