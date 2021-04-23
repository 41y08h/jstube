import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, error, data: user } = useQuery("/api/auth/user", {
    retry: false,
    refetchOnWindowFocus: false,
  });

  function authAction(actionFn) {
    console.log("ok");
    if (isLoading) return;
    if (Boolean(user)) return actionFn();

    setIsModalOpen(true);
  }

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        error,
        isModalOpen,
        setIsModalOpen,
        authAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
