import React, { useState, ChangeEvent } from "react";
import s from "./YearSelect.module.scss";

type Props = {
  setYear: (value: string) => void;
};

export const YearSelect: React.FC<Props> = ({ setYear }) => {
  const [selectedYear, setSelectedYear] = useState<number | "">(""); // Состояние выбранного года

  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputYear = parseInt(event.target.value, 10);
    setYear(String(inputYear));
    setSelectedYear(inputYear);
  };

  return (
    <div className={s.selectContainer}>
      <input
        placeholder={"Year"}
        type="number"
        id="yearInput"
        name="yearInput"
        value={selectedYear}
        onChange={handleYearChange}
        min={1900}
        max={2024}
      />
    </div>
  );
};
