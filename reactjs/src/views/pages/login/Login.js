import React, { useEffect } from 'react'
import { Button, Card, CardGroup, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { BiLockOpen, BiUserCircle } from 'react-icons/bi'
import background from "../../../assets/images/cmd.jpg"

const Login = () => {
    useEffect(() => {
        document.title = "Đăng Nhập - Cảnh Báo Sớm"
    })
    return (
        <div className="bg-gradient min-vh-100 d-flex flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <CardGroup>
                            <Card className="p-4">
                                <Card.Body>
                                    <Form>
                                        <h1>Đăng Nhập</h1>
                                        <p className="text-medium-emphasis">Đăng nhập vào tài khoản của bạn</p>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>
                                                <BiUserCircle />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Tên đăng nhập"
                                                autoComplete="username"
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroup.Text>
                                                <BiLockOpen />
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="password"
                                                placeholder="Mật khẩu"
                                                autoComplete="password"
                                            />
                                        </InputGroup>
                                        <Row>
                                            <Col xs={6}>
                                                <Button color="primary" className="px-4">
                                                    Đăng nhập
                                                </Button>
                                            </Col>
                                            <Col xs={6} className="text-right">
                                                <Button variant="link" className="px-0 text-primary">
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
        </div >
    )
}

export default Login
