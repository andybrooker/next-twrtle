import React from "react";
import { Box } from "@mui/material";
import Date from "./Date";
import { TweetV2 } from "twitter-api-v2";
import { Metrics } from "./Metrics";
import TweetMenu from "./TweetMenu";

export const TweetInfo = ({ data }: { data: TweetV2 }) => {
  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TweetMetrics data={data} />
      <TweetMenu data={data} />
    </Box>
  );
};

const TweetMetrics = ({ data }) => {
  return (
    <Box>
      <Date createdAt={data?.created_at} thread={false} />
      <Box
        sx={{
          display: "flex",
          fontSize: "12px",
          columnGap: "6px",
          alignItems: "center",
          color: "text.secondary",
          height: "22px",
        }}
      >
        <Metrics metrics={data?.public_metrics} />
      </Box>
    </Box>
  );
};
