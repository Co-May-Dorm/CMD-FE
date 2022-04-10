import React from 'react'

import { Dropdown, Image } from 'react-bootstrap'
import { BsBoxArrowRight, BsPersonCircle } from 'react-icons/bs'

import defaultAvatar from './../../assets/icons/avatar-default.png'
import logoutIcon from './../../assets/icons/logout.svg'

const AppHeaderDropdown = () => {
    return (
        <Dropdown className="col-auto">
            <Dropdown.Toggle variant="none" className="d-flex">
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
                        Nguyễn Võ Song Toàn
                    </span>
                    <span>
                        Sinh viên
                    </span>
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="animate__animated animate__slideInRight">
                <Dropdown.Item>
                    <BsPersonCircle className="me-2" />
                    Tài khoản
                </Dropdown.Item>
                <Dropdown.Item>
                    <img src={logoutIcon} className="me-2" />
                    Đăng xuất
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default AppHeaderDropdown
