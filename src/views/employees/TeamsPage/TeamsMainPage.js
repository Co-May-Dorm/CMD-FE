import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ListGroup, Modal } from 'react-bootstrap'

import * as actions from '../../../actions/teamsAction'
import AppSearch from '../../../components/AppSearch'
import TeamRow from './TeamRow'
import AddTeam from './TeamsFeatures/AddTeam'

const TeamsMainPage = ({ visible, setVisible }) => {
    const teams = useSelector(state => state.teams.data)

    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        name: ""
    })

    useEffect(() => {
        dispatch(actions.fetchTeamsRequest(filters))
    }, [filters])

    const handleSearchTerm = (searchTerm) => {
        setFilters({
            name: searchTerm
        })
    }
    //

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
                    CLB/Đội nhóm
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row align-content-between justify-content-between bg-light p-3">
                    <div className="col">
                        <AppSearch
                            value={filters.name}
                            onSearch={handleSearchTerm}
                        />
                    </div>
                    <div className="col-auto">
                        <AddTeam />
                    </div>
                </div>
                <ListGroup
                    className="mt-3"
                    variant="flush"
                >
                    {
                        teams.map((team, index) => (
                            <TeamRow
                                key={index}
                                team={team}
                            />
                        ))
                    }
                </ListGroup>
            </Modal.Body>
        </Modal>
    )
}

export default TeamsMainPage