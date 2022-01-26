import React from 'react';
import {Navbar, Container, Nav, Button, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom'

import './navbar-view.scss';

export function NavBarView() {
    const user= localStorage.getItem('user');

    const onLoggedOut = () => {
        localStorage.clear();
        window.open('/', '_self');
    };

    return (
        <Navbar className='navbar' variant='dark' expand='lg md'>
            <Container fluid>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                
                <Navbar.Collapse>
                    <Nav className= 'me-auto navbar-menu'>
                        <Link to= {`/users/${user}`}>
                            <NavItem style= {{color: 'black'}} href=''>
                                User Profile
                            </NavItem>
                        </Link>
                    
                        <NavItem style= {{color: 'white', paddingLeft: '25px'}}>
                            <p>(Logged in as: <Link to= {`/users/${user}`}> {user}</Link> ) </p>
                        </NavItem>
                    </Nav>
                    <Nav.Link className='d-flex'>
                        <Button variant='outline-primary' className='btn-outline-primary' onClick={onLoggedOut}>Logout</Button>
                    </Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}