import { useState } from "react";
import "./Login.css";
import { Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useJwt } from "../context/Jwt.context";

type Login = {
    email:string,
    password:string
}
const Login = () => {
  const [login, setLogin] = useState<Login>({
    email: "",
    password: "",
  });
  
  const jwt = useJwt()
  const redirect = useNavigate()

  const handleClickSignInBtn = async () => {
    if (login.email === "" || login.password === "") {
      alert("Fill  all fields");
      return;
    }
    await jwt.login(login.email,login.password); 
    redirect("/")
  };

  return (
    <div className="content">
      <div className="login">
        <h2>Login</h2>
        <div className="container">
          <TextField
            autoComplete="off"
            label="Email"
            variant="outlined"
            value={login.email}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            fullWidth 
          />
        </div>
        <div className="container">
          <TextField
            autoComplete="off"
            label="Password"
            variant="outlined"
            value={login.password}
            type="password"
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            fullWidth
          />
        </div>

        <div className="btns">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSignInBtn}
            fullWidth
          >
            Login
          </Button>
        </div>
        <div className="extra">
          <p>
            Forgot your <Link to="/forgotPassword">password?</Link>
          </p>
          <p>
            Create an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}; 
export default Login;