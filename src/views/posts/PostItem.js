import React from 'react'
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PostItem = ({ post }) => {
    const htmlEntities = (str) => {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
    return (
        <ListGroup.Item className="my-3">
            <Row className="align-items-center">
                <Col xs={12} sm={2}>
                    <Link to={"/posts/" + post.id}>
                        <Image src={post.thumbnail} style={{
                            width: "10rem",
                            height: "10rem",

                        }} />
                    </Link>
                </Col>
                <Col xs={12} sm={10}>
                    <Row >
                        <Card.Title>
                            <Link to={"/posts/" + post.id} className="nav-link text-dark">
                                {post.title}
                            </Link>
                        </Card.Title>
                        <small
                        className=""
                        style={{ textAlign: "justify" }}
                        >
                            {(htmlEntities(post.content)).slice(0, 500)}
                        </small>
                    </Row>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default PostItem