import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PosterCard from "./PosterCard";

const Suggestions = () => {
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  const [title, setTitle] = useState(location.state.title);

  function handleChange(newValue) {
    setTitle(newValue);
  }

  useEffect(() => {
    fetch(`/test/${title}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }, [title]);

  return (
    <>
      <div className="suggestions">
        <div className="movie-section">
          <div className="container">
            {movies &&
              movies.map((movie) => (
                <PosterCard movie={movie} onChange={handleChange} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Suggestions;
