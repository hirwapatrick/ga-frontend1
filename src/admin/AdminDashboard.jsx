import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHome, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  Button,
  Modal,
  Form,
  ListGroup,
  Spinner,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../config";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [posterFile, setPosterFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState(null);
  const [currentMovie, setCurrentMovie] = useState({
    id: null,
    title: "",
    genre: "",
    release_year: "",
    description: "",
    trailer_url: "",
    video_url: "",
    download_url: "",
    movie_poster: "",
  });
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const genresList = [
    "Action Movies",
    "Horror Movies",
    "Comedy Movies",
    "Drama Movies",
    "Indian Movies",
    "Romance Movies",
    "Cartoon Movies",
    "Seasonal Movies",
    "Adventure Movies",
    "Animation Movies",
    "Crime Movies",
    "Documentary Movies",
    "Family Movies",
    "Fantasy Movies",
    "History Movies",
    "Music Movies",
    "Mystery Movies",
    "Science Fiction Movies",
    "Thriller Movies",
    "War Movies",
    "Western Movies",
  ];

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/admin-login");
    } else {
      fetchMovies();
    }
  }, []);

  const fetchMovies = async () => {
    setLoadingMovies(true);
    try {
      const res = await axios.get(`${API_BASE}/movies`);
      setMovies(res.data);
    } catch {
      alert("Failed to load movies");
    }
    setLoadingMovies(false);
  };

  const openMovieModal = (mode, movie = null) => {
    setModalMode(mode);

    if (mode === "edit" && movie) {
      setCurrentMovie(movie);
      setPosterPreview(movie.movie_poster || null);
    } else {
      setCurrentMovie({
        id: null,
        title: "",
        genre: "",
        release_year: "",
        description: "",
        trailer_url: "",
        video_url: "",
        download_url: "",
        movie_poster: "",
      });
      setPosterPreview(null);
    }

    setPosterFile(null);
    setShowMovieModal(true);
  };

  const closeMovieModal = () => {
    setShowMovieModal(false);
    setPosterPreview(null);
  };

  const handleMovieChange = (e) => {
    const { name, value } = e.target;
    setCurrentMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleMovieSubmit = async () => {
    const {
      id,
      title,
      genre,
      release_year,
      description,
      trailer_url,
      video_url,
      download_url,
    } = currentMovie;

    if (!title || !genre || !release_year || !description || !trailer_url || !video_url) {
      alert("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("release_year", release_year);
    formData.append("description", description);
    formData.append("trailer_url", trailer_url);
    formData.append("video_url", video_url);
    formData.append("download_url", download_url || "");
    if (posterFile) formData.append("movie_poster", posterFile);

    try {
      if (modalMode === "add") {
        await axios.post(`${API_BASE}/movies`, formData);
        alert("Movie added successfully");
      } else {
        await axios.put(`${API_BASE}/movies/${id}`, formData);
        alert("Movie updated successfully");
      }
      fetchMovies();
      closeMovieModal();
    } catch {
      alert("Failed to save movie");
    }
  };

  const handleMovieDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await axios.delete(`${API_BASE}/movies/${id}`);
      fetchMovies();
    } catch {
      alert("Failed to delete movie");
    }
  };

  const openCommentsModal = async (movie) => {
    setSelectedMovie(movie);
    setShowCommentsModal(true);
    setCommentsLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/movies/${movie.id}/comments`);
      setComments(res.data);
    } catch {
      alert("Failed to load comments");
    }
    setCommentsLoading(false);
  };

  const closeCommentsModal = () => {
    setSelectedMovie(null);
    setShowCommentsModal(false);
    setComments([]);
  };

  const handleCommentDelete = async (id) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await axios.delete(`${API_BASE}/comments/${id}`);
      const res = await axios.get(`${API_BASE}/movies/${selectedMovie.id}/comments`);
      setComments(res.data);
    } catch {
      alert("Failed to delete comment");
    }
  };

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <Button variant="gold" className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <FontAwesomeIcon icon={faArrowUp} />
      </Button>

      <div className="header-section">
        <Button variant="outline-gold" onClick={() => navigate("/")} className="mb-4">
          <FontAwesomeIcon icon={faHome} className="me-2" /> Back to Home
        </Button>
        <h2 className="text-center mb-4">Admin Dashboard - GetAgasobanuye</h2>
      </div>

      <div className="search-add-section">
        <InputGroup className="mb-3">
          <InputGroup.Text>
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          <FormControl
            className="gold-placeholder"
            placeholder="Search movies..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ backgroundColor: "#1e1e1e", color: "gold", borderColor: "gold" }}
          />
        </InputGroup>

        <Button variant="gold" className="mb-4" onClick={() => openMovieModal("add")}>Add New Movie</Button>
      </div>

      {loadingMovies ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie) => (
              <tr key={movie.id}>
                <td className="white-text">{movie.id}</td>
                <td className="white-text">{movie.title}</td>
                <td className="white-text">{movie.genre}</td>
                <td className="white-text">{movie.release_year}</td>
                <td>
                  <Button variant="gold" size="sm" onClick={() => openMovieModal("edit", movie)} className="me-2">Edit</Button>
                  <Button variant="gold" size="sm" onClick={() => handleMovieDelete(movie.id)} className="me-2">Delete</Button>
                  <Button variant="gold" size="sm" onClick={() => openCommentsModal(movie)}>Comments</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Movie Modal */}
      <Modal show={showMovieModal} onHide={closeMovieModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === "add" ? "Add Movie" : "Edit Movie"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title" className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={currentMovie.title} onChange={handleMovieChange} />
            </Form.Group>
            <Form.Group controlId="genre" className="mb-2">
              <Form.Label>Genre</Form.Label>
              <Form.Select name="genre" value={currentMovie.genre} onChange={handleMovieChange}>
                <option value="">Select Genre</option>
                {genresList.map((g) => (<option key={g}>{g}</option>))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="release_year" className="mb-2">
              <Form.Label>Release Year</Form.Label>
              <Form.Control name="release_year" type="number" value={currentMovie.release_year} onChange={handleMovieChange} />
            </Form.Group>
            <Form.Group controlId="description" className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" as="textarea" rows={2} value={currentMovie.description} onChange={handleMovieChange} />
            </Form.Group>
            <Form.Group controlId="trailer_url" className="mb-2">
              <Form.Label>Trailer URL</Form.Label>
              <Form.Control name="trailer_url" value={currentMovie.trailer_url} onChange={handleMovieChange} />
            </Form.Group>
            <Form.Group controlId="video_url" className="mb-2">
              <Form.Label>Video URL</Form.Label>
              <Form.Control name="video_url" value={currentMovie.video_url} onChange={handleMovieChange} />
            </Form.Group>
            <Form.Group controlId="download_url" className="mb-2">
              <Form.Label>Download URL</Form.Label>
              <Form.Control name="download_url" value={currentMovie.download_url || ""} onChange={handleMovieChange} />
            </Form.Group>
            <Form.Group controlId="poster" className="mb-2">
              <Form.Label>Movie Poster</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files[0];
                setPosterFile(file);
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setPosterPreview(reader.result);
                  reader.readAsDataURL(file);
                } else {
                  setPosterPreview(null);
                }
              }} />
            </Form.Group>
            {posterPreview && (
              <div className="text-center my-3">
                <img src={posterPreview} alt="Poster Preview" style={{ width: "180px", height: "auto", borderRadius: "8px", border: "1px solid gold" }} />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="gold-outline" onClick={closeMovieModal}>Cancel</Button>
          <Button variant="gold" onClick={handleMovieSubmit}>{modalMode === "add" ? "Add" : "Update"}</Button>
        </Modal.Footer>
      </Modal>

      {/* Comments Modal */}
      <Modal show={showCommentsModal} onHide={closeCommentsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Comments for {selectedMovie?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {commentsLoading ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : (
            <ListGroup>
              {comments.map((c) => (
                <ListGroup.Item key={c.id}>
                  <strong>{c.email}</strong> — {c.comment_text}
                  <Button size="sm" variant="gold-outline" className="float-end" onClick={() => handleCommentDelete(c.id)}>Delete</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="gold-outline" onClick={closeCommentsModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
