import React, { useState } from "react";
import {
  Form,
  Button,
  Alert,
  Spinner,
  Card,
  Image,
} from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "react-feather";
import { API_BASE } from "../config"; // ✅ import API base URL

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/admin/login`, {
        email,
        password,
      });

      const { user } = response.data;

      localStorage.setItem("adminEmail", user.email);
      localStorage.setItem("isAdmin", "true");

      onLogin(true);
    } catch (err) {
      const msg =
        err.response?.data?.error || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#1e1e1e",
            border: "1px solid gold",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)",
          }}
        >
          <div className="text-center mb-3">
            <Image
              src="./logo/logo.png"
              alt="Logo"
              style={{ width: "70px", height: "70px" }}
              fluid
              roundedCircle
            />
          </div>

          <h3 className="text-center mb-4" style={{ color: "gold" }}>
            Admin Login
          </h3>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="danger">{error}</Alert>
            </motion.div>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label style={{ color: "#ddd" }}>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                style={{
                  backgroundColor: "#2a2a2a",
                  color: "white",
                  borderColor: "gold",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label style={{ color: "#ddd" }}>Password</Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  style={{
                    backgroundColor: "#2a2a2a",
                    color: "white",
                    borderColor: "gold",
                    paddingRight: "40px",
                  }}
                />
                <span
                  onClick={toggleShowPassword}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "gold",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </Form.Group>

            <Button
              variant="outline-warning"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}
