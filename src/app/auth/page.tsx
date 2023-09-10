"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLazyCreateRequestTokenQuery } from "@/services/themovies";

import s from "./Auth.module.scss";
import { Loader } from "@/components/Loader";
import { toast } from "react-toastify";

const Auth = () => {
  const [createToken, { isLoading }] = useLazyCreateRequestTokenQuery();
  const router = useRouter();

  const onCreate = () => {
    createToken()
      .unwrap()
      .then((res) => {
        router.push(
          `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=${window.location.origin}/success`,
        );
      })
      .catch(() => {
        toast.error("Error");
      });
  };

  return (
    <>
      <div className={s.auth}>
        <div className={s.auth__wrapper}>
          <button onClick={onCreate} className={s.auth__btn}>
            Login
          </button>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default Auth;
