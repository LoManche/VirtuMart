import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Topbar from "./components/topbar";
import Profile from "./pages/profile";
import Product from "./pages/product";
import Account from "./pages/account";
import ShoppingCart from "./pages/shoppingCart";
import Order from "./pages/order";
import { Box } from "@mui/material";

const ROUTES = [
  { path: "*", element: <Navigate to="/" /> },
  { path: "/", element: <Home /> },
  { path: "/account", element: <Account /> },
  { path: "/profile", element: <Profile /> },
  { path: "/product/:productId", element: <Product /> },
  { path: "/shoppingCart", element: <ShoppingCart /> },
  { path: "/order", element: <Order /> },
];

export default function Router() {
  return (
    <>
      <Topbar />
      <Box p={2}>
        <Routes>
          {ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Box>
    </>
  );
}
