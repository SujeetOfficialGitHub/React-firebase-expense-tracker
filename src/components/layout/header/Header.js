import React, {useState} from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { logout } from '../../../app/features/authSlice';

const Header = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    
    const dispatch = useDispatch();

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const handleNavLinkClick = () => {
        setIsNavbarOpen(false);
    };
    const logoutHandler = async() => {
        setIsNavbarOpen(false);
        dispatch(logout());


    }
    return (
    <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        data-bs-theme="dark"
        expanded={isNavbarOpen}
        >
        <Container>
            <Navbar.Brand href="/" className="fs-3">Expense Tracker</Navbar.Brand>
            <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={toggleNavbar}
            />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <NavLink
                    to="/"
                    className="nav-link fs-4"
                    onClick={handleNavLinkClick}
                >
                    Home
                </NavLink>
            </Nav>
            <Nav>
                {isLoggedIn ? (
                    <>
                    <NavLink
                        to="/profile"
                        className="nav-link fs-4"
                        onClick={handleNavLinkClick}
                    >
                        Profile
                    </NavLink>
                    <Button className="fs-4" onClick={logoutHandler}>
                        Logout
                    </Button>
                    </>

                ) : (
                    <>
                    <NavLink
                        to="/login"
                        className="nav-link fs-4"
                        onClick={handleNavLinkClick}
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/signup"
                        className="nav-link fs-4"
                        onClick={handleNavLinkClick}
                    >
                        Sign Up
                    </NavLink>
                    </>
                )}

                    
                
 
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>

    )
}

export default Header