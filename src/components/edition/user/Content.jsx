import React, { useState, useEffect, useCallback } from "react";
import { Box, Tabs, Tab, useMediaQuery } from "@mui/material";
import { TabPanel, TabContext } from "@mui/lab";
import { useRouter } from "next/router";
import useTweets from "../../../hooks/useTweets";
import TweetPanel from "./TweetPanel";
import ThreadPanel from "./ThreadPanel";
import { ObjectFlags } from "typescript";

export default function Content({ showData, authorQuery }) {
  const reduce_padding = useMediaQuery("(max-width: 600px)");

  const [value, setValue] = useState("tweetsPanel");
  const [disabled, setDisabled] = useState({
    tweets: false,
    threads: false,
  });
  const [newsletter, setNewsletter] = useState({
    hasNewsletter: false,
    newsletterUrl: "",
  });

  const router = useRouter();
  const { author } = router.query;
  const { data: authorBio } = authorQuery;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, isLoading } = useTweets(author);

  useEffect(() => {
    if (isLoading) {
      setValue("tweetsPanel");
    } else {
      if (isEmpty(data?.threads) && isEmpty(data?.tweets)) {
        setValue(false);
        setDisabled({ threads: true, tweets: true });
      } else if (isEmpty(data?.threads)) {
        setValue("tweetsPanel");
        setDisabled({ threads: true, tweets: false });
      } else if (isEmpty(data?.tweets)) {
        setValue("threadsPanel");
        setDisabled({ tweets: true, threads: false });
      } else {
        setValue("tweetsPanel");
        setDisabled({ threads: false, tweets: false });
      }
    }
  }, [data, isLoading]);

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const tabStyle = {
    fontWeight: 500,
    fontFamily: "Clash Grotesk",
    fontSize: "17px",
    p: 0,
    minWidth: "",
    "&.Mui-selected": {
      transition: "0.2s ease-in-out",
    },
  };

  return (
    <Box sx={{ px: reduce_padding ? 2 : 8 }}>
      <TabContext value={value}>
        <Tabs
          initialSelectedIndex={value}
          value={value}
          onChange={handleChange}
          aria-label="tweets or threads"
          sx={{
            maxWidth: "700px",
            ml: "auto",
            mr: "auto",
            "& .MuiTabs-flexContainer": {
              columnGap: 2,
              display: "flex",
            },
          }}
          // TabIndicatorProps={{ sx: { display: "none" } }}
        >
          <Tab
            sx={tabStyle}
            disabled={disabled.tweets}
            value="tweetsPanel"
            disableRipple
            label="Tweets"
          />
          <Tab
            sx={tabStyle}
            disabled={disabled.threads}
            value="threadsPanel"
            disableRipple
            label="Threads"
          />
          <Tab
            sx={tabStyle}
            disabled={!newsletter.hasNewsletter}
            value="newsletterPanel"
            disableRipple
            label="Newsletter"
          />
        </Tabs>
        <TweetPanel isLoading={isLoading} tweets={data?.tweets} />
        <ThreadPanel isLoading={isLoading} data={data} />
      </TabContext>
    </Box>
  );
}
