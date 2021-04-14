import { createContext, useContext } from "react";
import { useQuery } from "react-query";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const { isLoading, error, data: user } = useQuery("/auth/current-user");

  return (
    <AuthContext.Provider value={{ isLoading, user, error }}>
      {children}
    </AuthContext.Provider>
  );
}
