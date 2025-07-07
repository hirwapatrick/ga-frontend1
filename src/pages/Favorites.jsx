import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Button,
  Navbar,
  Nav,
  FormCheck,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTrash,
  faFilm,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { API_BASE } from "../config";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }
`;

const lightTheme = {
  body: "#f8f9fa",
  text: "#212529",
  cardBg: "#ffffff",
  cardText: "#495057",
  navbar: "#ffffff",
  footer: "#f8f9fa",
  accent: "#d4af37",
  secondary: "#6c757d",
  hover: "#f1f1f1",
  shadow: "rgba(0, 0, 0, 0.1)",
};

const darkTheme = {
  body: "#121212",
  text: "#e0e0e0",
  cardBg: "#1e1e1e",
  cardText: "#b0b0b0",
  navbar: "#1a1a1a",
  footer: "#121212",
  accent: "#d4af37",
  secondary: "#6c757d",
  hover: "#2a2a2a",
  shadow: "rgba(0, 0, 0, 0.3)",
};

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  color: ${({ theme }) => theme.text};

  .form-check-input {
    background-color: ${({ theme }) => theme.cardBg};
    border-color: ${({ theme }) => theme.accent};

    &:checked {
      background-color: ${({ theme }) => theme.accent};
      border-color: ${({ theme }) => theme.accent};
    }
  }
`;

const StyledCard = styled.div`
  .movie-card {
    width: 220px;
    height: 370px;
    background: ${({ theme }) => theme.cardBg};
    border-radius: 20px;
    overflow: hidden;
    color: ${({ theme }) => theme.text};
    transition: transform 0.3s;
    box-shadow: 0 0 12px ${({ theme }) => theme.shadow};
    border: 2px solid ${({ theme }) => theme.accent};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .movie-card:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px ${({ theme }) => theme.accent};
  }

  .card-img-top {
    border-radius: 20px 20px 0 0;
    height: 220px;
    object-fit: cover;
  }

  .card-body {
    padding: 0.75rem 1rem 1rem 1rem;
    text-align: center;
  }

  .card-title {
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-text {
    color: ${({ theme }) => theme.cardText};
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
  }
`;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

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
      <Navbar
        bg={darkMode ? "dark" : "light"}
        variant={darkMode ? "dark" : "light"}
        expand="md"
        className="mb-4"
        sticky="top"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src="./logo/logo.png" style={{ width: "80px", height: "80px" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={NavLink}
                to="/"
                end
                style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/favorites"
                style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}
              >
                Favorites
              </Nav.Link>

              <ToggleContainer>
                <FontAwesomeIcon
                  icon={darkMode ? faSun : faMoon}
                  className="me-2"
                  style={{ color: darkMode ? "gold" : "#6c757d" }}
                />
                <FormCheck
                  type="switch"
                  id="dark-mode-switch"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              </ToggleContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <h3 className="mb-4">
          <Link to="/" className="btn btn-sm btn-outline-warning me-3">
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </Link>
          My Favorite Movies
        </h3>

        {favorites.length === 0 ? (
          <p className="text-muted">You have no favorite movies yet.</p>
        ) : (
          <div className="d-flex flex-wrap" style={{ gap: "15px" }}>
            {favorites.map((movie) => (
              <StyledCard key={movie.id}>
                <div className="movie-card">
                  <Card.Img
                    variant="top"
                    src={
                      movie.movie_poster?.startsWith("http")
                        ? movie.movie_poster
                        : movie.movie_poster
                    }
                    alt={movie.title}
                    style={{ height: "220px", objectFit: "cover" }}
                    className="card-img-top"
                  />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                      {movie.genre} | {movie.release_year}
                    </Card.Text>
                    <Link to={`/movie/${movie.id}`}>
                      <Button size="sm" variant="light">
                        View Details
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="danger"
                      className="ms-2"
                      onClick={() => removeFavorite(movie.id)}
                      title="Remove from favorites"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
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
