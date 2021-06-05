import { AxiosError } from "axios";
import User from "../interfaces/User";
import { useQuery } from "react-query";
import LoginModal from "../components/LoginModal";
import React, { createContext, FC, useContext, useState } from "react";

interface AuthContext {
  isLoading: boolean;
  error: AxiosError<any> | null;
  user?: User;
  authenticate<T extends (...args: any[]) => any>(
    fn: T
  ): (...fnArgs: Parameters<T>) => ReturnType<T> | void;
}

const AuthContext = createContext<any>(undefined);

export function useAuth(): AuthContext {
  return useContext(AuthContext);
}

export const AuthProvider: FC = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { isLoading, error, data } = useQuery<User, AxiosError>(
    "/api/auth/user",
    { retry: false, staleTime: Infinity }
  );

  const user = data;

  function authenticate<T extends (...args: any[]) => any>(
    fn: T
  ): (...fnArgs: Parameters<T>) => ReturnType<T> | void {
    return (...args: Parameters<T>): ReturnType<T> | void => {
      // The auth status is loading
      if (isLoading) return;

      // The user is authenticated
      const isUserAuthenticated = Boolean(user);
      if (isUserAuthenticated) return fn(...args);

      // The user is not authenticated
      setIsLoginModalOpen(true);
    };
  }

  const value = { isLoading, error, authenticate, user };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
    </AuthContext.Provider>
  );
};
