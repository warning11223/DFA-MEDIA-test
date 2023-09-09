"use client";

import React, { useState } from "react";
import s from "./Success.module.scss";
import {
  useCreateNewSessionMutation,
  useLazyGetAccountInfoQuery,
} from "@/services/themovies";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";
import { toast } from "react-toastify";

const Success = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { request_token: string };
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [createNewSession, { isLoading }] = useCreateNewSessionMutation();
  const [getAccountInfo] = useLazyGetAccountInfoQuery();

  const onCreate = () => {
    createNewSession({
      username,
      password,
      token: searchParams.request_token,
    })
      .unwrap()
      .then((res) => {
        getAccountInfo(res.session_id)
          .unwrap()
          .then((res) => {
            localStorage.setItem("accountId", String(res.id));
          });
        localStorage.setItem("sessionId", res.session_id);
        router.push("/");
      })
      .catch((err) => {
        router.push("/auth");
        toast.error(err?.data?.status_message || "Error");
      });
  };

  return (
    <>
      <div className={s.success}>
        <div className={s.success__container}>
          <h2 className={s.success__title}>Registration</h2>
          <input
            type="text"
            className={s["login-input"]}
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <input
            type="password"
            className={s["password-input"]}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <div className={s.success__wrapper}>
            <button className={s.success__btn} onClick={onCreate}>
              Save
            </button>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default Success;
