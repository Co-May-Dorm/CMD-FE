import clsx from 'clsx'
import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import AddProposalType from './ProposalTypesFeatures/AddProposalType'

const ProposalTypesMainPage = props => {
  return (
    <Container fluid>
        <Container fluid>
            <div className="row justify-content-xl-between justify-content-end align-items-center">
                <div className="col-auto fw-bolder fs-5 mb-xl-0 mb-3">
                    LOẠI ĐỀ XUẤT
                </div>
                <div className="col" />
                <div className="col-auto mb-xl-0 mb-3 d-sm-block d-none">
                    <AddProposalType />
                </div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
                <NavLink to="/configs/proposal-types" end>
                    {
                        ({ isActive }) => <Button className="col-auto m-1" variant={clsx({ "primary": isActive, "outline-primary": !isActive })}>
                            Loại đề xuất
                        </Button>
                    }
                </NavLink>
            </div>
            <hr />
        </Container>
        <Container fluid>

        </Container>
        </Container>
  )
}

export default ProposalTypesMainPage