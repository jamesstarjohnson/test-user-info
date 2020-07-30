import React, { useState } from "react";
import { User } from "../../types";
import styles from "./card.module.scss";

function Card(props: User) {
  const [id, setId] = useState(props.id);
  const [age, setAge] = useState(props.age);
  return (
    <div className={styles.card}>
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
