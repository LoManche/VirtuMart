import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Topbar from "./components/topbar";

const ROUTES = [
  { path: "*", element: <Navigate to="/" /> },
  { path: "/", element: <Home /> },
];

export default function Router() {
  return (
    <>
      <Topbar />
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
}
