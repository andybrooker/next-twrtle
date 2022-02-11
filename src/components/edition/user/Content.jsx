import React, { useState, useEffect } from 'react'
import { Box, Tabs, Tab, useMediaQuery } from '@mui/material'
import { TabPanel, TabContext } from '@mui/lab'
import { useRouter } from 'next/router'
import useTweets from '../../../hooks/useTweets'
import TweetPanel from './TweetPanel'
import ThreadPanel from './ThreadPanel'

export default function Content() {

    const reduce_padding = useMediaQuery('(max-width: 600px)')

    const [value, setValue] = useState('tweetsPanel')
    const [disabled, setDisabled] = useState({
        'tweets': false,
        'threads': false
    })

    const router = useRouter()
    const { author } = router.query

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const { data, isLoading } = useTweets(author)

    useEffect(() => {

        if (!isLoading && Object.keys(data?.tweets).length === 0) {
            setDisabled(disabled => ({...disabled, 'tweets': true}))
        }

        if (!isLoading && Object.keys(data?.threads).length === 0) {
            setDisabled(disabled => ({...disabled, 'threads': true}))
        }

        else {
            setDisabled({'threads': false, 'tweets': false})
        }

    }, [data, isLoading])

    return (
        <Box sx={{ px: reduce_padding ? 1 : 8 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs initialSelectedIndex={value} value={value} onChange={handleChange} aria-label="tweets or threads">
                        <Tab sx={{fontWeight: 400}} disabled={disabled.tweets} value='tweetsPanel' disableRipple label="Tweets" />
                        <Tab sx={{fontWeight: 400}} disabled={disabled.threads} value='threadsPanel' disableRipple label="Threads" />
                    </Tabs>
                </Box>
                <TweetPanel isLoading={isLoading} tweets={data?.tweets} />
                <ThreadPanel isLoading={isLoading} data={data} />
            </TabContext>
        </Box>
    )
}
