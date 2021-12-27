import React, { useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import { TabPanel, TabContext } from '@mui/lab'
import { useRouter } from 'next/router'
import useTweets from '../../../hooks/useTweets'
import TweetText from '../../TweetText'
import Tweet from '../../Tweet'

export default function Content() {

    const [value, setValue] = useState('tweetsPanel')

    const router = useRouter()
    const { author } = router.query

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const { data, isLoading } = useTweets(author)

    return (
        <Box sx={{ px: 8 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs initialSelectedIndex={value} value={value} onChange={handleChange} aria-label="tweets or threads">
                        <Tab value='tweetsPanel' disableRipple label="Tweets" />
                        <Tab value='threadsPanel' disableRipple label="Threads" />
                    </Tabs>
                </Box>
                <TabPanel value='tweetsPanel' index={0}>
                    {isLoading ? 'Loading...' : data?.tweets?.data.map((tweet, index) => <Tweet key={index} data={tweet} includes={data?.tweets?.includes}/>)}
                </TabPanel>
                <TabPanel value='threadsPanel' index={0}>
                    {isLoading ? 'Loading...' : Object.values(data?.threads).map((thread, index) => <Tweet key={index} data={thread?.data[0]}/>)}
                </TabPanel>
            </TabContext>
        </Box>
    )
}
