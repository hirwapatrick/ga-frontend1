import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Button,
  ButtonGroup,
  Form,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPlay,
  faArrowLeft,
  faHeart,
  faPaperPlane,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { API_BASE } from "../config";
// ...[imports remain unchanged]

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #d4af37;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #1e293b;
  text-transform: uppercase;
`;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [movieError, setMovieError] = useState(false);
  const [comments, setComments] = useState([]);
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [relatedMovies, setRelatedMovies] = useState([]);

  const videoId = getYouTubeId(movie?.trailer_url);

  useEffect(() => {
    axios
      .get(`${API_BASE}/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLikeCount(res.data.likes || 0);
      })
      .catch(() => setMovieError(true));
  }, [id]);

  useEffect(() => {
    fetchComments();
    fetchRelatedMovies();
  }, [id]);

  const fetchComments = () => {
    setLoadingComments(true);
    axios
      .get(`${API_BASE}/movies/${id}/comments`)
      .then((res) => setComments(res.data))
      .catch(console.error)
      .finally(() => setLoadingComments(false));
  };

  const fetchRelatedMovies = () => {
    axios
      .get(`${API_BASE}/movies/${id}/related`)
      .then((res) => setRelatedMovies(res.data))
      .catch(console.error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !commentText.trim()) {
      setErrorMsg("Email and Comment are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(`${API_BASE}/movies/${id}/comments`, {
        email: email.trim(),
        comment_text: commentText.trim(),
      });
      setComments((prev) => [res.data, ...prev]);
      setEmail("");
      setCommentText("");
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Failed to submit comment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async () => {
    try {
      const url = liked
        ? `${API_BASE}/movies/${id}/unlike`
        : `${API_BASE}/movies/${id}/like`;
      await axios.post(url);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      setLiked(!liked);
    } catch (err) {
      console.error("Failed to update like", err);
    }
  };

  if (movieError) {
    return (
      <PageWrapper>
        <Container className="text-center my-5">
          <Alert variant="danger">Failed to load movie details.</Alert>
        </Container>
      </PageWrapper>
    );
  }

  if (!movie) {
    return (
      <PageWrapper>
        <Container className="text-center my-5">
          <Spinner animation="border" variant="warning" />
          <p className="mt-3">Loading movie details...</p>
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container className="my-5" style={{ maxWidth: "900px" }}>
        <Button
          as={Link}
          to="/"
          variant="outline-light"
          className="mb-4"
          style={{ borderColor: "#d4af37", color: "#d4af37" }}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Back to Movies
        </Button>

        <MovieHeader>
          <h1 className="mb-3">
            <GoldText>{movie.title}</GoldText>
          </h1>
          <div className="mb-4">
            <Badge bg="primary" className="me-2">
              {movie.genre}
            </Badge>
            <Badge bg="secondary">{movie.release_year}</Badge>
          </div>
          <p className="mb-4" style={{ whiteSpace: "pre-line" }}>
            {movie.description}
          </p>

          <div className="d-flex align-items-center gap-3 mb-4">
            <Button
              variant={liked ? "danger" : "outline-danger"}
              onClick={handleLike}
            >
              <FontAwesomeIcon icon={liked ? faHeart : farHeart} /> {likeCount} Likes
            </Button>
            <Button variant="outline-primary">
              <FontAwesomeIcon icon={faComment} /> {comments.length} Comments
            </Button>
          </div>
        </MovieHeader>

        {videoId ? (
          <VideoContainer>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`${movie.title} Trailer`}
              allowFullScreen
            />
          </VideoContainer>
        ) : (
          <Alert variant="info" className="text-center">
            No trailer available for this movie.
          </Alert>
        )}

        <ButtonGroup className="mb-4 d-flex gap-3">
          <Button
            as="a"
            variant="primary"
            href={movie.video_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex align-items-center gap-2"
            style={{ minWidth: "140px" }}
            disabled={!movie.video_url}
          >
            <FontAwesomeIcon icon={faPlay} />
            Watch Movie
          </Button>

          <Button
            as="a"
            variant="success"
            href={movie.download_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="d-flex align-items-center gap-2"
            style={{ minWidth: "140px" }}
            disabled={!movie.download_url}
          >
            <FontAwesomeIcon icon={faDownload} />
            Download
          </Button>
        </ButtonGroup>

        {/* === Comments Section === */}
        <CommentSection>
          <h3 className="mb-4">
            <GoldText>Comments</GoldText> <Badge bg="secondary">{comments.length}</Badge>
          </h3>

          <CommentForm onSubmit={handleSubmit} className="mb-4">
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Share your thoughts..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={submitting}
                required
              />
            </Form.Group>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                  Post Comment
                </>
              )}
            </Button>
          </CommentForm>

          {loadingComments ? (
            <div className="text-center">
              <Spinner animation="border" variant="warning" />
            </div>
          ) : comments.length === 0 ? (
            <Alert variant="info" className="text-center">
              No comments yet. Be the first!
            </Alert>
          ) : (
            <Container fluid="md">
              {comments.map(({ id, email, comment_text, created_at }) => (
                <Card key={id} className="mb-3 p-3">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <Avatar>{email[0]?.toUpperCase()}</Avatar>
                    <div>
                      <strong className="text-primary">{email}</strong>
                      <br />
                      <small className="text-muted">
                        {new Date(created_at).toLocaleString()}
                      </small>
                    </div>
                  </div>
                  <p className="mb-0">{comment_text}</p>
                </Card>
              ))}
            </Container>
          )}
        </CommentSection>

        {/* === Related Movies === */}
        {relatedMovies.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-4">
              <GoldText>Related Movies</GoldText>
            </h3>
            <RelatedMoviesGrid>
              {relatedMovies.map((m) => (
                <RelatedMovieCard to={`/movie/${m.id}`} key={m.id}>
                  <img
                    src={
                      m.movie_poster?.startsWith("http")
                        ? m.movie_poster
                        : movie.movie_poster
                    }
                    alt={m.title}
                  />
                  <h6>{m.title}</h6>
                  <p>
                    {m.genre} | {m.release_year}
                  </p>
                </RelatedMovieCard>
              ))}
            </RelatedMoviesGrid>
          </div>
        )}
      </Container>
    </PageWrapper>
  );
};

export default MovieDetail;
