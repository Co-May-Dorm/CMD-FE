import React, { Component } from 'react';
import classNames from "classnames"
import TaskObject from "../../mockData/TaskObject"
import { connect } from 'react-redux';
import * as action from "../../actions/todoListAction"
let styleX = { left: '0px', bottom: '-608px' }
let styleY = { top: '608px', height: '197px', right: '0px' }
let styleYMini = { top: '82px', height: `${277 / 2.8}px` }

class FormCreateTask extends Component {
    constructor() {
        super();
        this.state = ({
            s: false, yPosition: 0, sw: window.innerWidth, inforTime: true, moreInfor: true, nameTask: null,
            decriptionTask: null, showListEmployee: false, employeeCurrent: [], switchTimeComplete: false,
            showRepeat: false, showInvolveEployee: false, involveEployee: [], prioritizeTask: 1, showUnitTimeCompleteTask: false
            , valueUnitComplete: null, timeCompleteTask: null, timePerRepeat: null, mayday: [], hour: null
        });
    }
    //show list employee
    showListEmployee = () => this.setState({ showListEmployee: !this.state.showListEmployee })
    showInvolveEployee = () => this.setState({ showInvolveEployee: !this.state.showInvolveEployee })
    showInforTime = () => this.setState({ inforTime: !this.state.inforTime });
    showMoreInfor = () => this.setState({ moreInfor: !this.state.moreInfor });
    closeForm = () => {
        this.props.isShowFormCreateTask();
    };
    printS = (e) => {
        let chieuDai = document.getElementById('myDiv').clientHeight + 400; //bao gồm phần đệm
        // let chieuDai = document.getElementById('myDiv').offsetHeight//bao gồm phần đệm , scrollbar và viền
        // console.log(document.getElementById('myDiv').clientHeight)
        let tam = document.getElementById('myDiv').scrollTop;
        let pos = this.state.yPosition;
        if (e.deltaY > 0 && tam < chieuDai) {
            pos += 50;
            this.setState({ yPosition: pos });
            styleX = { ...styleX, bottom: `${-pos}px` };
            styleY = { ...styleY, top: `${pos}px`, height: `${chieuDai}px` };
            styleYMini = { ...styleYMini, top: `${pos}px`, height: `${chieuDai / 2.8}px` };
            document.getElementById("myDiv").scrollTo(0, pos);
        }
        else if (e.deltaY < 0 && tam > 0) {
            pos -= 50;
            this.setState({ yPosition: pos });
            styleX = { ...styleX, bottom: `${-pos}px` };
            styleY = { ...styleY, top: `${pos}px`, height: `${chieuDai}px` };
            styleYMini = { ...styleYMini, top: `${pos}px`, height: `${chieuDai / 2.8}px` };
            document.getElementById("myDiv").scrollTo(0, pos);
        }
    };
    handleChangeNameTask = (e) => {
        this.setState({ nameTask: e.target.value });
    };
    handleDecriptionTask = (e) => {
        this.setState({ decriptionTask: e.target.value });
    };
    //dùng để xác định để kiểm tra xem công việc được lặp vào hằng tháng nó sẽ được lặp vào theo ngày hay theo thời điểm 
    checkSelectedRepeaterMonthly = (nameRadiobutton) => {
        let radio_button = document.getElementsByName(nameRadiobutton)
        radio_button.forEach(element => {
            if (element.checked) return element.value
        });
    }
    creatNewTask = (event) => {
        let v = document.getElementsByName("priority")
        let prioritize;
        for (let i = 0; i < v.length; i++) {
            if (v[i].checked) {
                prioritize = v[i].value
                break
            }
        }
        let nameTask = this.state.nameTask//tên công viẹc
        let decripstionTask = document.getElementById("value").innerHTML // mô tả công việc
        let status = 4 // trang thái công việc , mặc định mới tạo là mới (4)
        let idCreator = 60// id người tạo công việc
        let nameCretor= "Nguyễn Dũy Long" // tên người tạo công việc
        let prioritizeTask = this.state.prioritizeTask // mức độ ưu tiên của công việc
        let dateStart = this.props.status.timeStartNewStart // ngày bắt đầu của công việc
        let dateEnd = this.props.status.timeCompleteNewStask // ngày kết thúc của công việc
        let timeComplete = this.state.timeCompleteTask // thới gian hoàn thành công việc (tính theo đơn vị thới gian là ngày hoặc giờ)
        let unitTimeComplete = this.state.valueUnitComplete // đơn vị thời gian hoành thành công việc ( ngày , giờ)
        let unitTimeRepeat = this.props.status.selectedDropdown // đơn vị thời gian của từng lần lặp
        let timePerRepeat = this.state.timePerRepeat // số lần lặp
        let hour = this.state.hour
        let employees = this.state.employeeCurrent
        let historyTask = []
        let newTask
        switch (unitTimeRepeat) {
            case "Theo ngày": {
                newTask = new TaskObject(nameTask, idCreator, nameCretor, decripstionTask, status
                    , prioritizeTask, dateStart, dateEnd, timeComplete, unitTimeComplete
                    , unitTimeRepeat, timePerRepeat, hour, employees, historyTask)
                break;
            }
            case "Theo tuần": {
                let mayday = this.state.mayday // thứ trong tuần ví dụ thứ 2, 3, ...
                newTask = {
                    nameTask, decripstionTask, status, idCreator, nameCretor
                    , prioritizeTask, dateStart, dateEnd, timeComplete, unitTimeComplete
                    , unitTimeRepeat, timePerRepeat, hour, mayday
                }
                break;
            }
            case "Theo tháng": {
                let whatChecked = this.checkSelectedRepeaterMonthly("monthly-config")
                if (whatChecked === 0) {
                    let dayRepeatMonthly = document.getElementsByName("dayRepeatMonthly").values // ngày công việc được lặp trong tháng
                    newTask = {
                        nameTask, decripstionTask, status, idCreator, nameCretor
                        , prioritizeTask, dateStart, dateEnd, timeComplete, unitTimeComplete
                        , unitTimeRepeat, timePerRepeat, hour, dayRepeatMonthly
                    }
                }
                else {
                    let dayoftheweek = document.getElementsByName("dayoftheweek").values // vào thời điêm nào của tháng
                    let ordinarily = document.getElementsByName("ordinarily").values // thứ tự của công việc 
                    newTask = {
                        nameTask, decripstionTask, status, idCreator, nameCretor
                        , prioritizeTask, dateStart, dateEnd, timeComplete, unitTimeComplete
                        , unitTimeRepeat, timePerRepeat, hour, dayoftheweek,
                        ordinarily
                    }

                }
                break;
            }
            case "Theo năm": {
                let whatChecked = this.checkSelectedRepeaterMonthly("yearly-config")
                if (whatChecked === 0) {
                    let month12 = document.getElementsByName("month12").values // vào thàng nào của năm
                    let ByMonthDay = document.getElementsByName("ByMonthDay").values // vào ngày nào của tháng vừa được chọn
                    newTask = {
                        nameTask, decripstionTask, status, idCreator, nameCretor
                        , prioritizeTask, dateStart, dateEnd, timeComplete, unitTimeComplete
                        , unitTimeRepeat, timePerRepeat, hour, month12, ByMonthDay
                    }
                } else {
                    let dayoftheweek = document.getElementsByName("dayoftheweek").values // vào thời điêm nào của tháng
                    let ordinarily = document.getElementsByName("ordinarily").values // thứ tự của công việc 
                    let month23 = document.getElementsByName("month23").values// tháng nào
                    newTask = {
                        nameTask, decripstionTask, status, idCreator, nameCretor
                        , prioritizeTask, dateStart, dateEnd, timeComplete, unitTimeComplete
                        , unitTimeRepeat, timePerRepeat, hour, dayoftheweek, ordinarily, month23
                    }
                }
                break;
            }
        }
        // let newTask= new TaskObject(nameTask, decripstionTask);
        // event.preventDefault()
        this.props.createTask(JSON.parse(JSON.stringify(newTask)))
        this.closeForm()
    };
    //set giá trị cho độ ưu tiên công việc
    valuePriortzeTask = (e) => {
        switch (e) {
            case 1: {
                this.setState({ prioritizeTask: "Rất ưu tiên" })
                break
            }
            case 2: {
                this.setState({ prioritizeTask: "Ưu tiên" })
                break
            }
            case 4: {
                this.setState({ prioritizeTask: "Thấp" })
                break
            }
            default: {
                this.setState({ prioritizeTask: "Bình thường" })
                break
            }
        }
    }
    // set giá trị cho đơn vị hoàn thành công việc
    valueUnitComplete = (value) => this.setState({ valueUnitComplete: value })
    //set value time to complete task 
    timeCompletTask = (e) => this.setState({ timeCompleteTask: e.target.value })
    //set lại giá trị cho bộ đếm theo từng lần
    timePerRepeat = (e) => this.setState({ timePerRepeat: e.target.value })
    // giá trị của thứ trong tuần
    valueMayday = (value) => {
        if (this.state.mayday.includes[value]) {
            this.setState({ mayday: this.state.mayday.filter(e => e !== value) })
        } else {
            this.setState({ mayday: this.state.mayday.concat(value) })
        }

    }
    // hiển thị bộ chọn đơn vị thời gian lặp
    showUnitTimeCompleteTask = () => {
        this.setState({ showUnitTimeCompleteTask: !this.state.showUnitTimeCompleteTask })
    }
    //dung de lay thong tin tim kiem moi khi noi dung trong input thay doi
    changeInforSearch = (e) => {
        this.props.searchListEmployee({ object: "employees", contain: "nameEmployee_like", key: e.target.value })
    }
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
    //chọn phần tử được chọn trong danh sách nhân viên
    selectedItem = (item) => this.setState({ employeeCurrent: this.state.employeeCurrent.concat(item) })
    //chọn nhân viên liên quan được chọn
    selectedInvolveEployee = (item) => this.setState({ involveEployee: this.state.involveEployee.concat(item) })
    // thay đổi giờ của bộ lặp 
    handleChangeHourRepeat = (e) => this.setState({ hour: e.target.value })
    //render employee selected
    renderEmployeeSelected = (item) => {
        if (item !== null) {
            return <span className="vs__selected">
                <div className="inline-block">
                    <i className="nucleo nucleo-single-01-2 mr-1" />
                </div>
                {
                    !Array.isArray(item) ? <p>[{item.nameEmployee}]</p> : item.map(i => <p>[{i.nameEmployee}]</p>)
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
    //switch thoi gian bắt đầu và thời gian kết thúc
    switchTime = () => this.setState({ switchTimeComplete: !this.state.switchTimeComplete })
    //show bộ lặp
    showRepeat = () => this.setState({ showRepeat: !this.state.showRepeat })
    //switchComponentRepeat
    switchComponentRepeat = () => {
        switch (this.props.status.selectedDropdown) {
            case "Theo giờ": return null
            case "Theo ngày":
                return <div className="mt-6 time-repeater--select-byhour flex items-baseline">
                    <h6 className="mb-2 custom-component--title mr-2">Giờ lặp:</h6>
                    <div>
                        <div className="el-date-editor el-input el-input--prefix el-input--suffix el-date-editor--time">
                            <input type="text" autoComplete="off" name="more" onChange={this.handleChangeHourRepeat} className="el-input__inner" />
                            <span className="el-input__prefix">
                                <i className="el-input__icon el-icon-time" />
                            </span>
                            <span className="el-input__suffix">
                                <span className="el-input__suffix-inner">
                                    <i className="el-input__icon" />
                                </span>
                            </span>
                        </div>
                        <div className="mt-3" />
                    </div>
                    <span className="text-danger text-sm break-normal" style={{ display: 'none' }} />
                </div>
            case "Theo tuần":
                return (
                    [
                        <div className="mt-6 time-repeater--select-byhour time-repeater--select-days-week ">
                            <h6 className="mb-2 custom-component--title">Thứ lặp <span className="text-danger">*</span>:</h6>
                            <div className="time-repeater--select-days-week flex justify-start">
                                <div className="vs-component con-vs-checkbox mr-2 vs-checkbox-primary vs-checkbox-default">
                                    <input onClick={() => this.valueMayday("T2")} type="checkbox" className="vs-checkbox--input" defaultValue />
                                    <span className="checkbox_x vs-checkbox" style={{ border: '2px solid rgb(180, 180, 180)' }}>
                                        <span className="vs-checkbox--check">
                                            <i className="vs-icon notranslate icon-scale vs-checkbox--icon  material-icons null">check</i>
                                        </span>
                                    </span>
                                    <span className="con-slot-label">
                                        T2
                                    </span>
                                </div>
                                <div className="vs-component con-vs-checkbox mr-2 vs-checkbox-primary vs-checkbox-default">
                                    <input onClick={() => this.valueMayday("T3")} type="checkbox" className="vs-checkbox--input" defaultValue />
                                    <span className="checkbox_x vs-checkbox" st type="checkbox" className="vs-checkbox--input" defaultValue />
                                    <span className="checkbox_x vs-checkbox" style={{ border: '2px solid rgb(180, 180, 180)' }}>
                                        <span className="vs-checkbox--check">
                                            <i className="vs-icon notranslate icon-scale vs-checkbox--icon  material-icons null">check</i>
                                        </span>
                                    </span>
                                    <span className="con-slot-label">
                                        T3
                                    </span>
                                </div>
                                <div className="vs-component con-vs-checkbox mr-2 vs-checkbox-primary vs-checkbox-default">
                                    <input onClick={() => this.valueMayday("T4")} type="checkbox" className="vs-checkbox--input" defaultValue />
                                    <span className="checkbox_x vs-checkbox" st type="checkbox" className="vs-checkbox--input" defaultValue />
                                    <span className="checkbox_x vs-checkbox" style={{ border: '2px solid rgb(180, 180, 180)' }}>
                                        <span className="vs-checkbox--check">
                                            <i className="vs-icon notranslate icon-scale vs-checkbox--icon  material-icons null">check</i>
                                        </span>
                                    </span>
                                    <span className="con-slot-label">
                                        T4
                                    </span>
                                </div>
                                <div className="vs-component con-vs-checkbox mr-2 vs-checkbox-primary vs-checkbox-default">
                                    <input onClick={() => this.valueMayday("T5")} type="checkbox" className="vs-checkbox--input" defaultValue />
                                    <span className="checkbox_x vs-checkbox" st type="checkbox" className="vs-checkbox--input" defaultValue />
                                    <span className="checkbox_x vs-checkbox" style={{ border: '2px solid rgb(180, 180, 180)' }}>
                                        <span className="vs-checkbox--check">
                                            <i className="vs-icon notranslate icon-scale vs-checkbox--icon  material-icons null">check</i>
                                        </span>
                                    </span>
                                    <span className="con-slot-label">
                                        T5
                                    </span>
                                </div>
                                <div className="vs-component con-vs-checkbox mr-2 vs-checkbox-primary vs-checkbox-default">
                                    <input onClick={() => this.valueMayday("T6")} type="checkbox" className="vs-checkbox--input" defaultValue />
                                    <span className="checkbox_x vs-checkbox" st type="checkbox" className="vs-checkbox--input" defaultValue />
                                    <span className="checkbox_x vs-checkbox" style={{ border: '2px solid rgb(180, 180, 180)' }}>
                                        <span className="vs-checkbox--check">
                                            <i className="vs-icon notranslate icon-scale vs-checkbox--icon  material-icons null">check</i>
                                        </span>
                                    </span>
                                    <span className="con-slot-label">
                                        T6
                                    </span>
                                </div>
                                <div className="vs-component con-vs-checkbox mr-2 vs-checkbox-primary vs-checkbox-default">
                                    <input onClick={() => this.valueMayday("T7")} type="checkbox" className="vs-checkbox--input" defaultValue />
                                    <span className="checkbox_x vs-checkbox" st type="checkbox" className="vs-checkbox--input" defaultValue />
                                    <span className="checkbox_x vs-checkbox" style={{ border: '2px solid rgb(180, 180, 180)' }}>
                                        <span className="vs-checkbox--check">
                                            <i className="vs-icon notranslate icon-scale vs-checkbox--icon  material-icons null">check</i>
                                        </span>
                                    </span>
                                    <span className="con-slot-label">
                                        T7
                                    </span>
                                </div>
                                <div className="vs-component con-vs-checkbox mr-2 vs-checkbox-primary vs-checkbox-default">
                                    <input onClick={() => this.valueMayday("CN")} type="checkbox" className="vs-checkbox--input" defaultValue />
                                    <span className="checkbox_x vs-checkbox" st type="checkbox" className="vs-checkbox--input" defaultValue />
                                    <span className="checkbox_x vs-checkbox" style={{ border: '2px solid rgb(180, 180, 180)' }}>
                                        <span className="vs-checkbox--check">
                                            <i className="vs-icon notranslate icon-scale vs-checkbox--icon  material-icons null">check</i>
                                        </span>
                                    </span>
                                    <span className="con-slot-label">
                                        CN
                                    </span>
                                </div>
                            </div>
                            <span className="text-danger text-sm break-normal" style={{ display: 'none' }}>
                            </span>
                        </div>
                        ,
                        <div className="mt-6 time-repeater--select-byhour flex items-baseline">
                            <h6 className="mb-2 custom-component--title mr-2">Giờ lặp:</h6>
                            <div>
                                <div className="el-date-editor el-input el-input--prefix el-input--suffix el-date-editor--time">
                                    <input type="text" autoComplete="off" name className="el-input__inner" />
                                    <span className="el-input__prefix">
                                        <i className="el-input__icon el-icon-time" />
                                    </span>
                                    <span className="el-input__suffix">
                                        <span className="el-input__suffix-inner">
                                            <i className="el-input__icon" />
                                        </span>
                                    </span>
                                </div>
                                <div className="mt-3" />
                            </div>
                            <span className="text-danger text-sm break-normal" style={{ display: 'none' }} />
                        </div>
                    ].map(item1 => item1))
            case "Theo tháng":
                return ([<div className="monthly-config-repeat mt-6 time-repeater__monthly-config">
                    <div className="flex items-baseline flex-wrap sm:flex-no-wrap mb-3">
                        <label className="vs-component con-vs-radio mb-3 sm:mb-0 sm:mr-3 vs-radio-primary">
                            <input name="monthly-config" type="radio" className="vs-radio--input" defaultValue={0} />
                            <span className="vs-radio"><span className="vs-radio--borde" />
                                <span className="vs-radio--circle" />
                            </span>
                            <span className="vs-radio--label">
                                <span>Vào ngày</span>
                            </span>
                        </label>
                        <div className="p-1 pl-10"><div className="el-select cbs-select-number block w-auto" datatype="int" data-vv-as="Ngày">{/**/}<div className="el-input el-input--suffix is-focus">{/**/}<input type="text" autoComplete="off" placeholder="Chọn ngày" name="dayRepeatMonthly" className="el-input__inner" />{/**/}<span className="el-input__suffix"><span className="el-input__suffix-inner"><i className="el-select__caret el-input__icon el-icon-arrow-up is-reverse" />{/**/}{/**/}{/**/}{/**/}{/**/}</span>{/**/}</span>{/**/}{/**/}</div></div><span className="text-danger text-sm break-normal" style={{ display: 'none' }} /></div>
                    </div>
                    <div className="flex items-baseline flex-wrap sm:flex-no-wrap mb-3">
                        <label className="vs-component con-vs-radio vs-radio-primary">
                            <input name="monthly-config" type="radio" className="vs-radio--input" defaultValue={0} />
                            <span className="vs-radio">
                                <span className="vs-radio--borde" style={{ border: '2px solid rgb(200, 200, 200)' }} />
                                <span className="vs-radio--circle" />
                            </span>
                            <span className="vs-radio--label">
                                <span className="whitespace-no-wrap">Vào thời điểm</span>
                            </span>
                        </label>
                        <div className="select-day-of-month flex flex-wrap sm:flex-no-wrap p-1 pl-5 rounded">
                            <div className="sm:w-1/2 w-full order-first mb-3 sm:mb-0 sm:mr-3"><div className="el-select select-day-option w-full" data-vv-as="Ngày">{/**/}<div className="el-input el-input--suffix is-focus">{/**/}<input type="text" autoComplete="off" placeholder="Chọn ngày" name="dayoftheweek" className="el-input__inner" />{/**/}<span className="el-input__suffix"><span className="el-input__suffix-inner"><i className="el-select__caret el-input__icon el-icon-arrow-up is-reverse" />{/**/}{/**/}{/**/}{/**/}{/**/}</span>{/**/}</span>{/**/}{/**/}</div></div><span className="text-danger text-sm break-normal" style={{ display: 'none' }} /></div>
                            <div className="sm:w-1/2 w-full"><div className="el-select select-ordinarily w-full" data-vv-as="Thứ tự">{/**/}<div className="el-input el-input--suffix is-focus">{/**/}<input type="text" autoComplete="off" placeholder="Chọn thứ tự" name="ordinarily" className="el-input__inner" />{/**/}<span className="el-input__suffix"><span className="el-input__suffix-inner"><i className="el-select__caret el-input__icon el-icon-arrow-up is-reverse" />{/**/}{/**/}{/**/}{/**/}{/**/}</span>{/**/}</span>{/**/}{/**/}</div></div><span className="text-danger text-sm break-normal" style={{ display: 'none' }} /></div>
                        </div>
                    </div>
                </div>
                    ,
                <div className="mt-6 time-repeater--select-byhour flex items-baseline">
                    <h6 className="mb-2 custom-component--title mr-2">Giờ lặp:</h6>
                    <div>
                        <div className="el-date-editor el-input el-input--prefix el-input--suffix el-date-editor--time">
                            <input type="text" autoComplete="off" name placeholder="Thêm" className="el-input__inner" />
                            <span className="el-input__prefix">
                                <i className="el-input__icon el-icon-time" />
                            </span>
                            <span className="el-input__suffix">
                                <span className="el-input__suffix-inner">
                                    <i className="el-input__icon" />
                                </span>
                            </span>
                        </div>
                        <div className="mt-3" />
                    </div>
                    <span className="text-danger text-sm break-normal" style={{ display: 'none' }} />
                </div>
                ].map(item => item)
                )
            case "Theo năm":
                return (
                    [
                        <div className="yearly-config-repeat mt-6 time-repeater__yearly-config">
                            <div className="flex flex-wrap sm:flex-no-wrap mb-3">
                                <label className="vs-component con-vs-radio vs-radio-primary">
                                    <input name="yearly-config" type="radio" className="vs-radio--input" defaultValue={0} /><span className="vs-radio">
                                        <span className="vs-radio--borde">
                                        </span>
                                        <span className="vs-radio--circle">
                                        </span>
                                    </span>
                                    <span className="vs-radio--label">
                                        <span className="whitespace-no-wrap">Vào ngày</span>
                                    </span>
                                </label>
                                <div className="select-day-of-month flex flex-wrap sm:flex-no-wrap w-full pl-16">
                                    <div className="order-first mb-3 sm:mb-0 sm:mr-3"><div className="el-select cbs-select-month w-full" data-vv-as="Tháng">{/**/}<div className="el-input el-input--suffix is-focus">{/**/}<input type="text" autoComplete="off" placeholder="Chọn tháng" name="month12" className="el-input__inner" />{/**/}<span className="el-input__suffix"><span className="el-input__suffix-inner"><i className="el-select__caret el-input__icon el-icon-arrow-up is-reverse" />{/**/}{/**/}{/**/}{/**/}{/**/}</span>{/**/}</span>{/**/}{/**/}</div></div><span className="text-danger text-sm break-normal" style={{ display: 'none' }} /></div>
                                    <div className><div className="el-select cbs-select-number w-full" data-vv-as="Ngày">{/**/}<div className="el-input el-input--suffix is-focus">{/**/}<input type="text" autoComplete="off" placeholder="Chọn ngày" name="ByMonthDay" className="el-input__inner" />{/**/}<span className="el-input__suffix"><span className="el-input__suffix-inner"><i className="el-select__caret el-input__icon el-icon-arrow-up is-reverse" />{/**/}{/**/}{/**/}{/**/}{/**/}</span>{/**/}</span>{/**/}{/**/}</div></div><span className="text-danger text-sm break-normal" style={{ display: 'none' }} /></div>

                                </div>
                            </div>
                            <div className="flex flex-wrap sm:flex-no-wrap mb-3">
                                <label className="vs-component con-vs-radio vs-radio-primary">
                                    <input name="yearly-config" type="radio" className="vs-radio--input" defaultValue={0} />
                                    <span className="vs-radio">
                                        <span className="vs-radio--borde" style={{ border: '2px solid rgb(200, 200, 200)' }} /><span className="vs-radio--circle" />
                                    </span><span className="vs-radio--label">
                                        <span className="whitespace-no-wrap">Vào thời điểm</span>
                                    </span></label>
                                <div className="select-time-of-the-month flex justify-start items-baseline pl-8"><div className="mb-3 sm:mb-0 sm:mr-3">
                                    <div className="select-day-of-month flex flex-wrap sm:flex-no-wrap">
                                        <div className="sm:w-1/2 w-full order-first mb-3 sm:mb-0 sm:mr-3"><div className="el-select select-day-option w-full" data-vv-as="Ngày">{/**/}<div className="el-input el-input--suffix is-focus">{/**/}<input type="text" autoComplete="off" placeholder="Chọn ngày" name="dayoftheweek" className="el-input__inner" />{/**/}<span className="el-input__suffix"><span className="el-input__suffix-inner"><i className="el-select__caret el-input__icon el-icon-arrow-up is-reverse" />{/**/}{/**/}{/**/}{/**/}{/**/}</span>{/**/}</span>{/**/}{/**/}</div></div><span className="text-danger text-sm break-normal" style={{ display: 'none' }} /></div>
                                        <div className="sm:w-1/2 w-full"><div className="el-select select-ordinarily w-full" data-vv-as="Thứ tự">{/**/}<div className="el-input el-input--suffix is-focus">{/**/}<input type="text" autoComplete="off" placeholder="Chọn thứ tự" name="ordinarily" className="el-input__inner" />{/**/}<span className="el-input__suffix"><span className="el-input__suffix-inner"><i className="el-select__caret el-input__icon el-icon-arrow-up is-reverse" />{/**/}{/**/}{/**/}{/**/}{/**/}</span>{/**/}</span>{/**/}{/**/}</div></div><span className="text-danger text-sm break-normal" style={{ display: 'none' }} /></div>
                                    </div>
                                </div>
                                    <p className="whitespace-no-wrap">của</p>
                                    <div className="ml-3"><div className="el-select cbs-select-month w-full" data-vv-as="Tháng">{/**/}<div className="el-input el-input--suffix is-focus">{/**/}<input type="text" autoComplete="off" placeholder="Chọn tháng" name="month23" className="el-input__inner" />{/**/}<span className="el-input__suffix"><span className="el-input__suffix-inner"><i className="el-select__caret el-input__icon el-icon-arrow-up is-reverse" />{/**/}{/**/}{/**/}{/**/}{/**/}</span>{/**/}</span>{/**/}{/**/}</div></div><span className="text-danger text-sm break-normal" style={{ display: 'none' }} /></div>
                                </div>
                            </div>
                        </div>
                        ,
                        <div className="mt-6 time-repeater--select-byhour flex items-baseline">
                            <h6 className="mb-2 custom-component--title mr-2">Giờ lặp:</h6>
                            <div>
                                <div className="el-date-editor el-input el-input--prefix el-input--suffix el-date-editor--time">
                                    <input type="text" autoComplete="off" name placeholder="Thêm" className="el-input__inner" />
                                    <span className="el-input__prefix">
                                        <i className="el-input__icon el-icon-time" />
                                    </span>
                                    <span className="el-input__suffix">
                                        <span className="el-input__suffix-inner">
                                            <i className="el-input__icon" />
                                        </span>
                                    </span>
                                </div>
                                <div className="mt-3" />
                            </div>
                            <span className="text-danger text-sm break-normal" style={{ display: 'none' }} />
                        </div>
                    ].map(item => item)
                )
        }
    }
    render() {
        return (
            <div suppressContentEditableWarning={true} data-v-763f102e className="el-dialog__wrapper custom-dialog todo-list-form-sidebar" style={{ zIndex: 2055 }}>
                <div role="dialog" aria-modal="true" aria-label="Tạo mới công việc " className="el-dialog" style={{ marginTop: '15vh' }}>
                    <div className="el-dialog__header">
                        <span className="el-dialog__title">Tạo mới công việc </span>
                        <button onClick={this.closeForm} type="button" aria-label="Close" className="el-dialog__headerbtn">
                            <i className="el-dialog__close el-icon el-icon-close" />
                        </button>
                    </div>
                    <div onWheel={this.printS} className="el-dialog__body" id="cuon">
                        <div id="myDiv" data-v-763f102e className={classNames("scroll-area--data-list p-6 ps ps--active-y", { "ps--scrolling-y": this.state.s })} settings="[object Object]">
                            <div data-v-763f102e className="pb-0">
                                <div data-v-763f102e role="tablist" aria-multiselectable="true" className="el-collapse cbs-collapse mt-0">
                                    <div data-v-763f102e className="el-collapse-item is-active">
                                        <div role="tab" aria-expanded="true" aria-controls="el-collapse-content-3278" aria-describedby="el-collapse-content-3278">
                                            <div role="button" id="el-collapse-head-3278" tabIndex={0} className="el-collapse-item__header is-active">
                                                <div data-v-763f102e>
                                                    <h6 data-v-763f102e className="uppercase font-bold ml-6">Thông tin cơ bản</h6>
                                                </div>
                                                <i className="el-collapse-item__arrow el-icon-arrow-right is-active" />
                                            </div>
                                        </div>
                                        <div role="tabpanel" aria-labelledby="el-collapse-head-3278" id="el-collapse-content-3278" className="el-collapse-item__wrap">
                                            <div className="el-collapse-item__content">
                                                <div data-v-763f102e className="p-6 pb-0">
                                                    <label data-v-763f102e htmlFor className="vs-input--label">
                                                        Tên công việc
                                                        <span data-v-763f102e className="text-danger">*</span>:
                                                    </label>
                                                    <div data-v-763f102e className="vs-component vs-con-input-label vs-input w-full vs-input-primary">

                                                        <div className="vs-con-input">
                                                            <input onChange={this.handleChangeNameTask} type="text" data-vv-as="Tên công việc" name="name" className="vs-inputx vs-input--input normal" style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }} />
                                                            {/* <span className="input-span-placeholder vs-input--placeholder normal"> Nhập Tên công việc </span> */}
                                                        </div>
                                                        <span />
                                                    </div>
                                                    <span data-v-763f102e className="text-danger text-sm" style={{ display: 'none' }} />
                                                    <div data-v-763f102e className="mt-5">
                                                        <label data-v-763f102e htmlFor className="vs-input--label"> Người được giao<span data-v-763f102e className="text-danger">*
                                                        </span>: </label>
                                                        <div data-v-763f102e>
                                                            <div className="container-watcher--block-item">
                                                                <div dir="auto" className={classNames("v-select bg-white select-multiple vs--searchable", { "vs--open": this.state.showListEmployee })} data-vv-as="Người được giao" name="assignees">
                                                                    <div id="vs1__combobox" role="combobox" aria-expanded={this.state.showListEmployee ? "true" : "false"} aria-owns="vs1__listbox" aria-label="Search for option" className="vs__dropdown-toggle">
                                                                        <div className="vs__selected-options">
                                                                            {this.renderEmployeeSelected(this.state.employeeCurrent)}
                                                                            <input onClick={this.showListEmployee} onChange={this.changeInforSearch} placeholder="Chọn người được giao" aria-autocomplete="list" aria-labelledby="vs1__combobox" aria-controls="vs1__listbox" type="search" autoComplete="off" className="vs__search" aria-activedescendant='' /></div>
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
                                                                                    <polyline points="6 9 12 15 18 9" /></svg>
                                                                            </span> <div className="vs__spinner" style={{ display: 'none' }}>Loading...</div>
                                                                        </div>
                                                                    </div>
                                                                    <ul id="vs1__listbox" role="listbox" style={this.state.showListEmployee ? null : { display: 'none', visibility: 'hidden' }} className={this.state.showListEmployee ? "vs__dropdown-menu" : null}>
                                                                        {this.renderListEmployee(this.selectedItem)}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span data-v-763f102e className="text-danger text-sm" style={{ display: 'none' }} />
                                                    </div>
                                                    <div data-v-763f102e className="my-5">
                                                        <label data-v-763f102e htmlFor className="vs-input--label">Mức độ ưu tiên <span data-v-763f102e className="text-danger">
                                                            *</span>:</label>
                                                        <input data-v-763f102e name="priority" type="hidden" data-vv-as="Mức độ ưu tiên" defaultValue={1} aria-required="true" aria-invalid="false" />
                                                        <span data-v-763f102e className="text-danger text-sm block" style={{ display: 'none' }} />
                                                        <div data-v-763f102e className="mt-2 flex justify-between">

                                                            <label data-v-763f102e className="vs-component con-vs-radio vs-radio-primary">
                                                                <input name="priority" onClick={() => this.valuePriortzeTask(1)} type="radio" className="vs-radio--input" defaultValue={1} />
                                                                <span className="vs-radio">
                                                                    <span className="vs-radio--borde" style={{ border: '2px solid rgb(200, 200, 200)' }} />
                                                                    <span className="vs-radio--circle" />
                                                                </span>
                                                                <span className="vs-radio--label">
                                                                    <div data-v-763f102e className="flex items-center">
                                                                        Rất ưu tiên
                                                                        <i data-v-763f102e className="nucleo-priority-S4 nucleo text-4xl text-gray-3 pl-2" />
                                                                    </div>
                                                                </span>
                                                            </label>
                                                            <label data-v-763f102e className="vs-component con-vs-radio vs-radio-primary">
                                                                <input name="priority" onClick={() => this.valuePriortzeTask(2)} type="radio" className="vs-radio--input" defaultValue={1} />
                                                                <span className="vs-radio">
                                                                    <span className="vs-radio--borde" style={{ border: '2px solid rgb(200, 200, 200)' }} />
                                                                    <span className="vs-radio--circle" />
                                                                </span>
                                                                <span className="vs-radio--label">
                                                                    <div data-v-763f102e className="flex items-center">
                                                                        Ưu tiên
                                                                        <i data-v-763f102e className="nucleo-priority-S3 nucleo text-4xl text-gray-3 pl-2" />
                                                                    </div>
                                                                </span>
                                                            </label>
                                                            <label data-v-763f102e className="vs-component con-vs-radio vs-radio-primary">
                                                                <input onClick={() => this.valuePriortzeTask(3)} name="priority" type="radio" className="vs-radio--input" defaultValue={1} />
                                                                <span className="vs-radio">
                                                                    <span className="vs-radio--borde" />
                                                                    <span className="vs-radio--circle" />
                                                                </span>
                                                                <span className="vs-radio--label">
                                                                    <div data-v-763f102e className="flex items-center">
                                                                        Bình thường
                                                                        <i data-v-763f102e className="nucleo-priority-S2 nucleo text-4xl text-gray-3 pl-2" />
                                                                    </div>
                                                                </span>
                                                            </label>
                                                            <label data-v-763f102e className="vs-component con-vs-radio vs-radio-primary">
                                                                <input name="priority" onClick={() => this.valuePriortzeTask(4)} type="radio" className="vs-radio--input" defaultValue={1} />
                                                                <span className="vs-radio">
                                                                    <span className="vs-radio--borde" style={{ border: '2px solid rgb(200, 200, 200)' }} />
                                                                    <span className="vs-radio--circle" />
                                                                </span>
                                                                <span className="vs-radio--label">
                                                                    <div data-v-763f102e className="flex items-center">
                                                                        Thấp
                                                                        <i data-v-763f102e className="nucleo-priority-S1 nucleo text-4xl text-gray-3 pl-2" />
                                                                    </div>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div data-v-763f102e className="description my-5">
                                                        <label data-v-763f102e htmlFor className="vs-input--label">Mô tả:</label>
                                                        <div data-v-709e9248 data-v-763f102e className="quill-editor normal-placeholder" value>
                                                            <div className="ql-toolbar ql-snow">
                                                                <span className="ql-formats">
                                                                    <button type="button" className="ql-bold"><svg viewBox="0 0 18 18">
                                                                        <path className="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z" />
                                                                        <path className="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z" />
                                                                    </svg>
                                                                    </button>
                                                                    <button type="button" className="ql-italic">
                                                                        <svg viewBox="0 0 18 18">
                                                                            <line className="ql-stroke" x1={7} x2={13} y1={4} y2={4} />
                                                                            <line className="ql-stroke" x1={5} x2={11} y1={14} y2={14} />
                                                                            <line className="ql-stroke" x1={8} x2={10} y1={14} y2={4} />
                                                                        </svg></button><button type="button" className="ql-underline">
                                                                        <svg viewBox="0 0 18 18"> <path className="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3" />
                                                                            <rect className="ql-fill" height={1} rx="0.5" ry="0.5" width={12} x={3} y={15} />
                                                                        </svg>
                                                                    </button>
                                                                </span>
                                                                <span className="ql-formats">
                                                                    <button type="button" className="ql-list" value="ordered">
                                                                        <svg viewBox="0 0 18 18">
                                                                            <line className="ql-stroke" x1={7} x2={15} y1={4} y2={4} />
                                                                            <line className="ql-stroke" x1={7} x2={15} y1={9} y2={9} />
                                                                            <line className="ql-stroke" x1={7} x2={15} y1={14} y2={14} />
                                                                            <line className="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5" />
                                                                            <path className="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z" />
                                                                            <path className="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156" />
                                                                            <path className="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109" />
                                                                        </svg>
                                                                    </button>
                                                                    <button type="button" className="ql-list" value="bullet">
                                                                        <svg viewBox="0 0 18 18">
                                                                            <line className="ql-stroke" x1={6} x2={15} y1={4} y2={4} />
                                                                            <line className="ql-stroke" x1={6} x2={15} y1={9} y2={9} />
                                                                            <line className="ql-stroke" x1={6} x2={15} y1={14} y2={14} />
                                                                            <line className="ql-stroke" x1={3} x2={3} y1={4} y2={4} />
                                                                            <line className="ql-stroke" x1={3} x2={3} y1={9} y2={9} />
                                                                            <line className="ql-stroke" x1={3} x2={3} y1={14} y2={14} />
                                                                        </svg>
                                                                    </button>
                                                                </span>
                                                                <span className="ql-formats">
                                                                    <span className="ql-header ql-picker">
                                                                        <span className="ql-picker-label" tabIndex={0} role="button" aria-expanded="false" aria-controls="ql-picker-options-0">
                                                                            <svg viewBox="0 0 18 18">
                                                                                <polygon className="ql-stroke" points="7 11 9 13 11 11 7 11" />
                                                                                <polygon className="ql-stroke" points="7 7 9 5 11 7 7 7" />
                                                                            </svg>
                                                                        </span>
                                                                        <span className="ql-picker-options" aria-hidden="true" tabIndex={-1} id="ql-picker-options-0">
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value={1} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value={2} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value={3} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value={4} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value={5} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value={6} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-selected" />
                                                                        </span>
                                                                    </span>
                                                                    <select className="ql-header" style={{ display: 'none' }}>
                                                                        <option value={1} /><option value={2} /><option value={3} />
                                                                        <option value={4} /><option value={5} /><option value={6} />
                                                                        <option selected="selected" />
                                                                    </select>
                                                                </span>
                                                                <span className="ql-formats">
                                                                    <span className="ql-color ql-picker ql-color-picker">
                                                                        <span className="ql-picker-label" tabIndex={0} role="button" aria-expanded="false" aria-controls="ql-picker-options-1">
                                                                            <svg viewBox="0 0 18 18">
                                                                                <line className="ql-color-label ql-stroke ql-transparent" x1={3} x2={15} y1={15} y2={15} />
                                                                                <polyline className="ql-stroke" points="5.5 11 9 3 12.5 11" />
                                                                                <line className="ql-stroke" x1="11.63" x2="6.38" y1={9} y2={9} />
                                                                            </svg>
                                                                        </span>
                                                                        <span className="ql-picker-options" aria-hidden="true" tabIndex={-1} id="ql-picker-options-1">
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-selected ql-primary" />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#e60000" style={{ backgroundColor: 'rgb(230, 0, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#ff9900" style={{ backgroundColor: 'rgb(255, 153, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#ffff00" style={{ backgroundColor: 'rgb(255, 255, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#008a00" style={{ backgroundColor: 'rgb(0, 138, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#0066cc" style={{ backgroundColor: 'rgb(0, 102, 204)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#9933ff" style={{ backgroundColor: 'rgb(153, 51, 255)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffffff" style={{ backgroundColor: 'rgb(255, 255, 255)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#facccc" style={{ backgroundColor: 'rgb(250, 204, 204)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffebcc" style={{ backgroundColor: 'rgb(255, 235, 204)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffffcc" style={{ backgroundColor: 'rgb(255, 255, 204)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#cce8cc" style={{ backgroundColor: 'rgb(204, 232, 204)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#cce0f5" style={{ backgroundColor: 'rgb(204, 224, 245)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#ebd6ff" style={{ backgroundColor: 'rgb(235, 214, 255)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#bbbbbb" style={{ backgroundColor: 'rgb(187, 187, 187)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#f06666" style={{ backgroundColor: 'rgb(240, 102, 102)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffc266" style={{ backgroundColor: 'rgb(255, 194, 102)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffff66" style={{ backgroundColor: 'rgb(255, 255, 102)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#66b966" style={{ backgroundColor: 'rgb(102, 185, 102)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#66a3e0" style={{ backgroundColor: 'rgb(102, 163, 224)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#c285ff" style={{ backgroundColor: 'rgb(194, 133, 255)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#888888" style={{ backgroundColor: 'rgb(136, 136, 136)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#a10000" style={{ backgroundColor: 'rgb(161, 0, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#b26b00" style={{ backgroundColor: 'rgb(178, 107, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#b2b200" style={{ backgroundColor: 'rgb(178, 178, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#006100" style={{ backgroundColor: 'rgb(0, 97, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#0047b2" style={{ backgroundColor: 'rgb(0, 71, 178)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#6b24b2" style={{ backgroundColor: 'rgb(107, 36, 178)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#444444" style={{ backgroundColor: 'rgb(68, 68, 68)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#5c0000" style={{ backgroundColor: 'rgb(92, 0, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#663d00" style={{ backgroundColor: 'rgb(102, 61, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#666600" style={{ backgroundColor: 'rgb(102, 102, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#003700" style={{ backgroundColor: 'rgb(0, 55, 0)' }} />

                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#002966" style={{ backgroundColor: 'rgb(0, 41, 102)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#3d1466" style={{ backgroundColor: 'rgb(61, 20, 102)' }} />
                                                                        </span>
                                                                    </span>
                                                                    <select className="ql-color" style={{ display: 'none' }}>
                                                                        <option selected="selected" /><option value="#e60000" />
                                                                        <option value="#ff9900" /><option value="#ffff00" />
                                                                        <option value="#008a00" /><option value="#0066cc" />
                                                                        <option value="#9933ff" /><option value="#ffffff" />
                                                                        <option value="#facccc" /><option value="#ffebcc" />
                                                                        <option value="#ffffcc" /><option value="#cce8cc" />
                                                                        <option value="#cce0f5" /><option value="#ebd6ff" />
                                                                        <option value="#bbbbbb" /><option value="#f06666" />
                                                                        <option value="#ffc266" /><option value="#ffff66" />
                                                                        <option value="#66b966" /><option value="#66a3e0" />
                                                                        <option value="#c285ff" /><option value="#888888" />
                                                                        <option value="#a10000" /><option value="#b26b00" />
                                                                        <option value="#b2b200" /><option value="#006100" />
                                                                        <option value="#0047b2" /><option value="#6b24b2" />
                                                                        <option value="#444444" /><option value="#5c0000" />
                                                                        <option value="#663d00" /><option value="#666600" />
                                                                        <option value="#003700" /><option value="#002966" />
                                                                        <option value="#3d1466" />
                                                                    </select>
                                                                    <span className="ql-background ql-picker ql-color-picker">
                                                                        <span className="ql-picker-label" tabIndex={0} role="button" aria-expanded="false" aria-controls="ql-picker-options-2">
                                                                            <svg viewBox="0 0 18 18">
                                                                                <g className="ql-fill ql-color-label">
                                                                                    <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868" />
                                                                                    <rect height={1} width={1} x={4} y={4} />
                                                                                    <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5" />
                                                                                    <rect height={1} width={1} x={2} y={6} />
                                                                                    <rect height={1} width={1} x={3} y={5} />
                                                                                    <rect height={1} width={1} x={4} y={7} />
                                                                                    <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439" />
                                                                                    <rect height={1} width={1} x={2} y={12} />
                                                                                    <rect height={1} width={1} x={2} y={9} />
                                                                                    <rect height={1} width={1} x={2} y={15} />
                                                                                    <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10" />
                                                                                    <rect height={1} width={1} x={3} y={8} />
                                                                                    <path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z" />
                                                                                    <path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z" />
                                                                                    <path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z" />
                                                                                    <rect height={1} width={1} x={12} y={2} /> <rect height={1} width={1} x={11} y={3} />
                                                                                    <path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z" /> <rect height={1} width={1} x={2} y={3} />
                                                                                    <rect height={1} width={1} x={6} y={2} /> <rect height={1} width={1} x={3} y={2} />
                                                                                    <rect height={1} width={1} x={5} y={3} /> <rect height={1} width={1} x={9} y={2} />
                                                                                    <rect height={1} width={1} x={15} y={14} />
                                                                                    <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174" />
                                                                                    <rect height={1} width={1} x={13} y={7} /> <rect height={1} width={1} x={15} y={5} />
                                                                                    <rect height={1} width={1} x={14} y={6} /> <rect height={1} width={1} x={15} y={8} />
                                                                                    <rect height={1} width={1} x={14} y={9} /> <path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z" />
                                                                                    <rect height={1} width={1} x={14} y={3} /> <polygon points="12 6.868 12 6 11.62 6 12 6.868" />
                                                                                    <rect height={1} width={1} x={15} y={2} /> <rect height={1} width={1} x={12} y={5} />
                                                                                    <rect height={1} width={1} x={13} y={4} /> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9" />
                                                                                    <rect height={1} width={1} x={9} y={14} /> <rect height={1} width={1} x={8} y={15} />
                                                                                    <path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z" />
                                                                                    <rect height={1} width={1} x={5} y={15} />
                                                                                    <path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z" />
                                                                                    <rect height={1} width={1} x={11} y={15} />
                                                                                    <path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z" />
                                                                                    <rect height={1} width={1} x={14} y={15} />
                                                                                    <rect height={1} width={1} x={15} y={11} />
                                                                                </g>
                                                                                <polyline className="ql-stroke" points="5.5 13 9 5 12.5 13" />
                                                                                <line className="ql-stroke" x1="11.63" x2="6.38" y1={11} y2={11} />
                                                                            </svg>
                                                                        </span>
                                                                        <span className="ql-picker-options" aria-hidden="true" tabIndex={-1} id="ql-picker-options-2">
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#000000" style={{ backgroundColor: 'rgb(0, 0, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#e60000" style={{ backgroundColor: 'rgb(230, 0, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#ff9900" style={{ backgroundColor: 'rgb(255, 153, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#ffff00" style={{ backgroundColor: 'rgb(255, 255, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#008a00" style={{ backgroundColor: 'rgb(0, 138, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#0066cc" style={{ backgroundColor: 'rgb(0, 102, 204)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-primary" data-value="#9933ff" style={{ backgroundColor: 'rgb(153, 51, 255)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-selected" />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#facccc" style={{ backgroundColor: 'rgb(250, 204, 204)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffebcc" style={{ backgroundColor: 'rgb(255, 235, 204)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffffcc" style={{ backgroundColor: 'rgb(255, 255, 204)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#cce8cc" style={{ backgroundColor: 'rgb(204, 232, 204)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#cce0f5" style={{ backgroundColor: 'rgb(204, 224, 245)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#ebd6ff" style={{ backgroundColor: 'rgb(235, 214, 255)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#bbbbbb" style={{ backgroundColor: 'rgb(187, 187, 187)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#f06666" style={{ backgroundColor: 'rgb(240, 102, 102)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffc266" style={{ backgroundColor: 'rgb(255, 194, 102)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#ffff66" style={{ backgroundColor: 'rgb(255, 255, 102)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#66b966" style={{ backgroundColor: 'rgb(102, 185, 102)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#66a3e0" style={{ backgroundColor: 'rgb(102, 163, 224)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#c285ff" style={{ backgroundColor: 'rgb(194, 133, 255)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#888888" style={{ backgroundColor: 'rgb(136, 136, 136)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#a10000" style={{ backgroundColor: 'rgb(161, 0, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#b26b00" style={{ backgroundColor: 'rgb(178, 107, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#b2b200" style={{ backgroundColor: 'rgb(178, 178, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#006100" style={{ backgroundColor: 'rgb(0, 97, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#0047b2" style={{ backgroundColor: 'rgb(0, 71, 178)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#6b24b2" style={{ backgroundColor: 'rgb(107, 36, 178)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#444444" style={{ backgroundColor: 'rgb(68, 68, 68)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#5c0000" style={{ backgroundColor: 'rgb(92, 0, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#663d00" style={{ backgroundColor: 'rgb(102, 61, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#666600" style={{ backgroundColor: 'rgb(102, 102, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#003700" style={{ backgroundColor: 'rgb(0, 55, 0)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#002966" style={{ backgroundColor: 'rgb(0, 41, 102)' }} />
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="#3d1466" style={{ backgroundColor: 'rgb(61, 20, 102)' }} />
                                                                        </span></span><select className="ql-background" style={{ display: 'none' }}><option value="#000000" /><option value="#e60000" /><option value="#ff9900" /><option value="#ffff00" />
                                                                        <option value="#008a00" /><option value="#0066cc" />
                                                                        <option value="#9933ff" /><option selected="selected" />
                                                                        <option value="#facccc" /><option value="#ffebcc" />
                                                                        <option value="#ffffcc" /><option value="#cce8cc" />
                                                                        <option value="#cce0f5" /><option value="#ebd6ff" /><option value="#bbbbbb" />
                                                                        <option value="#f06666" /><option value="#ffc266" />
                                                                        <option value="#ffff66" /><option value="#66b966" />
                                                                        <option value="#66a3e0" /><option value="#c285ff" />
                                                                        <option value="#888888" /><option value="#a10000" />
                                                                        <option value="#b26b00" /><option value="#b2b200" />
                                                                        <option value="#006100" /><option value="#0047b2" />
                                                                        <option value="#6b24b2" /><option value="#444444" />
                                                                        <option value="#5c0000" /><option value="#663d00" />
                                                                        <option value="#666600" /><option value="#003700" />
                                                                        <option value="#002966" /><option value="#3d1466" />
                                                                    </select></span><span className="ql-formats">
                                                                    <span className="ql-align ql-picker ql-icon-picker">
                                                                        <span className="ql-picker-label" tabIndex={0} role="button" aria-expanded="false" aria-controls="ql-picker-options-3">
                                                                            <svg viewBox="0 0 18 18">
                                                                                <line className="ql-stroke" x1={3} x2={15} y1={9} y2={9} />
                                                                                <line className="ql-stroke" x1={3} x2={13} y1={14} y2={14} />
                                                                                <line className="ql-stroke" x1={3} x2={9} y1={4} y2={4} />
                                                                            </svg>
                                                                        </span>
                                                                        <span className="ql-picker-options" aria-hidden="true" tabIndex={-1} id="ql-picker-options-3">
                                                                            <span tabIndex={0} role="button" className="ql-picker-item ql-selected"><svg viewBox="0 0 18 18">
                                                                                <line className="ql-stroke" x1={3} x2={15} y1={9} y2={9} />
                                                                                <line className="ql-stroke" x1={3} x2={13} y1={14} y2={14} />
                                                                                <line className="ql-stroke" x1={3} x2={9} y1={4} y2={4} />
                                                                            </svg>
                                                                            </span>
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="center">
                                                                                <svg viewBox="0 0 18 18">
                                                                                    <line className="ql-stroke" x1={15} x2={3} y1={9} y2={9} />
                                                                                    <line className="ql-stroke" x1={14} x2={4} y1={14} y2={14} />
                                                                                    <line className="ql-stroke" x1={12} x2={6} y1={4} y2={4} />
                                                                                </svg></span><span tabIndex={0} role="button" className="ql-picker-item" data-value="right">
                                                                                <svg viewBox="0 0 18 18"> <line className="ql-stroke" x1={15} x2={3} y1={9} y2={9} />
                                                                                    <line className="ql-stroke" x1={15} x2={5} y1={14} y2={14} />
                                                                                    <line className="ql-stroke" x1={15} x2={9} y1={4} y2={4} />
                                                                                </svg>
                                                                            </span>
                                                                            <span tabIndex={0} role="button" className="ql-picker-item" data-value="justify">
                                                                                <svg viewBox="0 0 18 18"> <line className="ql-stroke" x1={15} x2={3} y1={9} y2={9} />
                                                                                    <line className="ql-stroke" x1={15} x2={3} y1={14} y2={14} />
                                                                                    <line className="ql-stroke" x1={15} x2={3} y1={4} y2={4} />
                                                                                </svg>
                                                                            </span>
                                                                        </span>
                                                                    </span>
                                                                    <select className="ql-align" style={{ display: 'none' }}>
                                                                        <option selected="selected" /><option value="center" />
                                                                        <option value="right" /><option value="justify" />
                                                                    </select>
                                                                </span>
                                                                <span className="ql-formats">
                                                                    <button type="button" className="ql-link">
                                                                        <svg viewBox="0 0 18 18">
                                                                            <line className="ql-stroke" x1={7} x2={11} y1={7} y2={11} />
                                                                            <path className="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z" />
                                                                            <path className="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z" />
                                                                        </svg>
                                                                    </button>
                                                                </span>
                                                                <span className="ql-formats">
                                                                    <button type="button" className="ql-clean">
                                                                        <svg className viewBox="0 0 18 18">
                                                                            <line className="ql-stroke" x1={5} x2={13} y1={3} y2={3} />
                                                                            <line className="ql-stroke" x1={6} x2="9.35" y1={12} y2={3} />
                                                                            <line className="ql-stroke" x1={11} x2={15} y1={11} y2={15} />
                                                                            <line className="ql-stroke" x1={15} x2={11} y1={11} y2={15} />
                                                                            <rect className="ql-fill" height={1} rx="0.5" ry="0.5" width={7} x={2} y={14} />
                                                                        </svg>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                            <div className="ql-container ql-snow">
                                                                <div className="ql-editor ql-blank" data-gramm="false" contentEditable="true" data-placeholder="Nhập mô tả">
                                                                    <p id="value">
                                                                        <br />
                                                                    </p>
                                                                </div>
                                                                <div className="ql-clipboard" contentEditable="true" tabIndex={-1} />
                                                                <div className="ql-tooltip ql-hidden">
                                                                    <a className="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank" />
                                                                    <input onChange={this.handleDecriptionTask} type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL" />
                                                                    <a className="ql-action" />
                                                                    <a className="ql-remove" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div data-v-763f102e role="tablist" aria-multiselectable="true" className="el-collapse cbs-collapse mt-0 todo-list-form-sidebar__time-info">
                                    <div data-v-763f102e className="el-collapse-item">
                                        <div role="tab" aria-controls="el-collapse-content-1775" aria-describedby="el-collapse-content-1775">
                                            <div role="button" id="el-collapse-head-1775" tabIndex={0} className={classNames("el-collapse-item__header", { "is-active": this.state.inforTime })}>
                                                <div data-v-763f102e><h6 data-v-763f102e className="uppercase font-bold ml-6">Thông tin thời gian</h6>
                                                </div>
                                                <i onClick={this.showInforTime} className="el-collapse-item__arrow el-icon-arrow-right" />
                                            </div>
                                        </div>
                                        <div role="tabpanel" aria-hidden={this.state.inforTime ? "true" : null} aria-labelledby="el-collapse-head-1775" id="el-collapse-content-1775" className="el-collapse-item__wrap" style={this.state.inforTime ? { display: 'none' } : null}>
                                            <div className="el-collapse-item__content">
                                                <div data-v-763f102e className="mt-5 px-6">
                                                    <div data-v-763f102e className="deadline my-5">
                                                        <label data-v-763f102e htmlFor className="vs-input--label">Thời điểm bắt đầu:</label>
                                                        <div data-v-763f102e className="vx-input-group flex">
                                                            <div data-v-763f102e className="vx-input-group-default flex-grow">
                                                                <div data-v-763f102e className="el-date-editor w-full el-input el-input--prefix el-input--suffix el-date-editor--datetime" data-vv-as="Thời điểm bắt đầu" clearable name="start-date" prefix-icon="''" format="DD-MM-yyyy HH:mm" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Chọn ngày bắt đầu">
                                                                    <input type="text" autoComplete="off" name="start-date" value={this.props.status.timeStartNewStart} placeholder="Chọn ngày bắt đầu" className="el-input__inner" />
                                                                    <span className="el-input__prefix"><i className="el-input__icon ''" /></span>
                                                                    <span className="el-input__suffix">
                                                                        <span className="el-input__suffix-inner">
                                                                            <i className="el-input__icon" />
                                                                        </span>
                                                                    </span>

                                                                </div>
                                                            </div>
                                                            <div data-v-763f102e className="vx-input-group-append flex">
                                                                <div data-v-763f102e className="append-text text-black">
                                                                    <i onClick={this.props.showDatePickerStartNewTask} data-v-763f102e className="nucleo nucleo-calendar-date" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span data-v-763f102e className="text-danger text-sm break-normal" style={{ display: 'none' }} />
                                                    </div>
                                                    <div data-v-763f102e className="due-time-container">
                                                        <div data-v-763f102e className="flex justify-between mb-4">
                                                            <label data-v-763f102e className="vs-component con-vs-radio vs-radio-primary">
                                                                <input onClick={this.switchTime} name={0} type="radio" className="vs-radio--input" defaultValue={0} />
                                                                <span className="vs-radio">
                                                                    <span className="vs-radio--borde" />
                                                                    <span className="vs-radio--circle" /></span>
                                                                <span className="vs-radio--label">Thời gian hoàn thành</span>
                                                            </label>
                                                            <label data-v-763f102e className="vs-component con-vs-radio vs-radio-primary">
                                                                <input onClick={this.switchTime} name={0} type="radio" className="vs-radio--input" defaultValue={0} />
                                                                <span className="vs-radio">
                                                                    <span className="vs-radio--borde" style={{ border: '2px solid rgb(200, 200, 200)' }} />
                                                                    <span className="vs-radio--circle" />
                                                                </span>
                                                                <span className="vs-radio--label">Thời điểm hoàn thành</span>
                                                            </label>
                                                            <div data-v-763f102e />
                                                        </div>
                                                        <div data-v-763f102e>
                                                            {/*switch chuyển đổi qua lại để chọn thời gian bắt đầu và thời gian kết thúc*/}
                                                            {
                                                                (!this.state.switchTimeComplete) ?
                                                                    <div data-v-763f102e className="due-time-content">
                                                                        <div data-v-763f102e className="flex items-stretch">
                                                                            <div data-v-763f102e dir="auto" className="v-select border-none w-1/3 vs--single vs--searchable" data-vv-as="Thời gian hoàn thành">
                                                                                <div id="vs2__combobox" role="combobox" aria-expanded="false" aria-owns="vs2__listbox" aria-label="Search for option" className="vs__dropdown-toggle">
                                                                                    <div className="vs__selected-options">
                                                                                        <span className="vs__selected">
                                                                                            {this.state.valueUnitComplete}
                                                                                        </span>
                                                                                        <input onClick={this.showUnitTimeCompleteTask} aria-autocomplete="list" aria-labelledby="vs2__combobox" aria-controls="vs2__listbox" type="search" autoComplete="off" className="vs__search" />
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
                                                                                                <polyline points="6 9 12 15 18 9" /></svg>
                                                                                        </span> <div className="vs__spinner" style={{ display: 'none' }}>Loading...</div>
                                                                                    </div>
                                                                                </div>
                                                                                {this.state.showUnitTimeCompleteTask ?
                                                                                    <ul id="vs6__listbox" role="listbox" style={{}} className="vs__dropdown-menu">
                                                                                        <li role="option" onClick={() => this.valueUnitComplete("Ngày")} id="vs6__option-0" aria-selected="true" className="vs__dropdown-option vs__dropdown-option--highlight">
                                                                                            Ngày
                                                                                        </li>
                                                                                        <li role="option" onClick={() => this.valueUnitComplete("Giờ")} id="vs6__option-1" className="vs__dropdown-option vs__dropdown-option--selected">
                                                                                            Giờ
                                                                                        </li>
                                                                                        {/**/}
                                                                                    </ul> : <ul id="vs6__listbox" role="listbox" style={{ display: 'none', visibility: 'hidden' }} className />}
                                                                            </div>
                                                                            <div data-v-763f102e className="vs-component vs-con-input-label vs-input w-2/3 vs-input-primary">
                                                                                <div className="vs-con-input">
                                                                                    <input onChange={this.timeCompletTask} type="text" maxLength={12} name="due_value" data-vv-as="Thời gian hoàn thành" className="vs-inputx vs-input--input normal hasValue" style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }} />
                                                                                    <span className="input-span-placeholder vs-input--placeholder normal"> Nhập số thời gian hoàn thành </span>
                                                                                </div>
                                                                                <span />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    :
                                                                    <div data-v-763f102e>
                                                                        <div data-v-763f102e className="vx-input-group flex">
                                                                            <div data-v-763f102e className="vx-input-group-default flex-grow">
                                                                                <div data-v-763f102e className="el-date-editor w-full el-input el-input--prefix el-input--suffix el-date-editor--datetime" data-vv-as="Thời điểm bắt đầu" clearable name="start-date" prefix-icon="''" format="DD-MM-yyyy HH:mm" value-format="yyyy-MM-dd HH:mm:ss" placeholder="Chọn thời điểm hoàn thành">
                                                                                    <input type="text" autoComplete="off" name="start-date" value={this.props.status.timeCompleteNewStask} placeholder="Chọn thời điểm hoàn thành" className="el-input__inner" />
                                                                                    <span className="el-input__prefix">
                                                                                        <i className="el-input__icon ''" />
                                                                                    </span>
                                                                                    <span className="el-input__suffix">
                                                                                        <span className="el-input__suffix-inner">
                                                                                            <i className="el-input__icon" />
                                                                                        </span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div data-v-763f102e className="vx-input-group-append flex">
                                                                                <div data-v-763f102e className="append-text text-black">
                                                                                    <i onClick={this.props.showDatePickerCompleteNewTask} data-v-763f102e className="nucleo nucleo-calendar-date" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                            }

                                                            <span data-v-763f102e className="text-danger text-sm break-normal" style={{ display: 'none' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div data-v-763f102e className="time-repeater mt-5 px-6">
                                                    <div data-v-763f102e className="vs-component con-vs-checkbox vs-checkbox-primary vs-checkbox-default">
                                                        <input onClick={this.showRepeat} type="checkbox" className="vs-checkbox--input" defaultValue="false" />
                                                        <span className="checkbox_x vs-checkbox" style={{ border: '2px solid rgb(180, 180, 180)' }}>
                                                            <span className="vs-checkbox--check">
                                                                <i className="vs-icon notranslate icon-scale vs-checkbox--icon  material-icons null">check</i>
                                                            </span>
                                                        </span>
                                                        <span className="con-slot-label">Lặp lại công việc</span>
                                                    </div>
                                                    {
                                                        this.state.showRepeat ?
                                                            <div data-v-763f102e className="time-repeater mt-5">
                                                                <div className="due-time-container flex items-center">
                                                                    <h6 className="mb-2 custom-component--title">Lặp lại:</h6>
                                                                    <div>
                                                                        <div className="flex items-center">
                                                                            <div className="el-select w-3/6 border-none mx-2">
                                                                                <div className="el-input el-input--suffix">
                                                                                    <input onClick={this.props.showDropdownMenu} type="text" value={this.props.status.selectedDropdown} readOnly="readonly" autoComplete="off" placeholder="Chọn lặp lại" className="el-input__inner" />
                                                                                    <span className="el-input__suffix">
                                                                                        <span className="el-input__suffix-inner">
                                                                                            <i className="el-select__caret el-input__icon el-icon-arrow-up" />
                                                                                        </span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <p>mỗi</p>
                                                                            <div>
                                                                                <div className="vs-component vs-con-input-label vs-input w-auto block mx-2 vs-input-primary">
                                                                                    <div className="vs-con-input">
                                                                                        <input onChange={this.timePerRepeat} type="text" maxLength={12} name="interval" data-vv-as="Nhập số lặp lại" className="vs-inputx vs-input--input normal hasValue" style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }} />
                                                                                        <span className="input-span-placeholder vs-input--placeholder normal"> Nhập số </span>
                                                                                    </div>
                                                                                    <span />
                                                                                </div>
                                                                                <span className="text-danger text-sm break-normal" style={{ display: 'none' }} />
                                                                            </div>
                                                                            <p>
                                                                                repeater.
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {this.switchComponentRepeat()}
                                                            </div>
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div data-v-763f102e role="tablist" aria-multiselectable="true" className="el-collapse cbs-collapse report-forms-config">
                                    <div data-v-763f102e className="el-collapse-item">
                                        <div role="tab" aria-controls="el-collapse-content-1228" aria-describedby="el-collapse-content-1228">
                                            <div role="button" id="el-collapse-head-1228" tabIndex={0} className="el-collapse-item__header">
                                                <h6 data-v-763f102e className="uppercase font-bold ml-6">Thông tin thêm</h6>
                                                <i onClick={this.showMoreInfor} className="el-collapse-item__arrow el-icon-arrow-right" />
                                            </div>
                                        </div>
                                        <div role="tabpanel" aria-hidden={this.state.moreInfor ? "true" : null} aria-labelledby="el-collapse-head-1228" id="el-collapse-content-1228" className="el-collapse-item__wrap" style={this.state.moreInfor ? { display: 'none' } : null}>
                                            <div className="el-collapse-item__content">
                                                <div data-v-763f102e className="mt-5 px-6">
                                                    <div data-v-763f102e className="my-5">
                                                        <label data-v-763f102e htmlFor className="vs-input--label"> Đối tượng liên quan: </label>
                                                        <div data-v-763f102e>
                                                            <div className="container-watcher--block-item">
                                                                <div dir="auto" className="v-select bg-white select-multiple vs--searchable" data-vv-as="Đối tượng liên quan" name="relations">
                                                                    <div id="vs3__combobox" role="combobox" aria-expanded="false" aria-owns="vs3__listbox" aria-label="Search for option" className="vs__dropdown-toggle">
                                                                        {this.renderEmployeeSelected(this.state.involveEployee)}
                                                                        <div className="vs__selected-options">
                                                                            <input onClick={this.showInvolveEployee} onChange={this.changeInforSearch} placeholder="Chọn đối tượng liên quan" aria-autocomplete="list" aria-labelledby="vs3__combobox" aria-controls="vs3__listbox" type="search" autoComplete="off" className="vs__search" />
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
                                                                                    <polyline points="6 9 12 15 18 9" /></svg></span>
                                                                            <div className="vs__spinner" style={{ display: 'none' }}>Loading...
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <ul id="vs3__listbox" role="listbox" style={this.state.showInvolveEployee ? null : { display: 'none', visibility: 'hidden' }} className={this.state.showInvolveEployee ? "vs__dropdown-menu" : null}>
                                                                        {this.renderListEmployee(this.selectedInvolveEployee)}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span data-v-763f102e className="text-danger text-sm" style={{ display: 'none' }} />
                                                        <div data-v-763f102e className="mt-3">
                                                            <span>Lưu ý:</span>
                                                            <p>- Có thể nhập mã hoặc tên của đề xuất/thiết bị/công việc/nhân viên/chức vụ/phòng ban.</p>
                                                            <p>- Có thể chọn nhiều đối tượng.</p>
                                                        </div>
                                                    </div>
                                                    <label data-v-763f102e>Mẫu báo cáo:</label>
                                                    <div data-v-763f102e dir="auto" className="v-select select-multiple vs--searchable">
                                                        <div id="vs4__combobox" role="combobox" aria-expanded="false" aria-owns="vs4__listbox" aria-label="Search for option" className="vs__dropdown-toggle">
                                                            <div className="vs__selected-options">
                                                                <input placeholder="Chọn mẫu báo cáo" aria-autocomplete="list" aria-labelledby="vs4__combobox" aria-controls="vs4__listbox" type="search" autoComplete="off" className="vs__search" />
                                                            </div>
                                                            <div className="vs__actions">
                                                                <button type="button" title="Clear Selected" aria-label="Clear Selected" className="vs__clear" style={{ display: 'none' }}>
                                                                    <span className="feather-icon select-none relative"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x w-4 h-4 mt-1">
                                                                        <line x1={18} y1={6} x2={6} y2={18} />
                                                                        <line x1={6} y1={6} x2={18} y2={18} />
                                                                    </svg>
                                                                    </span>
                                                                </button>
                                                                <span className="feather-icon select-none relative vs__open-indicator" role="presentation"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down w-5 h-5"><polyline points="6 9 12 15 18 9" />
                                                                </svg>
                                                                </span>
                                                                <div className="vs__spinner" style={{ display: 'none' }}>Loading...</div>
                                                            </div>
                                                        </div>
                                                        <ul id="vs4__listbox" role="listbox" style={{ display: 'none', visibility: 'hidden' }} />
                                                    </div>
                                                    <div data-v-763f102e className="mt-5">
                                                        <div data-v-763f102e className="vs-component con-vs-checkbox ml-0 vs-checkbox-primary vs-checkbox-default">
                                                            <input type="checkbox" className="vs-checkbox--input" defaultValue="false" />
                                                            <span className="checkbox_x vs-checkbox" style={{ border: '2px solid rgb(180, 180, 180)' }}>
                                                                <span className="vs-checkbox--check">
                                                                    <i className="vs-icon notranslate icon-scale vs-checkbox--icon  material-icons null">check</i>
                                                                </span>
                                                            </span>
                                                            <span className="con-slot-label">Công việc con thực hiện tuần tự</span>
                                                        </div>
                                                    </div>
                                                    <div data-v-763f102e className="mt-5 mb-3">
                                                        <label data-v-763f102e htmlFor className="vs-input--label">Đính kèm:</label>
                                                        <div data-v-763f102e className="cbs-upload">
                                                            <div className="cbs-upload__uploader">
                                                                <div tabIndex={0} className="el-upload el-upload--picture-card"><div>
                                                                    <i slot="default" className="el-icon-plus" />
                                                                </div>
                                                                    <input type="file" name="upload" accept className="el-upload__input" />
                                                                </div>
                                                                <div className="el-upload-list el-upload-list--picture-card" />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ps__rail-x" style={styleX}>
                                <div className="ps__thumb-x" tabIndex={0} style={{ left: '0px', width: '0px' }} />
                            </div>
                            <div className="ps__rail-y" style={styleY}>
                                <div className="ps__thumb-y" tabIndex={0} style={styleYMini} />
                            </div>
                        </div>
                    </div>
                    <div className="el-dialog__footer">
                        <div data-v-763f102e className="flex justify-center flex-wrap items-center">
                            <button onClick={this.creatNewTask} data-v-763f102e type="button" name="button" className="vs-component vs-button w-full sm:w-1/3 mb-3 sm:mb-0 sm:mr-6 font-bold vs-button-primary vs-button-border" style={{ background: 'transparent' }}>
                                <span className="vs-button-backgroundx vs-button--background" style={{ opacity: 1, left: '20px', top: '20px', width: '0px', height: '0px', transition: 'width 0.3s ease 0s, height 0.3s ease 0s, opacity 0.3s ease 0s' }} />
                                <span className="vs-button-text vs-button--text">
                                    Lưu và Tạo mới
                                </span>
                                <span className="vs-button-linex" style={{ top: 'auto', bottom: '-2px', left: '50%', transform: 'translate(-50%)' }} />
                            </button>
                            <button data-v-763f102e type="button" name="button" className="vs-component vs-button w-full sm:w-1/3 font-bold vs-button-primary vs-button-filled">
                                <span className="vs-button-backgroundx vs-button--background" style={{ opacity: 1, left: '20px', top: '20px', width: '0px', height: '0px', transition: 'width 0.3s ease 0s, height 0.3s ease 0s, opacity 0.3s ease 0s' }} />
                                <span className="vs-button-text vs-button--text">Lưu</span>
                                <span className="vs-button-linex" style={{ top: 'auto', bottom: '-2px', left: '50%', transform: 'translate(-50%)' }} />
                            </button>
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
        isShowFormCreateTask: () => { dispatch(action.isShowCreateTask()) },
        isShowDetailTask: () => { dispatch(action.showDetailTask()) },
        searchListEmployee: (params) => { dispatch(action.searchByParams(params)) },
        showDropdownMenu: () => { dispatch(action.showDropdownMenu()) },
        showDatePickerStartNewTask: () => { dispatch(action.showTimeStartNewTask()) },
        showDatePickerCompleteNewTask: () => { dispatch(action.showTimeCompleteNewTask()) },
        createTask: (newTask) => { dispatch(action.creatNewTask(newTask)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormCreateTask);
