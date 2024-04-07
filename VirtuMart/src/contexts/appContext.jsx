import { useState, useContext, useMemo, createContext } from "react";

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

  const values = useMemo(() => {
    return {
      data,
      setData,
    };
  }, [data]);

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
