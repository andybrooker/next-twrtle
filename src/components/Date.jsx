import React from "react";
import { DateTime } from "luxon";
import { Typography, useMediaQuery } from "@mui/material";

export default function Date({ createdAt, thread }) {
  if (thread) {
    return <></>;
  }

  const renderDate = (date) => {
    const dt = DateTime.fromISO(date);
    return dt.toLocaleString(DateTime.DATE_HUGE);
  };

  return (
    <Typography
      sx={{ fontWeight: 500, color: "text.secondary" }}
      variant="small"
      component="time"
    >
      {renderDate(createdAt)}
    </Typography>
  );
}
