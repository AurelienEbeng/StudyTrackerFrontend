import { Box, Button, CircularProgress } from "@mui/material";
import { DataGrid, gridClasses, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useJwt } from "../context/Jwt.context";
import httpModule from "../helpers/http.module";
import "./Task.css";
import moment from "moment";

type Task = {
  id: string;
  title: string;
  dateCreated: string;
  userId: string;
  state: string;
};

const column: GridColDef[] = [
  { field: "title", headerName: "Title", flex: 1 },
  { field: "state", headerName: "Task State", flex: 1 },
  {
    field: "dateCreated",
    headerName: "Date Created",
    flex: 1,
    renderCell: (params) => moment(params.row.dateCreated).format("YYYY-MM-DD"),
  },
  {
    field: "",
    flex: 1,
    renderCell: (params) => {
      return (
        <Button variant="outlined">
          <Link
            to="/task/update"
            state={{
              task: {
                id: `${params.row.id}`,
                title: `${params.row.title}`,
                state: `${params.row.state}`,
                dateCreated: `${params.row.dateCreated}`,
                userId: `${params.row.userId}`,
              },
            }}
          >
            Update
          </Link>
        </Button>
      );
    },
  },
];

const Task = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const jwt = useJwt();

  useEffect(() => {
    setLoading(true);

    if (!jwt.isLoggedIn()) {
      navigate("/login", { replace: true });
      return;
    }

    let params = new URLSearchParams();
    params.append("userId", jwt.user.id);
    httpModule
      .get<Task[]>("/task/getAll?" + params, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error.response);
        setLoading(false);
      });
  }, []);
  return (
    <div className="content task">
      <h2>Tasks</h2>
      <Button variant="outlined">
        <Link to="/task/create">New</Link>
      </Button>
      {loading ? (
        <CircularProgress size={100} />
      ) : (
        <Box sx={{ width: "100%", height: 350 }} className="tasks-grid">
          <DataGrid
            rows={tasks}
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

export default Task;
