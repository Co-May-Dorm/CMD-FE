import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import AppNavbarNav from './AppNavbarNav'
import AppHeaderDropdown from './header/AppHeaderDropdown'
import logo from "../assets/brand/logo-full.png"
import { NavLink } from 'react-router-dom'

const AppHeader = () => {

    return (
        <Navbar
            id="navbarHeader"
            bg="light"
            expand="lg"
            sticky="top"
        >
            <Container fluid>
                <Navbar.Brand>
                    <NavLink to="/">
                        <img
                            src={logo}
                            width="120"
                            height="50"
                            className="d-inline-block align-top"
                            alt="Cảnh Báo Sớm Logo"
                        />
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <AppNavbarNav />
                    <AppHeaderDropdown />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppHeader
