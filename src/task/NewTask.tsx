import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useJwt } from "../context/Jwt.context";
import httpModule from "../helpers/http.module";
import { useNavigate } from "react-router-dom";
import "./Task.css";

const NewTask = () => {
  const jwt = useJwt();
  const [task, setTask] = useState({ title: "", userId: jwt.user.id });
  const navigate = useNavigate();

  function handleSave() {
    if (task.title == "") {
      alert("Some fields have not been filled");
      return;
    }
    httpModule
      .post("task/create", task, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then(() => navigate("/task"))
      .catch((error) => {
        alert("Error, check console");
        console.log(error.response);
      });
  }
  return (
    <div className="content new-task">
      <h2>New Task</h2>
      <TextField
        autoComplete="off"
        label="Title"
        variant="outlined"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        fullWidth
      />
      <Button variant="outlined" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default NewTask;
