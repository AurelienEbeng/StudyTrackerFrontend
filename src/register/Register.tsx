import { useState } from "react";
import "./Register.css";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import httpModule from "../helpers/http.module";
import { useJwt } from "../context/Jwt.context";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const jwt = useJwt();
  const navigate = useNavigate();

  function handleSave() {
    if (
      user.email === "" ||
      user.password === "" ||
      user.confirmPassword == "" ||
      user.username == ""
    ) {
      alert("Fill  all fields");
      return;
    }

    if (/\w+@[a-z]+.[a-z]+/.test(user.email) == false) {
      alert("Please enter a valid email");
      return;
    }

    if (user.password != user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    let email = user.email;
    let password = user.password;
    let username = user.username;
    httpModule
      .post("/auth/register", { email, password, username })
      .then(async () => {
        await jwt.login(user.email, user.password);
        navigate("/");
      })
      .catch((error) => {
        alert("Error");
        console.log(error.response);
        setLoading(false);
      });
  }

  return (
    <div className="content">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="register">
          <h2>Register</h2>
          <TextField
            autoComplete="off"
            label="Email"
            variant="outlined"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            autoComplete="off"
            label="Username"
            variant="outlined"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <TextField
            autoComplete="off"
            label="Password"
            variant="outlined"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
          />
          <TextField
            autoComplete="off"
            label="Confirm Password"
            variant="outlined"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            type="password"
          />
          <Button variant="outlined" color="primary" onClick={handleSave}>
            Save
          </Button>
          <p>
            Already a member? <Link to="/login">Login</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
