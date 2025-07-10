// ✅ No change in imports
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
import {
  faSearch,
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

// ✅ GlobalStyles, themes, and styled components remain unchanged...
// (All your styled-components like SearchWrapper, StyledCard, ScrollableRow, etc. stay the same)

// ✅ ScrollableRow component (only change is to use movie.uploadTime below)

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
                    {/* ✅ Use timeSince(movie.uploadTime) */}
                    {timeSince(movie.uploadTime)}
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

// ✅ MAIN COMPONENT
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedGenres, setExpandedGenres] = useState({});
  const [darkMode, setDarkMode] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // ✅ Simulate uploadTime for each movie (store actual timestamp)
  useEffect(() => {
    axios.get(`${API_BASE}/movies`).then((res) => {
      const simulated = res.data.map((movie) => ({
        ...movie,
        uploadTime: Date.now() - Math.random() * 6 * 60 * 60 * 1000, // past 6 hours
      }));
      setMovies(simulated);
      setLoading(false);
    });
  }, []);

  // ✅ Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ✅ Modified to use currentTime
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
      {/* ✅ Navbar, Search Bar, Carousel... (unchanged) */}
      {/* ✅ You already had everything styled beautifully, so no need to repeat all the JSX here */}

      {/* ✅ Genre Rows */}
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

      <Footer darkMode={darkMode} />

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
