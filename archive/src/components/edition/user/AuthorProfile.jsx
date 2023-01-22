import { useRouter } from "next/router";
import React from "react";
import useTwitterUser from "../../../hooks/useTwitterUser";
import {
  Avatar,
  Skeleton,
  Typography,
  Box,
  Link,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FollowUser from "./FollowUser";

export default function AuthorProfile({ userFollows, authorQuery }) {
  const { data, isLoading, isError } = authorQuery;
  const useFullWidth = useMediaQuery("(max-width: 800px)");

  if (isError) {
    return <>Error...</>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        columnGap: 2,
        alignItems: "center",
      }}
    >
      <AuthorProfileImage author={data} isLoading={isLoading} />
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexDirection: useFullWidth ? "row" : "column",
          flexGrow: 1,
          justifyContent: useFullWidth ? "space-between" : "flex-start",
          alignItems: useFullWidth ? "center" : "flex-start",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <AuthorName author={data} isLoading={isLoading} />
          <AuthorUsername author={data} isLoading={isLoading} />
        </Box>
        <FollowUser userFollows={userFollows} author={isLoading ? {} : data} />
      </Box>
    </Box>
  );
}

const AuthorProfileImage = ({ author, isLoading }) => {
  if (isLoading) {
    return (
      <Skeleton animation="wave" width={80} height={80} variant="circular" />
    );
  } else {
    return (
      <Avatar
        sx={{ width: 80, height: 80 }}
        alt={author?.name}
        src={author?.profile_image_url.replace("_normal", "")}
      />
    );
  }
};

export const AuthorName = ({ author, isLoading }) => {
  return (
    <Typography
      variant="large"
      fontWeight={500}
      fontFamily="Clash Grotesk"
      component="h1"
    >
      {isLoading ? <Skeleton animation="wave" /> : author?.name}
    </Typography>
  );
};

export const AuthorUsername = ({ author, isLoading }) => {
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
