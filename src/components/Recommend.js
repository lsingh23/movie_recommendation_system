import React, { useEffect, useState } from "react";
import PosterCard from "./PosterCard";

const Recommend = ({ title }) => {
  const [movies, setMovies] = useState(null);
  const [name, setName] = useState(title);

  function handleChange(newValue) {
    setName(newValue);
  }

  useEffect(() => {
    fetch(`test/${name}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      });
  }, [name]);

  return (
    <>
      <div className="recommendations">
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

export default Recommend;
