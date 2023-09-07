"use client";

import { useGetMoviesQuery } from "@/services";
import { useState } from "react";

import s from "./page.module.scss";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { MovieItem } from "@/app/MovieItem/MovieItem";
import { Loader } from "@/components/Loader";

export default function Home() {
  const [hoveredImage, setHoveredImage] = useState<null | number>(0);

  const { data, isLoading } = useGetMoviesQuery();

  const images = data?.results.map((item) => {
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
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className={"w-[1200px]"}>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={4}
            width={1200}
            height={300}
            navigation
            pagination={{ clickable: true }}
          >
            {images}
          </Swiper>
        </div>
      </main>
      {isLoading && <Loader />}
    </>
  );
}
