import { createContext, useState } from "react";
import { SERIE } from "../types/types";

interface AppContextProps {
  selectedSerie: SERIE | null;
  setSelectedSerie: React.Dispatch<React.SetStateAction<any>>;
  isSBOpen: boolean;
  setIsSBOpen: (val: boolean) => void;
}

export const context = createContext({} as AppContextProps);

const AppContext = ({ children }: { children: JSX.Element }) => {
  const [selectedSerie, setSelectedSerie] = useState(null);
  const [isSBOpen, setIsSBOpen] = useState(false);

  return (
    <context.Provider
      value={{ selectedSerie, setSelectedSerie, isSBOpen, setIsSBOpen }}
    >
      {children}
    </context.Provider>
  );
};

export default AppContext;
