import React from "react";
import s from "@/app/[movie]/Movie.module.scss";
import { convertMinutesToHoursAndMinutes } from "@/utils";
import { GetMovie } from "@/services/themovies";

type Props = {
  data: GetMovie;
};

export const MovieDescription: React.FC<Props> = ({ data }) => {
  const renderItems = (title: string, value: string | number | null) => {
    return (
      value && (
        <div className={s.movie__flex}>
          <span>{title}:</span> <span>{value}</span>
        </div>
      )
    );
  };

  const renderList = (title: string, items: any[]) => {
    const genreNames = items.map((item) => item.name);
    const genreList = genreNames.join(", ");

    return (
      genreNames.length > 0 && (
        <div className={s.movie__genres}>
          <span>{title}:</span> <span>{genreList}</span>
        </div>
      )
    );
  };

  return (
    <div className={s.movie__wrapper}>
      {!data?.adult && renderItems("Age", "18+")}
      {renderItems("Date", data?.release_date)}
      {renderList("Genres", data?.genres)}
      {renderItems("Language", data?.original_language?.toUpperCase())}
      {renderItems("Runtime", convertMinutesToHoursAndMinutes(data?.runtime))}
      {renderItems("Quote", data?.tagline)}
      {data?.budget! > 0 && renderItems("Budget", `${data?.budget} $`)}
      {renderList("Countries", data?.production_countries)}
      {data?.homepage && (
        <a href={data?.homepage} target="_blank" className={s.movie__homepage}>
          Homepage
        </a>
      )}
      {data?.overview && (
        <p className={s.movie__desc}>*** {data?.overview} ***</p>
      )}
    </div>
  );
};
