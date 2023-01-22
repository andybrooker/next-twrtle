import React from "react";
import { signOut } from "next-auth/react";
import { Box, Button, Typography } from "@mui/material";

export default function Profile() {
  const drawerWidth = 200;

  return (
    <Box>
      <Box
        sx={{
          p: 8,
          pb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="large"
          fontFamily="Clash Grotesk"
          fontWeight={500}
          component="h1"
        >
          Profile
        </Typography>
        <Box>
          <Button
            variant="contained"
            disableElevation
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

Profile.auth = true;
