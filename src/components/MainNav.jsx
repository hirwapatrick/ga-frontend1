import React from "react";
import { Navbar, Nav, Container, FormCheck } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faStar,
  faInfoCircle,
  faEnvelope,
  faSun,
  faMoon,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

const StyledNavbar = styled(Navbar)`
  background-color: ${({ darkMode }) =>
    darkMode ? "#111" : "#f8f9fa"} !important;
  transition: background-color 0.3s ease;
`;

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#333")} !important;
  margin: 0 12px;
  padding: 8px 6px;
  font-weight: 500;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.03em;
  text-decoration: none;
  position: relative;
  transition: color 0.25s ease;

  svg {
    margin-right: 6px;
    font-size: 18px;
  }

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

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#333")};

  .form-check-input {
    background-color: ${({ darkMode }) => (darkMode ? "#111" : "#f8f9fa")};
    border-color: #d4af37;

    &:checked {
      background-color: #d4af37;
      border-color: #d4af37;
    }
  }
`;

const MainNav = ({ darkMode, setDarkMode }) => {
  return (
    <StyledNavbar
      expand="lg"
      variant={darkMode ? "dark" : "light"}
      sticky="top"
      darkMode={darkMode}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo/logo.png"
            alt="Getagasobanuye Logo"
            style={{ height: "80px", width: "auto" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <StyledLink to="/" end darkMode={darkMode}>
              <FontAwesomeIcon icon={faHome} />
              Home
            </StyledLink>
            <StyledLink to="/favorites" darkMode={darkMode}>
              <FontAwesomeIcon icon={faStar} />
              Favorites
            </StyledLink>
            <StyledLink to="/about" darkMode={darkMode}>
              <FontAwesomeIcon icon={faInfoCircle} />
              About
            </StyledLink>
            <StyledLink to="/contact" darkMode={darkMode}>
              <FontAwesomeIcon icon={faEnvelope} />
              Contact
            </StyledLink>

            {/* Dark mode toggle */}
            <ToggleContainer darkMode={darkMode}>
              <FormCheck
                type="switch"
                id="dark-mode-switch"
                label={
                  darkMode ? (
                    <FontAwesomeIcon
                      icon={faSun}
                      style={{ color: "#d4af37" }}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faMoon} style={{ color: "#333" }} />
                  )
                }
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </ToggleContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
}

export default MainNav;
