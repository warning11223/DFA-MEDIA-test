"use client";

import React from "react";
import { useParams } from "next/navigation";

const Movie = () => {
  const params1 = useParams();
  console.log(params1.movie);

  return <div>hello</div>;
};

export default Movie;
