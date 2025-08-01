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
  faClock,
  faStar as faSolidStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as farHeart,
  faStar as faRegularStar,
} from "@fortawesome/free-regular-svg-icons";
import { useFavorites } from "../context/FavoritesContext";
import { API_BASE, API_KEY } from "../config";

const PageWrapper = styled.div`
  background-color: #0f172a;
  min-height: 100vh;
  color: white;
  padding: 2rem 0;
`;

const MovieHeader = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: white;
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
`;

const GoldText = styled.span`
  color: #d4af37;
  font-weight: 600;
`;

const CommentSection = styled.div`
  background: rgba(15, 23, 42, 0.7);
  border-radius: 15px;
  padding: 2rem;
  margin-top: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const CommentCard = styled.div`
  background: rgba(30, 41, 59, 0.5);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 3px solid #d4af37;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(30, 41, 59, 0.8);
    transform: translateY(-2px);
  }
`;

const CommentForm = styled(Form)`
  .form-control {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 10px;
    padding: 1rem;

    &::placeholder {
      color: lightgrey;
      opacity: 1;
      font-weight: 500;
    }

    &:focus {
      background: rgba(15, 23, 42, 0.9);
      border-color: #3b82f6;
      box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.25);
      color: white;
    }
  }

  .btn-primary {
    background: linear-gradient(to right, #d4af37, #f59e0b);
    border: none;
    font-weight: 600;
    padding: 0.75rem 2rem;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
      background: linear-gradient(to right, #f59e0b, #d4af37);
      transform: translateY(-2px);
    }
  }
`;

const Timestamp = styled.small`
  color: #9ca3af;
  font-size: 0.85rem;
  font-style: italic;
  letter-spacing: 0.3px;
`;

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const RelatedMoviesContainer = styled.div`
  margin-top: 3rem;
`;

const RelatedMoviesTitle = styled.h3`
  color: #d4af37;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const RelatedMoviesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
`;

const RelatedMovieCard = styled(Link)`
  --white: hsl(0, 0%, 100%);
  --black: hsl(240, 15%, 9%);
  --paragraph: hsl(0, 0%, 83%);
  --primary: hsl(189, 92%, 58%);

  position: relative;
  width: 160px;
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
  border-radius: 0.8rem;
  box-shadow: 0px -16px 24px 0px rgba(255, 255, 255, 0.25) inset;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
  background-clip: padding-box;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.3), 0 0 25px rgba(0, 255, 255, 0.2);
    color: inherit;
  }

  &::before {
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
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 0.8rem 0.8rem 0 0;
  }

  .card-body {
    padding: 0.5rem;
    text-align: center;
  }

  .card-title {
    word-break: break-word;
    white-space: normal;
    overflow-wrap: break-word;
  }

  .card-text {
    color: var(--paragraph);
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
  }

  .time-text {
    color: var(--paragraph);
    font-size: 0.65rem;
  }
`;

axios.defaults.headers.common["x-api-key"] = API_KEY;

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
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const getYouTubeId = (urlOrId) => {
    if (!urlOrId) return null;
    if (urlOrId.includes("youtube.com") || urlOrId.includes("youtu.be")) {
      try {
        const url = new URL(urlOrId);
        if (url.hostname === "youtu.be") {
          return url.pathname.slice(1);
        } else if (url.hostname.includes("youtube.com")) {
          return url.searchParams.get("v");
        }
      } catch {
        return null;
      }
    }
    if (urlOrId.length === 11) return urlOrId;
    return null;
  };

  useEffect(() => {
    axios
      .get(`${API_BASE}/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
        setLikeCount(res.data.likes || 0);
      })
      .catch(() => setMovieError(true));
  }, [id]);

  const fetchComments = () => {
    setLoadingComments(true);
    axios
      .get(`${API_BASE}/movies/${id}/comments`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingComments(false));
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/movies/${id}/related`)
      .then((res) => setRelatedMovies(res.data))
      .catch((err) => console.error("Failed to load related movies", err));
  }, [id]);

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
      if (liked) {
        await axios.post(`${API_BASE}/movies/${id}/unlike`);
        setLikeCount((prev) => prev - 1);
      } else {
        await axios.post(`${API_BASE}/movies/${id}/like`);
        setLikeCount((prev) => prev + 1);
      }
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

  const videoId = getYouTubeId(movie.trailer_url);

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
              <FontAwesomeIcon icon={liked ? faHeart : farHeart} /> {likeCount}{" "}
              Likes
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
            href={
              movie.video_url && movie.video_url.trim() !== ""
                ? movie.video_url
                : "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex align-items-center gap-2"
            style={{ minWidth: "140px" }}
            disabled={!movie.video_url || movie.video_url.trim() === ""}
          >
            <FontAwesomeIcon icon={faPlay} />
            Watch Movie
          </Button>

          <Button
            as="a"
            variant="success"
            href={
              movie.download_url && movie.download_url.trim() !== ""
                ? movie.download_url
                : "#"
            }
            target="_blank"
            rel="noopener noreferrer"
            download
            className="d-flex align-items-center gap-2"
            style={{ minWidth: "140px" }}
            disabled={!movie.download_url && !movie.video_url}
          >
            <FontAwesomeIcon icon={faDownload} />
            Download
          </Button>
        </ButtonGroup>

        <CommentSection>
          <h3 className="mb-4">
            <GoldText>Comments</GoldText>{" "}
            <Badge bg="secondary">{comments.length}</Badge>
          </h3>

          <CommentForm onSubmit={handleSubmit} className="mb-4">
            {errorMsg && (
              <Alert variant="danger" className="mb-3">
                {errorMsg}
              </Alert>
            )}

            <Form.Group controlId="formEmail" className="mb-3">
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

            <Form.Group controlId="formComment" className="mb-3">
              <Form.Label>Your Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Share your thoughts about this movie..."
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
                    role="status"
                    aria-hidden="true"
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
              No comments yet. Be the first to comment!
            </Alert>
          ) : (
            <div>
              {comments.map(({ id, email, comment_text, created_at }) => (
                <CommentCard key={id}>
                  <div className="d-flex justify-content-between mb-2 align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: "#d4af37",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          color: "#1e293b",
                          textTransform: "uppercase",
                        }}
                      >
                        {email.charAt(0)}
                      </div>
                      <div className="d-flex flex-column">
                        <strong className="text-primary text-wrap">
                          {email}
                        </strong>
                        <Timestamp>
                          {new Date(created_at).toLocaleString()}
                        </Timestamp>
                      </div>
                    </div>
                  </div>
                  <p className="mb-0">{comment_text}</p>
                </CommentCard>
              ))}
            </div>
          )}
        </CommentSection>

        {relatedMovies.length > 0 && (
          <RelatedMoviesContainer>
            <RelatedMoviesTitle>Related Movies</RelatedMoviesTitle>
            <RelatedMoviesGrid>
              {relatedMovies.map((m) => (
                <RelatedMovieCard key={m.id} to={`/movie/${m.id}`}>
                  <img
                    src={m.movie_poster}
                    alt={m.title}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h6 className="card-title">
                      {m.title.split(" ").map((word, i) => (
                        <React.Fragment key={i}>
                          {word} {i % 4 === 3 ? <br /> : null}
                        </React.Fragment>
                      ))}
                    </h6>

                    <p className="card-text">
                      {m.genre} | {m.release_year}
                    </p>
                    {m.uploaded && (
                      <p className="time-text">
                        <FontAwesomeIcon icon={faClock} className="me-1" />
                        {m.uploaded}
                      </p>
                    )}
                  </div>
                </RelatedMovieCard>
              ))}
            </RelatedMoviesGrid>
          </RelatedMoviesContainer>
        )}
      </Container>
    </PageWrapper>
  );
};

export default MovieDetail;
