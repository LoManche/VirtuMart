// Programmer: Ng Tiffany 1155158907
// Date: 2024-04-11
// Purpose:
//    This is for setting the functions required to use context within the application
// Called By: app.jsx

import { useState, useContext, useMemo, createContext } from "react";

export const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppContextProvider = ({ initData, children }) => {
  const [data, setData] = useState(initData || {});
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));
  const [user, setUser] = useState({
    userId: localStorage.getItem("userid"),
    role: localStorage.getItem("role"),
  });

  const values = useMemo(() => {
    return {
      data,
      setData,
      isLogin,
      setIsLogin,
      user,
      setUser,
    };
  }, [data, isLogin, user]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
