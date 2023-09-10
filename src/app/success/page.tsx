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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;

  const router = useRouter();

  const [createNewSession, { isLoading }] = useCreateNewSessionMutation();
  const [getAccountInfo, { status }] = useLazyGetAccountInfoQuery();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    try {
      const res = await createNewSession({
        username,
        password,
        token: searchParams.request_token,
      }).unwrap();

      const accountInfo = await getAccountInfo(res.session_id).unwrap();

      localStorage.setItem("accountId", String(accountInfo.id));
      localStorage.setItem("sessionId", res.session_id);

      toast.success(`Hello, ${accountInfo.username}`);
      router.push("/");
    } catch (err) {
      router.push("/auth");
      toast.error("Error, session denied");
    }
  };

  return (
    <>
      <div className={s.success}>
        <div className={s.success__container}>
          <h2 className={s.success__title}>Регистрация</h2>
          <input
            type="text"
            className={s["login-input"]}
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            className={s["password-input"]}
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          <div className={s.success__wrapper}>
            <button className={s.success__btn} onClick={handleCreate}>
              Save
            </button>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
      {status === "pending" && <Loader />}
    </>
  );
};

export default Success;
