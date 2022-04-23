import {
  Avatar,
  Box,
  Link,
  Skeleton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useTweetMedia from "../hooks/useTweetMedia";
import TweetMedia from "./edition/user/TweetMedia";
import { TweetContent } from "./Tweet";
import TweetText from "./TweetText";

function QuoteTweet({ data, includes }) {
  const [media, setMedia] = useState(false);

  useEffect(() => {
    if (
      data.hasOwnProperty("attachments") &&
      data.attachments.hasOwnProperty("media_keys")
    ) {
      setMedia(true);
    } else {
      setMedia(false);
    }
  }, [data]);

  const { id: tweet_id, author_id } = data;

  const { data: mediaData, isLoading } = useTweetMedia(tweet_id, media);

  const author = includes.users.filter((object) => object.id === author_id)[0];

  if (media) {
    data.entities?.urls?.forEach((URL) => {
      if (URL.display_url.includes("pic.twitter.com"))
        data.text = data.text.replace(URL.url, "");
      else data.text = data.text.replace(URL.url, URL.expanded_url);
    });

    return (
      <QuoteTweetContainer>
        <AuthorProfile author={author} />
        <TweetText tweet={data} />
        {!isLoading && <TweetMedia media={mediaData} />}
      </QuoteTweetContainer>
    );
  }

  return (
    <QuoteTweetContainer>
      <AuthorProfile author={author} />
      <TweetContent data={data} includes={includes} />
    </QuoteTweetContainer>
  );
}

function QuoteTweetContainer({ children }) {
  const mobile = useMediaQuery("(max-width: 600px)");
  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        border: "1px solid",
        borderColor: "divider",
        "& span": {
          fontSize: mobile ? "14px" : "15px",
        },
      }}
    >
      {children}
    </Box>
  );
}

export function AuthorProfile({ author }) {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <AuthorProfileImage author={author} isLoading={false} />
        <AuthorName author={author} isLoading={false} />
        <AuthorUsername author={author} isLoading={false} />
      </Box>
    </>
  );
}

const AuthorProfileImage = ({ author, isLoading }) => {
  if (isLoading) {
    return (
      <Skeleton animation="wave" width={20} height={20} variant="circular" />
    );
  } else {
    return (
      <Avatar
        sx={{ width: 20, height: 20 }}
        alt={author?.name}
        src={author?.profile_image_url.replace("_normal", "")}
      />
    );
  }
};

const AuthorName = ({ author, isLoading }) => {
  const mobile = useMediaQuery("(max-width: 600px)");

  return (
    <Typography
      sx={{
        fontWeight: 400,
        m: 0,
        p: 0,
        lineHeight: 1,
        color: "black",
        fontSize: "15px",
      }}
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

export default QuoteTweet;
