"use client"

import React from 'react'
import "./component.css"

import {Button, Container,Form, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import Link from 'next/link';

const Header = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand href="#">
                        Role Based Authentication
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="m-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link className='nav-link text-dark ps-5' href="/">Home</Link>
                            <Link className='nav-link text-dark ps-5' href="/info">Info</Link>
                            <Link className='nav-link text-dark ps-5' href="/login">Login</Link>
                            <Link className='nav-link text-dark ps-5' href="/signup">SignUp</Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header