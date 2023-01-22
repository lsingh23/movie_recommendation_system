import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ movie }) => {
  const navigate = useNavigate();

  const navigateToRecommender = () => {
    navigate("/suggestions", { state: { title: movie.title } });
  };

  return (
    <>
      <div className="card" onClick={navigateToRecommender}>
        <video className="video">
          <source src={movie.thumbnail} type="video/mp4" />
        </video>
        <div>{movie.title}</div>
      </div>
    </>
  );
};

export default Card;
