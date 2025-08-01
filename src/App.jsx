import React, { useState } from "react";
import MainNav from "./components/MainNav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Terms from "./pages/Terms";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Footer";
import AdminApp from "./admin/AdminApp";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ darkMode }) => (darkMode ? "#121212" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#eee" : "#222")};
`;

const ContentWrapper = styled.main`
  flex: 1;
`;

function LayoutWrapper({ darkMode, setDarkMode }) {
  const location = useLocation();

  // Regex to match dynamic route /movie/:id
  const hideLayout =
    /^\/movie\/[^/]+$/.test(location.pathname) ||
    location.pathname.startsWith("/admin");

  return (
    <AppContainer darkMode={darkMode}>
      {!hideLayout && <MainNav darkMode={darkMode} setDarkMode={setDarkMode} />}
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About darkMode={darkMode} />} />
          <Route path="/contact" element={<Contact darkMode={darkMode} />} />
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy darkMode={darkMode} />}
          />
          <Route path="/terms" element={<Terms darkMode={darkMode} />} />
          <Route
            path="/favorites"
            element={<Favorites darkMode={darkMode} />}
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/admin" element={<AdminApp />} />
          <Route
            path="/404"
            element={<h1 className="text-center">Page Not Found</h1>}
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </ContentWrapper>
      {!hideLayout && <Footer darkMode={darkMode} />}
    </AppContainer>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Router>
      <LayoutWrapper darkMode={darkMode} setDarkMode={setDarkMode} />
    </Router>
  );
}

export default App;
