// Programmer: Ng Tiffany 1155158907
// Date: 2024-04-11
// Purpose:
//    Create the routing configuration for the website, allowing navigation between different pages

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Topbar from "./components/topbar";
import Profile from "./pages/profile";
import Product from "./pages/product";
import Account from "./pages/account";
import Admin from "./pages/admin/admin";
import ShoppingCart from "./pages/shoppingCart";
import Order from "./pages/order";
import { Box } from "@mui/material";
import Footer from "./components/footer";
import { useAppContext } from "./contexts/appContext";
import SearchResult from "./pages/searchResult";

const NoNeedLoginROUTES = [
  // /* No need login */
  { path: "*", element: <Navigate to="/" /> },
  { path: "/", element: <Home /> },
  { path: "/account", element: <Account />, type: "account" },
  { path: "/result", element: <SearchResult /> },
  /* Indirect pages */
  { path: "/product/:productId", element: <Product /> },
  { path: "/shoppingCart", element: <ShoppingCart /> },
  { path: "/order", element: <Order /> },
  {
    path: "/resetpassword/hashed/:hashed",
    element: <Account presetPage={"resetPs"} />,
    type: "account",
  },
];

const ROUTES = [
  /* Direct pages */
  { path: "*", element: <Navigate to="/" /> },
  { path: "/", element: <Home /> },
  { path: "/profile", element: <Profile /> },
  { path: "/shoppingCart", element: <ShoppingCart /> },
  { path: "/order", element: <Order /> },
  { path: "/result", element: <SearchResult /> },

  /* Indirect pages */
  { path: "/product/:productId", element: <Product /> },

  /* Admin pages */
  {
    level: "admin",
    path: "/admin",
    element: <Admin />,
  },
];

function WithoutLoginRouter() {
  return (
    <Routes>
      {NoNeedLoginROUTES.map(({ path, element, type }) => (
        <Route
          key={path}
          path={path}
          element={
            <>
              <Topbar type={type} />
              <Box p={2} pb="62px">
                {element}
              </Box>
              <Footer />
            </>
          }
        />
      ))}
    </Routes>
  );
}

export default function Router() {
  const isLogin = useAppContext()?.isLogin;
  const user = useAppContext()?.user;

  if (!isLogin) {
    return <WithoutLoginRouter />;
  }

  return (
    <>
      <Topbar />
      <Box p={2} pb="62px">
        <Routes>
          {ROUTES.map(({ path, element, level }) =>
            level === undefined || level === user.role ? (
              <Route key={path} path={path} element={element} />
            ) : (
              <></>
            ),
          )}
        </Routes>
      </Box>
      <Footer />
    </>
  );
}
