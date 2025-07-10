import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Card,
  Button,
  Navbar,
  Nav,
  Spinner,
  OverlayTrigger,
  Tooltip,
  FormCheck,
  Carousel,
} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Footer from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faArrowRight,
  faFilm,
  faChevronLeft,
  faChevronRight,
  faStar as faSolidStar,
  faSun,
  faMoon,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { useFavorites } from "../context/FavoritesContext";
import { API_BASE } from "../config";

// Global styles for light/dark mode
const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }
  input.dark-placeholder::placeholder {
    color: white;
    opacity: 1;
  }
  input.light-placeholder::placeholder {
    color: black;
    opacity: 1;
  }
`;

// Light and dark themes
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

// Styled Components

const SearchWrapper = styled.div`
  position: relative;
  max-width: 400px;
  margin: auto;

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.text};
    opacity: 0.6;
    pointer-events: none;
  }

  input.form-control {
    padding-left: 2.2rem !important;
  }
`;

const SearchResults = styled.ul`
  list-style: none;
  background: ${({ theme }) => theme.cardBg};
  max-width: 400px;
  margin: 0 auto;
  padding: 0;
  border-radius: 15px 15px 10px 10px;
  box-shadow: 0 5px 15px ${({ theme }) => theme.shadow};
  position: absolute;
  width: 100%;
  z-index: 10;
  max-height: 300px;
  overflow-y: scroll;
  border: 1px solid ${({ theme }) => theme.secondary};

  li {
    padding: 8px 12px;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.secondary};
    background: ${({ theme }) => theme.cardBg};

    &:hover {
      background: ${({ theme }) => theme.hover};
    }
  }
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.accent};
  user-select: none;
`;

const ScrollContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  padding: 0 3rem;
  gap: 15px;
  overflow-x: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 0px;
    background: transparent;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

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
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding: 2rem 1rem;

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
    height: 200px;
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
`;

const BackToTopButton = styled(Button)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.5rem;
  display: ${({ show }) => (show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.accent};
  color: #121212;
  border: none;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.5);
  cursor: pointer;

  &:hover {
    background-color: #f59e0b;
    color: #121212;
  }
`;


const ScrollableRow = ({ movies }) => {
  const scrollRef = useRef();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const scroll = (direction) => {
    const amount = direction === "right" ? 200 : -200;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scroll("right");
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="position-relative">
      <Button
        variant="outline-primary"
        onClick={() => scroll("left")}
        style={{
          position: "absolute",
          left: 0,
          top: "35%",
          zIndex: 5,
          backgroundColor: "transparent",
          borderColor: "gold",
          color: "gold",
        }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>

      <ScrollContainer ref={scrollRef}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <StyledCard>
              <div className="movie-card">
                <Card.Img
                  variant="top"
                  src={movie.movie_poster}
                  alt={movie.title}
                  className="card-img-top"
                  style={{
                    borderRadius: "1rem",
                    height: "280px",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    transform: "scale(1)",
                  }}
                />

                <Card.Body>
                  <Card.Title>
                    {movie.title}{" "}
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip>
                          {isFavorite(movie.id)
                            ? "Remove from Favorites"
                            : "Add to Favorites"}
                        </Tooltip>
                      }
                    >
                      <FontAwesomeIcon
                        icon={isFavorite(movie.id) ? faSolidStar : faRegularStar}
                        style={{
                          cursor: "pointer",
                          color: isFavorite(movie.id) ? "gold" : "currentColor",
                          marginLeft: 8,
                        }}
                        onClick={() => toggleFavorite(movie)}
                      />
                    </OverlayTrigger>
                  </Card.Title>
                  <Card.Text>
                    {movie.genre} | {movie.release_year}
                  </Card.Text>
                  <Card.Text className="time-text">
                    <FontAwesomeIcon icon={faClock} className="me-1" />
                    {movie.uploaded}
                  </Card.Text>
                  <Link to={`/movie/${movie.id}`}>
                    <Button size="sm" variant="light">
                      Details <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                  </Link>
                </Card.Body>
              </div>
            </StyledCard>
          </div>
        ))}
      </ScrollContainer>

      <Button
        variant="outline-primary"
        onClick={() => scroll("right")}
        style={{
          position: "absolute",
          right: 0,
          top: "35%",
          zIndex: 5,
          backgroundColor: "transparent",
          borderColor: "gold",
          color: "gold",
        }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </div>
  );
};

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedGenres, setExpandedGenres] = useState({});
  const [darkMode, setDarkMode] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Function to convert elapsed ms to a "time ago" string
  const timeSince = (uploadTime) => {
    const seconds = Math.floor((currentTime - uploadTime) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  };

  useEffect(() => {
      axios.get(`${API_BASE}/movies`).then((res) => {
        const now = Date.now();
        const updatedMovies = res.data.map((movie) => {
          const uploadTime = Date.parse(movie.created_at); // use actual created_at
          return {
            ...movie,
            uploadTime,
            uploaded: timeSince(uploadTime),
          };
        });
        setMovies(updatedMovies);
        setLoading(false);
      });
  }, []);

  // Update currentTime every minute, to refresh "time ago"
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Update uploaded times when currentTime changes
  useEffect(() => {
    setMovies((prev) =>
      prev.map((movie) => ({
        ...movie,
        uploaded: timeSince(movie.uploadTime),
      }))
    );
  }, [currentTime]);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const toggleGenreExpansion = (genre) => {
    setExpandedGenres((prev) => ({
      ...prev,
      [genre]: !prev[genre],
    }));
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const latestMovies = [...filteredMovies].slice(0, 10);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" variant="warning">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

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
            <Logo>
              <img
                src="./logo/logo.png"
                alt="Logo"
                style={{ width: "80px", height: "80px" }}
              />
            </Logo>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
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

      <Container style={{ position: "relative" }}>
        <h2
          className="text-center mb-4"
          style={{
            color: darkMode ? "gold" : "#d4af37",
            fontFamily: "AmazObitaemOstrovBold,sans-serif",
          }}
        >
          <img
            src="./logo/logo.png"
            alt="Logo"
            style={{ width: "70px", height: "70px" }}
          />
          GETAGASOBANUYE
        </h2>
        <Form
          className="mb-3"
          style={{ maxWidth: "400px", margin: "auto", position: "relative" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <SearchWrapper>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <Form.Control
              type="text"
              placeholder="Search movies..."
              className={darkMode ? "dark-placeholder" : "light-placeholder"}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(true);
              }}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              onFocus={() => setShowResults(true)}
              style={{
                backgroundColor: darkMode ? "#1e293b" : "#ffffff",
                color: darkMode ? "#f1f5f9" : "#1e293b",
                borderColor: darkMode ? "#334155" : "#ced4da",
                transition: "all 0.3s ease-in-out",
                boxShadow: darkMode ? "0 0 8px #00ffe0" : "0 0 6px #00c3ff",
              }}
            />
          </SearchWrapper>

          {showResults && searchTerm && (
            <SearchResults>
              {filteredMovies.length > 0 ? (
                filteredMovies.slice(0, 8).map((movie) => (
                  <li key={movie.id}>
                    <Link
                      to={`/movie/${movie.id}`}
                      style={{
                        color: darkMode ? "#e0e0e0" : "#212529",
                        textDecoration: "none",
                      }}
                    >
                      <img
                        src={movie.movie_poster}
                        alt={movie.title}
                        style={{
                          width: 40,
                          height: 30,
                          marginRight: 8,
                          verticalAlign: "middle",
                          borderRadius: 4,
                        }}
                      />
                      {movie.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li
                  style={{
                    padding: "12px",
                    color: darkMode ? "#aaa" : "#6c757d",
                    textAlign: "center",
                  }}
                >
                  No movies found
                </li>
              )}
            </SearchResults>
          )}
        </Form>

        {/* Top 5 Movies Slideshow */}
        <Carousel fade className="mb-5">
          {filteredMovies.slice(0, 5).map((movie) => (
            <Carousel.Item key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  className="d-block w-100"
                  src={movie.movie_poster}
                  alt={movie.title}
                  style={{
                    maxHeight: "500px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />
                <Carousel.Caption>
                  <h5
                    style={{
                      color: "gold",
                      textShadow: "1px 1px 4px black",
                      fontSize: "3rem",
                    }}
                  >
                    {movie.title}
                  </h5>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Latest Movies */}
        <h4
          className="mb-3 d-flex align-items-center gap-2"
          style={{ color: darkMode ? "gold" : "#d4af37" }}
        >
          Latest Movies <FontAwesomeIcon icon={faClock} />
        </h4>
        <ScrollableRow movies={latestMovies} />

        {/* Genre Rows */}
        {Object.entries(
          filteredMovies.reduce((acc, movie) => {
            if (!acc[movie.genre]) acc[movie.genre] = [];
            acc[movie.genre].push(movie);
            return acc;
          }, {})
        ).map(([genre, genreMovies]) => (
          <div key={genre} className="mb-5">
            <h5
              className="mb-3 d-flex align-items-center gap-2"
              style={{ color: darkMode ? "gold" : "#d4af37" }}
            >
              {genre} <FontAwesomeIcon icon={faFilm} />
            </h5>
            <ScrollableRow
              movies={
                expandedGenres[genre] ? genreMovies : genreMovies.slice(0, 10)
              }
            />
            {genreMovies.length > 10 && (
              <div className="text-center mt-2">
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => toggleGenreExpansion(genre)}
                >
                  {expandedGenres[genre] ? "View Less" : "View More"}
                </Button>
              </div>
            )}
          </div>
        ))}
      </Container>
      <Footer darkMode={darkMode} />

      {/* Back to Top Button */}
      <BackToTopButton
        show={showBackToTop}
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </BackToTopButton>
    </ThemeProvider>
  );
};

export default Home;
