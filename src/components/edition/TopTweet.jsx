import React from "react";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  useTheme,
  Link,
  Skeleton,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { TweetContent } from "../Tweet";
import SkeletonTweet from "../skeletons/SkeletonTweet";
import { TweetInfo } from "../TweetInfo";
import NextLinkComposed from "../NextLinkComposed";
import { DateTime } from "luxon";

export default function TopTweet({ authorQuery, tweetQuery }) {
  const { data, isLoading } = tweetQuery;

  if (isLoading) {
    return (
      <TopTweetContainer authorQuery={authorQuery}>
        <SkeletonTweet />
      </TopTweetContainer>
    );
  }

  if (!data?.tweets?.data) {
  }

  return (
    <TopTweetContainer authorQuery={authorQuery}>
      {!data?.tweets?.data ? (
        <>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ whiteSpace: "pre-line" }} variant="medium">
              This author hasn't tweeted this week. Check some more out on the{" "}
              <Link
                sx={{ display: "inline-flex", fontWeight: 400 }}
                to={"/discover"}
                component={NextLinkComposed}
                underline="none"
              >
                Discover
              </Link>{" "}
              page.
            </Typography>
            <Typography
              sx={{ fontWeight: 400, color: "text.secondary", mt: 2 }}
              variant="small"
              component="time"
            >
              {DateTime.now().toLocaleString(DateTime.DATE_HUGE)}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <TweetContent
            data={data?.tweets?.data[0]}
            includes={data?.tweets?.includes}
          />
          <TweetInfo data={data?.tweets?.data[0]} />
        </>
      )}
    </TopTweetContainer>
  );
}

const TopTweetContainer = ({ children, authorQuery }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        p: 3,
        rowGap: 2,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <AuthorProfile authorQuery={authorQuery} />
        <TwitterIcon color="primary" fontSize="large" />
      </Box>
      {children}
    </Paper>
  );
};

export function AuthorProfile({ authorQuery }) {
  const { data, isLoading, isError } = authorQuery;

  if (isError) {
    return <>Error...</>;
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AuthorProfileImage author={data} isLoading={isLoading} />
        <Box>
          <AuthorName author={data} isLoading={isLoading} />
          <AuthorUsername author={data} isLoading={isLoading} />
        </Box>
      </Box>
    </>
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
      sx={{ fontWeight: 500, m: 0, p: 0, lineHeight: 1, color: "black" }}
      variant="medium"
      component="p"
    >
      {isLoading ? <Skeleton animation="wave" /> : author?.name}
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
