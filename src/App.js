import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Recommend from "./components/Recommend";
import Suggestions from "./components/Suggestions";

export default function App() {
  const [title, setTitle] = useState(null);
  const navigate = useNavigate();

  const navigateToRecommender = () => {
    navigate("/recommend");
  };

  return (
    <>
      <nav>
        <Link to="/" className="home-button">
          Home
        </Link>
      </nav>
      <div>
        <input
          className="search-bar"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Type in Avatar..."
        ></input>
        <button className="search-button" onClick={navigateToRecommender}>
          Search
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend title={title} />} />
        <Route path="/suggestions" element={<Suggestions />} />
      </Routes>
    </>
  );
}
