import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import { IUser } from "../models/IUser";

interface IAuthUser {
  user: IUser | null;
  isAuth: boolean;
  // hasAddedEmail: boolean;
  setAuth: (user: IUser) => void;
}

const getInitialState = () => {
  return JSON.parse(localStorage.getItem("auth-user") || "{}");
};

const getAuthInitialState = () => {
  return JSON.parse(localStorage.getItem("auth-user") || "{}").isAuth;
};

// const getHasAddedEmailInitialState = () => {
//   return JSON.parse(localStorage.getItem("auth-user") || "{}").hasAddedEmail;
// };

const AuthContext = createContext<IAuthUser | null>(null);

export const ProvideAuth = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(getInitialState);
  const [isAuth, setIsAuth] = useState<boolean>(getAuthInitialState);
  // const [hasAddedEmail, setHasAddedEmail] = useState<boolean>(
  //   getHasAddedEmailInitialState
  // );

  function setAuth(user: IUser) {
    setUser(() => user);
    setIsAuth(() => true);
  }
  function setUnAuth() {
    localStorage.removeItem("auth-user");
    setUser(() => null);
    setIsAuth(() => false);
  }

  // function setAddedEmail(user: IUser) {
  //   setHasAddedEmail(() => true);
  // }
  // function setDeletedEmail() {
  //   localStorage.removeItem("auth-user");
  //   setHasAddedEmail(() => false);
  // }

  useEffect(() => {
    localStorage.setItem("auth-user", JSON.stringify({ ...user, isAuth }));
  }, [user, isAuth]);
  const auth = {
    user,
    isAuth,
    setAuth,
    setUnAuth,
    // hasAddedEmail,
    // setAddedEmail,
    // setDeletedEmail,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// function useProvideAuth() {
//   const [user, setUser] = useState<IUser | null>(null);
//   const [isAuth, setIsAuth] = useState<boolean>(false);

//   function setAuth(user: IUser) {
//     setUser(() => user);
//     setIsAuth(() => true);
//   }
//   function updateAuth() {}
//   const auth = { user, isAuth, setAuth };
//   return {
//     auth,
//     updateAuth
//   };
// }
