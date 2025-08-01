import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faInfoCircle,
  faCookieBite,
  faLock,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";

const PolicyContainer = styled.div`
  min-height: 100vh;
  padding: 3rem 1rem;
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
    background-image: url("/policy-bg.jpg");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    opacity: ${({ darkMode }) => (darkMode ? 0.15 : 0.1)};
    z-index: -1;
    filter: ${({ darkMode }) => darkMode ? "brightness(0.7)" : "brightness(1)"};
  }
`;

const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem;
  background-color: ${({ darkMode }) => 
    darkMode ? "rgba(30, 30, 30, 0.9)" : "rgba(250, 250, 250, 0.95)"};
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  border: 1px solid ${({ darkMode }) => (darkMode ? "#444" : "#ddd")};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  h1 {
    color: ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")};
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    position: relative;
    padding-bottom: 1rem;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 4px;
      background: ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")};
      border-radius: 2px;
    }
  }

  h2 {
    color: ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")};
    margin: 2.5rem 0 1.5rem;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.8rem;

    svg {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    text-align: justify;
  }

  ul {
    margin: 1.5rem 0;
    padding-left: 2rem;
    list-style-type: none;
  }

  li {
    margin-bottom: 1rem;
    position: relative;
    padding-left: 2rem;
    line-height: 1.6;

    &::before {
      content: "•";
      color: ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")};
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
      position: absolute;
      left: 0;
    }
  }

  .last-updated {
    text-align: right;
    font-style: italic;
    color: ${({ darkMode }) => (darkMode ? "#aaa" : "#666")};
    margin-top: 3rem;
    font-size: 0.9rem;
  }
`;

function PrivacyPolicy({ darkMode }) {
  return (
    <PolicyContainer darkMode={darkMode}>
      <Content darkMode={darkMode}>
        <h1>Privacy Policy</h1>
        
        <h2>
          <FontAwesomeIcon icon={faShieldAlt} />
          Data Collection
        </h2>
        <p>
          At GetAgasobanuye, we are committed to protecting your privacy. This policy
          outlines how we collect, use, and safeguard your personal information.
        </p>
        <p>
          We do not collect personal data without your consent. Any data collected
          through forms or cookies is used solely to improve your experience.
        </p>

        <h2>
          <FontAwesomeIcon icon={faInfoCircle} />
          Disclaimer
        </h2>
        <p>
          GetAgasobanuye provides movie summaries and commentary purely for
          educational and informational purposes. We are not affiliated with or
          endorsed by any movie production companies. All trademarks, movie titles,
          and images are the property of their respective owners.
        </p>
        <p>
          We strive for accuracy, but we do not guarantee the completeness or
          reliability of content on this website.
        </p>

        <h2>
          <FontAwesomeIcon icon={faCookieBite} />
          Cookie Policy
        </h2>
        <p>
          We use cookies to:
        </p>
        <ul>
          <li>Understand user preferences</li>
          <li>Improve website performance</li>
          <li>Analyze traffic and usage patterns</li>
          <li>Remember your dark/light mode preference</li>
        </ul>
        <p>
          You may control or disable cookies via your browser settings. Please note
          that some features may not work properly without cookies.
        </p>

        <h2>
          <FontAwesomeIcon icon={faLock} />
          Data Protection
        </h2>
        <p>
          We ensure any personal information you provide is stored securely using
          industry-standard encryption. We do not share your information with third
          parties except when legally required.
        </p>
        <p>
          If you request deletion of your data or have privacy-related questions,
          you can contact us through our contact page.
        </p>

        <h2>
          <FontAwesomeIcon icon={faSyncAlt} />
          Policy Updates
        </h2>
        <p>
          We may update this Privacy Policy occasionally. Changes will be posted
          here, and by continuing to use the site, you accept those changes.
        </p>

        <p className="last-updated">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </Content>
    </PolicyContainer>
  );
}

export default PrivacyPolicy;