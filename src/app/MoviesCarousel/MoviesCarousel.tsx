import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieItem } from "@/components/MovieItem";
import React, { useState } from "react";
import { TheMovie } from "@/services/themovies";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

type Props = {
  foundMovies: TheMovie[];
};

export const MoviesCarousel: React.FC<Props> = ({ foundMovies }) => {
  const [hoveredImage, setHoveredImage] = useState<null | number>(0);

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
        delay: 5000,
        pauseOnMouseEnter: true,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
      }}
    >
      {searchMovies.length > 0 && searchMovies}
    </Swiper>
  );
};
