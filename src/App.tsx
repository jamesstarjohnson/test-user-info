import React, { useState } from "react";
import Card from "./components/card";
import Info from "./components/info";
import { User } from "./types";
import styles from "./app.module.scss";

const sexSet = new Set(["male", "female"]);
const englishSet = new Set(["A1", "A2", "B1", "B2", "C1", "C2"]);

const isAge = (age: number) => age > 0 && age < 120;
const isID = (id: number) => String(id).length === 8;

const getUser = (values: string[]): User | undefined => {
  let sex: User["sex"] | undefined = undefined;
  let age: User["age"] | undefined = undefined;
  let id: User["id"] | undefined = undefined;
  let englishLevel: User["englishLevel"] | undefined = undefined;
  values.forEach((value) => {
    if (sexSet.has(value)) {
      sex = value as User["sex"];
    } else if (englishSet.has(value)) {
      englishLevel = value as User["englishLevel"];
    } else if (!isNaN(Number(value)) && isAge(Number(value))) {
      age = Number(value) as User["age"];
    } else if (!isNaN(Number(value)) && isID(Number(value))) {
      id = Number(value) as User["id"];
    }
  });
  if (sex && age && id && englishLevel) {
    return {
      id,
      age,
      sex,
      englishLevel,
    };
  }
  return undefined;
};

function App() {
  const [users, setUser] = useState<User[]>([]);

  const handleSubmit = (value: string) => {
    const values = value.split(",");
    const user = getUser(values);
    if (user !== undefined) {
      setUser([...users, user]);
    }
  };
  return (
    <div className={styles.app}>
      <Info onSubmit={handleSubmit} />
      <ul className={styles.list}>
        {users.map((value) => (
          <li key={value.id}>
            <Card {...value} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
