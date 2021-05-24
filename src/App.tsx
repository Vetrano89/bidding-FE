import React, { createContext, useEffect } from "react";
import { useContextValue } from "./hooks/context-hooks";
import ContextData from "./model/context-data";
import Overview from "./pages/overview";

export const contextDefaultValue: ContextData = {
  bids: [],
  deals: [],
  parties: [],
  partyId: undefined,
  fetchData: () => null,
  setPartyId: () => null,
  isLoading: false,
};

export const Context = createContext<ContextData | undefined>(undefined);

function App() {
  const contextValue = useContextValue();

  useEffect(() => {
    contextValue.fetchData();
  }, []);

  return (
    <Context.Provider value={contextValue}>
      <Overview />
    </Context.Provider>
  );
}

export default App;
