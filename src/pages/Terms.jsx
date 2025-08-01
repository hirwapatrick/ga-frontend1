import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGavel,
  faBook,
  faCopyright,
  faEdit,
  faBan,
  faExclamationTriangle,
  faSyncAlt,
  faBalanceScale,
} from "@fortawesome/free-solid-svg-icons";

const TermsContainer = styled.div`
  min-height: 100vh;
  padding: 3rem 1rem;
  position: relative;
  color: ${({ darkMode }) => (darkMode ? "#eee" : "#222")};
  background: ${({ darkMode }) => darkMode ? "rgba(18, 18, 18, 0.95)" : "rgba(255, 255, 255, 0.95)"};
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("/terms-bg.jpg");
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
    color: ${({ darkMode }) => (darkMode ? "#f0c040" : "#b8860b")};
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.5rem;
    position: relative;
    padding-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      height: 4px;
      background: ${({ darkMode }) => (darkMode ? "#f0c040" : "#b8860b")};
      border-radius: 2px;
    }
  }

  h2 {
    color: ${({ darkMode }) => (darkMode ? "#f0c040" : "#b8860b")};
    margin: 2.5rem 0 1.5rem;
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid ${({ darkMode }) => (darkMode ? "#444" : "#ddd")};

    svg {
      font-size: 1.5rem;
    }
  }

  h3 {
    margin: 2rem 0 1rem;
    color: ${({ darkMode }) => (darkMode ? "#ffdf6b" : "#8b7500")};
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    gap: 10px;

    svg {
      font-size: 1.2rem;
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
      color: ${({ darkMode }) => (darkMode ? "#f0c040" : "#b8860b")};
      font-weight: bold;
      font-size: 1.5rem;
      position: absolute;
      left: 0;
      top: -2px;
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

function Terms({ darkMode }) {
  return (
    <TermsContainer darkMode={darkMode}>
      <Content darkMode={darkMode}>
        <h1>
          <FontAwesomeIcon icon={faGavel} />
          Terms & Conditions
        </h1>

        <h2>Introduction</h2>
        <p>
          Welcome to GetAgasobanuye. By accessing or using this website, you agree
          to comply with and be bound by the following terms and conditions. If you
          disagree with any part of these terms, please do not use our site.
        </p>

        <h3>
          <FontAwesomeIcon icon={faBook} />
          1. Use of Website
        </h3>
        <p>
          You must be at least 10 years of age to use this website. You agree not
          to use the site for any unlawful purpose or any purpose prohibited under
          this clause. You agree not to:
        </p>
        <ul>
          <li>Violate any laws or regulations</li>
          <li>Post or transmit malicious content</li>
          <li>Infringe upon the rights of others</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Use automated systems to scrape or extract data</li>
        </ul>

        <h3>
          <FontAwesomeIcon icon={faCopyright} />
          2. Intellectual Property
        </h3>
        <p>
          All content, trademarks, logos, and intellectual property on this site
          are the property of GetAgasobanuye or its licensors. You may not reuse or
          distribute any material without explicit permission. Movie titles, images,
          and related content are used under fair use for commentary and education.
        </p>

        <h3>
          <FontAwesomeIcon icon={faEdit} />
          3. User Content
        </h3>
        <p>
          By submitting content (e.g. comments or reviews), you grant us a
          worldwide, non-exclusive, royalty-free license to use, modify, display,
          and distribute such content. You represent that you own or have the
          necessary rights to any content you submit.
        </p>

        <h3>
          <FontAwesomeIcon icon={faBan} />
          4. Termination
        </h3>
        <p>
          We reserve the right to suspend or terminate your access if we believe
          you have violated any of these Terms. We may remove any content that
          violates our policies without notice.
        </p>

        <h3>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          5. Limitation of Liability
        </h3>
        <p>
          GetAgasobanuye is not liable for any damages arising from the use of this
          website, including but not limited to data loss, system failures, or
          third-party activities. The site is provided "as is" without warranties
          of any kind.
        </p>

        <h3>
          <FontAwesomeIcon icon={faSyncAlt} />
          6. Changes to Terms
        </h3>
        <p>
          We may update these Terms from time to time. Continued use of the website
          signifies your acceptance of any changes made. We will notify users of
          significant changes through our website or email.
        </p>

        <h3>
          <FontAwesomeIcon icon={faBalanceScale} />
          7. Governing Law
        </h3>
        <p>
          These Terms are governed by the laws of Rwanda. Any disputes will be
          subject to the exclusive jurisdiction of courts located in Kigali,
          Rwanda.
        </p>

        <p className="last-updated">
          Last updated: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </Content>
    </TermsContainer>
  );
}

export default Terms;