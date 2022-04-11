import React from "react";
import {
  Box,
  Paper,
  Card,
  Tabs,
  Tab,
  Avatar,
  Skeleton,
  Typography,
  Link,
} from "@mui/material";
import Greeting from "../components/edition/Greeting";
import { TabContext, TabPanel } from "@mui/lab";
import useAuthors from "../hooks/useAuthors";
import useTwitterUser from "../hooks/useTwitterUser";
import TopTweet, { AuthorProfile } from "../components/edition/TopTweet";
import useTweets from "../hooks/useTweets";
import useWindowDimensions from "../hooks/useWindowDimensions";
import TwitterIcon from "@mui/icons-material/Twitter";
import SkeletonTweet from "../components/skeletons/SkeletonTweet";
import SkeletonProfile from "../components/skeletons/SkeletonProfile";
import NextLinkComposed from "../components/NextLinkComposed";
import { DateTime } from "luxon";
export default function Home() {
  const { width } = useWindowDimensions();

  return (
    <Box
      sx={{
        pt: "60px",
        pb: "20px",
        px: width > 600 ? "20px" : "0px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        rowGap: 2,
        minHeight: "100vh",
      }}
    >
      <Greeting />
      <TopTweets width={width} />
    </Box>
  );
}

Home.auth = true;

const TopTweets = ({ width }) => {
  const { data, isLoading, isError } = useAuthors();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <TabContext value={value}>
      <Box sx={{ width: "100%", px: width < 800 ? 0 : 4 }}>
        <Box sx={{ px: 3 }}>
          <Typography component="h2" variant="large" color="text.secondary">
            Top Tweets of the Week
          </Typography>
          <Tabs
            sx={{
              overflow: "visible",
              minHeight: 0,
              "& .MuiTabs-flexContainer": {
                columnGap: 2,
              },
            }}
            TabIndicatorProps={{
              sx: {
                display: "none",
              },
            }}
            initialSelectedIndex={value}
            value={value}
            onChange={handleChange}
          >
            {isLoading ? (
              [0, 1, 2].map((value, index) => (
                <Tab
                  sx={{ m: 0, p: 0, minWidth: 0 }}
                  disableRipple
                  key={index}
                  value={index}
                  icon={
                    <Skeleton
                      animation="wave"
                      width={32}
                      height={32}
                      variant="circular"
                    />
                  }
                />
              ))
            ) : data.length > 0 ? (
              data.map(({ username }, index) => (
                <Tab
                  disableRipple
                  sx={TabStyle}
                  key={index}
                  value={index}
                  icon={<AuthorProfileImage username={username} />}
                />
              ))
            ) : (
              <Tab
                sx={TabStyle}
                disableRipple
                key={0}
                value={0}
                icon={<AuthorProfileImage username={"twrtleapp"} />}
              ></Tab>
            )}
          </Tabs>
        </Box>

        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}
          elevation={0}
        >
          {isLoading ? (
            <Box sx={{ width: "100%", px: 3, py: 1 }}>
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
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <SkeletonProfile />
                  <TwitterIcon color="primary" fontSize="large" />
                </Box>
                <SkeletonTweet />
              </Paper>
            </Box>
          ) : data.length > 0 ? (
            data.map(({ username }, index) => (
              <TopTweetPanel index={index} key={index} username={username} />
            ))
          ) : (
            <NoAuthors />
          )}
        </Card>
      </Box>
    </TabContext>
  );
};

const TopTweetPanel = ({ username, index }) => {
  const authorQuery = useTwitterUser(username);
  const tweetQuery = useTweets(username);

  return (
    <TabPanel sx={{ width: "100%", px: 3, py: 1 }} key={index} value={index}>
      <TopTweet authorQuery={authorQuery} tweetQuery={tweetQuery} />
    </TabPanel>
  );
};

const NoAuthors = () => {
  const authorQuery = useTwitterUser("twrtleapp");

  return (
    <Box sx={{ width: "100%", px: 3, py: 1 }}>
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
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <AuthorProfile authorQuery={authorQuery} />
          <TwitterIcon color="primary" fontSize="large" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ whiteSpace: "pre-line" }} variant="medium">
            Hey 👋 <br />
            <br />
            Your homepage shows the Top Tweet of all the creators in your
            edition each week. Looks like you haven&apos;t added any authors
            yet! <br />
            <br />
            Add some on the{" "}
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
      </Paper>
    </Box>
  );
};

const AuthorProfileImage = ({ username }) => {
  const { data, isLoading } = useTwitterUser(username);

  if (isLoading) {
    return (
      <Skeleton animation="wave" width={32} height={32} variant="circular" />
    );
  } else {
    return (
      <Avatar
        sx={{ width: 32, height: 32 }}
        alt={data?.name}
        src={data?.profile_image_url.replace("_normal", "")}
      />
    );
  }
};

const TabStyle = {
  m: 0,
  p: 0,
  minWidth: 0,
  "& .MuiAvatar-root": {
    border: "2px solid",
    borderColor: "background.paper",
    boxSizing: "border-box",
    transition: "0.5s ease-out",
  },
  "&.Mui-selected": {
    "& .MuiAvatar-root": {
      border: "2px solid",
      borderColor: "primary.main",
      transition: "0.5s ease-out",
    },
  },
  "&.Mui-focusVisible": {
    "& .MuiAvatar-root": {
      borderColor: "primary.lighter",
    },
  },
};
