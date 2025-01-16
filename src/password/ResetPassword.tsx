import { useState } from "react";
import "./Password.css";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import httpModule from "../helpers/http.module";
import { useJwt } from "../context/Jwt.context";

const Register = () => {
  const [searchParams, setSearchParmams] = useSearchParams();
  const [user, setUser] = useState({
    password: "",
    confirmPassword: "",
    email: searchParams.get("email"),
    token: searchParams.get("token"),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const jwt = useJwt();
  const navigate = useNavigate();

  function handleReset() {
    if (
      user.email === "" ||
      user.password === "" ||
      user.confirmPassword == "" ||
      user.token == ""
    ) {
      alert("Fill  all fields");
      return;
    }

    if (user.password != user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    httpModule
      .post("/auth/resetPassword", user)
      .then(async () => {
        if (user.email != null) {
          await jwt.login(user.email, user.password);
          navigate("/");
        }
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
        <div className="forgotPassword">
          <h2>Reset Password</h2>
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
          <Button variant="outlined" color="primary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default Register;
