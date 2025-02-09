import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useJwt } from "../context/Jwt.context";
import httpModule from "../helpers/http.module";
import "./Session.css";

type Session = {
  duration: string;
  comment: string;
  date: string;
  id: string;
};


const ListSessions = () => {
  const location = useLocation();
  const { task } = location.state;
  const [loading, setLoading] = useState<boolean>(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const navigate = useNavigate();
  const jwt = useJwt();

  useEffect(() => {
    setLoading(true);

    if (!jwt.isLoggedIn()) {
      navigate("/login", { replace: true });
      return;
    }

    let params = new URLSearchParams();
    params.append("taskId", task.id);
    httpModule
      .get<Session[]>("/session/list?" + params, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setSessions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error.response);
        setLoading(false);
      });
  }, []);

  function deleteSession(sessionId:string){
    let params = new URLSearchParams();
    params.append("sessionId", sessionId);
    httpModule
      .delete("session/delete?"+params, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then(() => navigate("/task"))
      .catch((error) => {
        alert("Error, check console");
        console.log(error.response);
      });
  }

  const column: GridColDef[] = [
    { field: "comment", headerName: "Comment", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "duration", headerName: "Duration", flex: 1 },
    {
      field: "",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button variant="outlined" onClick={()=> deleteSession(params.row.id)}>Delete</Button>
        )}}
  ];

  return (
    <div className="content listSession">
      <h2>List Sessions</h2>

      <div className="row">
        <TextField
          autoComplete="off"
          label="Task"
          variant="outlined"
          value={task.title}
        />
        <TextField
          autoComplete="off"
          label="Total Duration"
          variant="outlined"
          value={task.totalDuration}
        />
      </div>

      {loading ? (
        <CircularProgress size={100} />
      ) : (
        <Box sx={{ width: "100%", height: 350 }} className="tasks-grid">
          <DataGrid
            rows={sessions}
            columns={column}
            getRowId={(row) => row.id}
            getRowHeight={() => "auto"}
            sx={{
              [`& .${gridClasses.cell}`]: {
                py: 2,
              },
            }}
          />
        </Box>
      )}
    </div>
  );
};

export default ListSessions;
