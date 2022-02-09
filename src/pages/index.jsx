import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSession, getSession } from 'next-auth/react'
import { useEffect } from "react"
import { useRouter } from 'next/router'
import SignInButton from '../components/SignInButton'
import { Grid, Typography, Container, styled } from '@mui/material';
import { TextLoop } from "react-text-loop-next";
import LoadingPage from '../components/LoadingPage'
import useMediaQuery from '@mui/material/useMediaQuery';


export default function Home() {

  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.replace('/home')
    }
  })

  if (session) {
    return (
      <LoadingPage />
    )
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
      </main>
      <footer className={styles.footer}>
        <Typography sx={{fontSize: '0.5rem', color: 'text.secondary'}}>Made by Andy.</Typography>
        
        <Typography sx={{fontSize: '0.5rem', color: 'text.secondary'}}>Illustration by Humanities.</Typography>
      </footer>
    </div>
  )
}

const Header = styled('header')({
  position: 'sticky',
  top: 0
})

function HomepageNav() {

  return <Container sx={{display: 'flex'}}>
    <Container sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
      <Image src='/NavLogo.svg' alt='Twrtle Logo' width={48} height={48}/>
      <Typography sx={{userSelect: 'none'}} variant="large" fontFamily='p22-mackinac-pro' fontWeight='600'>Twrtle</Typography>
    </Container>
    <SignInButton size='medium'/>
  </Container>

}

function HomepageCopy() {

  const loop_items = ['authors', 'bloggers', 'creators', 'doers', 'influencers', 'thinkers']

  const small_layout = useMediaQuery('(min-width:1000px)');

  return <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', '@media screen and (min-width: 1000px)': {flexDirection: 'row-reverse'} }}>
    <Image src='/Index.png' alt='Consuming Elephant' width={small_layout ? 300 : 125} height={small_layout ? 600 : 250}/>
    <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', '@media screen and (min-width: 1000px)': {justifyContent: 'center', alignItems: 'flex-start'}}}>
    <Typography sx={{ my: 2, textAlign: small_layout ? 'left' : 'center', '@media screen and (max-width: 1000px)' : {fontSize: '38px'}}} variant="h1" component="h1">
      Consume your favourite tweets mindfully.
    </Typography>
    <Typography sx={{ my: 2, textAlign: small_layout ? 'left' : 'center', '@media screen and (max-width: 1000px)' : {fontSize: '17px'}}} variant="large" component="h2">
      Improve your Twitter signal-to-noise ratio with a weekly round-up of your favourite <TextLoop>{loop_items.map((value, index) => <span key={index}>{value}.</span>)}</TextLoop>
    </Typography>
    <SignInButton size='large' />
    <Typography sx={{ textAlign: small_layout ? 'left' : 'center', maxWidth: '270px'}} variant="micro" component="span">Join Andy and 100&apos;s of others developing a slower, healthier relationship with social media.</Typography>

    </Container>
  </Container>
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}
