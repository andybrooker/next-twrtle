import React from "react";
import { Typography, Link } from "@mui/material";
import twitter from "twitter-text";
import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { TweetV2, TweetEntityUrlV2 } from "twitter-api-v2";

export default function TweetText({ tweet }: { tweet: TweetV2 }) {
  const renderTweet = (tweet: TweetV2) => {
    const text = twitter.autoLink(tweet?.text, {
      urlEntities: tweet?.entities?.urls,
      usernameIncludeSymbol: true,
      targetBlank: true,
    });
    return text;
  };

  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && !domNode.attribs) {
        return;
      }

      if (domNode instanceof Element && domNode.attribs.href) {
        return (
          <Link
            target="_blank"
            rel="noopener"
            underline="hover"
            href={domNode.attribs.href}
          >
            {domToReact(domNode.children, options)}
          </Link>
        );
      }
    },
  };

  return (
    <Typography sx={{ whiteSpace: "pre-line" }} variant="medium">
      {parse(renderTweet(tweet), options)}
    </Typography>
  );
}
