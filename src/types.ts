export type User = {
  id: number;
  age: number;
  sex: "male" | "female";
  englishLevel: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
};

export type Filtered = Pick<User, "sex" | "englishLevel">;
