import { createContext, PropsWithChildren, useContext, useState } from "react";
import httpModule from "../helpers/http.module";

type User = {
  username: string;
  jwtToken: string;
  id: string;
};

type UserContext = {
  user: User;
  login: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

const JwtContext = createContext<UserContext>({} as UserContext);

type JwtProviderProps = PropsWithChildren;

export default function JwtProvider({ children }: JwtProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  const login = async (email: string, password: string) => {
    await httpModule
      .post("auth/login", { email, password})
      .then((response) => {
        setUser({
          username: response.data.username,
          jwtToken: response.data.jwt,
          id: response.data.userId,
        });
      })
      .catch((error) => console.log(error));
  };


  const logout = async () => {
    setUser({} as User);
  };

  const isLoggedIn = () => {
    if (user.id === undefined || user.jwtToken === undefined) {
      return false;
    }
    return true;
  };

  return (
    <JwtContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </JwtContext.Provider>
  );
}

export const useJwt = () => {
  const context = useContext(JwtContext);

  if (context === undefined) {
    throw new Error("useJWT must be used within an JwtProvider");
  }

  return context;
};
