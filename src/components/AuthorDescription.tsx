import React from "react";
import { Box, Typography, Link, Skeleton } from "@mui/material";
import twitter from "twitter-text";
import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { UserV2 } from "twitter-api-v2";

export default function AuthorDescription({ authorQuery }) {
  const { data, isLoading, isError } = authorQuery;

  if (isError) {
    return <>Error...</>;
  }

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {isLoading ? <Skeleton width="200px" /> : <AuthorText user={data} />}
      </Box>
    </>
  );
}

function AuthorText({ user }: { user: UserV2 }) {
  const renderDescription = (user: UserV2) => {
    const text = twitter.autoLink(user?.description, {
      urlEntities: user?.entities?.description?.urls,
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
          <Link underline="hover" href={domNode.attribs.href}>
            {domToReact(domNode.children, options)}
          </Link>
        );
      }
    },
  };

  return (
    <Typography
      sx={{ whiteSpace: "pre-line", color: "text.secondary" }}
      variant="small"
    >
      {parse(renderDescription(user), options)}
    </Typography>
  );
}
