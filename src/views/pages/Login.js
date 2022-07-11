
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Container, Form, Image } from 'react-bootstrap'
import swal from 'sweetalert'
import { Formik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'

import background from '~/assets/images/login-background.png'
import usernameIcon from '~/assets/icons/username.svg'
import passwordIcon from '~/assets/icons/password.svg'
import authApi from '~/api/authApi'

const Login = () => {
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "Đăng Nhập"
    }, [])

    /* Xử lý form với formik */
    const initialValues = {
        username: "",
        password: ""
    }
    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Vui lòng nhập tên người dùng.").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Vui lòng nhập tên người dùng hợp lệ. Tên người dùng là địa chỉ Email của bạn."),
        password: Yup.string().required("Vui lòng nhập mật khẩu.")
    })
    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(true)
        const response = await authApi.login(values)
        if (response.data.status === "OK") {
            localStorage.setItem("accessToken", "Bearer " + response.data.data.accessToken)
            localStorage.setItem("userInfo", JSON.stringify(response.data.data.userInfo))
            navigate("/")
        }
        else {
            swal({
                title: "Đăng nhập",
                text: response.data.message,
                icon: "error",
                button: "OK"
            })
        }
    }
    //

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
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {
                        ({ values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, dirty }) => (
                            <Form id="form-login" onSubmit={handleSubmit}>
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
                                            className={clsx({
                                                "is-invalid": touched.username && errors.username
                                            })}
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            touched.username && errors.username && <div className="invalid-feedback">{errors.username}</div>
                                        }
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
                                            className={clsx({
                                                "is-invalid": touched.password && errors.password
                                            })}
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {
                                            touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>
                                        }
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <Button
                                        type="submit"
                                        disabled={!(dirty && isValid)}
                                    >
                                        Đăng nhập
                                    </Button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </Col>
        </Container>
    )
}

export default Login
