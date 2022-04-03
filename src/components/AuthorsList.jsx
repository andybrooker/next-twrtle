import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import { List, ListItem, Skeleton } from "@mui/material";
import SidebarListItem from "./SidebarListItem";
import useAuthors from "../hooks/useAuthors";

export default function AuthorsList() {
  const { data, isLoading, isError } = useAuthors();

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <List sx={{ px: 2, overflow: "scroll", height: "200px", pt: 0 }}>
      <ListSubheader>My Authors</ListSubheader>
      {isLoading
        ? [0, 1, 2].map(({ value }) => (
            <ListItem key={value}>
              <Skeleton variant="text" width="100px" />
            </ListItem>
          ))
        : data.map(({ id, username }) => (
            <SidebarListItem
              key={id}
              href={`/edition/${username}`}
              primary={username}
            />
          ))}
    </List>
  );
}
