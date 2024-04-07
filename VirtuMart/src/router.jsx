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
// import { useAppContext } from "./contexts/appContext";

export const roles = {
  admin: "admin",
  customer: "customer",
};

export const displayRoles = {
  admin: "Admin",
  customer: "Customer",
};

export const authorize = {
  admin: (role) => {
    return role === roles.admin;
  },
  customer: () => {
    return true;
  },
};

const NoNeedLoginROUTES = [
  // /* No need login */
  { path: "*", element: <Navigate to="/" /> },
  { path: "/", element: <Home /> },
  { path: "/account", element: <Account />, type: "account" },
  { path: "/profile", element: <Navigate to="/account" />, type: "account" },
  { path: "/shoppingCart", element: <Navigate to="/account" />, type: "account" },
  { path: "/order", element: <Navigate to="/account" />, type: "account" },
  /* Indirect pages */
  { path: "/product/:productId", element: <Product /> },
];

const ROUTES = [
  /* Direct pages */
  { path: "*", element: <Navigate to="/" /> },
  { path: "/", element: <Home /> },
  { path: "/profile", element: <Profile /> },
  { path: "/shoppingCart", element: <ShoppingCart /> },
  { path: "/order", element: <Order /> },

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
  const isLogin = true; // useAppContext()?.isLogin; //for testing other functions, can set isLogin to true
  const user = { role: "admin" }; // useAppContext()?.user;

  if (!isLogin) {
    return <WithoutLoginRouter />;
  }

  return (
    <>
      <Topbar isLogin={true} role />
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
