import React, { useState } from "react";
import { User } from "../../types";
import { englishSet } from "../../App";
import styles from "./card.module.scss";

type CardProps = {
  onRemove: (id: number) => void;
} & User;

function Card(props: CardProps) {
  const [age, setAge] = useState(props.age);
  const [sex, setSex] = useState(props.sex);
  const [englishLevel, setEnglishLevel] = useState(props.englishLevel);

  return (
    <div className={styles.card}>
      <button
        className={styles.remove}
        onClick={() => props.onRemove(props.id)}
      >
        x
      </button>
      <div className={styles.inner}>
        <label className={styles.label}>id:</label>
        <input maxLength={8} type="text" value={props.id} disabled />
      </div>
      <div className={styles.inner}>
        <label className={styles.label}>age:</label>
        <input
          min={0}
          max={120}
          type="number"
          value={age}
          onChange={(e) => setAge(+e.target.value)}
        />
      </div>
      <div className={styles.inner}>
        <label className={styles.label}>sex:</label>
        <select
          value={sex}
          onChange={(e) => setSex(e.target.value as User["sex"])}
          name="sex"
        >
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>
      <div className={styles.inner}>
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
    </div>
  );
}

export default Card;
