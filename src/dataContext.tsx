"use client";
import { createContext, useState } from "react";

interface IDataContext {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}
const DEFAULT_VALUE: IDataContext = {
  userId: "",
  setUserId: () => {},
};
const DataContext = createContext<IDataContext>(DEFAULT_VALUE);

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string>("");

  return (
    <DataContext.Provider value={{ userId, setUserId }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
