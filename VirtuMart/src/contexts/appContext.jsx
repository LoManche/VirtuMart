import { useState, useContext, useMemo, createContext, useEffect } from "react";

/**
 * @type {import("react").Context<{
 *  initialized: boolean,
 *  data: {
 *    [key: string]: any,
 *  },
 *  setData: import("react").Dispatch<import("react").SetStateAction<{}>>,
 * }>}
 */
export const AppContext = createContext();

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

/**
 * @returns {{
 *  initialized: boolean,
 *  data: {
 *    [key: string]: any,
 *  },
 *  setData: import("react").Dispatch<import("react").SetStateAction<{}>>,
 * }}
 */
export const useAppContext = () => {
  return useContext(AppContext);
};
