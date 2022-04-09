import { useRouter } from "next/router";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import useDate from "../hooks/useDate";
import useAuthors from "../hooks/useAuthors";

export default function Edition() {
  const dt = useDate();

  const { data, isLoading, isError } = useAuthors();

  return (
    <div>
      <Box
        sx={{
          p: 8,
          pb: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="h3" component="h1">
            Your Sunday Timelines <Typography></Typography>
          </Typography>
          <Typography sx={{ fontWeight: 300 }} color="text.secondary">
            {dt}
          </Typography>
        </Box>
        <Box>
          {data?.map((author, index) => (
            <Typography key={index}>{author.username}</Typography>
          ))}
        </Box>
      </Box>
    </div>
  );
}

Edition.auth = true;
