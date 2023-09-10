import React, { useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieItem } from "@/components/MovieItem";
import {
  TheMovie,
  useLazyGetFavouritesMoviesQuery,
} from "@/services/themovies";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Loader } from "@/components/Loader";
import { toast } from "react-toastify";

export const FavouritesCarousel = () => {
  const [hoveredImage, setHoveredImage] = useState<null | number>(0);
  const [foundMovies, setFoundMovies] = useState<TheMovie[]>([]);
  const [accountId, setAccountId] = useState("");
  const [sessionId, setSessionId] = useState("");

  const [getFavourites, { isLoading }] = useLazyGetFavouritesMoviesQuery();

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
        })
        .catch(() => toast.error("Error"));
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
    <>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        slidesPerView={4}
        slidesPerGroup={4}
        width={1200}
        height={300}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
      >
        {searchMovies.length > 0 && searchMovies}
      </Swiper>
      {!foundMovies.length && (
        <div className={"flex "}>
          <p className={"text-center text-3xl pt-32 mb-32 mr-[440px]"}>
            Empty, add movies😔
          </p>
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
};
