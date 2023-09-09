import React, { useEffect, useState } from "react";
import s from "@/app/[movie]/Movie.module.scss";
import { toast } from "react-toastify";
import {
  useLazyAddToFavouritesQuery,
  useRemoveFromFavouritesMutation,
} from "@/services/themovies";
import { useParams } from "next/navigation";
import { Loader } from "@/components/Loader";

export const Buttons = () => {
  const params = useParams();
  const [accountId, setAccountId] = useState("");
  const [sessionId, setSessionId] = useState("");

  const [addToFavourites, { status: favorStatus }] =
    useLazyAddToFavouritesQuery();
  const [removeFromFavourites, { status: removeStatus }] =
    useRemoveFromFavouritesMutation();

  useEffect(() => {
    const accountId = localStorage.getItem("accountId");
    const sessionId = localStorage.getItem("sessionId");
    if (accountId && sessionId) {
      setAccountId(accountId);
      setSessionId(sessionId);
    }
  }, []);

  const onAddToFavourites = () => {
    addToFavourites({ accountId, movieId: String(params.movie), sessionId })
      .unwrap()
      .then((res) => {
        toast.success(res.status_message);
      })
      .catch((err) => {
        toast.error(err.status_message);
      });
  };

  const onRemoveFromFavourites = () => {
    removeFromFavourites({
      movieId: String(params.movie),
      sessionId,
      accountId,
    })
      .unwrap()
      .then((res) => {
        toast.success(res.status_message);
      })
      .catch((err) => {
        toast.error(err.status_message);
      });
  };

  return (
    <>
      <div className={s.movie__favWrapper}>
        <button onClick={onAddToFavourites} className={s.movie__btn}>
          Add to favourites
        </button>
        <button onClick={onRemoveFromFavourites} className={s.movie__btn}>
          Remove from favourites
        </button>
      </div>

      {favorStatus === "pending" && <Loader />}
      {removeStatus === "pending" && <Loader />}
    </>
  );
};
