/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Accordion, Col, Image, Modal, Row } from 'react-bootstrap'
import { BiSend } from 'react-icons/bi'

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
                    <div className="mb-4">
                        <div className="text-uppercase fw-bolder">
                            Thông tin đề xuất
                        </div>
                        <Row className="m-2">
                            <Col md={5} className="fw-bolder">Người tạo:</Col>
                            <Col md={7}>{proposalInfo.creator?.name}</Col>
                        </Row>
                        <Row className="m-2">
                            <Col md={5} className="fw-bolder">Ngày tạo:</Col>
                            <Col md={7}>{showDate(proposalInfo.createdDate)}</Col>
                        </Row>
                        <Row className="m-2">
                            <Col md={5} className="fw-bolder">Loại đề xuất:</Col>
                            <Col md={7}>{proposalInfo.proposal?.name}</Col>
                        </Row>
                        <Row className="m-2">
                            <Col md={5} className="fw-bolder">Trạng thái:</Col>
                            <Col md={7} className="text-primary fw-bolder">
                                {proposalInfo.status?.name}
                            </Col>
                        </Row>
                    </div>
                    <div className="mb-4">
                        <div className="text-uppercase fw-bolder">
                            Nội dung đề xuất
                        </div>
                        {
                            proposalInfo.contents?.map((content) => (
                                <Row key={content.fieldId} className="m-2">
                                    <Col md={5} className="fw-bolder">{content.fieldName}:</Col>
                                    <Col md={7}>
                                        {content.content}
                                    </Col>
                                </Row>
                            ))
                        }
                    </div>
                    <Accordion defaultActiveKey={['0']}>
                        <Accordion.Item eventKey="0">
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