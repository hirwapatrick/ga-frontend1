import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faEnvelope,
  faPhone,
  faLink,
  faAddressBook,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const FooterWrapper = styled.footer`
  background-color: ${({ theme, darkMode }) =>
    darkMode ? theme.navbar : "#f8f9fa"};
  color: ${({ theme, darkMode }) => (darkMode ? theme.text : "#212529")};
  padding: 2rem 0;
  margin-top: 4rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: ${({ darkMode }) =>
    darkMode
      ? "0 -5px 15px rgba(0, 0, 0, 0.3)"
      : "0 -5px 15px rgba(0, 0, 0, 0.1)"};

  a {
    color: ${({ darkMode }) => (darkMode ? "#d4af37" : "#d4a537")};
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: ${({ darkMode }) => (darkMode ? "#ffd700" : "#b8860b")};
    text-decoration: underline;
  }

  .footer-title {
    font-weight: bold;
    margin-bottom: 1rem;
    color: ${({ darkMode }) => (darkMode ? "#d4af37" : "#8b6914")};
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 
  }

  .copyright {
    border-top: 1px solid ${({ darkMode }) => (darkMode ? "#444" : "#dee2e6")};
    padding-top: 1rem;
    text-align: center;
    color: ${({ darkMode }) => (darkMode ? "#aaa" : "#6c757d")};
  }

  ul {
    padding-left: 0;
  }

  li {
    margin-bottom: 0.5rem;
    list-style: none;
  }

  p {
    margin-bottom: 0.5rem;
    color: ${({ theme, darkMode }) => (darkMode ? theme.cardText : "#6c757d")};
  }
`;

const Footer = ({ darkMode }) => {
  return (
    <FooterWrapper darkMode={darkMode}>
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="footer-title" style={{fontFamily: 'AmazObitaemOstrovBold,sans-serif'}}>
              <span><img src="./logo/logo.png" style={{ width: "80px", height: "80px" }}/></span> GETAGASOBANUYE
            </h5>
            <p>
              Your #1 destination for explained movies in Kinyarwanda. Watch,
              enjoy, and understand!
            </p>
          </Col>
          <Col md={4}>
            <h5 className="footer-title">
              <FontAwesomeIcon icon={faLink} className="me-2 text-warning" />
              Quick Links
            </h5>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
              <a href="https://amzn.to/3IK8qdU">
                About
              </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5 className="footer-title">
              <FontAwesomeIcon
                icon={faAddressBook}
                className="me-2 text-warning"
              />
              Contact Us
            </h5>
            <p>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="me-2 text-warning"
              />
              Email:{" "}
              <a href="mailto:patrickhirwa781@gmail.com">
                patrickhirwa781@gmail.com
              </a>
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="me-2 text-warning" />
              Phone: +250 795 217 927
            </p>
            <p>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="me-2 text-warning"
              />
              Location: Kigali, Rwanda
            </p>
          </Col>
        </Row>
        <div className="copyright mt-4">
          &copy; {new Date().getFullYear()} GetAgasobanuye. All rights reserved.
        </div>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
