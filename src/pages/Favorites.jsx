import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTrash,
  faArrowRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

// Themes
const lightTheme = {
  body: "#f8f9fa",
  text: "#212529",
  cardBg: "#ffffff",
  cardText: "#495057",
  shadow: "rgba(0, 0, 0, 0.1)",
  accent: "#d4af37",
};

const darkTheme = {
  body: "#121212",
  text: "#ffffff",
  cardBg: "#1e1e1e",
  cardText: "#e0e0e0",
  shadow: "rgba(0, 0, 0, 0.3)",
  accent: "#f0c040",
};

// Global Styles
const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }
`;

// Styled Card Wrapper
const StyledCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding: 1rem;

  .movie-card {
    --white: hsl(0, 0%, 100%);
    --black: hsl(240, 15%, 9%);
    --paragraph: hsl(0, 0%, 83%);
    --line: hsl(240, 9%, 17%);
    --primary: hsl(189, 92%, 58%);

    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 19rem;
    background-color: hsla(240, 15%, 9%, 1);
    background-image: radial-gradient(
        at 88% 40%,
        hsla(240, 15%, 9%, 1) 0px,
        transparent 85%
      ),
      radial-gradient(at 49% 30%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
      radial-gradient(at 14% 26%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
      radial-gradient(at 0% 64%, hsl(189, 99%, 26%) 0px, transparent 85%),
      radial-gradient(at 41% 94%, hsl(189, 97%, 36%) 0px, transparent 85%),
      radial-gradient(at 100% 99%, hsl(188, 94%, 13%) 0px, transparent 85%);
    border-radius: 1rem;
    box-shadow: 0px -16px 24px 0px rgba(255, 255, 255, 0.25) inset;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  .movie-card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3), 0 0 25px rgba(0, 255, 255, 0.2);
  }

  .movie-card::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background-size: 400% 400%;
    border-radius: inherit;
    animation: flowing-border 8s linear infinite;
  }

  @keyframes flowing-border {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .card-img-top {
    border-radius: 1rem;
    height: 280px;
    object-fit: cover;
  }

  .card-body {
    text-align: center;
  }

  .card-title {
    font-size: 1rem;
    color: var(--white);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-text {
    color: var(--paragraph);
    font-size: 0.85rem;
  }

  .time-text {
    color: var(--paragraph);
    font-size: 0.75rem;
  }

  .btn-light {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: var(--white);
    background-image: linear-gradient(
      0deg,
      hsl(189, 92%, 58%),
      hsl(189, 99%, 26%) 100%
    );
    border: none;
    border-radius: 9999px;
    box-shadow: inset 0 -2px 25px -4px var(--white);
    transition: background 0.3s;
  }

  .btn-light:hover {
    background-image: linear-gradient(
      0deg,
      hsl(189, 100%, 70%),
      hsl(189, 100%, 35%) 100%
    );
    color: black;
  }

  .btn-danger {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    border-radius: 9999px;
  }
`;

const Favorites = ({ darkMode }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favoriteMovies");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((movie) => movie.id !== id);
    setFavorites(updated);
    localStorage.setItem("favoriteMovies", JSON.stringify(updated));
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />

      <Container className="py-4">
        <h3 className="mb-4" style={{ color: darkMode ? "gold" : "#d4af37" }}>
          <Link
            to="/"
            className="btn btn-sm me-3"
            style={{
              backgroundColor: darkMode ? "#1e293b" : "#ffffff",
              color: darkMode ? "gold" : "#d4af37",
              borderColor: darkMode ? "gold" : "#d4af37",
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Link>
          My Favorite Movies
        </h3>

        {favorites.length === 0 ? (
          <p className="text-muted">You have no favorite movies yet.</p>
        ) : (
          <div
            className="d-flex flex-wrap justify-content-center"
            style={{ gap: "20px" }}
          >
            {favorites.map((movie) => (
              <StyledCard key={movie.id}>
                <div className="movie-card">
                  <Card.Img
                    variant="top"
                    src={movie.movie_poster}
                    alt={movie.title}
                    className="card-img-top"
                  />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                      {movie.genre} | {movie.release_year}
                    </Card.Text>
                    {movie.uploaded && (
                      <Card.Text className="time-text">
                        <FontAwesomeIcon icon={faClock} className="me-1" />
                        {movie.uploaded}
                      </Card.Text>
                    )}
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/movie/${movie.id}`}>
                        <Button size="sm" variant="light">
                          Details <FontAwesomeIcon icon={faArrowRight} />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => removeFavorite(movie.id)}
                        title="Remove from favorites"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </Card.Body>
                </div>
              </StyledCard>
            ))}
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Favorites;
