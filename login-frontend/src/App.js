import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RegisterPage from "./pages/RegisterPage";
function App() {
  return (
    <BrowserRouter>
     <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        
        <Route
          path="/"
          element={<RegisterPage  />}
        />
          <Route path="/register" element={<RegisterPage />} />

        <Route path="/login" element={<LoginPage/>} />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;