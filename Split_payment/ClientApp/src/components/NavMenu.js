import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export const NavMenu = ({ role, setRole, approved }) => {

    const LogOut = async () => {
        await fetch("http://localhost:5000/api/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        });
        setRole(' ');
    }

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                <Container>
                    <NavbarBrand tag={Link} to="/">Split payment</NavbarBrand>
                    {(role === undefined || role === ' ') && (
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/sign-in">Sign In</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/sign-up">Sign Up</NavLink>
                            </NavItem>
                        </ul>
                    )}
                    {role === 'owner' && (
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/create-invoice">Invoices</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/apartments">Apartments</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/user-list">Tenants List</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/" onClick={LogOut}>Log Out</NavLink>
                            </NavItem>
                        </ul>
                    )}
                    {(role === 'user' && approved === 'approved') && (
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/invoices">Invoices</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/" onClick={LogOut}>Log Out</NavLink>
                            </NavItem>
                        </ul>
                    )}
                    {(role === 'user' && approved !== 'approved') && (
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/" onClick={LogOut}>Log Out</NavLink>
                            </NavItem>
                        </ul>
                    )}
                </Container>
            </Navbar>
        </header>
    );
}
