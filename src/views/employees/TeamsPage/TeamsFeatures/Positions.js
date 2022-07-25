/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, ListGroup, Modal } from 'react-bootstrap'
import { BiTrash } from 'react-icons/bi'

import { getRoleList } from '~/redux/rolesSlice'
import { rolesSelector } from '~/redux/selectors'

const Positions = ({ teamInfo, setTeamInfo }) => {
    const roles = useSelector(rolesSelector).roles
    const dispatch = useDispatch()

    const [visibleDeletePosition, setVisibleDeletePosition] = useState(false)
    useEffect(() => {
        dispatch(getRoleList())
    }, [])

    /* Các hàm thay đổi giá trị của state teamInfo mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        const index = e.target.tabIndex
        const name = e.target.name
        const value = (e.target.type === "checkbox") ? e.target.checked : e.target.value
        const start = teamInfo.positions.slice(0, index) || []
        const end = teamInfo.positions.slice(index + 1, teamInfo.positions.length + 1) || []
        setTeamInfo({
            ...teamInfo,
            positions: [
                ...start,
                {
                    ...teamInfo.positions[index],
                    [name]: value
                },
                ...end]
        })
    }
    const handleRoleChange = (e) => {
        const index = e.target.tabIndex
        const value = e.target.value
        const findName = roles.find(role => role.id === Number(value))?.name
        const start = teamInfo.positions.slice(0, index) || []
        const end = teamInfo.positions.slice(index + 1, teamInfo.positions.length + 1) || []
        setTeamInfo({
            ...teamInfo,
            positions: [
                ...start,
                {
                    ...teamInfo.positions[index],
                    role: {
                        id: Number(value),
                        name: findName
                    }
                },
                ...end]
        })
    }
    const handleDelete = (index) => {
        const array = teamInfo.positions.filter((e, idx) => index !== idx)
        setTeamInfo({
            ...teamInfo,
            positions: array
        })
    }
    //

    // Thêm một form nhập chức vụ mới mỗi khi click vào Button Thêm chức vụ
    const handleShowFormAddPostion = () => {
        if (teamInfo.positions?.length === 0) {
            setTeamInfo({
                ...teamInfo,
                positions: [{
                    name: "",
                    isManager: false,
                    role: {
                        id: "",
                        name: ""
                    }
                }]
            })
        }
        else {
            setTeamInfo({
                ...teamInfo,
                positions: [
                    ...teamInfo.positions,
                    {
                        name: "",
                        isManager: false,
                        role: {
                            id: "",
                            name: ""
                        }
                    }
                ]
            })
        }
    }
    
    return (
        <>
            {
                teamInfo?.positions?.map((position, index) => (
                    <div key={index}>
                        <ListGroup.Item className="bg-light text-body">
                            <Form.Group className="mb-3">
                                <Form.Label>Tên chức vụ:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    tabIndex={index}
                                    placeholder="Nhập tên chức vụ..."
                                    value={position.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập tên chức vụ.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Vai trò:</Form.Label>
                                <Form.Select
                                    tabIndex={index}
                                    value={position.role?.id}
                                    label={position.role?.name}
                                    onChange={handleRoleChange}
                                >
                                    {
                                        roles.map(role => (
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                            <div className="row justify-content-center">
                                <Form.Check
                                    label="Là trưởng phòng"
                                    name="isManager"
                                    className="col ms-3"
                                    tabIndex={index}
                                    disabled={teamInfo.positions.some(e => e.isManager === true) && position.isManager === false}
                                    checked={position.isManager}
                                    onChange={handleInputChange}
                                />
                                <Button variant="none" className="col-auto me-3" onClick={() => setVisibleDeletePosition(true)}>
                                    <BiTrash />
                                </Button>
                            </div>
                        </ListGroup.Item>
                        <br />
                        <Modal
                            backdrop="static"
                            show={visibleDeletePosition}
                            onHide={() => setVisibleDeletePosition(false)}
                        >
                            <Modal.Header closeButton className="bg-gradient">
                                <Modal.Title>XÓA CHỨC VỤ</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Bạn có chắc muốn xóa chức vụ này khỏi CLB/Đội nhóm?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={() => setVisibleDeletePosition(false)}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(index)}
                                >
                                    Đồng ý
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                ))
            }
            <div className="mb-3 mt-3">
                <Button variant="outline-primary" className="d-table m-auto" onClick={handleShowFormAddPostion}>
                    Thêm chức vụ
                </Button>
            </div>
        </>
    )
}

export default Positions