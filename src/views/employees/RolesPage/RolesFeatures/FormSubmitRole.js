import React, { useEffect, useState } from "react"

import { Button, Form, Modal, Table } from "react-bootstrap"
import { useDispatch } from "react-redux"
import rolesApi from "../../../../api/rolesApi"
import { addRole, updateRole } from "../../../../redux/rolesSlice"

const FormSubmitRole = ({ visible, setVisible, roleId = null }) => {
    const dispatch = useDispatch()
    /* Quản lý các state */
    const [roleInfo, setRoleInfo] = useState({
        // State lưu thông tin của vai trò khi người dùng nhập dữ liệu
        name: "",
        createBy: null,
        modifyBy: null,
        options: [
            {
                id: 1,
                name: "todolist",
                label: "Công việc",
                permissions: [
                    {
                        id: 1,
                        name: "view",
                        label: "Xem",
                        selected: false,
                    },
                    {
                        id: 2,
                        name: "create",
                        label: "Tạo",
                        selected: false,
                    },
                    {
                        id: 3,
                        name: "update",
                        label: "Sửa",
                        selected: false,
                    },
                    {
                        id: 4,
                        name: "delete",
                        label: "Xoá",
                        selected: false,
                    },
                    {
                        id: 5,
                        name: "view_all",
                        label: "Xem hết",
                        selected: false,
                    },
                    {
                        id: 6,
                        name: "update_all",
                        label: "Sửa hết",
                        selected: false,
                    },
                    {
                        id: 7,
                        name: "delete_all",
                        label: "Xoá hết",
                        selected: false,
                    },
                    {
                        id: 8,
                        name: "import",
                        label: "Thêm sinh viên bằng file excel",
                        selected: false,
                    },
                ],
            },
            {
                id: 2,
                name: "request",
                label: "Đề xuất",
                permissions: [
                    {
                        id: 1,
                        name: "view",
                        label: "Xem",
                        selected: false,
                    },
                    {
                        id: 2,
                        name: "create",
                        label: "Tạo",
                        selected: false,
                    },
                    {
                        id: 3,
                        name: "update",
                        label: "Sửa",
                        selected: false,
                    },
                    {
                        id: 4,
                        name: "delete",
                        label: "Xoá",
                        selected: false,
                    },
                    {
                        id: 5,
                        name: "view_all",
                        label: "Xem hết",
                        selected: false,
                    },
                    {
                        id: 6,
                        name: "update_all",
                        label: "Sửa hết",
                        selected: false,
                    },
                    {
                        id: 7,
                        name: "delete_all",
                        label: "Xoá hết",
                        selected: false,
                    },
                    {
                        id: 8,
                        name: "import",
                        label: "Thêm sinh viên bằng file excel",
                        selected: false,
                    },
                ],
            },
            {
                id: 3,
                name: "type",
                label: "Loại đề xuất",
                permissions: [
                    {
                        id: 1,
                        name: "view",
                        label: "Xem",
                        selected: false,
                    },
                    {
                        id: 2,
                        name: "create",
                        label: "Tạo",
                        selected: false,
                    },
                    {
                        id: 3,
                        name: "update",
                        label: "Sửa",
                        selected: false,
                    },
                    {
                        id: 4,
                        name: "delete",
                        label: "Xoá",
                        selected: false,
                    },
                    {
                        id: 5,
                        name: "view_all",
                        label: "Xem hết",
                        selected: false,
                    },
                    {
                        id: 6,
                        name: "update_all",
                        label: "Sửa hết",
                        selected: false,
                    },
                    {
                        id: 7,
                        name: "delete_all",
                        label: "Xoá hết",
                        selected: false,
                    },
                    {
                        id: 8,
                        name: "import",
                        label: "Thêm sinh viên bằng file excel",
                        selected: false,
                    },
                ],
            },
            {
                id: 4,
                name: "employee",
                label: "Nhân viên",
                permissions: [
                    {
                        id: 1,
                        name: "view",
                        label: "Xem",
                        selected: false,
                    },
                    {
                        id: 2,
                        name: "create",
                        label: "Tạo",
                        selected: false,
                    },
                    {
                        id: 3,
                        name: "update",
                        label: "Sửa",
                        selected: false,
                    },
                    {
                        id: 4,
                        name: "delete",
                        label: "Xoá",
                        selected: false,
                    },
                    {
                        id: 5,
                        name: "view_all",
                        label: "Xem hết",
                        selected: false,
                    },
                    {
                        id: 6,
                        name: "update_all",
                        label: "Sửa hết",
                        selected: false,
                    },
                    {
                        id: 7,
                        name: "delete_all",
                        label: "Xoá hết",
                        selected: false,
                    },
                    {
                        id: 8,
                        name: "import",
                        label: "Thêm sinh viên bằng file excel",
                        selected: false,
                    },
                ],
            },
            {
                id: 5,
                name: "department",
                label: "Phòng ban",
                permissions: [
                    {
                        id: 1,
                        name: "view",
                        label: "Xem",
                        selected: false,
                    },
                    {
                        id: 2,
                        name: "create",
                        label: "Tạo",
                        selected: false,
                    },
                    {
                        id: 3,
                        name: "update",
                        label: "Sửa",
                        selected: false,
                    },
                    {
                        id: 4,
                        name: "delete",
                        label: "Xoá",
                        selected: false,
                    },
                    {
                        id: 5,
                        name: "view_all",
                        label: "Xem hết",
                        selected: false,
                    },
                    {
                        id: 6,
                        name: "update_all",
                        label: "Sửa hết",
                        selected: false,
                    },
                    {
                        id: 7,
                        name: "delete_all",
                        label: "Xoá hết",
                        selected: false,
                    },
                    {
                        id: 8,
                        name: "import",
                        label: "Thêm sinh viên bằng file excel",
                        selected: false,
                    },
                ],
            },
            {
                id: 6,
                name: "position",
                label: "Chức vụ",
                permissions: [
                    {
                        id: 1,
                        name: "view",
                        label: "Xem",
                        selected: false,
                    },
                    {
                        id: 2,
                        name: "create",
                        label: "Tạo",
                        selected: false,
                    },
                    {
                        id: 3,
                        name: "update",
                        label: "Sửa",
                        selected: false,
                    },
                    {
                        id: 4,
                        name: "delete",
                        label: "Xoá",
                        selected: false,
                    },
                    {
                        id: 5,
                        name: "view_all",
                        label: "Xem hết",
                        selected: false,
                    },
                    {
                        id: 6,
                        name: "update_all",
                        label: "Sửa hết",
                        selected: false,
                    },
                    {
                        id: 7,
                        name: "delete_all",
                        label: "Xoá hết",
                        selected: false,
                    },
                    {
                        id: 8,
                        name: "import",
                        label: "Thêm sinh viên bằng file excel",
                        selected: false,
                    },
                ],
            },
            {
                id: 7,
                name: "inventory",
                label: "Kho",
                permissions: [
                    {
                        id: 1,
                        name: "view",
                        label: "Xem",
                        selected: false,
                    },
                    {
                        id: 2,
                        name: "create",
                        label: "Tạo",
                        selected: false,
                    },
                    {
                        id: 3,
                        name: "update",
                        label: "Sửa",
                        selected: false,
                    },
                    {
                        id: 4,
                        name: "delete",
                        label: "Xoá",
                        selected: false,
                    },
                    {
                        id: 5,
                        name: "view_all",
                        label: "Xem hết",
                        selected: false,
                    },
                    {
                        id: 6,
                        name: "update_all",
                        label: "Sửa hết",
                        selected: false,
                    },
                    {
                        id: 7,
                        name: "delete_all",
                        label: "Xoá hết",
                        selected: false,
                    },
                    {
                        id: 8,
                        name: "import",
                        label: "Thêm sinh viên bằng file excel",
                        selected: false,
                    },
                ],
            },
            {
                id: 8,
                name: "team",
                label: "Đội nhóm",
                permissions: [
                    {
                        id: 1,
                        name: "view",
                        label: "Xem",
                        selected: false,
                    },
                    {
                        id: 2,
                        name: "create",
                        label: "Tạo",
                        selected: false,
                    },
                    {
                        id: 3,
                        name: "update",
                        label: "Sửa",
                        selected: false,
                    },
                    {
                        id: 4,
                        name: "delete",
                        label: "Xoá",
                        selected: false,
                    },
                    {
                        id: 5,
                        name: "view_all",
                        label: "Xem hết",
                        selected: false,
                    },
                    {
                        id: 6,
                        name: "update_all",
                        label: "Sửa hết",
                        selected: false,
                    },
                    {
                        id: 7,
                        name: "delete_all",
                        label: "Xoá hết",
                        selected: false,
                    },
                    {
                        id: 8,
                        name: "import",
                        label: "Thêm sinh viên bằng file excel",
                        selected: false,
                    },
                ],
            },
            {
                id: 9,
                name: "role",
                label: "Vai trò",
                permissions: [
                    {
                        id: 1,
                        name: "view",
                        label: "Xem",
                        selected: false,
                    },
                    {
                        id: 2,
                        name: "create",
                        label: "Tạo",
                        selected: false,
                    },
                    {
                        id: 3,
                        name: "update",
                        label: "Sửa",
                        selected: false,
                    },
                    {
                        id: 4,
                        name: "delete",
                        label: "Xoá",
                        selected: false,
                    },
                    {
                        id: 5,
                        name: "view_all",
                        label: "Xem hết",
                        selected: false,
                    },
                    {
                        id: 6,
                        name: "update_all",
                        label: "Sửa hết",
                        selected: false,
                    },
                    {
                        id: 7,
                        name: "delete_all",
                        label: "Xoá hết",
                        selected: false,
                    },
                    {
                        id: 8,
                        name: "import",
                        label: "Thêm sinh viên bằng file excel",
                        selected: false,
                    },
                ],
            },
        ],
        positions: [],
    })
    //

    // Biến lưu tất cả các chức năng của các quyền trên
    const detailOptions = roleInfo.options
    // Biến lưu tất cả các quyền
    const detailPermissions = roleInfo.options[0].permissions

    useEffect(() => {
        if (roleId) {
            rolesApi.get(roleId).then((response) => {
                setRoleInfo(response.data.data)
            })
        }
    }, [])

    /* Các hàm thay đổi giá trị của state roleInfo mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        setRoleInfo({
            ...roleInfo,
            [e.target.name]: e.target.value,
        })
    }
    const handleCheck = (option_index, permission_index) => {
        const startOptions = roleInfo.options.slice(0, option_index) || []
        const endOptions = roleInfo.options.slice(option_index + 1, roleInfo.options.length + 1) || []

        const startPermissions = roleInfo.options[option_index].permissions.slice(0, permission_index) || []
        const endPermissions =
            roleInfo.options[option_index].permissions.slice(permission_index + 1, roleInfo.options[option_index].permissions.length + 1) || []

        setRoleInfo({
            ...roleInfo,
            options: [
                ...startOptions,
                {
                    ...roleInfo.options[option_index],
                    permissions: [
                        ...startPermissions,
                        {
                            ...roleInfo.options[option_index].permissions[permission_index],
                            selected: !roleInfo.options[option_index].permissions[permission_index].selected,
                        },
                        ...endPermissions,
                    ],
                },
                ...endOptions,
            ],
        })
    }

    //
    const handleCheckAll = (option_index) => {
        const startOptions = roleInfo.options.slice(0, option_index) || []
        const endOptions = roleInfo.options.slice(option_index + 1, roleInfo.options.length + 1) || []
        const isAllTrue = roleInfo.options[option_index]?.permissions.every((permission) => permission.selected === true)
        setRoleInfo({
            ...roleInfo,
            options: [
                ...startOptions,
                {
                    ...roleInfo.options[option_index],
                    permissions: roleInfo.options[option_index]?.permissions.map((permission) => {
                        return {
                            ...permission,
                            selected: isAllTrue ? false : true,
                        }
                    }),
                },
                ...endOptions,
            ],
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
            if (roleInfo.id) {
                dispatch(
                    updateRole({
                        ...roleInfo,
                        modifyBy: JSON.parse(localStorage.getItem("userInfo")).id,
                    })
                )
            } else {
                dispatch(
                    addRole({
                        ...roleInfo,
                        createBy: JSON.parse(localStorage.getItem("userInfo")).id,
                        modifyBy: null,
                    })
                )
            }
            setVisible(false)
        }
    }
    //

    return (
        <Modal className="modal-fullheight" size="lg" scrollable show={visible} onHide={() => setVisible(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{roleInfo.id ? "CHỈNH SỬA VAI TRÒ" : "THÊM VAI TRÒ MỚI"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <Form.Label htmlFor="name">Tên vai trò:</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Nhập tên vai trò..." value={roleInfo.name} onChange={handleInputChange} required />
                        <Form.Control.Feedback type="invalid">Vui lòng nhập tên vai trò.</Form.Control.Feedback>
                    </div>
                    <div className="mb-3">
                        <Form.Label htmlFor="permissions">Quyền:</Form.Label>
                        <Table borderless>
                            <thead>
                                <tr>
                                    <td></td>
                                    {detailPermissions.map((detailPermission, permission_index) => (
                                        <td key={permission_index}>{detailPermission.label}</td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {detailOptions.map((detailOption, option_index) => (
                                    <tr key={option_index}>
                                        <td>
                                            <Form.Check
                                                type="checkbox"
                                                name={detailOption.name}
                                                label={detailOption.label + ":"}
                                                checked={roleInfo.options[option_index].permissions.every(
                                                    (detailPermission) => detailPermission.selected === true
                                                )}
                                                onChange={() => handleCheckAll(option_index)}
                                            />
                                        </td>
                                        {detailPermissions.map((detailPermission, permission_index) => (
                                            <td key={permission_index + 1}>
                                                <Form.Check
                                                    type="checkbox"
                                                    name={detailPermission.name}
                                                    checked={roleInfo.options[option_index].permissions[permission_index].selected}
                                                    onChange={() => handleCheck(option_index, permission_index)}
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <Modal.Footer>
                        <Button className="d-table m-auto" size="lg" type="submit">
                            {roleInfo.id ? "Cập nhật thông tin" : "Xác nhận tạo mới"}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default FormSubmitRole
