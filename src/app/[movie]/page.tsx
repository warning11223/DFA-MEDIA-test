"use client";

import React from "react";
import { useParams } from "next/navigation";
import { imageUrl, useGetMovieQuery } from "@/services/themovies";
import Image from "next/image";

import s from "./Movie.module.scss";
import { Loader } from "@/components/Loader";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Link from "next/link";
import { convertMinutesToHoursAndMinutes } from "@/utils";

const Movie = () => {
  const params1 = useParams();

  const { data, isLoading } = useGetMovieQuery(String(params1.movie));
  console.log(data);

  const genres = data?.genres.map((item) => {
    return <p key={item.id}>{item.name}</p>;
  });

  const countries = data?.production_countries.map((item) => {
    return <p key={item.iso_3166_1}>{item.name}</p>;
  });

  const images = data?.production_companies.map((item) => {
    return (
      <Image
        key={item.id}
        src={`${
          item.logo_path
            ? `${imageUrl}${item.logo_path}`
            : "https://dummyimage.com/290x435"
        } `}
        alt={"image"}
        width={150}
        height={150}
      />
    );
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={s.movie}>
          <h2 className={s.movie__title}>{data?.title}</h2>
          <div className={s.movie__container}>
            <Image
              className={s.movie__img}
              src={`${
                data?.poster_path
                  ? `${imageUrl}${data?.poster_path}`
                  : "https://dummyimage.com/290x435"
              } `}
              alt={"image"}
              width={300}
              height={300}
            />
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
          </div>
          {images?.length! > 0 && (
            <div className={s.movie__companies}>
              <h2 className={s.movie__companies__title}>Companies</h2>
              <div className={s.movie__images}>{images}</div>
            </div>
          )}
          <div className={s.movie__btnWrapper}>
            <Link className={s.movie__btn} href={"/"}>
              Back to main
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
