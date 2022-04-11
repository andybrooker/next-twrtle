import { useRouter } from "next/router";
import React, { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import useDate from "../hooks/useDate";
import useAuthors from "../hooks/useAuthors";
import { FullAuthorsList } from "../components/Category";

export default function Edition() {
  const dt = useDate();

  const { data, isLoading, isError } = useAuthors();
  const mobile = useMediaQuery("(max-width: 700px)");

  return (
    <div>
      <Box
        sx={{
          p: mobile ? 2 : 8,
          pr: mobile ? 2 : 6,
          pt: mobile ? 4 : 8,
          pb: mobile ? 0 : 4,
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
        <Box sx={{ pt: 2, ml: mobile ? 0 : -2 }}>
          <FullAuthorsList authors={data} loading={isLoading} />
        </Box>
      </Box>
    </div>
  );
}

Edition.auth = true;
