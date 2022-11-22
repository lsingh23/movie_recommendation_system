import { gql, useQuery } from "@apollo/client";
import React from "react";
import Card from "./Card";

const Section = ({ genre }) => {
  const FILMS_QUERY = gql`
        query {
            movies_by_genre (
            value: { genre: ${JSON.stringify(genre)}},
            orderBy: [year_DESC],
            options: {pageSize: 6}
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

  const { data, loading, error } = useQuery(FILMS_QUERY);

  if (loading) return "Loading...";

  if (error) return <pre>{error.message}</pre>;

  return (
    <div className="movie-section">
      <h1 className="genre-title">{genre}</h1>
      <div className="container">
        {data &&
          data.movies_by_genre.values.map((movie) => <Card movie={movie} />)}
      </div>
      <button className="more-button" onClick={() => {}}>
        Next
      </button>
    </div>
  );
};

export default Section;
