import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "./NewSession.css";
import { Temporal } from "@js-temporal/polyfill";

const NewSession = () => {
  const [session, setSession] = useState({
    duration: "",
    comment: "A",
    taskId: "1",
    year: "",
    month: "",
    day: "",
  });
  const [duration, setDuration] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));

  useEffect(() => {
    updateSessionDate(date);
    updateSessionDuration(duration);
  }, [date]);

  useEffect(() => {
    updateSessionDuration(duration);
  }, [duration]);

  function handleSave() {
    if (
      session.comment == "" ||
      session.day == "" ||
      session.month == "" ||
      session.year == "" ||
      session.duration == "" ||
      session.taskId == ""
    ) {
      alert("Fill all fields");
    }

    console.log(session);
  }

  function updateSessionDate(date: Dayjs | null) {
    if (date != null) {
      setSession((prevState) => {
        let month = date.month() + 1;
        prevState.year = date.year().toString();
        prevState.month = month.toString();
        prevState.day = date.date().toString();
        return prevState;
      });
    }
  }

  function updateSessionDuration(duration: any) {
    let d = Temporal.Duration.from({
      hours: duration.hours,
      minutes: duration.minutes,
      seconds: duration.seconds,
    });
    setSession((prevState) => {
      prevState.duration = d.toString();
      return prevState;
    });
  }

  return (
    <div className="content newSession">
      <h2>New Session</h2>
      <div className="duration">
        <span>Duration:</span>
        <TextField
          autoComplete="off"
          variant="outlined"
          value={duration.hours}
          onChange={(e) => {
            let newHour = parseInt(e.target.value);
            if (newHour >= 0 && newHour <= 23) {
              setDuration({ ...duration, hours: newHour });
            }
          }}
          label="Hours"
          type="number"
        />
        <TextField
          autoComplete="off"
          variant="outlined"
          value={duration.minutes}
          onChange={(e) => {
            let newMinute = parseInt(e.target.value);
            if (newMinute >= 0 && newMinute <= 59) {
              setDuration({ ...duration, minutes: newMinute });
            }
          }}
          label="Minutes"
          type="number"
        />
        <TextField
          autoComplete="off"
          variant="outlined"
          value={duration.seconds}
          onChange={(e) => {
            let newSecond = parseInt(e.target.value);
            if (newSecond >= 0 && newSecond <= 59) {
              setDuration({ ...duration, seconds: newSecond });
            }
          }}
          label="Seconds"
          type="number"
        />
      </div>
      <div className="datePicker">
        <span>Date:</span>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={(newValue) => setDate(newValue)}
            showDaysOutsideCurrentMonth
            disableFuture
          />
        </LocalizationProvider>
      </div>
      <TextField
        autoComplete="off"
        variant="outlined"
        value={session.comment}
        onChange={(e) => setSession({ ...session, comment: e.target.value })}
        multiline
        placeholder="comment"
        
      />
      <Button onClick={handleSave} variant="outlined">
        Save
      </Button>
    </div>
  );
};

export default NewSession;
