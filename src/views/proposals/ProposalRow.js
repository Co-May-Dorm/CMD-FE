import React, { useState } from 'react'

import { Dropdown, Image } from 'react-bootstrap'

import moreIcon from "~/assets/icons/more.svg"
import DeleteProposal from './ProposalsFeatures/DeleteProposal'
import ProposalDetail from './ProposalDetail'
import { BiEdit, BiInfoSquare, BiTrash } from 'react-icons/bi'
import FormSubmitProposal from './ProposalsFeatures/SubmitProposal/FormSubmitProposal'

const ProposalRow = ({ proposalInfo }) => {
    const [visibleProposalDetailUI, setVisibleProposalDetailUI] = useState(false)
    const [visibleEditProposalUI, setVisibleEditProposalUI] = useState(false)
    const [visibleDeleteProposalUI, setVisibleDeleteProposalUI] = useState(false)

    // Hàm hiển thị ngày sinh cho hợp lý
    const showDate = (d) => {
        const date = new Date(d)      // Khởi tạo biến date kiểu dữ liệu Date với dữ liệu truyền vào là ngày sinh của đề xuất được lấy từ database có dạng yyyymmdddd
        return "" + (date.getDate() < 10 ? "0" : "") + date.getDate() + "/" + (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1) + "/" + date.getFullYear()
    }

    return (
        <div
            className="item proposal list-group-item"
            style={{
                border: "none"
            }}
        >
            <div className="item-label" />
            <div className="ms-lg-5" />
            <div className="proposal-creator">
                <div className="d-lg-none fw-bold col text-break">
                    Người đề xuất:
                </div>
                <div className="col text-break">
                    <Image src={proposalInfo.creator.avatar} width={40} className="rounded-circle me-2" />
                    {proposalInfo.creator.name}
                </div>
            </div>
            <div className="proposal-type">
                <div className="d-lg-none fw-bold col text-break">
                    Loại đề xuất:
                </div>
                <div className="col text-break">
                    {proposalInfo.proposal.name}
                </div>
            </div>
            <div className="proposal-content">
                <div className="d-lg-none fw-bold col text-break">
                    Mục đích/Lý do:
                </div>
                <div className="col text-break">
                    {proposalInfo.contents[0].content}
                </div>
            </div>
            <div className="proposal-createDate">
                <div className="d-lg-none fw-bold col text-break">
                    Ngày tạo:
                </div>
                <div className="col text-break">
                    {showDate(proposalInfo.createdDate)}
                </div>
            </div>
            <div className="proposal-status">
                <div className="d-lg-none fw-bold col text-break">
                    Trạng thái:
                </div>
                <div className="col text-break">
                    {proposalInfo.status.name}
                </div>
            </div>
            <Dropdown className="proposal-more more">
                <Dropdown.Toggle variant="none" className="text-white">
                    <Image src={moreIcon} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                    <Dropdown.Item onClick={() => setVisibleProposalDetailUI(true)}>
                        <BiInfoSquare /> Chi tiết
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setVisibleEditProposalUI(true)}>
                        <BiEdit /> Chỉnh sửa
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setVisibleDeleteProposalUI(true)}>
                        <BiTrash /> Xóa
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {
                visibleProposalDetailUI && <ProposalDetail visible={visibleProposalDetailUI} setVisible={setVisibleProposalDetailUI} proposalId={proposalInfo.id} />
            }
            {
                visibleEditProposalUI && <FormSubmitProposal visible={visibleEditProposalUI} setVisible={setVisibleEditProposalUI} proposal={proposalInfo} />
            }
            {
                visibleDeleteProposalUI && <DeleteProposal visible={visibleDeleteProposalUI} setVisible={setVisibleDeleteProposalUI} proposalInfo={proposalInfo} />
            }
        </div>
    )
}

export default ProposalRow