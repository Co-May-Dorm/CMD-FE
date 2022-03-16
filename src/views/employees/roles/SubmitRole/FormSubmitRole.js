import React, { useEffect, useState } from "react"
import { Button, Form, Modal, Table } from "react-bootstrap"
import { AiOutlineClose } from "react-icons/ai"
import { useDispatch } from "react-redux"
import * as actions from "../../../../actions/rolesAction"
import AppToaster from "../../../../components/AppToaster"

const FormSubmitRole = ({ visible, setVisible, role = null }) => {
    const dispatch = useDispatch()

    // Biến lưu tất cả các quyền
    const detailPermissions = [{ name: "economic_contract", label: "Hợp đồng kinh tế" }, { name: "contract", label: "Hợp đồng" }, { name: "alarm", label: "Cảnh báo/nhắc nhở" }, { name: "device", label: "Thiết bị" }, { name: "accessory", label: "Phụ tùng" }, { name: "sensor", label: "Cảm biến" }, { name: "category", label: "Danh mục" }, { name: "kpi", label: "Danh mục kiểm tra" }, { name: "todolist", label: "Công việc" }, { name: "request", label: "Đề xuất" }, { name: "type", label: "Loại đề xuất" }, { name: "employee", label: "Nhân viên" }, { name: "department", label: "Phòng ban" }, { name: "position", label: "Chức vụ" }, { name: "inventory", label: "Kho" }, { name: "userrole", label: "Vai trò" }, { name: "form", label: "Báo cáo" }, { name: "customer", label: "Khách hàng" }, { name: "user", label: "Người dùng" }, { name: "company_function", label: "Chức năng công ty" }, { name: "tag", label: "Thẻ" }, { name: "pipeline", label: "Phân loại khách hàng" }, { name: "product", label: "Sản phẩm" }]
    // Biến lưu tất cả các chức năng của các quyền trên
    const detailFunctions = [{ name: "view", label: "Xem" }, { name: "create", label: "Tạo" }, { name: "update", label: "Sửa" }, { name: "delete", label: "Xóa" }, { name: "view_all", label: "Xem hết" }, { name: "update_all", label: "Sửa hết" }, { name: "delete_all", label: "Xóa hết" }]

    /* Quản lý các state */
    const [info, setInfo] = useState({ // State lưu thông tin của vai trò khi người dùng nhập dữ liệu
        name: "",
        permissions: {
            economic_contract: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            contract: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            alarm: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            device: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            accessory: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            sensor: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            category: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            kpi: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            todolist: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            request: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            type: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            employee: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            department: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            position: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            inventory: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            userrole: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            form: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            customer: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            user: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            company_function: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            tag: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            pipeline: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
            product: { view: false, create: false, update: false, delete: false, view_all: false, update_all: false, delete_all: false },
        },
        positions: []
    })
    const [notificationAddSuccess, setNotificationAddSuccess] = useState(false) // State quản lý hiển thị thông báo thêm vai trò thành công
    const [notificationUpdateSuccess, setNotificationUpdateSuccess] = useState(false) // State quản lý hiển thị thông báo cập nhật thông tin vai trò thành công
    //

    useEffect(() => {
        if (role?.id) {
            setInfo(role)
        }
    }, [role])

    /* Các hàm thay đổi giá trị của state info mỗi khi người dùng nhập/chọn dữ liệu mới */
    const handleInputChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }
    const handleCheck = (e) => {
        setInfo({
            ...info,
            permissions: {
                ...info.permissions,
                [e.target.name]: {
                    ...info.permissions[e.target.name],
                    [e.target.accessKey]: e.target.checked
                }
            }
        })
    }
    const handleCheckAll = (e) => {
        setInfo({
            ...info,
            permissions: {
                ...info.permissions,
                [e.target.name]: { view: e.target.checked, create: e.target.checked, update: e.target.checked, delete: e.target.checked, view_all: e.target.checked, update_all: e.target.checked, delete_all: e.target.checked }
            }
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
            if (info.id) {
                dispatch(actions.updateRoleRequest(info))
                setNotificationUpdateSuccess(true)
            }
            else {
                dispatch(actions.addRoleRequest(info))
                setNotificationAddSuccess(true)
            }
            setVisible(false)
        }
    }
    //

    return (
        <>
            <Modal
                fullscreen
                scrollable
                show={visible}
                onHide={() => setVisible(false)}
            >
                <Modal.Header
                    closeButton
                    className="bg-gradient"
                >
                    <Modal.Title>
                        {role?.id ? "CHỈNH SỬA VAI TRÒ" : "THÊM VAI TRÒ MỚI"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <div className="mb-3">
                            <Form.Label htmlFor="name">Tên vai trò:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Nhập tên vai trò..."
                                value={info.name}
                                onChange={handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tên vai trò.
                            </Form.Control.Feedback>
                        </div>
                        <div className="mb-3">
                            <Form.Label htmlFor="permissions">Quyền:</Form.Label>
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <td></td>
                                        <td>Xem</td>
                                        <td>Tạo</td>
                                        <td>Sửa</td>
                                        <td>Xóa</td>
                                        <td>Xem hết</td>
                                        <td>Sửa hết</td>
                                        <td>Xóa hết</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        detailPermissions.map((detailPermission, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <Form.Check
                                                        type="checkbox"
                                                        name={detailPermission.name}
                                                        label={detailPermission.label + ":"}
                                                        checked={info.permissions[detailPermission.name].view && info.permissions[detailPermission.name].create && info.permissions[detailPermission.name].update && info.permissions[detailPermission.name].delete && info.permissions[detailPermission.name].view_all && info.permissions[detailPermission.name].update_all && info.permissions[detailPermission.name].delete_all}
                                                        onChange={handleCheckAll}
                                                    />
                                                </td>
                                                {
                                                    detailFunctions.map((detailFunction, index) => (
                                                        <td key={index + 1}>
                                                            <Form.Check
                                                                type="checkbox"
                                                                name={detailPermission.name}
                                                                accessKey={detailFunction.name}
                                                                checked={info.permissions[detailPermission.name][detailFunction.name]}
                                                                onChange={handleCheck}
                                                            />
                                                        </td>
                                                    ))
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </div>
                        <Modal.Footer>
                            <Button
                                className="d-table m-auto"
                                size="lg"
                                type="submit"
                            >
                                {(role?.id) ? "Cập nhật thông tin" : "Xác nhận tạo mới"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

                <AppToaster visible={notificationAddSuccess} setVisible={setNotificationAddSuccess} title="Vai trò" content="Thêm vai trò thành công" />
                <AppToaster visible={notificationUpdateSuccess} setVisible={setNotificationUpdateSuccess} title="Vai trò" content="Cập nhật thông tin vai trò thành công" />
        </>
    )
}

export default FormSubmitRole