import { Button, TextField } from "@mui/material";
import "./Password.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import httpModule from "../helpers/http.module";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  
  function handleSendResetLink() {
    if (email == "") {
      alert("Please enter your email");
      return;
    }

    let params = new URLSearchParams();
    params.append("email", email);
    httpModule
      .post("/auth/forgotPassword?" + params)
      .then(() => {
        alert("Check your email for the reset link");
      })
      .catch((error) => {
        alert("Error");
        console.log(error.response);
      });
  }
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
