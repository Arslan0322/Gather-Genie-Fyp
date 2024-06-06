import { createContext, useContext } from "react";

const IsMobileContext = createContext();

export function IsMobileProvider({ children }) {
  return (
    <IsMobileContext.Provider value={window.innerWidth <= 767}>
      {children}
    </IsMobileContext.Provider>
  );
}

export function useIsMobile() {
  return useContext(IsMobileContext);
}
