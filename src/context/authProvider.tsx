import { createContext, useContext, useState } from "react";

interface IToken {
  accessToken: string;
}
interface IAuthContext {
  auth: IToken;
  setAuth: (auth: IToken) => void;
}

const initialToken = {
  accessToken: "",
};

const initialAuthContext: IAuthContext = {
  auth: initialToken,
  setAuth: (auth: IToken) => undefined,
};

const AuthContext = createContext<IAuthContext>(initialAuthContext);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [auth, setAuth] = useState<IToken>(initialToken);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}
