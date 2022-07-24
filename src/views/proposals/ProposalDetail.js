/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Accordion, Col, Image, Modal, Row } from 'react-bootstrap'
import { BiSend } from 'react-icons/bi'

import rate0 from "~/assets/icons/rate-0.svg"
import rate1 from "~/assets/icons/rate-1.svg"
import proposalsApi from '~/api/proposalsApi'

const userInfo = JSON.parse(localStorage.getItem("userInfo"))

const ProposalDetail = ({ visible, setVisible, proposalId }) => {
    const [proposalInfo, setProposalInfo] = useState({})

    useEffect(() => {
        proposalsApi.getProposalDetailById(proposalId)
            .then((response) => {
                setProposalInfo(response.data.data)
            })
    }, [])

    const showDate = (d) => {
        const date = new Date(d)      // Khởi tạo biến date kiểu dữ liệu Date với dữ liệu truyền vào là ngày sinh của đề xuất được lấy từ database có dạng yyyymmdddd
        return "" + (date.getDate() < 10 ? "0" : "") + date.getDate() + "/" + (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1) + "/" + date.getFullYear()
    }
    let rateElement = []
    if (proposalInfo.rate > 0) {
        for (let i = 1; i <= 5; ++i) {
            if (i <= proposalInfo.rate) {
                rateElement.push(
                    <Image
                        key={i}
                        src={rate1}
                        className="mx-1"
                    />
                )
            }
            else {
                rateElement.push(
                    <Image
                        key={i}
                        src={rate0}
                        className="mx-1"
                    />
                )
            }
        }
    }

    return (
        <Modal
            className="modal-fullheight"
            size="md"
            scrollable
            show={visible}
            onHide={() => setVisible(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Chi tiết đề xuất
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column justify-content-between">
                    <Row className="m-2">
                        <Col md={5} className="fw-bolder">Mã đề xuất:</Col>
                        <Col md={7}>{proposalInfo.code || "Trống"}</Col>
                    </Row>
                    <Row className="m-2">
                        <Col md={5} className="fw-bolder">Tên đề xuất:</Col>
                        <Col md={7}>{proposalInfo.title}</Col>
                    </Row>
                    <Row className="m-2">
                        <Col md={5} className="fw-bolder">Thời hạn:</Col>
                        <Col md={7}>{showDate(proposalInfo.startDate) + " - " + showDate(proposalInfo.finishDate)}</Col>
                    </Row>
                    <Row className="m-2">
                        <Col md={5} className="fw-bolder">Mức độ ưu tiên:</Col>
                        <Col md={7}>
                            {
                                proposalInfo.priority === 1 ? "Thấp" : proposalInfo.priority === 2 ? "Trung bình" : proposalInfo.priority === 3 ? "Cao" : "Rất cao"
                            }
                        </Col>
                    </Row>
                    <Row className="m-2">
                        <Col md={5} className="fw-bolder">Người giao:</Col>
                        <Col md={7}>
                            <div className="d-flex">
                                <Image
                                    src={proposalInfo.creator.avatar}
                                    width={40}
                                    height={40}
                                    className="rounded-circle col-auto me-2"
                                />
                                <Row className="flex-column">
                                    <Col className="fw-bolder text-primary">
                                        {proposalInfo.creator.name}
                                    </Col>
                                    <Col>
                                        {proposalInfo.creator.code}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Row className="m-2">
                        <Col md={5} className="fw-bolder">Người nhận:</Col>
                        <Col md={7}>
                            <div className="d-flex">
                                <Image
                                    src={proposalInfo.receiver.avatar}
                                    width={40}
                                    height={40}
                                    className="rounded-circle col-auto me-2"
                                />
                                <Row className="flex-column">
                                    <Col className="fw-bolder text-primary">
                                        {proposalInfo.receiver.name}
                                    </Col>
                                    <Col>
                                        {proposalInfo.receiver.code}
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                    <Row className="m-2">
                        <span className="fw-bolder">Mô tả:</span>
                        <span>{proposalInfo.description}</span>
                    </Row>
                    <Row className="m-2">
                        <Col md={5} className="fw-bolder">Trạng thái:</Col>
                        <Col md={7}>
                            {
                                proposalInfo.status.id === 1 ? (
                                    <>
                                        {proposalInfo.status.name} ({showDate(proposalInfo.modifyDate)})
                                    </>

                                ) : <strong>{proposalInfo.status.name}</strong>
                            }
                        </Col>
                    </Row>
                    <Row className="m-2">
                        <Col md={5} className="fw-bolder">Đánh giá:</Col>
                        <Col md={7}>
                            {rateElement}
                        </Col>
                    </Row>
                    <Accordion defaultActiveKey={['0']}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Lịch sử hoạt động</Accordion.Header>
                            <Accordion.Body>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Thảo luận</Accordion.Header>
                            <Accordion.Body>
                                <div className="d-flex justify-content-evenly">
                                    <div className="col-auto">
                                        <Image
                                            className="rounded-circle me-2"
                                            src={userInfo.avatar}
                                            width={35}
                                            height={35}
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Nhập nội dung thảo luận"
                                        />
                                    </div>
                                    <div className="col-auto ms-2">
                                        <BiSend size={35} />
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ProposalDetail