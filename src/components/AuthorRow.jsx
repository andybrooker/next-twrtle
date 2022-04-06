import React from "react";
import useTwitterUser from "../hooks/useTwitterUser";
import AuthorDescription from "./AuthorDescription";
import { AuthorProfile } from "./edition/TopTweet";
import {
  Typography,
  Skeleton,
  Avatar,
  Box,
  useTheme,
  Link,
  TableRow,
  TableCell,
} from "@mui/material";

export default function AuthorRow({ username }) {
  const authorQuery = useTwitterUser(username);

  return (
    <TableRow>
      <TableCell>
        <AuthorProfileImage
          author={authorQuery.data}
          isLoading={authorQuery.isLoading}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <AuthorName
            author={authorQuery.data}
            isLoading={authorQuery.isLoading}
          />
          <AuthorUsername
            author={authorQuery.data}
            isLoading={authorQuery.isLoading}
          />
        </Box>
        <AuthorDescription authorQuery={authorQuery} />
      </TableCell>
    </TableRow>
  );
}

const AuthorProfileImage = ({ author, isLoading }) => {
  if (isLoading) {
    return (
      <Skeleton animation="wave" width={40} height={40} variant="circular" />
    );
  } else {
    return (
      <Avatar
        sx={{ width: 40, height: 40 }}
        alt={author?.name}
        src={author?.profile_image_url.replace("_normal", "")}
      />
    );
  }
};

const AuthorName = ({ author, isLoading }) => {
  return (
    <Typography
      sx={{ fontWeight: 400, m: 0, p: 0 }}
      variant="medium"
      component="p"
    >
      {isLoading ? <Skeleton animation="wave" width={150} /> : author?.name}
    </Typography>
  );
};

const AuthorUsername = ({ author, isLoading }) => {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        "&:hover": {
          color: theme.palette.primary.main,
        },
        fontWeight: 300,
      }}
      variant="small"
      component="a"
    >
      {isLoading ? (
        <Skeleton width={150} animation="wave" />
      ) : (
        <Link
          target="_blank"
          rel="nooponer"
          color="inherit"
          underline="none"
          href={`https://twitter.com/${author.username}`}
        >
          @{author?.username}
        </Link>
      )}
    </Typography>
  );
};
