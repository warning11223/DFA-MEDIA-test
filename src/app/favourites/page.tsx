"use client";

import React, { useEffect, useState } from "react";
import {
  TheMovie,
  useLazyGetFavouritesMoviesQuery,
} from "@/services/themovies";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import s from "./Favourites.module.scss";
import { MovieItem } from "@/components/MovieItem";
import Link from "next/link";

const Favourites = () => {
  const [accountId, setAccountId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [foundMovies, setFoundMovies] = useState<TheMovie[]>([]);
  const [hoveredImage, setHoveredImage] = useState<null | number>(0);

  const [getFavourites] = useLazyGetFavouritesMoviesQuery();

  useEffect(() => {
    const accountId = localStorage.getItem("accountId");
    const sessionId = localStorage.getItem("sessionId");
    if (accountId && sessionId) {
      setAccountId(accountId);
      setSessionId(sessionId);
    }
  }, []);

  useEffect(() => {
    if (accountId && sessionId) {
      getFavourites({ accountId, sessionId })
        .unwrap()
        .then((res) => {
          setFoundMovies(res.results);
        });
    }
  }, [accountId, sessionId]);

  const searchMovies = foundMovies.map((item) => {
    const isHovered = item.id === hoveredImage;

    return (
      <SwiperSlide key={item.id}>
        <MovieItem
          movie={item}
          isHovered={isHovered}
          setHoveredImage={setHoveredImage}
        />
      </SwiperSlide>
    );
  });

  return (
    <div className={s.favourites}>
      <div className={s.favourites__wrapper}>
        <h1 className={s.favourites__title}>Favourites movies</h1>
        <div className={"w-[1200px]"}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={4}
            slidesPerGroup={4}
            width={1200}
            height={300}
            navigation
            pagination={{ clickable: true }}
          >
            {searchMovies.length > 0 && searchMovies}
          </Swiper>
        </div>

        <Link href={"/"} className={s.favourites__btn}>
          Back to main
        </Link>
      </div>
    </div>
  );
};

export default Favourites;
