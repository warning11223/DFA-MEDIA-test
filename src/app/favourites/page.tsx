"use client";

import React from "react";
import Link from "next/link";

import s from "./Favourites.module.scss";
import { FavouritesCarousel } from "@/app/favourites/FavouritesCarousel";

const Favourites = () => {
  return (
    <>
      <div className={s.favourites}>
        <div className={s.favourites__wrapper}>
          <h1 className={s.favourites__title}>Favourites movies</h1>
          <div className={"w-[1200px]"}>
            <div className={"flex justify-center"}>
              <FavouritesCarousel />
            </div>
          </div>

          <Link href={"/"} className={s.favourites__btn}>
            Back to main
          </Link>
        </div>
      </div>
    </>
  );
};

export default Favourites;
