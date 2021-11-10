import React from "react";
import { gql, useQuery } from "@apollo/client";

import styles from "../../styles/Home.module.css";

const MOVIE_BY_YEAR = gql`
  query Query($year: String, $limit: Int) {
    releases(where: { release_year: $year }) {
      title(options: { limit: $limit }) {
        Title
        release {
          release_year
        }
        director {
          director
        }
        country {
          country
        }
      }
    }
  }
`;

const MovieByYear = ({ query }) => {
  console.log(query);
  const {
    data,
    loading,

    refetch,
  } = useQuery(MOVIE_BY_YEAR, {
    variables: {
      year: query?.title,
      limit: parseInt(query?.limit),
    },
  });

  return (
    <div className={styles.grid}>
      {loading
        ? "Loading..."
        : data["releases"][0]?.title?.length === 0
        ? "No result / Please check your spelling or search option"
        : data["releases"][0]?.title?.map((movie, idx) => {
            return (
              <a
                href={`https://www.google.com/search?q=${movie.Title}`}
                className={styles.card}
                target="_blank"
                rel="noreferrer"
                key={idx}
              >
                <h2>{movie.Title}</h2>
                <p>{movie.director.director}</p>
                <p>{movie.release.release_year}</p>
                <p>{movie.country.country}</p>
              </a>
            );
          })}
    </div>
  );
};

export default MovieByYear;
