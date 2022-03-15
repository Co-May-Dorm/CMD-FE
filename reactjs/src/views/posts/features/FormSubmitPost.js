import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import { Button, Form, Modal } from 'react-bootstrap'
import { addPostRequest, updatePostRequest } from '../../../actions/postsAction'
import { useDispatch } from 'react-redux'

const FormSubmitPost = ({ visible, setVisible, data = null }) => {
    const [info, setInfo] = useState({
        title: "",
        thumbnail: "",
        content: "",
        is_public: false
    })

    const dispatch = useDispatch()

    useEffect(() => {
        if (data?.id) {
            setInfo({
                ...data
            })
        }
    }, [data])

    /* Các hàm thay đổi giá trị của state info mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }
    const handleFileChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.files[0]
        })
    }
    const handleCkEditorChange = (event, editor) => {
        const newContent = editor.getData()
        console.log(newContent)
        setInfo({
            ...info,
            content: newContent
        })
    }

    /* Xử lý Submit Form */
    const [validated, setValidated] = useState(false)
    const handleSubmit = (e) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        setValidated(true)
        if (form.checkValidity() === true) {
            e.preventDefault()
            e.stopPropagation()
            if (info.id) {
                dispatch(updatePostRequest({
                    ...info,
                    updated_at: new Date()
                }))
            }
            else {
                dispatch(addPostRequest({
                    ...info,
                    created_at: new Date()
                }))
            }
            setVisible(false)
        }
    }
    //

    return (
        <Modal
            size="lg"
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header
                closeButton
                className="bg-gradient"
            >
                <Modal.Title>
                    {data?.id ? "CHỈNH SỬA BÀI VIẾT" : "ĐĂNG BÀI VIẾT MỚI"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <div className="mb-3">
                        <Form.Label htmlFor="title">Tiêu đề:</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Nhập tiêu đề bài viết..."
                            value={info.title}
                            onChange={handleInputChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng nhập tiêu đề bài viết.
                        </Form.Control.Feedback>
                    </div>
                    {/* <hr />
                    <div className="mb-3">
                        <Form.Label htmlFor="thumbnail">Thumbnail:</Form.Label>
                        <Form.Control
                            type="file"
                            name="thumbnail"
                            placeholder="Chọn thumbnail cho bài viết..."
                            value={info.thumbnail}
                            onChange={handleFileChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Vui lòng chọn thumbnail.
                        </Form.Control.Feedback>
                    </div> */}
                    <hr />
                    <div className="mb-3">
                        <Form.Label htmlFor="content">Nội dung bài viết:</Form.Label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={info.content}
                            onChange={(event, editor) => {
                                handleCkEditorChange(event, editor)
                            }}
                        />
                    </div>
                    <Modal.Footer>
                        <Button
                            className="d-table m-auto"
                            size="lg"
                            type="submit"
                        >
                            {(data?.id) ? "Cập nhật bài viết" : "Đăng bài viết"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default FormSubmitPost