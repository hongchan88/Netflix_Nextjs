import React from "react";
import { gql, useQuery } from "@apollo/client";
import styles from "../styles/Home.module.css";

const MOVIE_BY_DIRECTOR = gql`
  query Query($director: String, $limit: Int) {
    directors(where: { director: $director }, options: { limit: $limit }) {
      title {
        Title
        release {
          release_year
        }
        country {
          country
        }
        director {
          director
        }
      }
    }
  }
`;

const MovieByDirector = ({ query }) => {
  console.log(query);
  const {
    data,
    loading,

    refetch,
  } = useQuery(MOVIE_BY_DIRECTOR, {
    variables: {
      director: query?.title,
      limit: parseInt(query?.limit),
    },
  });
  console.log(data);
  return (
    <div className={styles.grid}>
      {loading
        ? "Loading..."
        : data?.directors?.length === 0
        ? "No result / Please check your spelling or search option"
        : data?.directors?.map((movie, idx) => {
            return (
              <a
                href={`https://www.google.com/search?q=${movie.title.Title}`}
                className={styles.card}
                target="_blank"
                rel="noreferrer"
                key={idx}
              >
                <h2>{movie.title.Title}</h2>
                <p>{movie.title.director.director}</p>
                <p>{movie.title.release.release_year}</p>
                <p>{movie.title.country.country}</p>
              </a>
            );
          })}
    </div>
  );
};

export default MovieByDirector;
