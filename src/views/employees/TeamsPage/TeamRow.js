import React, { useState } from 'react'
import { Dropdown, ListGroup } from 'react-bootstrap'

import moreIcon from '~/assets/icons/more.svg'
import TeamDetail from './TeamDetail'
import EditTeam from './TeamsFeatures/EditTeam'
import DeleteTeam from './TeamsFeatures/DeleteTeam'

const TeamRow = ({ teamInfo }) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <ListGroup.Item
                action
                className="position-relative"
                onDoubleClick={() => setVisible(true)}
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
                            <img src={moreIcon} alt="More icon" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                            <EditTeam teamInfo={teamInfo} />
                            <DeleteTeam teamId={teamInfo.id} />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </ListGroup.Item>
            <TeamDetail teamInfo={teamInfo} visible={visible} setVisible={setVisible} />
        </>
    )
}

export default TeamRow