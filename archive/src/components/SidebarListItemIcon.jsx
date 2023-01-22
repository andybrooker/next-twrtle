import {
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function SidebarListItemIcon({ href, primary, icon }) {
  const router = useRouter();

  return (
    <Link href={href} passHref>
      <ListItemButton
        sx={{
          ph: 1,
          borderRadius: 2,
          height: 40,
          my: 1,
        }}
        component="a"
        selected={href.toLowerCase() === router.asPath.toLowerCase()}
      >
        <ListItemIcon sx={{ color: "inherit", minWidth: 0, pr: 1 }}>
          {icon}
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            fontWeight: 500,
            fontSize: "15px",
          }}
          primary={primary}
        />
      </ListItemButton>
    </Link>
  );
}
