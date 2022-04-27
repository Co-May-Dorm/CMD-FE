import React, { useRef, useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, Button } from "react-bootstrap"
import * as todoListAction from "../../actions/todoListAction"
const Confirm = (props) => {
    const dispacth = useDispatch()
    const id = useSelector(state => state.TodoListReducer.idDelete)
    // console.log(id)
    const deleteTask=()=>{
        dispacth(todoListAction.deleteTask(id))
       props.onHide()
    }
    return (
        < Modal scrollable  show={true}
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            contentClassName="big-hight"
        >
            <Modal.Header className="text-white">
                Cảnh báo
            </Modal.Header>
            <Modal.Body>
                <div>Bạn có chắc là muốn xóa không</div>
            </Modal.Body>
            <Modal.Footer>
                <Button >Hủy</Button>
                <Button onClick={deleteTask}>Ok</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default Confirm