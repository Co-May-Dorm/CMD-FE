import { useState } from "react";
import { Modal, Button } from "react-bootstrap"
import * as todoListAction from "../../actions/todoListAction"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import { useDispatch, useSelector } from "react-redux"
import "../../../node_modules/rc-time-picker/assets/index.css"
const formatTime = "hh:mm"
const DateInput = (props) => {
    const [times, setTimes] = useState({ time: {}, date: "", cleanDate: false })
    const [openTime, setOpenTime] = useState(false)
    const [openModal, setOpenModal] = useState(true)
    const dispacth = useDispatch()
    //dispatch task request
    const dispatchDateNewTask = () => {
        let dateNewTask
        let v =times.date + new Date(times.time)
        switch (props.typenamedate) {
            case "START_DATE_NEW_TASK": {
                dateNewTask = todoListAction.startDateNewTask(v)
                break
            }
            case "END_DATE_NEW_TASK":{
                dateNewTask = todoListAction.endDateNewTask(v)
            }
        }
        dispacth(dateNewTask)
    }
    // add button ok in bottom panel time picker
    const addButtonOk = () => {
        return <Button onClick={() => setOpenTime(!openTime)} variant="primary" size="sm" className="m-5 mt-1 mb-1">OK</Button>
    }
    const clearDate = () => {
        setTimes(oldState => {
            return { ...oldState, date: "", cleanDate: false }
        });
    }
    //xu ly su kien khi thay doi ngay thang nam
    const onChangeDate = (str) => {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        setTimes(oldState => {
            return { ...oldState, date: [day, mnth, date.getFullYear()].join("-"), cleanDate: true }
        });
    }
    //xu ly su kien khi thay doi gio phut
    const onChangeTime = (str) => {
        setTimes(oldState => {
            return { ...oldState, time: str }
        })
    }
    //lay thoi gian hien tai
    const timeCurrent = () => {
        var date = new Date(),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2)
        setTimes(oldState => {
            return {
                ...oldState, time: moment(), date: [day, mnth, date.getFullYear()].join("-"), cleanDate: true
            }
        })
    }
    return (
        <>
            <Modal scrollable show={false}
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onExit={dispatchDateNewTask}
            >
                <Modal.Body>
                    <div className="col d-flex flex-column border border-primary rounded mt-1" >
                        <div className="d-flex flex-row">
                            <span className="rc-time-picker m-1 w-75 border border-primary">
                                <input placeholder="Chọn ngày" className="rc-time-picker-input" type="text" value={times.date} readOnly={true} />
                                <span className="rc-time-picker-icon" />
                                {!times.cleanDate ? null : <a role="button" onClick={clearDate} className="rc-time-picker-clear" title="clear" tabIndex={0}>
                                    <i className="rc-time-picker-clear-icon" /></a>}
                            </span>
                            <TimePicker placeholder="Chọn giờ" value={JSON.stringify(times.time) == JSON.stringify({}) ? null : times.time} format={formatTime} onOpen={() => setOpenTime(!openTime)} open={openTime} className="m-1 w-75 border border-primary" use12Hours={false} showSecond={false} addon={addButtonOk}
                                onChange={(time) => onChangeTime(time)} inputReadOnly={true} />
                        </div>
                        <div className="d-flex flex-row">
                            <Calendar placeholder={"cdcsdcdscd"} navigationAriaLabel="vdvdsv" locale='vi' className={"mx-auto"} onChange={(date) => onChangeDate(date)} calendarType={"ISO 8601"} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={timeCurrent}>Hiện tại</Button>
                    <Button onClick={props.onHide}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
}
// const mapStateToProps = (state) => {
//     return {
//         status: state.TodoListReducer
//     }
// }

// const mapDispatchToProps = (dispatch, props) => {
//     return {
//         updateStartDateFilterAdvanced: (date) => { dispatch(action.updateDateStartFilterAdvanced(date)) },
//         updateEndDateFilterAdvanced: (date) => { dispatch(action.updateDateEndFilterAdvanced(date)) },
//         timeStartNewTask:(date)=>{dispatch(action.timeStartNewTask(date))},
//         timeStartCompleteTask:(date)=>{dispatch(action.timeStartCompleteTask(date))}
//     }
// }
export default DateInput;