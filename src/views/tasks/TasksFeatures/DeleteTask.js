import React, { useState } from 'react'

import { Button, Dropdown, Modal } from 'react-bootstrap'
import { BiTrash } from 'react-icons/bi'
import { useDispatch } from 'react-redux'

import { deleteTask } from '../../../redux/tasksSlice'

const DeleteTask = ({ task }) => {
    const [visibleDeleteTask, setVisibleDeleteTask] = useState(false)              // State hiển thị thông báo xác nhận xóa công việc
    const dispatch = useDispatch()
    const handleDelete = (taskId) => {
        dispatch(deleteTask(taskId))
        setVisibleDeleteTask(false)
    }

    return (
        <>
            <Dropdown.Item
                component="button"
                onClick={() => setVisibleDeleteTask(!visibleDeleteTask)}
            >
                <BiTrash /> Xóa
            </Dropdown.Item>
            <Modal
                scrollable
                show={visibleDeleteTask}
                onHide={() => setVisibleDeleteTask(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>XÓA CÔNG VIỆC</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa công việc {" "}
                    <span className="fw-bolder">
                        {task.name}
                    </span> khỏi ký túc xá?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setVisibleDeleteTask(false)}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleDelete(task.id)}
                    >
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteTask