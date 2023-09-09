import React from "react";
import s from "@/app/page.module.scss";
import Image from "next/image";
import { imageUrl, TheMovie } from "@/services/themovies";
import Link from "next/link";
import { truncateText } from "@/utils";

type Props = {
  movie: TheMovie;
  isHovered: boolean;
  setHoveredImage: (value: null | number) => void;
};

export const MovieItem: React.FC<Props> = ({
  movie,
  isHovered,
  setHoveredImage,
}) => {
  return (
    <div
      key={movie.id}
      className={`relative ${isHovered ? "hovered" : ""} ${s.image}`}
      onMouseEnter={() => setHoveredImage(movie.id)}
      onMouseLeave={() => setHoveredImage(null)}
    >
      <Image
        src={`${
          movie.poster_path
            ? `${imageUrl}${movie.poster_path}`
            : "https://dummyimage.com/290x435"
        } `}
        alt={movie.title}
        width={300}
        height={300}
      />

      {isHovered && (
        <div className={s.poster}>
          <div className={s.poster__wrapper}>
            <p>{movie.release_date}</p>
            {!movie.adult && <p className={s.poster__adult}>18+</p>}
          </div>
          <div className={s.poster__desc}>
            {truncateText(movie.overview, 320)}
          </div>
          <Link href={`${movie.id}`} className={s.poster__link}>
            More info
          </Link>
          <div className={s.poster__wrapper}>
            <p>{movie.vote_average} / 10</p>
            <p>{movie.popularity} views</p>
          </div>
        </div>
      )}
    </div>
  );
};
