import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const moviesApiKey = "422f111efe7319be39e92e4f142ba3d9";
export const imageUrl = "https://image.tmdb.org/t/p/w500";
const baseUrl = "https://api.themoviedb.org/3/";

export const theMovies = createApi({
  reducerPath: "theMoviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<TheMoviesResponse, void>({
      query: () => {
        return {
          url: `discover/movie?api_key=${moviesApiKey}`,
          method: "GET",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMoviesQuery } = theMovies;

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
