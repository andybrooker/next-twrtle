import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "./icons/HomeIcon";
import EditionIcon from "./icons/EditionIcon";
import ProfileIcon from "./icons/ProfileIcon";
import SearchIcon from "@mui/icons-material/Search";
import NextLinkComposed from "./NextLinkComposed";
import { useRouter } from "next/router";
import useAuthors from "../hooks/useAuthors";

export default function BottomNav() {
  const router = useRouter();

  const { data, isLoading, isError } = useAuthors();

  return (
    <BottomNavigation
      sx={{
        height: "auto",
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        borderTop: "1px solid",
        borderColor: "divider",
        pb: "env(safe-area-inset-bottom)",
      }}
      elevation={2}
      value={router.pathname.split("/")[1]}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
        component={NextLinkComposed}
        to={{ pathname: "/home" }}
      />
      <BottomNavigationAction
        label="Discover"
        value="discover"
        icon={<SearchIcon />}
        component={NextLinkComposed}
        to={{ pathname: "/discover" }}
      />
      <BottomNavigationAction
        label="Edition"
        icon={<EditionIcon />}
        value="edition"
        component={NextLinkComposed}
        to={{
          pathname: "/edition",
        }}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<ProfileIcon />}
        component={NextLinkComposed}
        to={{ pathname: "/profile" }}
      />
    </BottomNavigation>
  );
}
