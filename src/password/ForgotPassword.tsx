import { Button, TextField } from "@mui/material";
import "./Password.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  function handleSendResetLink() {}
  return (
    <div className="content">
      <div className="forgotPassword">
        <TextField
          autoComplete="off"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={handleSendResetLink}
        >
          Send Reset Link
        </Button>
        <p>
          Instead <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
