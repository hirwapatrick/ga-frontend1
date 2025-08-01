import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ContactContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  color: ${({ darkMode }) => (darkMode ? "#eee" : "#222")};
  background: ${({ darkMode }) => darkMode ? "rgba(18, 18, 18, 0.9)" : "rgba(255, 255, 255, 0.9)"};
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("/contact-bg.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    opacity: ${({ darkMode }) => (darkMode ? 0.2 : 0.1)};
    z-index: -1;
    filter: ${({ darkMode }) => darkMode ? "brightness(0.7) contrast(1.2)" : "brightness(1)"};
  }
`;

const Content = styled.div`
  max-width: 800px;
  width: 90%;
  text-align: center;
  border-radius: 16px;
  padding: 3rem 2rem;
  background-color: ${({ darkMode }) => 
    darkMode ? "rgba(30, 30, 30, 0.85)" : "rgba(250, 250, 250, 0.85)"};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ darkMode }) => (darkMode ? "#444" : "#ddd")};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }

  h2 {
    color: ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")};
    margin-bottom: 1.5rem;
    font-size: 2.5rem;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")};
      border-radius: 2px;
    }
  }

  p.lead {
    font-size: 1.2rem;
    margin-bottom: 2.5rem;
    color: ${({ darkMode }) => (darkMode ? "#bbb" : "#555")};
    line-height: 1.6;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0 auto;
    max-width: 500px;
  }

  li {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-size: 1.1rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateX(5px);
    }

    a {
      color: inherit;
      text-decoration: none;
      transition: color 0.3s ease;
      display: flex;
      align-items: center;
      gap: 10px;

      &:hover {
        color: ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")};
      }
    }
  }

  .icon {
    font-size: 1.5rem;
    color: ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")};
    min-width: 30px;
    text-align: center;
  }

  .whatsapp {
    color: #25D366;
  }
`;

function Contact({ darkMode }) {
  return (
    <ContactContainer darkMode={darkMode}>
      <Content darkMode={darkMode}>
        <h2>
          <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: "15px" }} />
          Contact Us
        </h2>
        <p className="lead">
          Have questions or feedback? We'd love to hear from you! Reach out through any of these channels.
        </p>
        <ul>
          <li>
            <a href="mailto:patrickhirwa781@gmail.com">
              <span className="icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              patrickhirwa781@gmail.com
            </a>
          </li>
          <li>
            <a href="tel:+250728549831">
              <span className="icon">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              +250 728 549 831
            </a>
          </li>
          <li>
            <a href="https://wa.me/250795217927" target="_blank" rel="noopener noreferrer">
              <span className="icon whatsapp">
                <FontAwesomeIcon icon={faWhatsapp} />
              </span>
              WhatsApp Chat
            </a>
          </li>
          <li>
            <span className="icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </span>
            <span>Rubavu, Rwanda</span>
          </li>
        </ul>
      </Content>
    </ContactContainer>
  );
}

export default Contact;