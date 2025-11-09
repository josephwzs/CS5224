import { useContext } from "react";
import { EcoAuthContext } from "./EcoAuthContext";

export const useEcoAuth = () => {
  const context = useContext(EcoAuthContext);
  if (!context) {
    throw new Error("useEcoAuth must be used within an EcoAuthProvider");
  }
  return context;
};
