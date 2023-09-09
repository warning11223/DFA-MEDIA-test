import React, { useEffect, useState } from "react";

import s from "./Header.module.scss";
import { SortSelect } from "./SortSelect";
import { GenresSelect } from "@/components/Header/GenresSelect";
import { YearSelect } from "@/components/Header/YearSelect";
import { useDeleteSessionMutation } from "@/services/themovies";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";
import { toast } from "react-toastify";
import Link from "next/link";

type Props = {
  onSortMovies: (sortBy: string, genre: string, year: string) => void;
};

export const Header: React.FC<Props> = ({ onSortMovies }) => {
  const [sort, setSort] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [sessionId, setSessionId] = useState("");
  const router = useRouter();

  const [deleteSession, { isLoading }] = useDeleteSessionMutation();

  useEffect(() => {
    const id = localStorage.getItem("sessionId");
    if (id) {
      setSessionId(id);
    }
  }, []);

  const onSortHandler = () => {
    onSortMovies(sort, genre, year);
  };

  const onLogout = () => {
    deleteSession(sessionId)
      .unwrap()
      .then((res) => {
        if (res.success) {
          localStorage.removeItem("sessionId");
          localStorage.removeItem("accountId");
          router.push("/auth");
        }
      })
      .catch((err) => {
        toast.error(err?.data?.status_message || "Error");
      });
  };

  return (
    <>
      <header className={s.header}>
        <div className={s.header__container}>
          <div className={s.header__wrapper}>
            <SortSelect setSort={setSort} />
            <GenresSelect setGenre={setGenre} />
            <YearSelect setYear={setYear} />
            <button onClick={onSortHandler} className={s.btn}>
              Filter
            </button>
          </div>
          <Link href={"/favourites"} className={s.favBtn}>
            Favourites
          </Link>
          <button className={s.logout} onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>
      {isLoading && <Loader />}
    </>
  );
};
