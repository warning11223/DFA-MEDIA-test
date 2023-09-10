import React, { useState, ChangeEvent } from "react";
import s from "./GenresSelect.module.scss";
import { genres } from "@/data";

type Props = {
  setGenre: (value: string) => void;
};

export const GenresSelect: React.FC<Props> = ({ setGenre }) => {
  const [selectedGenre, setSelectedGenre] = useState<number | "">(""); // Состояние выбранного жанра

  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value, 10);
    setSelectedGenre(value);
    setGenre(String(value));
  };

  const genresRender = genres.map((genre) => (
    <option key={genre.id} value={genre.id}>
      {genre.name}
    </option>
  ));

  return (
    <div className={s.selectContainer}>
      <select
        placeholder={"Genre"}
        id="genreSelect"
        name="genreSelect"
        value={selectedGenre}
        onChange={handleGenreChange}
      >
        <option value="" disabled>
          Genre:
        </option>
        {genresRender}
      </select>
    </div>
  );
};
