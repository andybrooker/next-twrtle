import { useRouter } from "next/router";
import React, { useState } from "react";
import Box from "@mui/material/Box";

export default function Bookmarks() {
  const router = useRouter();

  return (
    <div>
      <Box
        sx={{
          p: 8,
          pb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Bookmarks
      </Box>
    </div>
  );
}

Bookmarks.auth = true;
