import React, { useState } from 'react'

import moreIcon from '../../../assets/icons/more.svg'
import { Dropdown, ListGroup } from 'react-bootstrap'

import TeamDetail from './TeamDetail'
import EditTeam from './TeamsFeatures/EditTeam'
import DeleteTeam from './TeamsFeatures/DeleteTeam'

const TeamRow = ({ team }) => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <ListGroup.Item
                action
                className="position-relative"
                onDoubleClick={() => setVisible(true)}
            >
                {team.name}
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
                            <EditTeam team={team} />
                            <DeleteTeam id={team.id} />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </ListGroup.Item>
            <TeamDetail team={team} visible={visible} setVisible={setVisible} />
        </>
    )
}

export default TeamRow