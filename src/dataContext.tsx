"use client";
import { createContext, useState } from "react";

interface IDataContext {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  exhibitionId: string;
  setExhibitionId: React.Dispatch<React.SetStateAction<string>>;
  role: { id: string; name: string };
  setRole: React.Dispatch<React.SetStateAction<{ id: string; name: string }>>;
}
const DEFAULT_VALUE: IDataContext = {
  userId: "",
  setUserId: () => {},
  exhibitionId: "",
  setExhibitionId: () => {},
  role: { id: "", name: "" },
  setRole: () => {},
};
const DataContext = createContext<IDataContext>(DEFAULT_VALUE);

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string>("");
  const [exhibitionId, setExhibitionId] = useState<string>("");
  const [role, setRole] = useState<{ id: string; name: string }>({
    id: "",
    name: "string",
  });

  return (
    <DataContext.Provider
      value={{
        userId,
        setUserId,
        exhibitionId,
        setExhibitionId,
        role,
        setRole,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataContextProvider };
