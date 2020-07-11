import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    CustomInput } from 'reactstrap';
import useDarkMode from 'use-dark-mode';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const darkMode = useDarkMode(false);

    return <Navbar light expand="md">
    <NavbarBrand href="/">Weather App</NavbarBrand>
    <NavbarToggler onClick={()=>setIsOpen(!isOpen)} />
    <Collapse isOpen={isOpen} navbar>
        <CustomInput type="switch" id="exampleCustomSwitch2" name="customSwitch" label="Toggle Dark Mode" checked={darkMode.value} onChange={darkMode.toggle}/>
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