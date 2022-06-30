import React, { useEffect, useState } from "react"

import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { addTeam, updateTeam } from "../../../../redux/teamsSlice"

import Positions from "./Positions"

const FormSubmitTeam = ({ visible, setVisible, team = null }) => {
    const dispatch = useDispatch()

    /* Quản lý các state */
    const [teaminfo, setTeamInfo] = useState({
        // State lưu thông tin của CLB/Đội nhóm khi người dùng nhập dữ liệu
        code: "",
        name: "",
        description: "",
        positions: []
    })
    //

    useEffect(() => {
        if (team?.id) {
            setTeamInfo(team)
        }
    }, [team])

    /* Các hàm thay đổi giá trị của state teaminfo mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        setTeamInfo({
            ...teaminfo,
            [e.target.name]: e.target.value
        })
    }
    //

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
            if (teaminfo.fatherTeamId === "") {
                setTeamInfo({
                    ...teaminfo,
                    fatherTeamId: null
                })
            }
            if (teaminfo.id) {
                dispatch(updateTeam(teaminfo))
            }
            else {
                dispatch(addTeam(teaminfo))
            }
        }
    }
    //

    return (
        <>
            <Modal
                className="modal-fullheight"
                size="md"
                scrollable
                show={visible}
                onHide={() => setVisible(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {team?.id ? "CHỈNH SỬA CLB/Đội nhóm" : "THÊM CLB/Đội nhóm MỚI"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-3">
                            <Form.Label>Mã CLB/Đội nhóm:</Form.Label>
                            <Form.Control
                                type="text"
                                name="code"
                                placeholder="Nhập mã CLB/Đội nhóm..."
                                value={teaminfo.code}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập mã CLB/Đội nhóm.
                            </Form.Control.Feedback>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <Form.Label>Tên CLB/Đội nhóm:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Nhập tên CLB/Đội nhóm..."
                                value={teaminfo.name}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tên CLB/Đội nhóm.
                            </Form.Control.Feedback>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <Form.Label>Mô tả:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                name="description"
                                placeholder="Nhập mô tả CLB/Đội nhóm..."
                                value={teaminfo.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <hr />
                        <Positions teaminfo={teaminfo} setTeamInfo={setTeamInfo} />
                        <Modal.Footer>
                            <Button
                                className="d-table m-auto"
                                size="lg"
                                type="submit"
                            >
                                {(team?.id) ? "Cập nhật thông tin" : "Xác nhận tạo mới"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default FormSubmitTeam
