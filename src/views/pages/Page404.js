import React from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'

const Page404 = () => {
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <div className="clearfix">
                            <h1 className="float-start display-3 me-4">404</h1>
                            <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
                            <p className="text-medium-emphasis float-start">
                                The page you are looking for was not found.
                            </p>
                        </div>
                        <InputGroup className="input-prepend">
                            <InputGroup.Text>
                                Hi
                            </InputGroup.Text>
                            <Form.Control type="text" placeholder="Bạn đang tìm kiếm thứ gì?" />
                            <Button variant="info">Tìm kiếm</Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Page404
