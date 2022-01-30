import React from 'react'
import { Box, Card, Tabs, Tab, Avatar, Skeleton } from '@mui/material'
import Greeting from '../components/edition/Greeting'
import { TabContext, TabPanel } from '@mui/lab'
import useAuthors from '../hooks/useAuthors'
import useTwitterUser from '../hooks/useTwitterUser'
import TopTweet from '../components/edition/TopTweet'
import useTweets from '../hooks/useTweets'
import useWindowDimensions from '../hooks/useWindowDimensions'


export default function Home() {

    return (
        <Box sx={{ p: '60px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Greeting />
            <TopTweets />
        </Box>
    )
}

Home.auth = true

const TopTweets = () => {

    const { data, isLoading, isError } = useAuthors()

    const [value, setValue] = React.useState(0);

    const { width } = useWindowDimensions()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (isError) {
        return (
            <div>Error</div>
        )
    }

    return (

        <TabContext value={value}>
            <Box sx={{ m: 4, display: 'flex', flexDirection: (width < 800 ? 'column' : 'row'), alignItems: 'center' }}>
                <Tabs sx={{overflow: 'visible'}} TabIndicatorProps={{
                    sx: {
                        display: 'none',
                    }

                }} orientation={width < 800 ? 'horizontal' : 'vertical'} initialSelectedIndex={value} value={value} onChange={handleChange}>
                    {
                        isLoading ?
                            ([0, 1, 2].map((value, index) => (
                                <Tab sx={{ m: 0, p: 0 }} disableRipple key={index} value={index} icon={<Skeleton animation="wave" width={30} height={30} variant="circular" />} />
                            ))) :
                            data.map(({ username }, index) => (
                                <Tab disableRipple
                                    sx={{
                                        m: 0,
                                        p: 0,
                                        "& .MuiAvatar-root": {
                                            border: '2px solid',
                                            borderColor: 'background.paper',
                                            boxSizing: 'border-box',
                                            transition: '0.5s ease-out'
                                        },
                                        "&.Mui-selected": {
                                            "& .MuiAvatar-root": {
                                                border: '2px solid',
                                                borderColor: 'primary.main',
                                                transition: '0.5s ease-out'

                                            }
                                        },
                                        "&.Mui-focusVisible": {
                                            "& .MuiAvatar-root": {
                                                borderColor: 'primary.lighter'

                                            }
                                        }

                                    }}
                                    key={index}
                                    value={index}
                                    icon={<AuthorProfileImage
                                        username={username} />} />
                            )
                            )
                    }
                </Tabs>

                <Card sx={{
                    width: '100%', minHeight: '300px',
                    mr: (width < 800 ? 0 : '90px'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#8EC5FC',
                    backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)'
                }} elevation={0}>
                    {!isLoading && data.map(({ username }, index) => (
                        <TopTweetPanel index={index} key={index} username={username}/>
                    ))}
                </Card>
            </Box>
        </TabContext>
    )

}

const TopTweetPanel = ({ username, index }) => {

    const authorQuery = useTwitterUser(username)
    const tweetQuery = useTweets(username)

    return (
        <TabPanel key={index} sx={{ height: 'inherit', width: '100%' }} value={index}><TopTweet authorQuery={authorQuery} tweetQuery={tweetQuery}/></TabPanel>
    )
}

const AuthorProfileImage = ({ username }) => {

    const { data, isLoading } = useTwitterUser(username)

    if (isLoading) {
        return <Skeleton animation="wave" width={30} height={30} variant="circular" />
    } else {
        return (
            <Avatar
                sx={{ width: 30, height: 30 }}
                alt={data?.name}
                src={data?.profile_image_url.replace('_normal', '')} />
        )
    }

}
