import React from 'react'
import { Box, Paper, Card, Tabs, Tab, Avatar, Skeleton, Typography } from '@mui/material'
import Greeting from '../components/edition/Greeting'
import { TabContext, TabPanel } from '@mui/lab'
import useAuthors from '../hooks/useAuthors'
import useTwitterUser from '../hooks/useTwitterUser'
import TopTweet from '../components/edition/TopTweet'
import useTweets from '../hooks/useTweets'
import useWindowDimensions from '../hooks/useWindowDimensions'
import AuthorProfile from '../components/edition/user/AuthorProfile'
import TwitterIcon from '@mui/icons-material/Twitter'
import SkeletonTweet from '../components/skeletons/SkeletonTweet'
import SkeletonProfile from '../components/skeletons/SkeletonProfile'

export default function Home() {

    return (
        <Box sx={{ p: '60px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', rowGap: 2 }}>
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
            <Box sx={{ width: '100%', px: (width < 800) ? 0 : 4 }}>
                <Box sx={{px: 3}}>
                    <Typography component="h2" variant = "large" color="text.secondary">Top Tweets of the Week</Typography>
                    <Tabs sx={{ overflow: 'visible', minHeight: 0, "& .MuiTabs-flexContainer": {
                        columnGap: 2
                    }}} TabIndicatorProps={{
                        sx: {
                            display: 'none',
                        }

                    }} initialSelectedIndex={value} value={value} onChange={handleChange}>
                        {
                            isLoading ?
                                ([0, 1, 2].map((value, index) => (
                                    <Tab sx={{ m: 0, p: 0, minWidth: 0 }} disableRipple key={index} value={index} icon={<Skeleton animation="wave" width={32} height={32} variant="circular" />} />
                                ))) :
                                data.map(({ username }, index) => (
                                    <Tab disableRipple
                                        sx={{
                                            m: 0,
                                            p: 0,
                                            minWidth: 0,
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
                </Box>

                <Card sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} elevation={0}>
                    {isLoading ?
                        <Box sx={{ width: '100%', px: 3, py: 1}} >
                            <Paper elevation={4} sx={{
                                display: 'flex', flexDirection: 'column', borderRadius: 2, p: 2, rowGap: 2, width: '100%'
                            }}>
                                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                    <SkeletonProfile />
                                    <TwitterIcon color='primary' fontSize='large' />
                                </Box>
                                <SkeletonTweet />
                            </Paper>
                        </Box> :
                        data.map(({ username }, index) => (
                            <TopTweetPanel index={index} key={index} username={username} />
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
        <TabPanel sx={{ width: '100%', px: 3, py: 1 }} key={index} value={index}>
            <TopTweet authorQuery={authorQuery} tweetQuery={tweetQuery} />
        </TabPanel>
    )
}

const AuthorProfileImage = ({ username }) => {

    const { data, isLoading } = useTwitterUser(username)

    if (isLoading) {
        return <Skeleton animation="wave" width={32} height={32} variant="circular" />
    } else {
        return (
            <Avatar
                sx={{ width: 32, height: 32 }}
                alt={data?.name}
                src={data?.profile_image_url.replace('_normal', '')} />
        )
    }

}
