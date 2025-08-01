import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilm,
  faGlobe,
  faLanguage,
  faUsers,
  faHeart,
  faComments,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const AboutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  color: ${({ darkMode }) => (darkMode ? "#eee" : "#222")};
`;

const Content = styled.div`
  max-width: 900px;
  text-align: center;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: ${({ darkMode }) =>
    darkMode
      ? "0 4px 20px rgba(255, 215, 55, 0.3)"
      : "0 4px 20px rgba(0, 0, 0, 0.1)"};
  background-color: ${({ darkMode }) => 
    darkMode ? "rgba(30, 30, 30, 0.85)" : "rgba(250, 250, 250, 0.85)"};
  backdrop-filter: blur(8px);
  border: 1px solid ${({ darkMode }) => (darkMode ? "#333" : "#ddd")};
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")},
      ${({ darkMode }) => (darkMode ? "#ff6b6b" : "#ff8e8e")},
      ${({ darkMode }) => (darkMode ? "#4ecdc4" : "#88d8b0")}
    );
  }

  h2 {
    color: ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")};
    margin-bottom: 1.5rem;
    font-size: 2.2rem;
    position: relative;
    display: inline-block;

    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")};
      border-radius: 3px;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
    text-align: left;
    display: flex;
    align-items: flex-start;
    position: relative;
    padding-left: 10px;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 8px;
      bottom: 8px;
      width: 3px;
      background: ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")};
      border-radius: 3px;
    }
  }

  .icon {
    margin-right: 15px;
    color: ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")};
    font-size: 1.3rem;
    margin-top: 3px;
    min-width: 24px;
    text-align: center;
  }

  strong {
    color: ${({ darkMode }) => (darkMode ? "#f0c040" : "#d4af37")};
  }
`;

function About({ darkMode }) {
  return (
    <AboutContainer darkMode={darkMode}>
      <Content darkMode={darkMode}>
        <h2>
          <FontAwesomeIcon 
            icon={faFilm} 
            style={{ 
              marginRight: "12px",
              filter: `drop-shadow(0 0 4px ${darkMode ? "rgba(240, 192, 64, 0.5)" : "rgba(212, 175, 55, 0.5)"})`
            }} 
          />
          About GetAgasobanuye
        </h2>
        <p>
          <span className="icon">
            <FontAwesomeIcon 
              icon={faStar} 
              style={{
                filter: `drop-shadow(0 0 2px ${darkMode ? "rgba(240, 192, 64, 0.5)" : "rgba(212, 175, 55, 0.5)"})`
              }}
            />
          </span>
          <span>
            <strong>GetAgasobanuye</strong> is a movie platform created with the
            aim of making global and local cinema more understandable and
            accessible to everyone, especially Kinyarwanda speakers.
          </span>
        </p>
        <p>
          <span className="icon">
            <FontAwesomeIcon 
              icon={faGlobe} 
              style={{
                filter: `drop-shadow(0 0 2px ${darkMode ? "rgba(240, 192, 64, 0.5)" : "rgba(212, 175, 55, 0.5)"})`
              }}
            />
          </span>
          <span>
            We provide detailed movie summaries, trailers, and viewer
            discussions for films from around the world. Whether you're catching
            up on Hollywood, Nollywood, or Rwandan movies — GetAgasobanuye gives
            you the highlights before you press play.
          </span>
        </p>
        <p>
          <span className="icon">
            <FontAwesomeIcon 
              icon={faLanguage} 
              style={{
                filter: `drop-shadow(0 0 2px ${darkMode ? "rgba(240, 192, 64, 0.5)" : "rgba(212, 175, 55, 0.5)"})`
              }}
            />
          </span>
          <span>
            Our summaries are written in simple language, helping both young
            viewers and adults grasp complex plots. We believe in inclusive
            storytelling and helping people save time by understanding a movie
            before watching it.
          </span>
        </p>
        <p>
          <span className="icon">
            <FontAwesomeIcon 
              icon={faHeart} 
              style={{
                filter: `drop-shadow(0 0 2px ${darkMode ? "rgba(240, 192, 64, 0.5)" : "rgba(212, 175, 55, 0.5)"})`,
                color: darkMode ? "#ff6b6b" : "#ff8e8e"
              }}
            />
          </span>
          <span>
            Users can create favorites, comment on movies, and stay up to date
            with trending or newly added films. We continuously curate and update
            our content to offer a high-quality viewing guide.
          </span>
        </p>
        <p>
          <span className="icon">
            <FontAwesomeIcon 
              icon={faUsers} 
              style={{
                filter: `drop-shadow(0 0 2px ${darkMode ? "rgba(240, 192, 64, 0.5)" : "rgba(212, 175, 55, 0.5)"})`,
                color: darkMode ? "#4ecdc4" : "#88d8b0"
              }}
            />
          </span>
          <span>
            GetAgasobanuye is more than a movie listing website — it's a{" "}
            <strong>community</strong> of movie lovers who want to share,
            understand, and enjoy stories that matter.
          </span>
        </p>
        <p>
          <span className="icon">
            <FontAwesomeIcon 
              icon={faComments} 
              style={{
                filter: `drop-shadow(0 0 2px ${darkMode ? "rgba(240, 192, 64, 0.5)" : "rgba(212, 175, 55, 0.5)"})`
              }}
            />
          </span>
          <span>
            If you love films and want to dive deeper into the stories behind
            them in a language you understand, you're in the right place!
          </span>
        </p>
      </Content>
    </AboutContainer>
  );
}

export default About;