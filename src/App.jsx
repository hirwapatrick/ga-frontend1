import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminApp from "./admin/AdminApp";

const App = () => {
  return (
    <>
      {" "}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/admin" element={<AdminApp />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
