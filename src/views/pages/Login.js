
import React, { useEffect, useState } from 'react'

import { Button, Col, Container, Form, Image } from 'react-bootstrap'

import axiosClient from '../../api/axiosClient'
import background from '../../assets/images/login-background.png'
import usernameIcon from '../../assets/icons/username.svg'
import passwordIcon from '../../assets/icons/password.svg'

const Login = () => {

    useEffect(() => {
        document.title = "Đăng Nhập"
    })

    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    })

    const handleInput = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        })
    }

    /* Xử lý khi click button Đăng nhập */
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
            axiosClient.post("/api/auth/signin", loginInfo)
                .then(response => {
                    localStorage.setItem("accessToken", "Bearer " + response.data.data.accessToken)
                    localStorage.setItem("userInfo", JSON.stringify(response.data.data.userInfo))
                    window.location.reload()
                })
        }
    }
    return (
        <Container
            fluid
            className="min-vh-100 d-flex justify-content-center align-items-center"
            style={{
                background: "#EDFAF9 url('" + background + "') no-repeat left bottom"
            }}
        >
            <Col className="min-vh-100 position-relative">
            </Col>
            <Col>
                <Form
                    id="form-login"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <h3 className="notify--login">Vui lòng đăng nhập vào tài khoản của bạn</h3>
                    <div className="login--input">
                        <div className="login--input__icon">
                            <Image src={usernameIcon} />
                        </div>
                        <div className="login--input__textbox">
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Tên đăng nhập"
                                value={loginInfo.username}
                                onChange={handleInput}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tên đăng nhập.
                            </Form.Control.Feedback>
                        </div>
                    </div>
                    <div className="login--input">
                        <div className="login--input__icon">
                            <Image src={passwordIcon} />
                        </div>
                        <div className="login--input__textbox">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Mật khẩu"
                                value={loginInfo.info}
                                onChange={handleInput}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập mật khẩu.
                            </Form.Control.Feedback>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <Button type="submit">Đăng nhập</Button>
                    </div>
                </Form>
            </Col>
        </Container>
    )
}

export default Login
