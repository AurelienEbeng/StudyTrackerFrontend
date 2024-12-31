import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./navbar/Navbar";
import { lazy } from "react";

const Login = lazy(() => import("./login/Login"));
const Highlight = lazy(() => import("./highlight/Highlight"));
function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="wrapper">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Highlight />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
