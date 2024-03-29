import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

export default function SignInButton({ size }) {
  if (size === "large") {
    return (
      <Button
        sx={{
          px: 8,
          my: 2,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "18px",
        }}
        onClick={() => signIn("twitter")}
        variant="contained"
        size={size}
        disableElevation
        startIcon={<TwitterIcon />}
      >
        Sign In with Twitter
      </Button>
    );
  } else {
    return (
      <Button
        sx={{
          px: 3,
          my: 2,
          textTransform: "none",
          whiteSpace: "nowrap",
          fontWeight: 600,
        }}
        onClick={() => signIn("twitter")}
        variant="contained"
        size={size}
        disableElevation
        startIcon={<TwitterIcon />}
      >
        Sign In
      </Button>
    );
  }
}
