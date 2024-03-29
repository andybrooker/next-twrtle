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
import useTwitterUser from "../../hooks/useTwitterUser";
import { prisma } from "../../lib/clients/prisma";
import { getSession } from "next-auth/react";
export default function Author({ userFollows, showData }) {
  const mobile = useMediaQuery("(max-width: 800px)");
  const padding = useMediaQuery("(max-width: 600px)");
  const router = useRouter();
  const { author } = router.query;

  const authorQuery = useTwitterUser(author);

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
        <AuthorProfile userFollows={userFollows} authorQuery={authorQuery} />
        {mobile ? <></> : <SundayTimelines />}
      </Box>
      <Content showData={showData} authorQuery={authorQuery} />
    </div>
  );
}

export const SundayTimelines = () => {
  const dt = useDate();

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{ fontWeight: 500, textAlign: "right" }}
        variant="large"
        component="span"
        fontFamily="Clash Grotesk"
      >
        The Sunday Timelines
      </Typography>
      <Typography
        sx={{ textAlign: "right", fontWeight: 400 }}
        variant="small"
        component="time"
      >
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
  try {
    var userFollows = null;
    var showData = null;

    const {
      params: { author },
    } = context;
    const { id } = await getSession(context);

    const [authorFollowed, onTwrtle] = await Promise.all([
      prisma.author.findMany({
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
      }),
      prisma.author.findFirst({
        where: {
          username: author,
        },
      }),
    ]);

    userFollows = authorFollowed.length == 0 ? false : true;
    showData = onTwrtle ? true : false;

    return { props: { userFollows, showData } };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
}
