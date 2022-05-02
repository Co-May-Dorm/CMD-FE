import React from 'react'

import { CSVLink } from 'react-csv'

import downloadIcon from '../../../assets/icons/download.svg'

const ExportDataToCSV = ({ data }) => {
    let dataReport = data.map(item => {
        return {
            ...item,
            gender: item.gender === 0 ? "Nữ" : "Nam",
            username: item.user.enableLogin === true ? item.user.username : "Không được đăng nhập",
            active: item.active === true ? "Đang hoạt động" : "Không hoạt động",
            departments: item.departments?.length > 0 ? item.departments.map(department => {
                return "" + department.name + ":" + department.position.name
            }).join("\n") : "Chưa ở trong bất phòng ban nào",
            teams: item.teams?.length > 0 ? item.teams.map(team => {
                return "" + team.name + ":" + team.position.name
            }).join("\n") : "Chưa tham gia đội nhóm"
        }
    })
    const headers = [
        { label: "Id", key: "id" },
        { label: "Mã", key: "code" },
        { label: "Họ và tên", key: "name" },
        { label: "Ngày sinh", key: "dateOfBirth" },
        { label: "Email", key: "email" },
        { label: "Số điện thoại", key: "phoneNumber" },
        { label: "Link ảnh đại diện", key: "avatar" },
        { label: "Giới tính", key: "gender" },
        { label: "Tên người dùng", key: "username" },
        { label: "Trạng thái hoạt động", key: "active" },
        { label: "Ngày tạo", key: "createDate" },
        { label: "Tạo bởi", key: "createBy" },
        { label: "Ngày chỉnh sửa", key: "nodifyDate" },
        { label: "Chỉnh sửa bởi", key: "modifyBy" },
        { label: "Danh sách phòng ban", key: "departments" },
        { label: "Danh sách đội nhóm", key: "teams" }
    ]
    const csvReport = {
        data: dataReport,
        headers: headers,
        filename: "Employee" + Date() + ".csv"

    }
    return (
        <CSVLink
            {...csvReport}
            className="btn"
        >
            <img src={downloadIcon} alt="Download icon" />
        </CSVLink>
    )
}

export default ExportDataToCSV