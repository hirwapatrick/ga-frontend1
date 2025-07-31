// src/components/MainNav.jsx
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavbar = styled(Navbar)`
  background-color: #111 !important;
`;

const StyledLink = styled(NavLink)`
  color: #ffffff !important; /* white default */
  margin: 0 12px;
  padding: 8px 6px;
  font-weight: 500;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.03em;
  text-decoration: none;
  position: relative;
  transition: color 0.25s ease;

  &.active {
    font-weight: 700;
    color: #d4af37 !important; /* gold active */
  }

  &.active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 3px;
    background-color: #d4af37; /* gold underline */
    border-radius: 3px;
  }

  &:hover {
    color: #d4af37 !important; /* gold hover */
    text-decoration: none;
  }

  &:focus-visible {
    outline: 2px solid #d4af37;
    outline-offset: 2px;
  }
`;

function MainNav() {
  return (
    <StyledNavbar expand="lg" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo/logo.png"
            alt="Getagasobanuye Logo"
            style={{ height: "50px", width: "auto" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            <StyledLink to="/" end>
              Home
            </StyledLink>
            <StyledLink to="/genres">Genres</StyledLink>
            <StyledLink to="/favorites">Favorites</StyledLink>
            <StyledLink to="/about">About</StyledLink>
            <StyledLink to="/contact">Contact</StyledLink>
            <StyledLink to="/privacy-policy">Privacy Policy</StyledLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
}

export default MainNav;
