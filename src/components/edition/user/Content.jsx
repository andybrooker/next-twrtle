import React, { useState } from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import { TabPanel, TabContext } from '@mui/lab'
import { useRouter } from 'next/router'
import useTweets from '../../../hooks/useTweets'
import TweetPanel from './TweetPanel'
import ThreadPanel from './ThreadPanel'

export default function Content() {

    const [value, setValue] = useState('tweetsPanel')

    const router = useRouter()
    const { author } = router.query

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const { data, isLoading } = useTweets(author)

    const checkDisabled = (obj) => {
        let disabled = false

        if (Object.keys(obj).length === 0) {
            disabled = true
        }

        return disabled

    }

    return (
        <Box sx={{ px: 8 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs initialSelectedIndex={value} value={value} onChange={handleChange} aria-label="tweets or threads">
                        <Tab value='tweetsPanel' disableRipple label="Tweets" />
                        <Tab value='threadsPanel' disableRipple label="Threads" />
                    </Tabs>
                </Box>
                <TweetPanel disabled={() => checkDisabled(data?.tweets)} isLoading={isLoading} tweets={data?.tweets} />
                <ThreadPanel isLoading={isLoading} data={data} />
            </TabContext>
        </Box>
    )
}
