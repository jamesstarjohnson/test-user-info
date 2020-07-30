import React, { useState } from "react";
import styles from "./info.module.scss";

function Info(props: { onSubmit: (value: string) => void }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(value);
  };
  return (
    <form className={styles.info} onSubmit={handleSubmit}>
      <label>
        Data:
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Info;
