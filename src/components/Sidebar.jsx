import React from "react";
import { List, Drawer, ListSubheader } from "@mui/material";
import UserProfile from "./UserProfile";
import AuthorsList from "./AuthorsList";
import Logo from "./Logo";
import SidebarListItemIcon from "./SidebarListItemIcon";
import PersonSearch from "@mui/icons-material/PersonSearch";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EditionIcon from "./icons/EditionIcon";

export default function Sidebar() {
  const drawerWidth = 200;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          boxShadow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Logo />
      <List sx={{ p: 2 }}>
        <SidebarListItemIcon
          href="/discover"
          primary="Discover"
          icon={<PersonSearch />}
        />
        <SidebarListItemIcon
          href="/edition"
          primary="Edition"
          icon={<EditionIcon />}
        />
        <SidebarListItemIcon
          href="/bookmarks"
          primary="Bookmarks"
          icon={<BookmarkBorderIcon />}
        />
      </List>
      <AuthorsList />
      <UserProfile />
    </Drawer>
  );
}
