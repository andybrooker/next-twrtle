import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";

export default function Author() {
  const mobile = useMediaQuery("(max-width: 700px)");

  return (
    <div>
      <Box
        sx={{
          p: mobile ? 2 : 8,
          pt: mobile ? 4 : 8,
          pb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
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
          <Typography
            variant="large"
            fontFamily="Clash Grotesk"
            fontWeight={500}
            component="h1"
          >
            Add Authors from Following
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

Author.auth = true;
