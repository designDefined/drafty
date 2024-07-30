import { store } from "@policy-maker/core";
import { createContext, useContext } from "react";

export const StoreContext = createContext<typeof store | null>(null);

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context)
    throw new Error("useStoreContext must be used within a Provider");
  return context;
};
