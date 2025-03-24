import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./middleware/protected";
import { Login } from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<h1 className="bold m-1">Opps !!! Page Not Found</h1>} />
    </Routes>
  );
};

export default App;
