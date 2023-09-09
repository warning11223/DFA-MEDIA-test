import React from "react";
import s from "@/app/[movie]/Movie.module.scss";
import { convertMinutesToHoursAndMinutes } from "@/utils";
import { GetMovie } from "@/services/themovies";

type Props = {
  data: GetMovie;
};

export const MovieDescription: React.FC<Props> = ({ data }) => {
  const genres = data?.genres.map((item) => {
    return <p key={item.id}>{item.name}</p>;
  });

  const countries = data?.production_countries.map((item) => {
    return <p key={item.iso_3166_1}>{item.name}</p>;
  });

  return (
    <div className={s.movie__wrapper}>
      {!data?.adult && (
        <div className={s.movie__flex}>
          <span>Age: </span>
          <span>18+</span>
        </div>
      )}
      {data?.release_date && (
        <div className={s.movie__flex}>
          <span>Date:</span> <span>{data?.release_date}</span>
        </div>
      )}
      {genres?.length! > 0 && (
        <div className={s.movie__genres}>Genres: {genres}</div>
      )}
      {data?.original_language && (
        <div className={s.movie__flex}>
          <span>Language:</span>{" "}
          <span>{data?.original_language.toUpperCase()}</span>
        </div>
      )}
      {data?.runtime && (
        <div className={s.movie__flex}>
          <span>Runtime:</span>
          <span>{convertMinutesToHoursAndMinutes(data?.runtime)}</span>
        </div>
      )}
      {data?.tagline && (
        <div className={s.movie__quote}>
          <span>Quote:</span> <span>{data?.tagline}</span>
        </div>
      )}
      {data?.budget! > 0 && (
        <div className={s.movie__flex}>
          <span>Budget:</span> <span>{data?.budget} $</span>
        </div>
      )}
      {data?.production_countries && (
        <div className={s.movie__genres}>Countries: {countries}</div>
      )}

      {data?.homepage && (
        <a
          href={data?.homepage}
          target={"_blank"}
          className={s.movie__homepage}
        >
          Homepage
        </a>
      )}
      {data?.overview && (
        <p className={s.movie__desc}>*** {data?.overview} ***</p>
      )}
    </div>
  );
};
