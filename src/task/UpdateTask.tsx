import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Task.css";
import httpModule from "../helpers/http.module";
import { useJwt } from "../context/Jwt.context";

const UpdateTask = () => {
  const location = useLocation();
  const { task } = location.state;
  const [updateTask, setUpdateTask] = useState({
    title: task.title,
    state: task.state,
    id: task.id,
  });
  const jwt = useJwt();
  const navigate = useNavigate();

  function handleUpdate() {
    if (updateTask.title == "") {
      alert("All fields are required");
      return;
    }

    httpModule
      .post("task/update", updateTask, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then(() => navigate("/task", { replace: true }))
      .catch((error) => {
        alert("Check console for error");
        console.log(error.response);
      });
  }
  return (
    <div className="content update-task">
      <h2>Update Task</h2>
      <TextField
        label="Title"
        value={updateTask.title}
        onChange={(e) =>
          setUpdateTask({ ...updateTask, title: e.target.value })
        }
        required
        autoComplete="off"
      />

      <TextField
        label="State"
        value={updateTask.state}
        onChange={(e) =>
          setUpdateTask({ ...updateTask, state: e.target.value })
        }
        select
        style={{ width: "200px" }}
      >
        <MenuItem key="INACTIVE" value="INACTIVE">
          INACTIVE
        </MenuItem>
        <MenuItem key="ACTIVE" value="ACTIVE">
          ACTIVE
        </MenuItem>
      </TextField>
      <Button variant="outlined" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
};

export default UpdateTask;
