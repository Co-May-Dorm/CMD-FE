import React, { useState } from 'react'
import { Dropdown, Image, ListGroup } from 'react-bootstrap'
import { BiEdit, BiInfoSquare, BiTrash } from 'react-icons/bi'

import moreIcon from '~/assets/icons/more.svg'
import TeamDetail from './TeamDetail'
import DeleteTeam from './TeamsFeatures/DeleteTeam'
import FormSubmitTeam from './TeamsFeatures/FormSubmitTeam'

const TeamRow = ({ teamInfo }) => {
    const [visibleTeamDetailUI, setVisibleTeamDetailUI] = useState(false)
    const [visibleEditTeamUI, setVisibleEditTeamUI] = useState(false)
    const [visibleDeleteTeamUI, setVisibleDeleteTeamUI] = useState(false)

    return (
        <>
            <ListGroup.Item
                action
                className="position-relative"
                onDoubleClick={() => setVisibleTeamDetailUI(true)}
            >
                {teamInfo.name}
                <div
                    className="position-absolute"
                    style={{
                        right: "1rem",
                        bottom: "50%",
                        transform: "translateY(50%)"
                    }}
                >
                    <Dropdown className="col-auto">
                        <Dropdown.Toggle variant="none" className="text-white">
                            <Image src={moreIcon} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                            <Dropdown.Item onClick={() => setVisibleTeamDetailUI(true)}>
                                <BiInfoSquare /> Chi tiết
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setVisibleEditTeamUI(true)}>
                                <BiEdit /> Chỉnh sửa
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setVisibleDeleteTeamUI(true)}>
                                <BiTrash /> Xóa
                            </Dropdown.Item>
                            <DeleteTeam teamId={teamInfo.id} />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </ListGroup.Item>
            {
                visibleTeamDetailUI && <TeamDetail visible={visibleTeamDetailUI} setVisible={setVisibleTeamDetailUI} teamInfo={teamInfo} />
            }
            {
                visibleEditTeamUI && <FormSubmitTeam visible={visibleEditTeamUI} setVisible={setVisibleEditTeamUI} team={teamInfo} />
            }
            {
                visibleDeleteTeamUI && <DeleteTeam visible={visibleDeleteTeamUI} setVisible={setVisibleDeleteTeamUI} teamId={teamInfo.id} />
            }

        </>
    )
}

export default TeamRow