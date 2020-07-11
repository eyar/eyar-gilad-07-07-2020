import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    ButtonToggle } from 'reactstrap';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    return <Navbar color="light" light expand="md">
    <NavbarBrand href="/">Weather App</NavbarBrand>
    <NavbarToggler onClick={()=>setIsOpen(!isOpen)} />
    <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink href="/" >Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/favorites">Favorites</NavLink>
            </NavItem>
        </Nav>
    </Collapse>
    </Navbar>
}

export default Navigation