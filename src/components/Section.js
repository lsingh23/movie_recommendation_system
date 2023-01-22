import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Card from "./Card";

const Section = ({ genre }) => {
  const [pageState, setPageState] = useState(null);

  const FILMS_QUERY = gql`
    query {
        movies_by_genre (
        value: { genre: ${JSON.stringify(genre)}},
        orderBy: [year_DESC],
        options: {pageSize: 6, pageState: ${JSON.stringify(pageState)}}
        ) { 
            values {
                year,
                title,
                duration,
                synopsis,
                thumbnail
            }
            pageState
        }
    }
   `;

  const { data, loading, error, refetch } = useQuery(FILMS_QUERY);

  if (loading) return "Loading...";

  if (error) return <pre>{error.message}</pre>;

  function handleClick() {
    setPageState(data.movies_by_genre.pageState);
    refetch();
  }

  return (
    <div className="movie-section">
      <h1 className="genre-title">{genre}</h1>
      <div className="container">
        {data &&
          data.movies_by_genre.values.map((movie) => (
            <Card key={movie.title} movie={movie} />
          ))}
      </div>
      <button className="more-button" onClick={handleClick}>
        See more &#62;&#62;&#62;
      </button>
    </div>
  );
};

export default Section;
