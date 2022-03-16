import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as actions from '../../../actions/postsAction'

const DeletePost = ({ id }) => {
    // Sử dụng hook useNavigate của react-router v6
    const navigate = useNavigate()

    // Dùng để dispatch action trên redux
    const dispatch = useDispatch()

    // State hiển thị Modal xác nhận xóa bài viết
    const [visible, setVisible] = useState(false)

    // Hàm xử lý xóa bài viết
    const handleDelete = (id) => {

        // Dispatch action gửi API xóa bài viết
        dispatch(actions.deletePostRequest(id))

        // Trở về trang trước đó
        navigate(-1)

    }

    return (
        <>
            <span
                className="cursor-pointer"
                onClick={() => setVisible(true)}
            >
                Xóa
            </span>
            <Modal
                scrollable
                show={visible}
                onHide={() => setVisible(false)}
            >
                <Modal.Header
                    closeButton
                    className="bg-gradient"
                >
                    <Modal.Title>XÓA BÀI VIẾT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc muốn xóa bài viết này?
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setVisible(false)}
                    >
                        Hủy
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleDelete(id)}
                    >
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeletePost