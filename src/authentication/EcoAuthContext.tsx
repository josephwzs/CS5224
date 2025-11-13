import { createContext } from "react";
import type { User } from "../types/data-types";

export type EcoAuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  isRestored: boolean;
  login: (formData: { email: string; password: string }) => Promise<any>;
  logout?: () => void;
  refreshToken?: () => Promise<void>;
  user?: string;
  userName?: string;
  accessToken?: string;
  roles?: string[];
  email?: string;
  users: User[];
};

export const EcoAuthContext = createContext<EcoAuthContextType | undefined>(
  undefined
);
