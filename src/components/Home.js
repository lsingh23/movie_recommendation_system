import { gql, useQuery } from "@apollo/client";
import React from "react";
import HeroComponent from "./Hero";
import Section from "./Section";

const GENRES_QUERY = gql`
  query getAllGenres {
    reference_list(value: { label: "genre" }, orderBy: [value_DESC]) {
      values {
        value
      }
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(GENRES_QUERY);

  if (loading) return "Loading...";

  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      {/* <HeroComponent /> */}
      <div className="app">
        {data ? (
          data.reference_list.values.map((genre) => (
            <Section genre={genre.value} />
          ))
        ) : (
          <>
            This app is using Nosql database that is hosted on AstraDB and is
            hoisted at the moment. Please contact the author or try again later
          </>
        )}
      </div>
    </>
  );
};

export default Home;
