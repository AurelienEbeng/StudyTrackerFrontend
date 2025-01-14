import { useEffect, useState } from "react";
import { useJwt } from "../context/Jwt.context";
import { useNavigate } from "react-router-dom";
import httpModule from "../helpers/http.module";
import { CircularProgress, TextField } from "@mui/material";
import "./Profile.css"

const Profile = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    dateJoined: "",
    role: "",
    username: "",
  });
  const jwt = useJwt();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!jwt.isLoggedIn()) {
      navigate("/login", { replace: true });
      return;
    }

    setLoading(true);
    let params = new URLSearchParams();
    params.append("userId", jwt.user.id);
    httpModule
      .get("/user/profile?" + params, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error.response);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="content profile">
          <h2>Profile</h2>
          <TextField
            autoComplete="off"
            label="Username"
            variant="outlined"
            value={user.username}
            fullWidth
          />
          <TextField
            autoComplete="off"
            label="Email"
            variant="outlined"
            value={user.email}
            fullWidth
          />
          <TextField
            autoComplete="off"
            label="Date Joined"
            variant="outlined"
            value={user.dateJoined}
            fullWidth
          />
          <TextField
            autoComplete="off"
            label="Role"
            variant="outlined"
            value={user.role}
            fullWidth
          />
        </div>
      )}
    </>
  );
};

export default Profile;
