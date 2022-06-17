
import React, { useEffect, useState } from 'react'
import { Button, Card, CardGroup, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { BiLockOpen, BiUserCircle } from 'react-icons/bi'

import axiosClient from '../../../api/axiosClient'
import background from "../../../assets/images/cmd.jpg"

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
        <div className="bg-gradient min-vh-100 d-flex flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <CardGroup>
                            <Card className="p-4">
                                <Card.Body>
                                    <Form
                                        className="modal-body"
                                        noValidate
                                        validated={validated}
                                        onSubmit={handleSubmit}
                                    >
                                        <h1>Đăng Nhập</h1>
                                        <p className="text-medium-emphasis">Đăng nhập vào tài khoản của bạn</p>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>
                                                <BiUserCircle />
                                            </InputGroup.Text>
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
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroup.Text>
                                                <BiLockOpen />
                                            </InputGroup.Text>
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
                                        </InputGroup>
                                        <Row>
                                            <Col xs={6}>
                                                <Button
                                                    color="primary"
                                                    className="px-4"
                                                    type="submit"
                                                >
                                                    Đăng nhập
                                                </Button>
                                            </Col>
                                            <Col xs={6} className="text-right">
                                                <Button
                                                    variant="link"
                                                    className="px-0 text-primary"
                                                >
                                                    Quên mật khẩu
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                            <Card className="bg-primary" style={{ width: '44%' }}>
                                <Card.Img src={background} style={{ minWidth: "inherit", minHeight: "100%", borderRadius: 0 }} />
                                <Card.ImgOverlay />
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login
