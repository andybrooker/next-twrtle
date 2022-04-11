import React from "react";
import { TabPanel } from "@mui/lab";
import { useMediaQuery } from "@mui/material";
import Thread from "./Thread";

export default function ThreadPanel({ isLoading, data }) {
  const extra_padding = useMediaQuery("(max-width: 600px)");

  return (
    <TabPanel
      value="threadsPanel"
      index={0}
      sx={{ px: 0, py: 0, width: "100%" }}
    >
      {isLoading
        ? "Loading..."
        : Object.values(data?.threads).map((thread, index) => (
            <Thread
              key={index}
              data={thread?.data}
              includes={thread?.includes}
            />
          ))}
    </TabPanel>
  );
}
