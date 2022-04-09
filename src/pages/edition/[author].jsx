import { useRouter } from "next/router";
import React, { useState } from "react";
import AuthorProfile from "../../components/edition/user/AuthorProfile";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import Layout from "../../components/layout";
import NestedLayout from "../../components/nestedlayout";

import Content from "../../components/edition/user/Content";

import useDate from "../../hooks/useDate";
import { prisma } from "../../lib/clients/prisma";
import { getSession } from "next-auth/react";
export default function Author({ userFollows, showData }) {
  const mobile = useMediaQuery("(max-width: 800px)");
  const padding = useMediaQuery("(max-width: 600px)");

  return (
    <div>
      <Box
        sx={{
          p: padding ? 2 : 8,
          pb: padding ? 2 : 4,
          pt: padding ? 4 : 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          rowGap: 2,
        }}
      >
        <AuthorProfile userFollows={userFollows} />
        {mobile ? <></> : <SundayTimelines />}
      </Box>
      <Content showData={showData} />
    </div>
  );
}

export const SundayTimelines = () => {
  const dt = useDate();

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{ fontSize: "24px", fontWeight: 500, textAlign: "right" }}
        variant="h3"
      >
        The Sunday Timelines
      </Typography>
      <Typography sx={{ textAlign: "right", fontWeight: 300 }} component="time">
        {dt}
      </Typography>
    </Box>
  );
};

Author.auth = true;

Author.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  var userFollows = null;
  var showData = null;

  const {
    params: { author },
  } = context;
  const { id } = await getSession(context);
  const authorFollowed = await prisma.author.findMany({
    where: {
      users: {
        some: {
          userId: id,
        },
      },
      username: {
        equals: author,
      },
    },
  });

  const onTwrtle = await prisma.author.findFirst({
    where: {
      username: author,
    },
  });

  userFollows = authorFollowed.length == 0 ? false : true;
  showData = onTwrtle ? true : false;

  return { props: { userFollows, showData } };
}
