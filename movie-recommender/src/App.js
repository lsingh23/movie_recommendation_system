import { gql, useQuery } from "@apollo/client";
import React from "react";
import "./App.css";
import Section from "./components/Section";

const GENRES_QUERY = gql`
  query getAllGenres {
    reference_list(value: { label: "genre" }) {
      values {
        value
      }
    }
  }
`;

export default function App() {
  const { data, loading, error } = useQuery(GENRES_QUERY);

  if (loading) return "Loading...";

  if (error) return <pre>{error.message}</pre>;

  return (
    <div className="app">
      <h1>Movies</h1>
      {data &&
        data.reference_list.values.map((genre) => (
          <Section genre={genre.value} />
        ))}
    </div>
  );
}
