import { useState } from "react";
import "./Register.css";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  function handleSave() {}

  return (
    <div className="content">
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
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>
        <p>
          Already a member? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
