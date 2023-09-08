import React from "react";

import s from "./Header.module.scss";
import { Select } from "@/components/Select";

type Props = {
  inputValue: string;
  setInputValue: (value: string) => void;
  setSortBy: (value: string) => void;
};

export const Header: React.FC<Props> = ({
  setInputValue,
  inputValue,
  setSortBy,
}) => {
  return (
    <header className={s.header}>
      <div className={s.header__wrapper}>
        <input
          className={s.header__input}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          placeholder={"Search movies"}
        />
        <Select setSortBy={setSortBy} />
      </div>
    </header>
  );
};
