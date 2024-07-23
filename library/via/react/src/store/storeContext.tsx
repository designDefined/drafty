import { Store } from "library/via/core";
import { createContext, PropsWithChildren } from "react";

// context
export const ViaContext = createContext<Store | null>(null);

export const Via = ({
  store,
  children,
}: PropsWithChildren & { store: Store }) => {
  return <ViaContext.Provider value={store}>{children}</ViaContext.Provider>;
};
