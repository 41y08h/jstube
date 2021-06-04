import { AxiosError } from "axios";
import { createContext, useContext } from "react";
import User from "../../interfaces/User";

interface AuthContext {
  isLoading: boolean;
  error: AxiosError<any>;
  user?: User;
  authenticatedAction(action: Function): () => any;
}

const AuthContext = createContext<any>(undefined);

export function useAuth(): AuthContext {
  return useContext(AuthContext);
}

export default AuthContext;
