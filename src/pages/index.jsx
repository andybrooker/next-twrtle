import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SignInButton from "../components/SignInButton";
import { Box, Typography, Container, styled } from "@mui/material";
import { TextLoop } from "react-text-loop-next";
import LoadingPage from "../components/LoadingPage";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import HeroImage from "../../public/HeroImage.png";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/home");
    }
  });

  if (session) {
    return <LoadingPage />;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Twrtle</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <HomepageNav />
      </Header>
      <main className={styles.main}>
        <HomepageCopy />
        <div className={styles.heroimagediv}>
          <Image
            className={styles.heroimage}
            width={800}
            height={800 / (2511 / 1309)}
            src={HeroImage}
            alt="The homepage view of Twrtle."
          />
        </div>
      </main>
      <footer className={styles.footer}>
        <Typography
          sx={{
            display: "flex",
            gap: 0.5,
            fontSize: "1rem",
            color: "text.secondary",
          }}
        >
          Made by {"  "}
          <Typography sx={{ fontWeight: 500, display: "flex" }}>
            @andy_brooker
          </Typography>
        </Typography>
      </footer>
    </div>
  );
}

const Header = styled("header")({
  position: "sticky",
  top: 0,
  zIndex: 999,
});

function HomepageNav() {
  const [isOpaque, setIsOpaque] = useState(false);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const checkScroll = currPos.y < -10;
      if (checkScroll !== isOpaque) {
        setIsOpaque(checkScroll);
      }
    },
    [isOpaque]
  );

  return (
    <Container
      sx={{
        boxShadow: isOpaque ? 1 : 0,
        backgroundColor: isOpaque ? "white" : "",
        transition: "500ms ease",
        width: "100vw",
        "@media screen and (min-width: 1000px)": {
          maxWidth: "100vw",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          maxWidth: "1000px",
          margin: "0 auto",
          py: 1,
        }}
      >
        <Container sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Image src="/NavLogo.svg" alt="Twrtle Logo" width={48} height={48} />
          <Typography
            sx={{ userSelect: "none" }}
            variant="large"
            fontFamily="Clash Grotesk"
            fontWeight="600"
          >
            Twrtle
          </Typography>
        </Container>
        <SignInButton size="medium" />
      </Box>
    </Container>
  );
}

function HomepageCopy() {
  const loop_items = [
    "authors",
    "bloggers",
    "creators",
    "doers",
    "influencers",
    "thinkers",
  ];

  const small_layout = useMediaQuery("(min-width:1000px)");

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "800px",
        mt: 8,
        mb: 4,
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "@media screen and (min-width: 1000px)": {
            justifyContent: "center",
          },
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "36px",
            lineHeight: "44px",
          }}
          variant="h1"
          component="h1"
        >
          Consume your favourite tweets mindfully
        </Typography>
        <Typography
          sx={{
            my: 1,
            textAlign: "center",
            fontSize: "20px",
          }}
          variant="large"
          component="h2"
        >
          A weekly round-up of your favourite{" "}
          <TextLoop>
            {loop_items.map((value, index) => (
              <span key={index}>{value}.</span>
            ))}
          </TextLoop>
        </Typography>
        <SignInButton size="large" />
      </Container>
    </Container>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
