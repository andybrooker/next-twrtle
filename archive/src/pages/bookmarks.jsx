import { useRouter } from "next/router";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/Bookmark";

export default function Bookmarks() {
  const router = useRouter();

  return (
    <div>
      <Box
        sx={{
          p: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            height: "50%",
            width: "50%",
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BookmarkBorderIcon sx={{ fontSize: "80px" }} fontSize="inherit" />
          <Typography
            variant="large"
            fontFamily="Clash Grotesk"
            fontWeight={500}
            component="h1"
            sx={{ mt: 2 }}
          >
            Bookmarks
          </Typography>

          <Typography variant="medium">Coming soon.</Typography>
        </Box>
      </Box>
    </div>
  );
}

Bookmarks.auth = true;
