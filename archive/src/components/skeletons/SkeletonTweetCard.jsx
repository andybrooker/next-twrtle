import { Paper } from "@mui/material";
import React from "react";
import SkeletonTweet from "./SkeletonTweet";

export default function SkeletonTweetCard() {
  return (
    <Paper
      sx={{
        py: 2,
        boxShadow: 0,
        borderBottom: 1,
        borderBottomColor: "divider",
        borderRadius: 0,
      }}
    >
      <SkeletonTweet />
    </Paper>
  );
}
