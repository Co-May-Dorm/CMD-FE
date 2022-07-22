/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Modal } from 'react-bootstrap'

import { teamsSelector } from '~/redux/selectors'
import { getTeamList } from '~/redux/teamsSlice'
import AppSearch from '~/components/AppSearch'
import TeamRow from './TeamRow'
import AddTeam from './TeamsFeatures/AddTeam'
import Loading from '~/components/Loading'

const TeamsMainPage = ({ visible, setVisible }) => {
    const isLoading = useSelector(teamsSelector).status
    const teams = useSelector(teamsSelector).teams

    const dispatch = useDispatch()

    const [filters, setFilters] = useState({
        name: ""
    })

    useEffect(() => {
        dispatch(getTeamList(filters))
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
                    Đội nhóm
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
                {
                    isLoading === "loading" ? (
                        <Loading />
                    ) : (
                        <ListGroup
                            className="mt-3"
                            variant="flush"
                        >
                            {
                                teams.map((team, index) => (
                                    <TeamRow
                                        key={index}
                                        teamInfo={team}
                                    />
                                ))
                            }
                        </ListGroup>
                    )
                }
            </Modal.Body>
        </Modal>
    )
}

export default TeamsMainPage