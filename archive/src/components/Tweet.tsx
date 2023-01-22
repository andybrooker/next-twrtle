import React from "react";
import TweetText from "./TweetText";

import {
  TweetV2,
  TweetEntityUrlV2,
  ApiV2Includes,
  MediaObjectV2,
} from "twitter-api-v2";
import {
  Link,
  Box,
  Paper,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { TweetInfo } from "./TweetInfo";
import TweetMedia from "./edition/user/TweetMedia";
import Image from "next/image";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import useLink from "../hooks/useLink";
import QuoteTweet from "./QuoteTweet";

export default function Tweet({
  data,
  includes,
  isLoading,
}: {
  data: TweetV2;
  includes: ApiV2Includes;
  isLoading: boolean;
}) {
  return (
    <Paper
      sx={{
        px: 0,
        py: 2,
        boxShadow: 0,
        borderBottom: 1,
        borderBottomColor: "divider",
        borderRadius: 0,
      }}
    >
      <TweetContent data={data} includes={includes} />
      <TweetInfo data={data} />
    </Paper>
  );
}

export const TweetContent = ({
  data,
  includes,
}: {
  data: TweetV2;
  includes: ApiV2Includes;
}) => {
  //Quote Tweets
  if (
    data.referenced_tweets &&
    data.referenced_tweets.find(
      (referenced_tweet) => referenced_tweet.type === "quoted"
    )
  ) {
    const qt_id = data.referenced_tweets.filter(
      (referenced_tweet) => referenced_tweet.type === "quoted"
    )[0].id;

    const quote_tweet = includes.tweets.filter(
      (quote_tweet) => quote_tweet.id === qt_id
    )[0];

    if (quote_tweet) {
      if (data.entities.urls.length > 1) {
        data.entities.urls.forEach((url, index) => {
          if (index === 0 && !url.display_url.includes("pic.twitter.com")) {
            data.text = data.text.replace(url.url, url.expanded_url);
          } else {
            data.text = data.text.replace(url.url, "");
          }
        });
      } else {
        data.text = data.text.replace(data.entities.urls[0].url, "");
      }
    }

    if (data?.attachments?.hasOwnProperty("media_keys")) {
      const media_keys = data.attachments.media_keys;
      const hasMedia = includes.hasOwnProperty("media");

      let media_array: MediaObjectV2[];

      if (hasMedia) {
        console.log(includes.media);
        console.log(media_keys);
        const media = includes.media;
        media_array = media.filter((element) =>
          media_keys.includes(element.media_key)
        );
        console.log(media_array);
      }

      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TweetText tweet={data} />
          {hasMedia && <TweetMedia media={media_array} />}
          {quote_tweet && <QuoteTweet data={quote_tweet} includes={includes} />}
        </Box>
      );
    }

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TweetText tweet={data} />
        {quote_tweet && <QuoteTweet data={quote_tweet} includes={includes} />}
      </Box>
    );
  }
  if (
    data?.entities?.urls?.length == 1 &&
    !data.attachments &&
    (!data.referenced_tweets ||
      data.referenced_tweets.find((object) => object.type === "replied_to"))
  ) {
    //One Link Case
    data.text = data.text.replace(data.entities.urls[0].url, "");

    return (
      <>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TweetText tweet={data} />
          <TweetLink entity={data?.entities?.urls[0]} />
        </Box>
      </>
    );
  }

  if (
    data.entities &&
    data.hasOwnProperty("attachments") &&
    data?.attachments.hasOwnProperty("media_keys") &&
    (!data.referenced_tweets ||
      data.referenced_tweets.find((object) => object.type === "replied_to"))
  ) {
    convertUrlsInData(data);

    const mks = data.attachments.media_keys;

    const isMedia = includes?.hasOwnProperty("media");

    let media_array: MediaObjectV2[];

    if (isMedia && mks) {
      const media = includes.media;
      media_array = media.filter((element) => mks.includes(element.media_key));
    }

    return (
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
        <Box sx={{ py: 1 }}>
          <TweetText tweet={data} />
        </Box>
        {isMedia && <TweetMedia media={media_array} />}
      </Box>
    );
  } else {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
        <Box>
          <TweetText tweet={data} />
        </Box>
      </Box>
    );
  }
};

const TweetLink = ({ entity }: { entity: TweetEntityUrlV2 }) => {
  const hasPreview = entity.hasOwnProperty("title");

  if (hasPreview) {
    return (
      <Link
        href={entity?.unwound_url}
        color="inherit"
        underline="none"
        target="_blank"
        rel="noopener"
      >
        <Box
          sx={{
            display: "flex",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "8px",
            width: "100%",
            height: "100px",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <Box
            sx={{
              overflow: "hidden",
              borderTopLeftRadius: "7px",
              borderBottomLeftRadius: "7px",
              width: "100px",
              height: "100%",
              position: "relative",
            }}
          >
            {entity?.images?.length > 0 ? (
              <Image
                alt={entity?.description}
                src={entity?.images[0].url}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            ) : (
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  height: "100%",
                  width: "100%",
                  py: 1,
                  px: 2,
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "white",
                  }}
                >
                  <Box
                    sx={{
                      height: "40%",
                      width: "100%",
                      backgroundColor: "action.hover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <NorthEastIcon sx={{ color: "white" }} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "60%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "6px",
                        p: 0.2,
                        color: "text.secondary",
                        fontWeight: 500,
                        userSelect: "none",
                      }}
                    >
                      {entity?.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "6px",
                        p: 0.2,
                        color: "text.secondary",
                        fontWeight: 500,
                        userSelect: "none",
                        textAlign: "right",
                      }}
                    >
                      External Link
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: "action.hover",
              borderTopRightRadius: "7px",
              borderBottomRightRadius: "7px",
              p: 1,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 500,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {entity.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 400,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {entity.description}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 300,
                color: "text.secondary",
              }}
            >
              {entity.display_url}
            </Typography>
          </Box>
        </Box>
      </Link>
    );
  } else {
    return (
      <MetascrapedLink
        expanded_url={entity?.expanded_url}
        display_url={entity?.display_url}
      />
    );
  }
};

const MetascrapedLink = ({ expanded_url, display_url }) => {
  const { data, isLoading, isError } = useLink(expanded_url);

  if (isError) {
    return <div>Error!</div>;
  }

  if (!isLoading && data.image !== null) {
    return (
      <Link
        href={expanded_url}
        color="inherit"
        underline="none"
        target="_blank"
        rel="noopener"
      >
        <Card
          variant="outlined"
          sx={{
            position: "relative",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <CardMedia
            component="img"
            height="250"
            image={data.image}
            alt={data.title}
          />
          <CardContent
            sx={{
              p: 1,
              backgroundColor: "action.hover",
              backdropFilter: "blur(10px)",
              "&:last-child": { pb: 1 },
            }}
          >
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 500,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data?.title}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 400,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {data?.description}
            </Typography>
            <Typography
              sx={{
                fontSize: "0.75rem",
                fontWeight: 300,
                color: "text.secondary",
              }}
            >
              {display_url}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link
      href={expanded_url}
      color="primary.main"
      underline="hover"
      target="_blank"
      rel="noopener"
    >
      {display_url} <NorthEastIcon fontSize="inherit" />
    </Link>
  );
};
function convertUrlsInData(data: TweetV2) {
  data.entities?.urls?.forEach((URL) => {
    if (URL.display_url.includes("pic.twitter.com"))
      data.text = data.text.replace(URL.url, "");
    else data.text = data.text.replace(URL.url, URL.expanded_url);
  });
}
