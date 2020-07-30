import React, { useState } from "react";
import { User } from "../../types";
import { englishSet, sexSet } from "../../App";
import styles from "./card.module.scss";

type StyleOverrides = {
  card?: string;
  remove?: string;
  update?: string;
  clear?: string;
  id?: string;
  age?: string;
  sex?: string;
  english?: string;
};

type CardProps = {
  onRemove?: (id: number) => void;
  onClear?: () => void;
  onSubmit: (user: User) => void;
  submitText: string;
  styleOverrides?: StyleOverrides;
} & User;

function Card(props: CardProps) {
  const [age, setAge] = useState(props.age);
  const [sex, setSex] = useState(props.sex);
  const [englishLevel, setEnglishLevel] = useState(props.englishLevel);

  return (
    <div className={props.styleOverrides?.card || styles.card}>
      <div className={props.styleOverrides?.id || styles.inner}>
        <label className={styles.label}>id:</label>
        <input maxLength={8} type="text" value={props.id} disabled />
      </div>
      <div className={props.styleOverrides?.age || styles.inner}>
        <label className={styles.label}>age:</label>
        <input
          min={0}
          max={120}
          type="number"
          value={age}
          onChange={(e) => setAge(+e.target.value)}
        />
      </div>
      <div className={props.styleOverrides?.sex || styles.inner}>
        <label className={styles.label}>sex:</label>
        <select
          value={sex}
          onChange={(e) => setSex(e.target.value as User["sex"])}
          name="sex"
        >
          {Array.from(sexSet).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className={props.styleOverrides?.english || styles.inner}>
        <label className={styles.label}>english:</label>
        <select
          value={englishLevel}
          onChange={(e) =>
            setEnglishLevel(e.target.value as User["englishLevel"])
          }
          name="englishLevel"
        >
          {Array.from(englishSet).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <button
        className={props.styleOverrides?.remove || styles.remove}
        onClick={() => props.onRemove && props.onRemove(props.id)}
      >
        x
      </button>
      <button
        className={props.styleOverrides?.clear || styles.clear}
        onClick={() => props.onClear && props.onClear()}
      >
        clear
      </button>
      <button
        className={props.styleOverrides?.update || styles.update}
        onClick={() => props.onSubmit({ id: props.id, age, sex, englishLevel })}
      >
        {props.submitText}
      </button>
    </div>
  );
}

export default Card;
