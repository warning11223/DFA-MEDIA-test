"use client";
import React, { useEffect, useState } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieItem } from "@/components/MovieItem/MovieItem";
import { Loader } from "@/components/Loader";
import { Header } from "@/components/Header";
import {
  TheMovie,
  useLazySearchMovieQuery,
  useLazySortMoviesQuery,
} from "@/services/themovies";
import { useDebounce } from "@/hooks";
import { useRouter } from "next/navigation";

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
  const [totalPages, setTotalPages] = useState(0);
  const [foundMovies, setFoundMovies] = useState<TheMovie[]>([]);
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [sortBy, setSortBy] = useState("");
  const router = useRouter();

  const [findMovies, { status: findStatus }] = useLazySearchMovieQuery();
  const [sortMovies, { status: sortStatus }] = useLazySortMoviesQuery();

  const debouncedInputValue = useDebounce(inputValue, 1000);

  useEffect(() => {
    const id = localStorage.getItem("sessionId");
    if (!id) {
      router.push("/auth");
    }
  }, []);

  useEffect(() => {
    if (debouncedInputValue) {
      localStorage.setItem("searchValue", debouncedInputValue);

      findMovies({ value: debouncedInputValue, page: String(page) })
        .unwrap()
        .then((res) => {
          setFoundMovies(res.results);
          setTotalPages(res.total_pages);
        });
    }
  }, [debouncedInputValue]);

  const onLoadMore = () => {
    if (debouncedInputValue && page !== totalPages) {
      localStorage.setItem("searchValue", debouncedInputValue);
      if (sortBy) {
        sortMovies({ sortBy, page: String(page + 1), genre, year })
          .unwrap()
          .then((res) => {
            setFoundMovies(res.results);
            setPage((prevState) => prevState + 1);
            setTotalPages(res.total_pages);
          });
      } else {
        findMovies({
          value: debouncedInputValue,
          page: String(page + 1),
        })
          .unwrap()
          .then((res) => {
            setFoundMovies(res.results);
            setPage((prevState) => prevState + 1);
            setTotalPages(res.total_pages);
          });
      }
    }
  };

  const onSortMovies = (sortBy: string, genre: string, year: string) => {
    setYear(year);
    setGenre(genre);
    setSortBy(sortBy);

    sortMovies({ sortBy, page: String(page), genre, year })
      .unwrap()
      .then((res) => {
        setFoundMovies(res.results);
        setTotalPages(res.total_pages);
      });
  };

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
      <main className="flex min-h-screen flex-col items-center gap-12">
        <Header onSortMovies={onSortMovies} />
        <div className={"w-[1200px]"}>
          <input
            className={s.input}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            placeholder={"Search movies"}
          />

          {!foundMovies.length && (
            <p className={"text-center text-3xl pt-32"}>
              No movies found for this request, try another one 😔
            </p>
          )}
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
          >
            {searchMovies.length > 0 && searchMovies}
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
      {findStatus === "pending" && <Loader />}
      {sortStatus === "pending" && <Loader />}
    </>
  );
}
