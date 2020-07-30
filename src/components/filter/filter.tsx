import React from "react";
import Card from "../card";
import { User, Filtered } from "../../types";
import styles from "./filter.module.scss";

function Filter(props: { onFilter: (filtered: Filtered | undefined) => void }) {
  const user: User = {
    id: 12345678,
    sex: "female",
    age: 25,
    englishLevel: "B1",
  };

  const { card, remove, age, sex, english, id, clear } = styles;

  const handleSubmit = (user: User) => {
    props.onFilter({ sex: user.sex, englishLevel: user.englishLevel });
  };

  return (
    <Card
      submitText="Filter"
      styleOverrides={{ card, remove, age, sex, english, id, clear }}
      {...user}
      onSubmit={handleSubmit}
      onClear={() => props.onFilter(undefined)}
    />
  );
}

export default Filter;
