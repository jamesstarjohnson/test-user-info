import React, { useState } from "react";
import Card from "./components/card";
import Info from "./components/info";
import Filter from "./components/filter";
import { User, Filtered } from "./types";
import styles from "./app.module.scss";

export const sexSet = new Set(["male", "female"]);
export const englishSet = new Set(["A1", "A2", "B1", "B2", "C1", "C2"]);
const idsSet = new Set();

const isAge = (age: number) => age > 0 && age < 120;
const isID = (id: number) => String(id).length === 8 && !idsSet.has(id);

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
      idsSet.add(id);
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
  const [filtered, setFiltered] = useState<Filtered>();

  const handleSubmit = (value: string) => {
    const values = value.split(",");
    const user = getUser(values);
    if (user !== undefined) {
      setUser([...users, user]);
    }
  };

  const handleRemove = (id: number) => {
    setUser(users.filter((u) => u.id !== id));
    idsSet.delete(id);
  };

  const handleUpdate = (user: User) => {
    setUser(users.map((u) => (u.id === user.id ? user : u)));
  };

  // TODO memoise
  const getUsers = () => {
    if (filtered === undefined) {
      return users;
    }
    return users.filter(
      (user) =>
        user.sex === filtered.sex && user.englishLevel === filtered.englishLevel
    );
  };

  return (
    <div className={styles.app}>
      <section className={styles.actionPanel}>
        <Info onSubmit={handleSubmit} />
        <Filter onFilter={setFiltered} />
      </section>
      <ul className={styles.list}>
        {getUsers().map((value) => (
          <li key={value.id}>
            <Card
              {...value}
              submitText="Update"
              onRemove={handleRemove}
              onSubmit={handleUpdate}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
