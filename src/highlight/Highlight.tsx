import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJwt } from "../context/Jwt.context";
import { CircularProgress, TextField } from "@mui/material";
import httpModule from "../helpers/http.module";
import "./Highlight.css";

type HighlightDTO = {
  totalDurationOverall: string;
  currentDayTotalDuration: string;
  lastWeekTotalDuration: string;
  currentWeekTotalDuration: string;
};
const Highlight = () => {
  const [highlight, setHighlight] = useState<HighlightDTO>({
    totalDurationOverall: "",
    currentDayTotalDuration: "",
    lastWeekTotalDuration: "",
    currentWeekTotalDuration: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();
  const jwt = useJwt();

  useEffect(() => {
    setLoading(true);

    if (!jwt.isLoggedIn()) {
      redirect("/login", { replace: true });
      return;
    }

    let params = new URLSearchParams();
    params.append("userId", jwt.user.id);
    httpModule
      .get<HighlightDTO>("/highlight/get?" + params, {
        headers: { Authorization: "Bearer " + jwt.user.jwtToken },
      })
      .then((response) => {
        setHighlight(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error.response);
        setLoading(false);
      });
  }, []);

  return (
    <div className="content highlight">
      <h2>Highlight</h2>

      {loading ? (
        <CircularProgress size={100} />
      ) : (
        <div>
          <div className="row">
            <TextField value="Total Duration Overall:" multiline/>
            <TextField value={highlight.totalDurationOverall} />
          </div>
          <div className="row">
            <TextField value="Today Total Duration:" multiline />
            <TextField value={highlight.currentDayTotalDuration} />
          </div>
          <div className="row">
            <TextField value="Current Week Total Duration:" multiline />
            <TextField value={highlight.currentWeekTotalDuration} />
          </div>
          <div className="row">
            <TextField value="Last Week Total Duration:" multiline />
            <TextField value={highlight.lastWeekTotalDuration} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Highlight;
