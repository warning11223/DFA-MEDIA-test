import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import src from "redux-thunk/src";

const moviesApiKey = "422f111efe7319be39e92e4f142ba3d9";
export const imageUrl = "https://image.tmdb.org/t/p/w500";
const baseUrl = "https://api.themoviedb.org/3/";

export const theMovies = createApi({
  reducerPath: "theMoviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<TheMoviesResponse, string>({
      query: (value = "") => {
        return {
          url: `discover/movie?api_key=${moviesApiKey}&query=${value}`,
          method: "GET",
        };
      },
    }),
    getMovie: builder.query<GetMovie, string>({
      query: (id) => {
        return {
          url: `movie/${id}?api_key=${moviesApiKey}`,
        };
      },
    }),
    searchMovie: builder.query<
      SearchMovie,
      { value: string; page: string; sortBy: string }
    >({
      query: ({ value, page, sortBy }) => {
        return {
          url: `discover/movie?api_key=${moviesApiKey}&sort_by=popularity.asc`,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMoviesQuery, useGetMovieQuery, useLazySearchMovieQuery } =
  theMovies;

export type SearchMovie = {
  page: number;
  results: TheMovie[];
  total_pages: number;
  total_results: number;
};

type Genre = { id: number; name: string };

export type GetMovie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    { id: number; logo_path: string; name: string; origin_country: string },
  ];
  production_countries: [{ iso_3166_1: string; name: string }];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TheMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TheMoviesResponse = {
  page: number;
  results: TheMovie[];
  total_pages: number;
  total_results: number;
};
