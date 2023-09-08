import React, { useState } from "react";

import s from "./Select.module.scss";

type Props = {
  setSortBy: (value: string) => void;
};

export const Select: React.FC<Props> = ({ setSortBy }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setSortBy(event.target.value);
  };

  return (
    <div className={s["select-container"]}>
      <select
        id="sort-select"
        onChange={handleSelectChange}
        value={selectedOption}
        className={s.select}
      >
        <option value="" disabled>
          Sort by
        </option>
        <option value="popularity.asc">Popularity(asc)</option>
        <option value="popularity.desc">Popularity(desc)</option>
        <option value="revenue.asc">Revenue(asc)</option>
        <option value="revenue.desc">Revenue(desc)</option>
        <option value="primary_release_date.asc">
          Primary release date(asc)
        </option>
        <option value="primary_release_date.desc">
          Primary release date(desc)
        </option>
        <option value="vote_average.asc">Vote average(asc)</option>
        <option value="vote_average.desc">Vote average(desc)</option>
        <option value="vote_count.asc">Vote count(asc)</option>
        <option value="vote_count.desc">Vote count(desc)</option>
      </select>
    </div>
  );
};
