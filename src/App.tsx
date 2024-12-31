import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./navbar/Navbar";
import { lazy } from "react";

const Login = lazy(() => import("./login/Login"));
const Highlight = lazy(() => import("./highlight/Highlight"));
const Task = lazy(() => import("./task/Task"));
function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="wrapper">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Highlight />} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
