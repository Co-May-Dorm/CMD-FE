import React, { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"

import { addTeam, updateTeam } from "~/redux/teamsSlice"
import Positions from "./Positions"

const FormSubmitTeam = ({ visible, setVisible, team = null }) => {
    const dispatch = useDispatch()

    /* Quản lý các state */
    const [teamInfo, setTeamInfo] = useState({
        // State lưu thông tin của đội nhóm khi người dùng nhập dữ liệu
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

    /* Các hàm thay đổi giá trị của state teamInfo mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        setTeamInfo({
            ...teamInfo,
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
            if (teamInfo.fatherTeamId === "") {
                setTeamInfo({
                    ...teamInfo,
                    fatherTeamId: null
                })
            }
            if (teamInfo.id) {
                dispatch(updateTeam(teamInfo))
            }
            else {
                dispatch(addTeam(teamInfo))
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
                        {team?.id ? "CHỈNH SỬA ĐỘI NHÓM" : "THÊM ĐỘI NHÓM MỚI"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-3">
                            <Form.Label>Mã đội nhóm:</Form.Label>
                            <Form.Control
                                type="text"
                                name="code"
                                placeholder="Nhập mã đội nhóm..."
                                value={teamInfo.code}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập mã đội nhóm.
                            </Form.Control.Feedback>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <Form.Label>Tên đội nhóm:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Nhập tên đội nhóm..."
                                value={teamInfo.name}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tên đội nhóm.
                            </Form.Control.Feedback>
                        </div>
                        <hr />
                        <div className="mb-3">
                            <Form.Label>Mô tả:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={10}
                                name="description"
                                placeholder="Nhập mô tả đội nhóm..."
                                value={teamInfo.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <hr />
                        <Positions teamInfo={teamInfo} setTeamInfo={setTeamInfo} />
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
