import React, { useState } from "react";
import { User } from "../../types";
import styles from "./card.module.scss";

type CardProps = {
  onRemove: (id: number) => void;
} & User;

function Card(props: CardProps) {
  const [id, setId] = useState(props.id);
  const [age, setAge] = useState(props.age);
  return (
    <div className={styles.card}>
      <button
        className={styles.remove}
        onClick={() => props.onRemove(props.id)}
      >
        x
      </button>
      <div className={styles.inner}>
        <span className={styles.label}>id:</span>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(+e.target.value)}
        />
      </div>
      <div className={styles.inner}>
        <span className={styles.label}>age:</span>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(+e.target.value)}
        />
      </div>
    </div>
  );
}

export default Card;
