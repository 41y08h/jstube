import { AxiosError } from "axios";
import { createContext, useContext } from "react";
import User from "../../interfaces/User";

interface AuthContext {
  isLoading: boolean;
  error: AxiosError;
  user: User;
  authenticatedAction(action: Function): void;
}

const AuthContext = createContext<AuthContext>(undefined);

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
