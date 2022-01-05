import React, { useState, useEffect } from 'react'
import { Box, Tabs, Tab, Card} from '@mui/material'
import { TabPanel, TabContext } from '@mui/lab'
import { useRouter } from 'next/router'
import useTweets from '../../hooks/useTweets'
import { TweetContent } from '../Tweet'


export default function TopTweet({author}) {


    const { data, isLoading } = useTweets(author)

    if (isLoading) {
        return (
            <p>Loading...</p>
        )
    }

    return (
        <Card elevation={4} sx={{
            height: '100%', width: '100%',
            boxSizing: 'border-box',
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(10px)' }}>
            <TweetContent data={data?.tweets?.data[0]} includes={data?.tweets?.includes} />
        </Card>
    )
}
