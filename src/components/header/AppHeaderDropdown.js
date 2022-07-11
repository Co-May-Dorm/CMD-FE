import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Dropdown, Image } from 'react-bootstrap'
import { BsPersonCircle } from 'react-icons/bs'

import defaultAvatar from '~/assets/icons/avatar-default.png'
import logoutIcon from '~/assets/icons/logout.svg'
import listbarIcon from '~/assets/icons/listbar.svg'
import manualsIcon from '~/assets/icons/manuals.svg'

const AppHeaderDropdown = () => {
    const navigate = useNavigate()

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("userInfo")
        navigate("/login")
    }

    return (
        <Dropdown className="col-auto">
            <Dropdown.Toggle variant="none" className="d-flex align-items-center">
                <Image
                    roundedCircle
                    src={defaultAvatar}
                    style={{
                        width: "3rem",
                        height: "3rem"
                    }}
                    className="col-auto me-2"
                />
                <div className="col d-flex flex-column text-start">
                    <span className="fw-bolder">
                        {userInfo.name}
                    </span>
                    <span>
                        {userInfo.username}
                    </span>
                </div>
                <Image
                    src={listbarIcon}
                    className="col-auto ms-5"
                />
            </Dropdown.Toggle>
            <Dropdown.Menu className="animate__animated animate__slideInRight">
                <Dropdown.Item>
                    <BsPersonCircle className="me-2" />
                    Tài khoản
                </Dropdown.Item>
                <Dropdown.Item>
                    <Image src={manualsIcon} className="me-2" />
                    Hướng dẫn sử dụng
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                    <Image src={logoutIcon} className="me-2" />
                    Đăng xuất
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default AppHeaderDropdown
