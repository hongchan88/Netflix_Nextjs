import React from "react";
import { gql, useQuery } from "@apollo/client";

import styles from "../../styles/Home.module.css";

const MovieByMain = ({ query, data }) => {
  console.log(data);
  let randomData = [];
  for (let i = 0; i < 5; i++) {
    randomData.push(data?.titles[Math.floor(Math.random() * 100)]);
  }
  console.log(randomData);
  return (
    <div className={styles.grid}>
      {!randomData
        ? "Loading..."
        : randomData.map((movie, idx) => {
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

export default MovieByMain;
