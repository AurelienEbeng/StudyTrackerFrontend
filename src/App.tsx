import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./navbar/Navbar";
import { lazy } from "react";

const Login = lazy(() => import("./login/Login"));
const Highlight = lazy(() => import("./highlight/Highlight"));
const Task = lazy(() => import("./task/Task"));
const NewTask = lazy(() => import("./task/NewTask"));
const UpdateTask = lazy(() => import("./task/UpdateTask"));
const NewSession = lazy(() => import("./session/NewSession"));
const ListSessions = lazy(() => import("./session/ListSessions"));
const Profile = lazy(() => import("./profile/Profile"));
const Logout = lazy(() => import("./logout/Logout"));
const Register = lazy(() => import("./register/Register"));

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="wrapper">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Highlight />} />
          <Route path="/task" element={<Task />} />
          <Route path="/task/create" element={<NewTask />} />
          <Route path="/task/update" element={<UpdateTask />} />
          <Route path="/session" element={<NewSession />} />
          <Route path="/session/list" element={<ListSessions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
