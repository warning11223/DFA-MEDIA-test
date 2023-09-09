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
    getMovies: builder.query<TheMoviesResponse, string>({
      query: (value = "") => {
        return {
          url: `search/movie?api_key=${moviesApiKey}&query=${value}`,
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
    searchMovie: builder.query<SearchMovie, { value: string; page: string }>({
      query: ({ value, page }) => {
        return {
          url: `search/movie?api_key=${moviesApiKey}&query=${value}&page=${page}`,
        };
      },
    }),
    sortMovies: builder.query<
      TheMoviesResponse,
      { sortBy: string; page: string; genre: string; year: string }
    >({
      query: ({ sortBy, page, genre, year }) => {
        return {
          url: `discover/movie?api_key=${moviesApiKey}&page=1&sort_by=${sortBy}&with_genres=${genre}&primary_release_year=${year}&page=${page}`,
        };
      },
    }),
    createNewSession: builder.mutation<
      { session_id: string; success: boolean },
      { token: string; username: string; password: string }
    >({
      query: ({ password, username, token }) => {
        return {
          url: `authentication/session/new?api_key=${moviesApiKey}`,
          method: "POST",
          body: {
            api_key: moviesApiKey,
            request_token: token,
            username: username,
            password: password,
          },
        };
      },
    }),
    createRequestToken: builder.query<RequestToken, void>({
      query: () => {
        return {
          url: `authentication/token/new?api_key=${moviesApiKey}`,
          method: "GET",
        };
      },
    }),
    deleteSession: builder.mutation<{ success: boolean }, string>({
      query: (sessionId) => {
        return {
          url: `authentication/session?api_key=${moviesApiKey}`,
          method: "DELETE",
          body: {
            api_key: moviesApiKey,
            session_id: sessionId,
          },
        };
      },
    }),
    getAccountInfo: builder.query<AccountInfo, string>({
      query: (sessionId) => {
        return {
          url: `account?api_key=${moviesApiKey}&session_id=${sessionId}`,
          method: "GET",
        };
      },
    }),
    addToFavourites: builder.query<
      { status_code: number; status_message: string; success: boolean },
      { accountId: string; movieId: string; sessionId: string }
    >({
      query: ({ accountId, movieId, sessionId }) => {
        return {
          url: `account/${accountId}/favorite?api_key=${moviesApiKey}&session_id=${sessionId}`,
          method: "POST",
          body: {
            media_type: "movie",
            media_id: movieId,
            favorite: true,
          },
        };
      },
    }),
    removeFromFavourites: builder.mutation<
      { status_code: number; status_message: string; success: boolean },
      { accountId: string; movieId: string; sessionId: string }
    >({
      query: ({ accountId, movieId, sessionId }) => {
        return {
          url: `account/${accountId}/favorite?api_key=${moviesApiKey}&session_id=${sessionId}`,
          method: "POST",
          body: {
            media_type: "movie",
            media_id: movieId,
            favorite: false,
          },
        };
      },
    }),
    getFavouritesMovies: builder.query<
      TheMoviesResponse,
      { accountId: string; sessionId: string }
    >({
      query: ({ accountId, sessionId }) => {
        return {
          url: `account/${accountId}/favorite/movies?api_key=${moviesApiKey}&session_id=${sessionId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieQuery,
  useLazySearchMovieQuery,
  useLazySortMoviesQuery,
  useLazyCreateRequestTokenQuery,
  useCreateNewSessionMutation,
  useDeleteSessionMutation,
  useLazyGetAccountInfoQuery,
  useLazyAddToFavouritesQuery,
  useLazyGetFavouritesMoviesQuery,
  useRemoveFromFavouritesMutation,
} = theMovies;

type AccountInfo = {
  avatar: { gravatar: { hash: string }; tmdb: { avatar_path: null } };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

type RequestToken = {
  expires_at: string;
  request_token: string;
  success: boolean;
};

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
