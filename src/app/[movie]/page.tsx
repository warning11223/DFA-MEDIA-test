"use client";
import React from "react";
import { useParams } from "next/navigation";
import { imageUrl, useGetMovieQuery } from "@/services/themovies";
import Image from "next/image";
import { Loader } from "@/components/Loader";
import "swiper/css/scrollbar";
import Link from "next/link";

import s from "./Movie.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Buttons } from "./Buttons";
import { MovieDescription } from "./MovieDescription";

const Movie = () => {
  const params = useParams();

  const { data, isLoading } = useGetMovieQuery(String(params.movie));

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
          <Buttons />
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
            <MovieDescription data={data!} />
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
