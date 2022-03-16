import React, { useEffect, useState } from 'react'
import { Card, Col, Container, ListGroup, Nav, NavLink, Row } from 'react-bootstrap'
import { AiFillEye, AiOutlineEye, AiOutlineFieldTime } from 'react-icons/ai'
import { BsPersonCircle } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import postsApi from '../../api/postsApi'
import DeletePost from './features/DeletePost'
import EditPost from './features/EditPost'

const DetailPost = () => {
    const id = useParams().id
    const [dataPost, setDataPost] = useState({})

    useEffect(() => {
        postsApi.get(id)
            .then(response => {
                setDataPost(response.data.data)
            })
    }, [])

    const showDateTime = (datetime) => {
        datetime = new Date(datetime)
        return ""
            + datetime.getHours() + ":"
            + datetime.getMinutes() + ":"
            + datetime.getSeconds() + ", ngày "
            + datetime.getDate() + "/"
            + (datetime.getMonth() + 1) + "/"
            + datetime.getFullYear()
    }

    return (
        <div className="row justify-content-between align-items-center flex-lg-row flex-column" style={{ color: "black"}}>
            <div className="col-lg-9 col">
                <Card>
                    <Card.Header className="text-center">
                        <Card.Title>
                            {dataPost.title}
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <BsPersonCircle className="me-3" /> Đăng bởi: {"   "}
                                <span className="fw-bolder">
                                    Admin
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <AiOutlineEye className="me-3" /> Lượt truy cập: {"   "}
                                <span className="fw-bolder">
                                    Chức năng đang cập nhật
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <AiOutlineFieldTime className="me-3" /> Đăng vào lúc: {"   "}
                                <span className="fw-bolder">
                                    {showDateTime(dataPost.created_at)}
                                </span>
                            </ListGroup.Item>
                            <ListGroup.Item className="text-end">
                                <EditPost data={dataPost} />
                                {"   |   "}
                                <DeletePost id={dataPost.id} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div dangerouslySetInnerHTML={{ __html: dataPost.content }} />
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
            <div className="col-lg-3 col mt-lg-0 mt-3">
                <Card>
                    <Card.Header className="bg-gradient">
                        <Card.Title className="text-white">
                            Bài Viết Liên Quan
                        </Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                            <ListGroup.Item>
                                .
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default DetailPost