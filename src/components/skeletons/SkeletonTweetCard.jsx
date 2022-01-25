import { Card } from '@mui/material'
import React from 'react'
import SkeletonTweet from './SkeletonTweet'

export default function SkeletonTweetCard() {
    return (
        <Card sx={{ my: 1, p: 2, maxWidth: '500px' }} variant="outlined">
            <SkeletonTweet />
        </Card>
    )
}
