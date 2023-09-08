"use client";

import { useGetMoviesQuery } from "@/services";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieItem } from "@/app/MovieItem/MovieItem";
import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";
import { TheMovie, useLazySearchMovieQuery } from "@/services/themovies";
import { useDebounce } from "@/hooks";

import s from "./page.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Home() {
  const [hoveredImage, setHoveredImage] = useState<null | number>(0);
  const [inputValue, setInputValue] = useState(
    localStorage.getItem("searchValue")! || "",
  );
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [foundMovies, setFoundMovies] = useState<TheMovie[]>([]);

  const { data, isLoading } = useGetMoviesQuery(
    localStorage.getItem("searchValue")!,
  );
  const [findMovies, { isLoading: isSearching, status }] =
    useLazySearchMovieQuery();

  const debouncedInputValue = useDebounce(inputValue, 1000);

  /*  useEffect(() => {
    if (sortBy) {
      findMovies({ value: debouncedInputValue, page: String(page), sortBy })
        .unwrap()
        .then((res) => {
          setFoundMovies(res.results);

          setTotalPages(res.total_pages);
        });
    }
  }, [sortBy]);*/

  useEffect(() => {
    if (debouncedInputValue) {
      localStorage.setItem("searchValue", debouncedInputValue);

      findMovies({ value: debouncedInputValue, page: String(page), sortBy })
        .unwrap()
        .then((res) => {
          setFoundMovies(res.results);

          setTotalPages(res.total_pages);
        });
    }
  }, [debouncedInputValue]);

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

  const movies = data?.results.map((item) => {
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

  const onLoadMore = () => {
    if (debouncedInputValue && page !== totalPages) {
      localStorage.setItem("searchValue", debouncedInputValue);

      findMovies({ value: debouncedInputValue, page: String(page + 1), sortBy })
        .unwrap()
        .then((res) => {
          setFoundMovies(res.results);
          setPage((prevState) => prevState + 1);
          setTotalPages(res.total_pages);
        });
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center gap-40">
        <Header
          inputValue={inputValue}
          setInputValue={setInputValue}
          setSortBy={setSortBy}
        />
        <div className={"w-[1200px]"}>
          {!foundMovies.length && !data?.results.length && (
            <p className={"text-center text-3xl"}>
              No movies found for this request, try another one 😔
            </p>
          )}
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
            {searchMovies.length > 0 ? searchMovies : movies}
          </Swiper>
          {foundMovies.length > 0 && (
            <div className={"pt-5 mb-52"}>
              <button
                onClick={onLoadMore}
                className={s.poster__btn}
                disabled={page === totalPages}
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </main>
      {isLoading && <Loader />}
      {isSearching && <Loader />}
      {status === "pending" && <Loader />}
    </>
  );
}
